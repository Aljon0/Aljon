"use client";

import { useTheme } from "@/components/theme-context";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Layers,
  Play,
  Workflow,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// --- 1. DEFINE TYPES ---
interface ProblemSolution {
  problem: string[];
  solution: string[];
}

interface CaseStudy {
  title: string;
  overview: string;
  features: string[];
  technologyStack: string[];
  problemAndSolution?: ProblemSolution;
}

interface AutomationWorkflow {
  title: string;
  description: string;
  image: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  link: string;
  featured: boolean;
  year?: string;
  videoDemo?: string; // NEW: For Loom/Video links
  workflows?: AutomationWorkflow[]; // NEW: For the Automation Gallery
  caseStudy?: CaseStudy;
}

// --- 2. DATA (Reordered & Combined) ---
const allProjects: Project[] = [
  {
    id: 3,
    title: "ED3C: Eternal Design (Double Seven)",
    description:
      "A full-stack SaaS and interactive 3D customization platform for memorial design, featuring e-commerce and order management.",
    image: "/projects/3DGC.png",
    category: "Full-Stack Web App",
    technologies: [
      "React",
      "React Three Fiber",
      "Express.js",
      "Supabase",
      "PostgreSQL",
    ],
    link: "https://threedgc.onrender.com",
    featured: true,
    year: "2026",
    caseStudy: {
      title: "ED3C: Eternal Design 3D Customization & SaaS Platform",
      overview:
        "ED3C is a flagship web application designed to transform the memorial design process for Double Seven Lapida Maker Incorporation. By combining an intuitive, real-time WebGL 3D customization platform with a robust e-commerce and SaaS-style admin dashboard, it modernizes traditional memorial design.",
      problemAndSolution: {
        problem: [
          "Customers demand immediate design previews, leading to time-consuming manual revisions and bottlenecks.",
          "The business struggled to manage order states, resulting in confusion over customer requests and specifications.",
          "Revenue was lost due to uncompleted partial payments and abandoned orders lacking a strict enforcement system.",
          "The previous NoSQL database structure made it difficult to track relational data like inventory, complex orders, and users effectively.",
        ],
        solution: [
          "Implemented React Three Fiber for a real-time 3D visualization workspace, allowing customers to self-serve gravestone, urn, and table sign designs.",
          "Built a secure Express.js REST API with Role-Based Access Control (RBAC) and a Kanban-style admin dashboard to track order lifecycles (Pending to Finished).",
          "Enforced strict payment gateways using Supabase Storage for receipt validation, preventing order processing until payments are verified.",
          "Migrated to a PostgreSQL relational database (Supabase) to seamlessly link users, intricate order details, and real-time inventory tracking.",
        ],
      },
      features: [
        "Interactive 3D WebGL design tool with custom textures and elements",
        "Kanban-style Order Management System for admins",
        "Real-time messaging hub between customers and the business",
        "Secure Auth & Role-Based Access Control (RBAC)",
        "Partial and full payment tracking with digital receipt validation",
        "Admin Dashboard with Recharts for monthly sales and inventory analytics",
        "PostgreSQL-powered inventory tracking with low-stock alerts",
        "Global template design manager for pre-built 3D stones",
      ],
      technologyStack: [
        "Frontend: React.js, Zustand, Tailwind CSS",
        "3D Rendering: React Three Fiber (@react-three/drei)",
        "Backend API: Node.js, Express.js",
        "Database & Auth: Supabase (PostgreSQL), Supabase Auth, Supabase Storage",
      ],
    },
  },
  {
    id: 2,
    title: "Private Knowledge Base AI (Advanced RAG)",
    description:
      "A full-stack AI-powered knowledge base system that allows users to upload PDFs, ask questions, and receive accurate answers with citations using a Retrieval-Augmented Generation (RAG) pipeline.",
    image: "/projects/Advanced-Rag.png",
    category: "AI Web App",
    technologies: [
      "Next.js",
      "Tailwind",
      "Express",
      "Supabase",
      "Mistral AI",
      "pgvector",
    ],
    link: "https://advanced-rag.vercel.app/dashboard",
    featured: true,
    caseStudy: {
      title: "Private Knowledge Base AI with Advanced RAG",
      overview:
        "This project is a full-stack AI system that enables users to upload PDF documents and interact with them through a chat interface. It uses a Retrieval-Augmented Generation (RAG) pipeline to provide accurate, context-aware answers with citations. By combining vector embeddings, hybrid search, and LLM generation, the system minimizes hallucinations and improves answer reliability.",
      features: [
        "PDF Upload System: Upload and process documents into a searchable knowledge base",
        "AI Chat Interface: Ask questions and receive contextual answers in real-time",
        "RAG Pipeline: Combines retrieval and generation for accurate responses",
        "Hybrid Search: Uses both vector similarity and keyword search for better results",
        "Citations & Source Highlighting: Displays document sources for each answer",
        "Confidence Score: Indicates reliability of generated responses",
        "Modular Full-Stack Architecture: Clean separation of frontend and backend",
        "Scalable Vector Storage: Uses pgvector with Supabase for efficient similarity search",
      ],
      technologyStack: [
        "Frontend: Next.js with Tailwind CSS",
        "Backend: Express.js (Node.js)",
        "Database: Supabase (PostgreSQL + pgvector)",
        "AI Embeddings: Mistral AI",
        "LLM Generation: Mistral AI",
        "Architecture: Retrieval-Augmented Generation (RAG)",
      ],
    },
  },
  {
    id: 5,
    title: "E-Commerce",
    description:
      "A e-commerce with Stripe integration, product API, and Firebase backend for authentication and order tracking.",
    image: "/projects/Shopsmart.png",
    category: "Web App",
    technologies: ["React", "Tailwind", "Firebase", "Stripe"],
    link: "https://e-commerce-gkjf.onrender.com",
    featured: true,
    caseStudy: {
      title: "E-Commerce: Shopsmart",
      overview:
        "This web application serves as a modern and responsive e-commerce that pulls products from an API, supports secure checkout with Stripe, and allows users to manage their cart and complete orders with real-time confirmation. Firebase handles user authentication and order tracking, streamlining development without a heavy CMS.",
      features: [
        "API-based product catalog (no manual product entry)",
        "Add-to-cart and quantity management",
        "Stripe checkout integration for secure payments",
        "Firebase authentication for login and checkout access",
        "Order confirmation and success screen",
        "Clean, aesthetic UI using Tailwind CSS",
      ],
      technologyStack: [
        "Frontend: React.js + Tailwind CSS",
        "Backend: Firebase",
        "Payment Integration: Stripe API",
        "Authentication: Firebase Authentication",
      ],
    },
  },
  {
    id: 4,
    title: "AI Systems Evaluation Playground",
    description:
      "A full-stack AI evaluation platform that compares multiple LLM responses in real-time, allowing users to analyze latency, response quality, token usage, and overall model performance through an interactive dashboard.",
    image: "/projects/EvalPlayground.png",
    category: "AI Web App",
    technologies: [
      "Next.js",
      "Tailwind",
      "Express",
      "Supabase",
      "Mistral AI",
      "Groq",
    ],
    link: "https://ai-eval-playground.vercel.app/",
    featured: true,
    caseStudy: {
      title: "AI Systems Evaluation Playground",
      overview:
        "This project is a full-stack AI evaluation platform designed to compare and analyze responses from multiple large language models in real-time. Users can input prompts, run them across different AI providers, and evaluate outputs based on latency, response quality, token usage, and scoring metrics. The platform was built to explore AI system behavior, prompt effectiveness, and model performance in a structured and interactive way.",
      features: [
        "Multi-Model Evaluation: Run prompts across multiple AI models simultaneously",
        "Response Comparison Dashboard: Compare outputs side-by-side in real-time",
        "Latency Tracking: Measure and display response speed per model",
        "Usage Estimation: Display token or usage estimates for each request",
        "Experiment Saving: Store prompt experiments and previous evaluations",
        "Ranking System: Score and rank model responses based on quality",
        "Responsive SaaS UI: Elegant and fully responsive interface across devices",
        "Modular Full-Stack Architecture: Clean separation between frontend and backend systems",
      ],
      technologyStack: [
        "Frontend: Next.js with Tailwind CSS",
        "Backend: Express.js (Node.js)",
        "Database: Supabase (PostgreSQL)",
        "AI Models: Mistral AI and Groq",
        "Architecture: Multi-Model AI Evaluation System",
      ],
    },
  },
  {
    id: 10,
    title: "AI Workflow Automation Engine",
    description:
      "A full-stack AI-powered workflow automation platform that enables users to submit tasks in natural language while automatically selecting, orchestrating, and executing workflows through n8n. The system combines AI intent analysis, workflow routing, automation execution, and real-time monitoring to streamline business processes and operational tasks.",
    image: "/projects/AIWorkflowAutomationEngine.png",
    category: "AI Automation",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Express.js",
      "Supabase",
      "n8n",
      "Mistral AI",
      "Groq",
      "Docker",
    ],
    link: "https://ai-automation-engine-eight.vercel.app/",
    featured: true,
    videoDemo: "https://www.loom.com/share/38fa1871e948439cae7e500afaabe456", // Loom video added here
    workflows: [
      {
        title: "CSV Analysis Workflow",
        description:
          "Transforms raw CSV data into AI-generated reports, summaries, and business insights.",
        image: "/projects/Automation/CSVAnalysis.png",
      },
      {
        title: "Document Processing Workflow",
        description:
          "Automates document extraction, content analysis, and database storage through AI-powered workflows.",
        image: "/projects/Automation/DocumentProcessing.png",
      },
      {
        title: "Email Automation Workflow",
        description:
          "Generates intelligent summaries and automates email delivery through n8n workflow orchestration.",
        image: "/projects/Automation/EmailAutomation.png",
      },
    ],
    caseStudy: {
      title: "AI Workflow Automation Engine",
      overview:
        "AI powered workflow orchestration platform that converts natural language requests into executable automation pipelines using n8n, event driven architecture, and a SaaS dashboard.",
      features: [
        "AI Intent Detection: Analyzes user requests and determines the most appropriate workflow",
        "Workflow Selection Engine: Automatically maps user intent to predefined automation pipelines",
        "n8n Workflow Orchestration: Executes business processes through self-hosted n8n workflows",
        "Document Processing: Extracts and processes information from uploaded documents",
        "CSV Analysis and Reporting: Generates insights and reports from uploaded datasets",
        "Execution Monitoring: Tracks workflow progress, status, and execution history",
        "Workflow Logs and Auditing: Stores detailed execution logs for transparency and debugging",
        "Analytics Dashboard: Visualizes workflow usage, execution metrics, and performance trends",
        "Integration Management: Supports AI providers, database services, and automation tools",
        "Responsive SaaS Interface: Optimized user experience across desktop, tablet, and mobile devices",
        "Webhook-Based Communication: Enables reliable interaction between Express.js and n8n workflows",
        "Scalable Architecture: Modular design supporting future workflow expansion and integrations",
      ],
      technologyStack: [
        "Frontend: Next.js (App Router) with TypeScript and Tailwind CSS",
        "Backend: Express.js (Node.js)",
        "Database: Supabase (PostgreSQL)",
        "Automation Engine: n8n Workflow Orchestration",
        "AI Providers: Mistral AI and Groq",
        "Storage: Supabase Storage",
        "Infrastructure: Docker",
        "Communication: REST APIs and Webhooks",
        "Architecture: AI-Powered Workflow Automation Platform",
      ],
    },
  },
  {
    id: 9,
    title: "Autonomous Research Agent",
    description:
      "A full-stack AI agent platform that transforms high-level research goals into structured reports through autonomous planning, workflow orchestration, memory storage, and AI-powered analysis. The system automatically creates research plans, executes tasks through n8n workflows, stores findings, and generates actionable insights.",

    image: "/projects/Autonomous-Research-Agent.png",

    category: "AI Agent",

    technologies: [
      "Next.js",
      "Tailwind",
      "Express",
      "Supabase",
      "n8n",
      "Mistral AI",
      "Groq",
      "Docker",
    ],

    link: "https://autonomous-research-agent-kappa.vercel.app/research",

    featured: true,

    caseStudy: {
      title: "Autonomous Research Agent",

      overview:
        "This project is an AI-powered autonomous research system designed to perform multi-step research tasks with minimal human intervention. Users provide a research objective, and the platform automatically generates a research plan, orchestrates workflows through n8n, gathers and analyzes information using AI, stores findings in memory, and produces structured business-ready reports. The project was built to explore agentic AI architectures, workflow automation, and intelligent task execution using modern full-stack technologies.",

      features: [
        "Goal-Based Research: Users provide a research objective instead of manually defining tasks",
        "AI Planning Layer: Automatically breaks research goals into actionable steps",
        "Workflow Orchestration: Executes research tasks through n8n workflows",
        "Research Tool Integration: Uses search, analysis, and summarization capabilities",
        "Persistent Memory: Stores findings and execution data in Supabase",
        "Execution Tracking: Tracks workflow progress throughout the research process",
        "Structured Report Generation: Produces organized reports with insights and recommendations",
        "Responsive User Interface: Clean and intuitive experience across desktop and mobile devices",
        "Modular Agent Architecture: Planning, execution, memory, and reporting layers separated for maintainability",
      ],

      technologyStack: [
        "Frontend: Next.js with Tailwind CSS",
        "Backend: Express.js (Node.js)",
        "Database: Supabase (PostgreSQL)",
        "Automation: n8n Workflow Orchestration",
        "AI Providers: Mistral AI and Groq",
        "Infrastructure: Docker",
        "Architecture: Autonomous Agent System",
      ],
    },
  },

  {
    id: 1,
    title: "AI-Resume Builder",
    description:
      "An intelligent resume builder that uses Mistral AI for skill suggestions, customizable templates, and PDF export with Firebase integration.",
    image: "/projects/AI-Resume Builder.webp",
    category: "Web App",
    technologies: ["React", "Tailwind", "Firebase", "Express", "Mistral AI"],
    link: "https://ai-rb-haee.onrender.com",
    featured: true,
    caseStudy: {
      title: "AI-Powered Resume Builder: Smarter Resume Creation",
      overview:
        "This web application streamlines the resume creation process by integrating Mistral AI to suggest relevant skills based on job titles. It allows users to generate, customize, save, and download resumes using a clean, intuitive interface and PDF-ready templates.",
      features: [
        "AI-generated skill suggestions via Mistral AI",
        "Customizable resume templates styled with Tailwind CSS",
        "Export resumes as PDF files",
        "Save and load resumes using Firebase Firestore",
        "Secure user authentication via Firebase Auth",
      ],
      technologyStack: [
        "Frontend: React.js + Tailwind CSS",
        "Backend: Express.js (Node.js)",
        "AI Integration: Mistral AI",
        "Database: Firebase Firestore",
        "Authentication: Firebase Authentication",
      ],
    },
  },
];

