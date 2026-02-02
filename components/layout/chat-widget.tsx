"use client";

import { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Loader2 } from "lucide-react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
// Ensure this path points to your actual theme file location
import { useTheme } from "@/components/theme-context"; 

// --- 1. DEFINE THE MESSAGE TYPE ---
interface ChatMessage {
  id: number;
  role: 'user' | 'assistant';
  content: string;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark } = useTheme();
  
  // --- 2. USE THE TYPE IN STATE ---
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // --- SUBMIT HANDLER ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // 1. Add User Message
    const userMessage: ChatMessage = { id: Date.now(), role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // 2. Send to API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) throw new Error(response.statusText);

      // 3. Handle Streaming Response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let aiMessageContent = "";
      
      // Create a placeholder AI message
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'assistant', content: "" }]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const text = decoder.decode(value, { stream: true });
          aiMessageContent += text;
          
          setMessages(prev => {
            const newHistory = [...prev];
            // Update the last message
            if (newHistory.length > 0) {
                newHistory[newHistory.length - 1] = {
                    ...newHistory[newHistory.length - 1],
                    content: aiMessageContent
                };
            }
            return newHistory;
          });
        }
      }

    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { id: Date.now(), role: 'assistant', content: "Sorry, I couldn't reach the server." }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper component for the Avatar image
  const Avatar = ({ role }: { role: 'user' | 'assistant' }) => (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0 overflow-hidden relative border ${
        role === 'user' 
            ? (isDark ? 'bg-white border-white text-black' : 'bg-black border-black text-white') 
            : (isDark ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200')
    }`}>
        {role === 'user' ? (
            <UserIcon isDark={isDark} />
        ) : (
            <Image 
                src="/profile.jpg" 
                alt="AI Assistant" 
                fill 
                className="object-cover" 
            />
        )}
    </div>
  );

  return (
    <div className="fixed bottom-6 right-6 z-9999 flex flex-col items-end gap-4 font-sans">
      
      {/* Chat Window */}
      {isOpen && (
        <div className={`
            w-87.5 h-125 flex flex-col rounded-2xl shadow-2xl overflow-hidden border transition-colors
            ${isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}
        `}>
            {/* Header */}
            <div className={`p-4 border-b flex justify-between items-center ${isDark ? 'bg-neutral-800 border-neutral-700' : 'bg-neutral-50 border-neutral-100'}`}>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-2.5 h-2.5 bg-green-500 rounded-full absolute bottom-0 right-0 border-2 border-white dark:border-neutral-800 z-10"></div>
                        <Avatar role="assistant" />
                    </div>
                    <div>
                        <span className={`text-sm font-semibold block ${isDark ? 'text-white' : 'text-black'}`}>Al-jon</span>
                        <span className="text-[10px] opacity-60 block">Ask about my skills & projects</span>
                    </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer p-1">
                    <X size={20} />
                </button>
            </div>

            {/* Messages Area */}
            <div className={`
                flex-1 p-4 overflow-y-auto space-y-4 
                ${isDark ? 'bg-black' : 'bg-neutral-50'}
                /* Custom Aesthetic Scrollbar */
                [&::-webkit-scrollbar]:w-1.5
                [&::-webkit-scrollbar-track]:bg-transparent
                ${isDark ? '[&::-webkit-scrollbar-thumb]:bg-neutral-800' : '[&::-webkit-scrollbar-thumb]:bg-neutral-300'}
                [&::-webkit-scrollbar-thumb]:rounded-full
            `}>
                
                {/* Initial Greeting */}
                {messages.length === 0 && (
                    <div className="flex gap-3">
                        <Avatar role="assistant" />
                        <div className={`p-3 rounded-2xl rounded-tl-none text-sm max-w-[85%] shadow-sm border ${isDark ? 'bg-neutral-900 border-neutral-800 text-gray-200' : 'bg-white border-neutral-200 text-gray-800'}`}>
                            Hi there! 👋 I&apos;m Al-jon&apos;s AI assistant. Ask me anything about his experience, tech stack, or projects!
                        </div>
                    </div>
                )}

                {/* Message History */}
                {messages.map((m) => (
                    <div key={m.id} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <Avatar role={m.role} />
                        
                        <div className={`p-3 rounded-2xl text-sm max-w-[85%] leading-relaxed shadow-sm ${
                            m.role === 'user'
                                ? (isDark ? 'bg-white text-black rounded-tr-none' : 'bg-black text-white rounded-tr-none')
                                : (isDark ? 'bg-neutral-900 border border-neutral-800 text-gray-200 rounded-tl-none' : 'bg-white border border-neutral-200 text-gray-800 rounded-tl-none')
                        }`}>
                            {/* React Markdown Renderer */}
                            <ReactMarkdown
                                components={{
                                    // FIX: Using '_node' instead of 'node' to pass build checks
                                    ul: ({node: _node, ...props}) => <ul className="list-disc ml-4 space-y-1 my-2" {...props} />,
                                    ol: ({node: _node, ...props}) => <ol className="list-decimal ml-4 space-y-1 my-2" {...props} />,
                                    li: ({node: _node, ...props}) => <li className="pl-1" {...props} />,
                                    strong: ({node: _node, ...props}) => <span className="font-bold" {...props} />,
                                    p: ({node: _node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                                }}
                            >
                                {m.content}
                            </ReactMarkdown>
                        </div>
                    </div>
                ))}

                {/* Loading Indicator */}
                {isLoading && messages[messages.length - 1]?.role === 'user' && (
                     <div className="flex gap-3">
                        <Avatar role="assistant" />
                        <div className={`p-3 rounded-2xl rounded-tl-none text-sm shadow-sm border ${isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}`}>
                            <Loader2 size={16} className="animate-spin text-gray-400" />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className={`p-3 border-t flex gap-2 ${isDark ? 'border-neutral-800 bg-neutral-900' : 'border-neutral-100 bg-white'}`}>
                <input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..." 
                    className={`flex-1 bg-transparent text-sm focus:outline-none px-2 ${isDark ? 'text-white placeholder:text-neutral-500' : 'text-black placeholder:text-neutral-400'}`}
                />
                <button 
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className={`p-2 rounded-xl transition-all cursor-pointer ${
                        !input.trim() || isLoading
                            ? 'opacity-30 cursor-not-allowed bg-gray-500/20 text-gray-500' 
                            : (isDark ? 'bg-white text-black hover:bg-neutral-200' : 'bg-black text-white hover:bg-neutral-800')
                    }`}
                >
                    {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                </button>
            </form>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`h-14 w-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer
            ${isDark ? 'bg-white text-black' : 'bg-black text-white'}
        `}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
}

// Simple User Icon Component (Colors aligned to theme)
function UserIcon({ isDark }: { isDark: boolean }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-5 h-5 ${isDark ? 'text-black' : 'text-white'}`}>
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    )
}