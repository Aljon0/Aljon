"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ArrowLeft, X, ExternalLink, Layers } from "lucide-react";
import { useTheme } from "@/components/theme-context";

// --- 1. DEFINE TYPES (Fixes "Unexpected any") ---
interface ProblemSolution {
  problem: string[];
  solution: string[];
}

interface CaseStudy {
  title: string;
  overview: string;
  features: string[];
  technologyStack: string[];
  problemAndSolution?: ProblemSolution; // Optional, as not all projects have this
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
  caseStudy?: CaseStudy; // Optional
}

// --- DATA: Typed correctly now ---
const featuredProjects: Project[] = [
  {
    id: 1,
    title: "AI-Health Companion",
    description:
      "A smart healthcare assistant web app that uses Mistral AI and public medical APIs to help users check symptoms, track mental health, and access timely health advice.",
    image: "/projects/AI-HealthCare.webp",
    category: "Web App",
    technologies: ["React", "Tailwind", "Firebase", "Express", "Mistral AI"],
    link: "https://projectbaymax.onrender.com/",
    featured: true,
    caseStudy: {
      title: "BAYMAX – Your AI-Powered Health Companion",
      overview:
        "BAYMAX is an AI-driven health assistant web application that empowers users to monitor their well-being through symptom checks, mood tracking, journaling, and wellness tips. By integrating Mistral AI with trusted public medical data sources like the National Library of Medicine (NLM), the system provides informed and contextual health responses in real time.",
      features: [
        "AI-powered Symptom Checker using Mistral AI and MedlinePlus/NLM APIs",
        "Daily emotional and health check-ins with mood sliders and logs",
        "Private journaling feature with CBT-inspired prompts",
        "Personalized health tips and push notification reminders",
        "Emergency assistant with quick access to stored critical health info",
      ],
      technologyStack: [
        "Frontend: React.js + Tailwind CSS",
        "Backend: Express.js (Node.js)",
        "AI Integration: Mistral AI + NLM / MedlinePlus APIs",
        "Database: Firebase Firestore",
        "Authentication: Firebase Authentication",
      ],
    },
  },
  {
    id: 2,
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
  {
    id: 3,
    title: "ED3C: Eternal Design",
    description:
      "Interactive 3D customization web application for memorial design and gravestone creation.",
    image: "/projects/ed3c.webp",
    category: "Web App",
    technologies: ["React", "Tailwind", "Three.js", "Firebase"],
    link: "https://drive.google.com/drive/folders/1BVgAIsoATl8xZdG7Pe6fILOXIYuKNqvs?usp=sharing",
    featured: true,
    year: "2024",
    caseStudy: {
      title: "ED3C: Eternal Design 3D Customization",
      overview:
        "ED3C is an innovative web application designed to transform the memorial design process for Double Seven Lapida Maker Incorporation. By providing an intuitive, real-time 3D customization platform, it addresses key challenges in memorial design.",
      problemAndSolution: {
        problem: [
          "Customers demand to see design previews immediately, leading to time-consuming revisions and bottlenecks.",
          "The business struggles with managing multiple orders and frequently gets confused with customer requests.",
          "There have been cases where customers pay partially, never complete the payment, and fail to claim their orders—causing losses.",
        ],
        solution: [
          "ED3C introduces a real-time 3D visualization feature, allowing customers to design and preview gravestones, urns, and table signs themselves, minimizing revision requests.",
          "A dedicated order tracking system and messaging module lets customers check the status of their orders and communicate directly with the business.",
          "Separate forms per customer were implemented to organize order details and reduce confusion.",
          "The system also includes digital receipts for both partial and full payments—preventing unpaid or abandoned orders from being fulfilled until full payment is received.",
        ],
      },
      features: [
        "Interactive 3D design tool",
        "Real-time customization of gravestones, table signs, urns, and bases",
        "User-friendly design management system",
        "Comprehensive order tracking",
        "Real-time messaging between customer and business",
        "Partial and full payment tracking with receipt generation",
        "Admin Dashboard for monthly sales and most buyed products",
        "Template Designs for gravestones, urns, and table signs",
      ],
      technologyStack: [
        "Frontend: React.js",
        "3D Rendering: Three.js",
        "Backend & Database: Firebase",
      ],
    },
  },
  {
    id: 4,
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
];

const smallProjects: Project[] = [
  {
    id: 5,
    title: "Expense Tracker",
    description:
      "A streamlined expense tracking application built with React and Appwrite to help users manage their personal finances effectively.",
    image: "/projects/expensetracker.webp",
    category: "Web App",
    technologies: ["React", "Tailwind", "Appwrite"],
    link: "https://expensetracker-hrws.onrender.com",
    featured: false,
    caseStudy: {
      title: "Expense Tracker",
      overview:
        "ExpenseTracker is a simple yet powerful web application that allows users to track and manage their expenses. With intuitive user interface and seamless integration with Appwrite backend services, users can easily categorize expenses, perform CRUD operations, and gain insights into their spending habits.",
      features: [
        "User Authentication: Secure login and registration system powered by Appwrite Auth",
        "Expense Management: Create, read, update, and delete expense records",
        "Categorization: Organize expenses into categories (food, travel, bills, etc.)",
        "Responsive Design: Works seamlessly across desktop and mobile devices",
        "Real-time Updates: Changes reflect immediately with Appwrite's real-time capabilities",
      ],
      technologyStack: ["Frontend: React.js", "Backend/Database: Appwrite"],
    },
  },
  {
    id: 6,
    title: "Chat Sphere",
    description:
      "ChatSphere is a sleek, responsive chat app built with React, Vite, and Tailwind CSS, showcasing real-time messaging powered by Firebase.",
    image: "/projects/chatsphere.webp",
    category: "Web App",
    technologies: ["React", "Tailwind", "Firebase"],
    link: "https://chat-web-app-1c91d.web.app/",
    featured: false,
    caseStudy: {
      title: "Chat Sphere",
      overview:
        "ChatSphere is a modern, responsive real-time chat application built with React, Vite, and Tailwind CSS. This project demonstrates how to create an elegant messaging interface with a focus on user experience and design.",
      features: [
        "User Authentication: Email/Password login and registration, google authentication integration",
        "Real-time Messaging: instant message delivery, message status indicators (sent, delivered, seen), Timestamp display",
        "Contacts & Conversations: Contact list with search functionality, Online status indicators, Unread message counters, Online only filtering",
        "Rich User Interface: Dark/light mode toggle, Responsive design for all device sizes, Emoji picker",
      ],
      technologyStack: ["Frontend: React.js", "Backend/Database: Firebase"],
    },
  },
  {
    id: 7,
    title: "Task Master",
    description:
      "A responsive and efficient task management app built with React, TailwindCSS, and Supabase. It allows users to manage tasks with features like creation, filtering, and real-time updates via a RESTful API.",
    image: "/projects/taskmanager.webp",
    category: "Web App",
    technologies: ["React", "Tailwind", "Supabase"],
    link: "https://task-manager-app-cwgb.onrender.com",
    featured: false,
    caseStudy: {
      title: "Task Master",
      overview:
        "The Task Manager App is a modern productivity tool designed to help users manage daily tasks with ease. With an intuitive interface and mobile-first responsive design, the app supports creating, updating, filtering, and deleting tasks. Built using a Supabase and React, it focuses on speed, simplicity, and functionality.",
      features: [
        "Task Dashboard: Overview of tasks with categorized and prioritized lists.",
        "CRUD Functionality: Create, read, update, and delete tasks with detailed attributes (title, description, due date, priority, category, and status).",
        "Task Filtering: Easily filter tasks by category to stay focused.",
        "Responsive Design: Fully optimized for both desktop and mobile screens.",
      ],
      technologyStack: ["Frontend: React + Vite, TailwindCSS", "Backend: Supabase"],
    },
  },
  {
    id: 8,
    title: "Movie Recommendation Chatbot",
    description:
      "An AI-powered movie recommendation chatbot built with React that lets users chat and receive personalized movie suggestions in real-time, no account required.",
    image: "/projects/ai-mr.webp",
    category: "Web App",
    technologies: ["React", "Tailwind", "Express"],
    link: "https://ai-movie.onrender.com",
    featured: false,
    caseStudy: {
      title: "AI-Powered Movie Recommendation Chatbot",
      overview:
        "This chatbot web app provides users with personalized movie recommendations through an AI-driven conversational interface. By leveraging Hugging Face's natural language processing capabilities and real-time movie data from TMDB, the chatbot delivers intelligent and engaging suggestions. Users can interact freely without needing an account, and favorites are saved locally for convenience.",
      features: [
        "Conversational UI: Chat-based interface for a natural and engaging user experience",
        "AI-Driven Suggestions: Uses Hugging Face API to understand context and deliver tailored movie recommendations",
        "Rich Movie Data: Pulls movie details including titles, posters, and summaries from TMDB",
        "Local Favorites: Users can save favorite movies to local storage with no login required",
        "Responsive Design: Fully responsive layout optimized for both desktop and mobile users",
      ],
      technologyStack: [
        "Frontend: React.js with Tailwind CSS",
        "AI Integration: Hugging Face Inference API",
        "Movie Data: TMDB (The Movie Database) API",
        "Storage: Browser Local Storage",
        "Backend: Express.js (Node.js)",
      ],
    },
  },
  {
    id: 9,
    title: "QR Code Generator",
    description:
      "A minimalist QR code generator web app built with React and TypeScript, enabling users to create, preview, and download custom QR codes effortlessly.",
    image: "/projects/QR_CODE_GENERATOR.png",
    category: "Web App",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    link: "https://qr-generator-5cw3.onrender.com",
    featured: false,
    caseStudy: {
      title: "QR Code Generator",
      overview:
        "This QR Code Generator is a clean and responsive web tool designed for fast QR code creation. Built with React and TypeScript, it allows users to input any text or URL, generate a live preview, and download the QR code instantly. The minimalist UI ensures a smooth and focused user experience without distractions.",
      features: [
        "Text/URL Input: Easily enter any content to encode into a QR code.",
        "Live Preview: Real-time display of the generated QR code.",
        "Download QR Code: One-click download of the QR code as a PNG image.",
        "Copy to Clipboard: Quickly copy the input text or URL.",
        "Responsive Minimalist Design: Clean layout optimized for desktop and mobile.",
      ],
      technologyStack: [
        "Frontend: React.js with TypeScript",
        "Styling: Tailwind CSS",
        "QR Code Library: react-qr-code",
      ],
    },
  },
];

const allProjects: Project[] = [...featuredProjects, ...smallProjects];

export default function ProjectsPage() {
  const { isDark } = useTheme();
  // State is now strictly typed to Project or null
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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

  return (
    <div className="min-h-screen p-8 md:p-12 relative">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-sm opacity-60 hover:opacity-100 mb-8 transition-colors">
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
                    onClick={() => setSelectedProject(project)}
                    className={`
                        group relative rounded-xl overflow-hidden cursor-pointer border transition-all duration-300 hover:scale-[1.02]
                        ${isDark 
                            ? 'bg-neutral-900 border-neutral-800 hover:border-neutral-700' 
                            : 'bg-white border-neutral-200 hover:border-neutral-300 shadow-sm hover:shadow-md'
                        }
                    `}
                >
                    <div className="relative aspect-video w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                        <Image 
                            src={project.image} 
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>

                    <div className="p-5">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-lg">{project.title}</h3>
                        </div>
                        <p className={`text-sm mb-4 line-clamp-3 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                            {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-auto">
                            {project.technologies.slice(0, 3).map(tech => (
                                <span 
                                    key={tech} 
                                    className={`
                                        text-[10px] px-2 py-1 rounded font-medium border
                                        ${isDark 
                                            ? 'bg-neutral-800 border-neutral-700 text-neutral-300' 
                                            : 'bg-neutral-100 border-neutral-200 text-neutral-600'
                                        }
                                    `}
                                >
                                    {tech}
                                </span>
                            ))}
                            {project.technologies.length > 3 && (
                                <span className="text-[10px] px-2 py-1 opacity-50">+{project.technologies.length - 3} more</span>
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
                    ${isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}
                    /* CUSTOM SCROLLBAR STYLING */
                    [&::-webkit-scrollbar]:w-2
                    [&::-webkit-scrollbar-track]:bg-transparent
                    ${isDark ? '[&::-webkit-scrollbar-thumb]:bg-neutral-800' : '[&::-webkit-scrollbar-thumb]:bg-neutral-200'}
                    [&::-webkit-scrollbar-thumb]:rounded-full
                `}
            >
                <button 
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
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
                    <div className="absolute bottom-6 left-6 text-white">
                        <h2 className="text-3xl font-bold mb-2">{selectedProject.title}</h2>
                        <div className="flex gap-2">
                            {selectedProject.technologies.map(tech => (
                                <span key={tech} className="px-2 py-1 bg-white/20 backdrop-blur-md rounded text-xs font-medium">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="p-6 md:p-8 space-y-8">
                    
                    {/* Live Link Button */}
                    <div className="flex gap-4">
                        <a 
                            href={selectedProject.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${isDark ? 'bg-white text-black hover:bg-neutral-200' : 'bg-black text-white hover:bg-neutral-800'}`}
                        >
                            <ExternalLink size={16} /> View Live Project
                        </a>
                    </div>

                    {/* Overview */}
                    <section>
                        <h3 className={`text-xl font-bold mb-3 flex items-center gap-2 ${isDark ? "text-white" : "text-black"}`}>
                            <Layers size={20} className={isDark ? "text-neutral-400" : "text-neutral-600"} /> 
                            Overview
                        </h3>
                        <p className={`leading-relaxed ${isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>
                            {selectedProject.caseStudy?.overview || selectedProject.description}
                        </p>
                    </section>

                    {/* Problem & Solution (Typed Check) */}
                    {selectedProject.caseStudy?.problemAndSolution && (
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className={`p-5 rounded-xl border ${isDark ? 'bg-neutral-900/50 border-neutral-800' : 'bg-neutral-50 border-neutral-100'}`}>
                                <h4 className="font-semibold mb-3">The Problem</h4>
                                <ul className="space-y-2">
                                    {selectedProject.caseStudy.problemAndSolution.problem.map((item, i) => (
                                        <li key={i} className={`text-sm list-disc ml-4 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className={`p-5 rounded-xl border ${isDark ? 'bg-neutral-900/50 border-neutral-800' : 'bg-neutral-50 border-neutral-100'}`}>
                                <h4 className="font-semibold mb-3">The Solution</h4>
                                <ul className="space-y-2">
                                    {selectedProject.caseStudy.problemAndSolution.solution.map((item, i) => (
                                        <li key={i} className={`text-sm list-disc ml-4 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>{item}</li>
                                    ))}
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
                                    className={`
                                        p-3 rounded-lg border transition-colors
                                        ${isDark 
                                            ? 'bg-neutral-800/50 border-neutral-800 text-neutral-300' 
                                            : 'bg-neutral-50 border-neutral-100 text-neutral-600'
                                        }
                                    `}
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
                            {selectedProject.caseStudy?.technologyStack?.map((tech, idx) => (
                                <span 
                                    key={idx} 
                                    className={`px-3 py-1.5 rounded text-sm font-mono border ${isDark ? 'border-neutral-700 bg-neutral-800 text-neutral-300' : 'border-neutral-200 bg-neutral-100 text-neutral-700'}`}
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </section>

                </div>
            </div>
        </div>
      )}
    </div>
  );
}