export default function ProjectsPage() {
  const { isDark } = useTheme();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const openProject = (project: Project) => {
    setCurrentSlide(0);
    setSelectedProject(project);
  };

  // 2. Simplify the effect — only handle the scroll lock
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  // Carousel Handlers
  const nextSlide = () => {
    if (selectedProject?.workflows) {
      setCurrentSlide((prev) => (prev + 1) % selectedProject.workflows!.length);
    }
  };

  const prevSlide = () => {
    if (selectedProject?.workflows) {
      setCurrentSlide(
        (prev) =>
          (prev - 1 + selectedProject.workflows!.length) %
          selectedProject.workflows!.length,
      );
    }
  };

  return (
    <div className="min-h-screen p-8 md:p-12 relative">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm opacity-60 hover:opacity-100 mb-8 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <h1 className="text-4xl font-bold mb-4">All Projects</h1>
        <p className="opacity-60 mb-10 text-lg max-w-2xl">
          A showcase of my applications, experiments, and full-stack solutions.
        </p>

        {/* PROJECTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => openProject(project)}
              className={`
                group relative rounded-xl overflow-hidden cursor-pointer border transition-all duration-300 hover:scale-[1.02]
                ${isDark ? "bg-neutral-900 border-neutral-800 hover:border-neutral-700" : "bg-white border-neutral-200 hover:border-neutral-300 shadow-sm hover:shadow-md"}
              `}
            >
              {/* Category Badge */}
              <div className="absolute top-3 right-3 z-10">
                <span
                  className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md rounded border shadow-sm ${isDark ? "bg-black/60 border-white/10 text-white" : "bg-white/80 border-black/10 text-black"}`}
                >
                  {project.category}
                </span>
              </div>

              <div className="relative aspect-video w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-5 flex flex-col h-55">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg leading-tight">
                    {project.title}
                  </h3>
                </div>
                <p
                  className={`text-sm mb-4 line-clamp-3 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}
                >
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className={`text-[10px] px-2 py-1 rounded font-medium border ${isDark ? "bg-neutral-800 border-neutral-700 text-neutral-300" : "bg-neutral-100 border-neutral-200 text-neutral-600"}`}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-[10px] px-2 py-1 opacity-50">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- PROJECT DETAIL MODAL OVERLAY --- */}
      {selectedProject && (
        <div className="fixed inset-0 z-100 flex justify-center items-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedProject(null)}
          />

          <div
            className={`
                relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border flex flex-col
                ${isDark ? "bg-neutral-900 border-neutral-800" : "bg-white border-neutral-200"}
                /* CUSTOM SCROLLBAR STYLING */
                [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:bg-transparent
                ${isDark ? "[&::-webkit-scrollbar-thumb]:bg-neutral-800" : "[&::-webkit-scrollbar-thumb]:bg-neutral-200"}
                [&::-webkit-scrollbar-thumb]:rounded-full
            `}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            {/* Banner */}
            <div className="relative w-full h-48 sm:h-64 shrink-0 bg-neutral-200 dark:bg-neutral-800">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex flex-col items-start gap-3">
                <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-blue-600 text-white rounded">
                  {selectedProject.category}
                </span>
                <h2 className="text-3xl font-bold text-white">
                  {selectedProject.title}
                </h2>
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-8">
              {/* Actions / Links */}
              <div className="flex flex-wrap gap-4">
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-colors ${isDark ? "bg-white text-black hover:bg-neutral-200" : "bg-black text-white hover:bg-neutral-800"}`}
                >
                  <ExternalLink size={16} /> View Live Project
                </a>

                {/* LOOM VIDEO DEMO BUTTON */}
                {selectedProject.videoDemo && (
                  <a
                    href={selectedProject.videoDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-colors border ${isDark ? "border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-white" : "border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-black"}`}
                  >
                    <Play
                      size={16}
                      className="text-blue-500"
                      fill="currentColor"
                    />{" "}
                    Watch Demo
                  </a>
                )}
              </div>

              {/* Overview */}
              <section>
                <h3
                  className={`text-xl font-bold mb-3 flex items-center gap-2 ${isDark ? "text-white" : "text-black"}`}
                >
                  <Layers
                    size={20}
                    className={isDark ? "text-neutral-400" : "text-neutral-600"}
                  />
                  Overview
                </h3>
                <p
                  className={`leading-relaxed ${isDark ? "text-neutral-300" : "text-neutral-600"}`}
                >
                  {selectedProject.caseStudy?.overview ||
                    selectedProject.description}
                </p>
              </section>

              {/* AUTOMATION WORKFLOWS SLIDER */}
              {selectedProject.workflows &&
                selectedProject.workflows.length > 0 && (
                  <section
                    className={`p-6 rounded-xl border ${isDark ? "bg-neutral-950 border-neutral-800" : "bg-neutral-50 border-neutral-200"}`}
                  >
                    <h3
                      className={`text-xl font-bold mb-4 flex items-center gap-2 ${isDark ? "text-white" : "text-black"}`}
                    >
                      <Workflow
                        size={20}
                        className={isDark ? "text-blue-400" : "text-blue-600"}
                      />
                      Automation Workflows
                    </h3>

                    <div className="relative group">
                      {/* Image Container */}
                      <div
                        className={`relative w-full aspect-video rounded-lg overflow-hidden border ${isDark ? "border-neutral-800 bg-neutral-900" : "border-neutral-200 bg-white"}`}
                      >
                        <Image
                          src={selectedProject.workflows[currentSlide].image}
                          alt={selectedProject.workflows[currentSlide].title}
                          fill
                          className="object-contain"
                        />
                      </div>

                      {/* Controls */}
                      {selectedProject.workflows.length > 1 && (
                        <>
                          <button
                            onClick={prevSlide}
                            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80 cursor-pointer"
                          >
                            <ChevronLeft size={20} />
                          </button>
                          <button
                            onClick={nextSlide}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80 cursor-pointer"
                          >
                            <ChevronRight size={20} />
                          </button>
                        </>
                      )}
                    </div>

                    {/* Description Container */}
                    <div className="mt-4 flex justify-between items-start gap-4">
                      <div>
                        <h4 className="font-bold text-lg">
                          {selectedProject.workflows[currentSlide].title}
                        </h4>
                        <p
                          className={`text-sm mt-1 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}
                        >
                          {selectedProject.workflows[currentSlide].description}
                        </p>
                      </div>
                      <div className="text-xs font-mono opacity-50 shrink-0 mt-1">
                        {currentSlide + 1} / {selectedProject.workflows.length}
                      </div>
                    </div>
                  </section>
                )}

              {/* Problem & Solution */}
              {selectedProject.caseStudy?.problemAndSolution && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div
                    className={`p-5 rounded-xl border ${isDark ? "bg-neutral-900/50 border-neutral-800" : "bg-neutral-50 border-neutral-100"}`}
                  >
                    <h4 className="font-semibold mb-3">The Problem</h4>
                    <ul className="space-y-2">
                      {selectedProject.caseStudy.problemAndSolution.problem.map(
                        (item, i) => (
                          <li
                            key={i}
                            className={`text-sm list-disc ml-4 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}
                          >
                            {item}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                  <div
                    className={`p-5 rounded-xl border ${isDark ? "bg-neutral-900/50 border-neutral-800" : "bg-neutral-50 border-neutral-100"}`}
                  >
                    <h4 className="font-semibold mb-3">The Solution</h4>
                    <ul className="space-y-2">
                      {selectedProject.caseStudy.problemAndSolution.solution.map(
                        (item, i) => (
                          <li
                            key={i}
                            className={`text-sm list-disc ml-4 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}
                          >
                            {item}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </div>
              )}

              {/* Key Features */}
              <section>
                <h3 className="text-xl font-bold mb-4">Key Features</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {selectedProject.caseStudy?.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg border transition-colors ${isDark ? "bg-neutral-800/50 border-neutral-800 text-neutral-300" : "bg-neutral-50 border-neutral-100 text-neutral-600"}`}
                    >
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Tech Stack */}
              <section>
                <h3 className="text-xl font-bold mb-4">Technology Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.caseStudy?.technologyStack?.map(
                    (tech, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1.5 rounded text-sm font-mono border ${isDark ? "border-neutral-700 bg-neutral-800 text-neutral-300" : "border-neutral-200 bg-neutral-100 text-neutral-700"}`}
                      >
                        {tech}
                      </span>
                    ),
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
