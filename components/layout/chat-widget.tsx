"use client";

import { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Loader2 } from "lucide-react";
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
  
  // --- 2. USE THE TYPE IN STATE (No more 'any') ---
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
            // Update the last message (which is the AI's placeholder)
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

  return (
    <div className="fixed bottom-6 right-6 z-9999 flex flex-col items-end gap-4 font-sans">
      
      {/* Chat Window */}
      {isOpen && (
        <div className={`
            w-87.5 h-112.5 flex flex-col rounded-2xl shadow-2xl overflow-hidden border transition-colors
            ${isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}
        `}>
            {/* Header */}
            <div className={`p-4 border-b flex justify-between items-center ${isDark ? 'bg-neutral-800 border-neutral-700' : 'bg-neutral-50 border-neutral-100'}`}>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-2.5 h-2.5 bg-green-500 rounded-full absolute bottom-0 right-0 border-2 border-white dark:border-neutral-800"></div>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${isDark ? 'bg-neutral-700' : 'bg-neutral-200'}`}>
                            AI
                        </div>
                    </div>
                    <div>
                        <span className={`text-sm font-semibold block ${isDark ? 'text-white' : 'text-black'}`}>Portfolio Assistant</span>
                    </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="opacity-60 hover:opacity-100 transition-opacity">
                    <X size={18} />
                </button>
            </div>

            {/* Messages */}
            <div className={`flex-1 p-4 overflow-y-auto space-y-4 ${isDark ? 'bg-black' : 'bg-white'}`}>
                {messages.length === 0 && (
                    <div className={`p-3 rounded-xl text-sm ${isDark ? 'bg-neutral-800 text-gray-200' : 'bg-neutral-100 text-gray-800'}`}>
                        Hi! I&apos;m Al-jon&apos;s AI. Ask me anything about his projects!
                    </div>
                )}
                {messages.map((m) => (
                    <div key={m.id} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0 ${
                            m.role === 'user' 
                                ? (isDark ? 'bg-blue-600' : 'bg-black') 
                                : (isDark ? 'bg-neutral-800' : 'bg-neutral-100')
                        }`}>
                            {m.role === 'user' ? <UserIcon /> : "AI"}
                        </div>
                        <div className={`p-3 rounded-2xl text-sm max-w-[85%] ${
                            m.role === 'user'
                                ? (isDark ? 'bg-blue-600 text-white' : 'bg-black text-white')
                                : (isDark ? 'bg-neutral-800 text-gray-200' : 'bg-neutral-100 text-gray-800')
                        }`}>
                            {m.content}
                        </div>
                    </div>
                ))}
                {isLoading && messages[messages.length - 1]?.role === 'user' && (
                     <div className="flex justify-start"><Loader2 size={16} className="animate-spin text-gray-400" /></div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className={`p-3 border-t flex gap-2 ${isDark ? 'border-neutral-800 bg-neutral-900' : 'border-neutral-100 bg-white'}`}>
                <input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..." 
                    className={`flex-1 bg-transparent text-sm focus:outline-none px-2 ${isDark ? 'text-white' : 'text-black'}`}
                />
                <button type="submit" disabled={isLoading || !input.trim()} className="p-2 opacity-80 hover:opacity-100">
                    <Send size={16} className={isDark ? 'text-white' : 'text-black'} />
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

function UserIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    )
}