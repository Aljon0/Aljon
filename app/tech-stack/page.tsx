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
      skills: ["TypeScript", "React", "Next.js", "Tailwind CSS", "React Native", "Responsive Design"]
    },
    {
      title: "Backend",
      skills: ["Node.js", "Express.js", "REST APIs", "Prisma ORM", "Supabase", "PostgreSQL", "Firebase", "Webhooks & API Integrations", "Serverless APIs"]
    },
    {
      title: "AI & Applied Machine Learning",
      skills: ["LLM Integration", "OpenAI", "OpenAI", "Anthropic (Claude)", "MistralAI", "Hugging Face", "RAG", "Prompt Engineering", "LangChain", "AI Agent Workflows", "Vision AI"]
    },
    {
      title: "Automation",
      skills: ["n8n", "Workflow Automation", "Workflow Orchestration",  "AI Agent Workflows", "Webhooks", "Event Driven Architecture", "Business Process Automation","Make.com"]
    },
    {
      title: "AI Development Platforms",
      skills: ["Replit", "Lovable AI", "Cursor", "Claude Code"]
    },
    {
      title: "DevOps & Deployment",
      skills: ["Docker", "GitHub Actions", "Vercel", "Railway", "Containerization", "Render", "CI/CD"]
    },
    {
      title: "AI-Assisted Tools",
      skills: ["Cursor", "Claude Code", "GitHub Copilot", "Windsurf", "Codex", "Gemini"]
    },
    {
      title: "Developer Tools",
      skills: ["Git & GitHub", "VS Code", "Postman", "Slack", "Notion", "Figma"]
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