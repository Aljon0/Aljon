"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useTheme } from "@/components/theme-context";

export default function TechStackPage() {
  const { isDark } = useTheme();

  // The complete list from your request
  const categories = [
    {
      title: "Frontend",
      skills: ["JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "Vite", "HTML5 / CSS3"]
    },
    {
      title: "Backend",
      skills: ["Node.js", "Express.js", "FastAPI (Python)", "REST APIs", "Prisma ORM", "Authentication (JWT)", "Webhooks & API integrations", "PostgreSQL", "MongoDB", "Supabase", "Firebase", "MySQL", "PHP"]
    },
    {
      title: "AI & Applied Machine Learning",
      skills: ["Large Language Models (LLMs)", "Groq (low-latency)", "OpenAI", "Anthropic (Claude)", "MistralAI", "Hugging Face", "LangChain", "Prompt Engineering", "AI Agent Workflows"]
    },
    {
      title: "Automation",
      skills: ["Make.com", "n8n (basic)", "Webhooks & API orchestration", "RAG (Foundational)"]
    },
    {
      title: "AI Development Platforms",
      skills: ["Replit", "Lovable AI"]
    },
    {
      title: "DevOps & Deployment",
      skills: ["Docker (basic)", "GitHub Actions", "Vercel", "Railway", "Firebase Hosting", "Render"]
    },
    {
      title: "AI-Assisted Tools",
      skills: ["Cursor", "Claude Code", "GitHub Copilot", "Windsurf", "ChatGPT", "Gemini", "Deepseek"]
    },
    {
      title: "Developer Tools",
      skills: ["Git & GitHub", "VS Code", "Postman", "Slack", "Notion", "Jira / ClickUp"]
    }
  ];

  return (
    <div className="min-h-screen p-8 md:p-12">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-sm opacity-60 hover:opacity-100 mb-8 transition-colors">
            <ArrowLeft size={16} /> Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold mb-4">Tech Stack</h1>
        <p className="opacity-60 mb-10 text-lg max-w-2xl">
            A comprehensive list of the technologies, tools, and AI platforms I use to build scalable applications.
        </p>
        
        <div className="space-y-10">
            {categories.map((category, index) => (
                <section key={index}>
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        {category.title}
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill) => (
                            <span 
                                key={skill} 
                                className={`
                                    px-4 py-2 rounded-lg text-sm border transition-colors
                                    ${isDark 
                                        ? 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700' 
                                        : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:border-neutral-300'
                                    }
                                `}
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </section>
            ))}
        </div>
      </div>
    </div>
  );
}