"use client";

import Link from "next/link";
import { useTheme } from "@/components/theme-context";
import { Card } from "@/components/ui/card";
import {
  ArrowUpRight,
  Award,
  BookOpen,
  Briefcase,
  Cpu,
  Download,
  Github,
  Layers,
  Linkedin,
  Mail,
  MapPin,
  MessageSquareQuote,
  Moon,
  Sun,
  User
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const { isDark, toggleTheme } = useTheme();
  
  // --- CAROUSEL STATE ---
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // --- TESTIMONIAL DATA ---
  const testimonials = [
    {
      id: 1,
      name: "Ethel Magsaysay",
      role: "Double Seven Lapida",
      email: "double7lapidamaker@gmail.com",
      quote: "Aljon is diligent and hardworking. Another good thing about him is that he knows how to listen. Whenever I have requests for revisions, he listens carefully and makes sure to meet expectations.",
      image: "/testimonials/DoubleSeven.png",
      hasImage: true
    },
    {
      id: 2,
      name: "Rodante R. Reyes",
      role: "IT Manager, Seiwa Kaiun",
      email: "dan.reyes@seiwakaiun.com.ph",
      quote: "Aljon has constantly shown that he is a reliable employee by showing up for work each day prepared and with a positive attitude.",
      image: "/testimonials/Reyes.jpg",
      hasImage: true
    },
    {
      id: 3,
      name: "Glaiza Lei San Jose",
      role: "CVSU - CCAT Campus",
      email: "glaizaleis@gmail.com",
      quote: "Aljon is a trusted and proficient backend developer who regularly produces clear, effective code and finds solutions to issues. He is a valuable member of the team because of his cooperative demeanor.",
      image: null,
      hasImage: false,
      initials: "GS"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div className="p-4 md:p-8 lg:p-12 font-sans min-h-screen flex flex-col">
      
      {/* GLOBAL THEME TOGGLE */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={toggleTheme}
          className={`p-3 rounded-full cursor-pointer shadow-lg border transition-transform hover:scale-105 active:scale-95
            ${isDark ? 'bg-neutral-800 text-white border-neutral-700' : 'bg-white text-neutral-900 border-neutral-200'}
          `}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-6 grow">
        
        {/* =========================================
            SECTION 1: PROFILE HERO 
           ========================================= */}
        <Card isDark={isDark} className="col-span-1 lg:col-span-3">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start justify-center md:justify-start">
            
            <div className={`relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-4 shrink-0 ${isDark ? 'border-neutral-800' : 'border-neutral-100'}`}>
              <Image 
                src="/profile.jpg" 
                alt="Al-jon Santiago"
                fill
                className="object-cover" 
                priority 
              />
            </div>
            
            <div className="flex-1 text-center md:text-left space-y-4 pt-2">
              <div>
                <h1 className="text-4xl font-bold mb-2">Al-jon Santiago</h1>
                <p className={`flex items-center justify-center md:justify-start gap-2 text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                  <MapPin size={16} /> General Trias Cavite, Philippines
                </p>
              </div>

              <h2 className={`text-xl font-medium ${isDark ? 'text-neutral-200' : 'text-neutral-800'}`}>
                AI Engineer <span className="mx-2 opacity-30 font-light">/</span> Full Stack Web Developer
              </h2>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                <a 
                  href="mailto:aljons702@gmail.com"
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-opacity hover:opacity-90 ${isDark ? 'bg-white text-black' : 'bg-neutral-900 text-white'}`}
                >
                  <Mail size={18} /> Email
                </a>
                
                <a 
                  href="/cv.pdf" 
                  download="Al-jon_Santiago_CV"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium border transition-colors ${isDark ? 'border-neutral-700 hover:bg-neutral-800 text-white' : 'border-neutral-200 hover:bg-neutral-100 text-neutral-900'}`}
                >
                  <Download size={18} /> CV
                </a>

                <div className={`hidden md:block h-8 w-px mx-1 ${isDark ? 'bg-neutral-800' : 'bg-neutral-200'}`}></div>

                <a href="https://github.com/Aljon0" target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg transition-colors border ${isDark ? 'border-neutral-800 hover:bg-neutral-800 text-neutral-400 hover:text-white' : 'border-neutral-200 hover:bg-neutral-100 text-neutral-500 hover:text-black'}`}>
                  <Github size={18} />
                  <span className="font-medium">GitHub</span>
                </a>
                <a href="https://www.linkedin.com/in/santiago-al-jon-b-31a478281/" target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg transition-colors border ${isDark ? 'border-neutral-800 hover:bg-neutral-800 text-neutral-400 hover:text-white' : 'border-neutral-200 hover:bg-neutral-100 text-neutral-500 hover:text-black'}`}>
                  <Linkedin size={18} />
                  <span className="font-medium">LinkedIn</span>
                </a>
              </div>

            </div>
          </div>
        </Card>


        {/* =========================================
            SECTION 2: LEFT COLUMN
           ========================================= */}
        <div className="col-span-1 lg:col-span-2 space-y-6">
          
          {/* A. ABOUT */}
          <Card isDark={isDark}>
            <div className="flex items-center gap-3 mb-4">
              <User size={20} className={isDark ? "text-neutral-400" : "text-neutral-500"} />
              <h3 className="font-semibold text-lg">About</h3>
            </div>
            <div className={`space-y-4 leading-relaxed ${isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>
              <p>
                I&apos;m a Full-Stack Developer with a strong focus on building AI-powered applications. I work with React, Next.js, 
                TypeScript, and Node.js to create modern web interfaces, and I integrate AI systems using large language 
                models, APIs, and backend workflows.
              </p>
              <p>
                My recent work focuses on AI-driven products such as intelligent assistants, automation tools, and data-aware 
                applications. I have experience working with OpenAI and Claude, implementing prompt-driven workflows, and using databases 
                like Supabase and Firebase.
              </p>
              <p>
                I&apos;m especially interested in applied AI — turning models into usable products. I value clean architecture, reliable systems, 
                and building AI features that genuinely improve user workflows.
              </p>
            </div>
          </Card>

          {/* B. TECH STACK */}
          <Link href="/tech-stack" className="block group">
            <Card isDark={isDark} className="hover:border-blue-500/50 transition-colors">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Cpu size={20} className={isDark ? "text-neutral-400" : "text-neutral-500"} />
                  <h3 className="font-semibold text-lg">Tech Stack</h3>
                </div>
                <ArrowUpRight size={18} className={`transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 ${isDark ? "text-neutral-400" : "text-neutral-500"}`} />
              </div>
              <div className="flex flex-wrap gap-2">
                {['JavaScript', 'TypeScript', 'Next.js', 'React', 'Node.js', 'Python', 'OpenAI', 'Supabase'].map(tech => (
                  <span key={tech} className={`px-3 py-1.5 rounded-md text-xs font-medium border ${isDark ? 'bg-neutral-800 border-neutral-700 text-neutral-300' : 'bg-neutral-100 border-neutral-200 text-neutral-700'}`}>
                    {tech}
                  </span>
                ))}
                <span className={`px-3 py-1.5 text-xs opacity-50 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>+ many more</span>
              </div>
            </Card>
          </Link>

          {/* C. RECENT PROJECTS (Updated) */}
          <Link href="/projects" className="block group">
            <Card isDark={isDark} className="hover:border-blue-500/50 transition-colors">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Layers size={20} className={isDark ? "text-neutral-400" : "text-neutral-500"} />
                  <h3 className="font-semibold text-lg">Recent Projects</h3>
                </div>
                <ArrowUpRight size={18} className={`transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 ${isDark ? "text-neutral-400" : "text-neutral-500"}`} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Project 1: AI-Health Companion */}
                <div className={`flex flex-col overflow-hidden rounded-xl border ${isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-50 border-neutral-100'}`}>
                  <div className="relative h-32 w-full bg-neutral-200 dark:bg-neutral-800">
                    <Image 
                      src="/projects/AI-HealthCare.webp" 
                      alt="AI-Health Companion" 
                      fill 
                      className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-center">
                    <h3 className={`font-medium text-sm mb-1 ${isDark ? 'text-white' : 'text-black'}`}>AI-Health Companion</h3>
                    <p className={`text-xs line-clamp-2 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                      A smart healthcare assistant web app that uses Mistral AI and public medical APIs to help users check symptoms.
                    </p>
                  </div>
                </div>

                {/* Project 2: AI-Resume Builder */}
                <div className={`flex flex-col overflow-hidden rounded-xl border ${isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-50 border-neutral-100'}`}>
                  <div className="relative h-32 w-full bg-neutral-200 dark:bg-neutral-800">
                    <Image 
                      src="/projects/AI-Resume Builder.webp" 
                      alt="AI-Resume Builder" 
                      fill 
                      className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-center">
                    <h3 className={`font-medium text-sm mb-1 ${isDark ? 'text-white' : 'text-black'}`}>AI-Resume Builder</h3>
                    <p className={`text-xs line-clamp-2 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                      An intelligent resume builder that uses Mistral AI for skill suggestions, customizable templates, and PDF export.
                    </p>
                  </div>
                </div>

              </div>
            </Card>
          </Link>
        </div>


        {/* =========================================
            SECTION 3: RIGHT COLUMN
           ========================================= */}
        <div className="col-span-1 space-y-6">
          
          {/* A. EXPERIENCE */}
          <Card isDark={isDark} className="h-fit">
            <div className="flex items-center gap-3 mb-6">
              <Briefcase size={20} className={isDark ? "text-neutral-400" : "text-neutral-500"} />
              <h3 className="font-semibold text-lg">Experience</h3>
            </div>

            <div className={`relative border-l ml-2 space-y-10 pb-2 ${isDark ? 'border-neutral-800' : 'border-neutral-200'}`}>
              {[
                { 
                  role: "Freelance Full Stack Developer", 
                  company: "Remote", 
                  year: "Jul - Sep 2025" 
                },
                { 
                  role: "Backend Developer Intern", 
                  company: "Seiwa Kaiun Phils.", 
                  year: "Feb - May 2025" 
                }
              ].map((job, i) => (
                <div key={i} className="ml-8 relative">
                  <span className={`absolute -left-9.25 top-1.5 h-3 w-3 rounded-full border-4 ${isDark ? 'bg-neutral-800 border-neutral-900' : 'bg-neutral-400 border-white'}`} />
                  <h4 className="font-semibold text-sm">{job.role}</h4>
                  <p className="text-xs opacity-60 mb-1">{job.company}</p>
                  <div className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono ${isDark ? 'bg-neutral-800 text-neutral-400' : 'bg-neutral-100 text-neutral-500'}`}>
                    {job.year}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* B. CERTIFICATIONS */}
          <Link href="/certifications" className="block group">
            <Card isDark={isDark} className="hover:border-blue-500/50 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Award size={20} className={isDark ? "text-neutral-400" : "text-neutral-500"} />
                  <h3 className="font-semibold text-lg">Certifications</h3>
                </div>
                <ArrowUpRight size={18} className={`transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 ${isDark ? "text-neutral-400" : "text-neutral-500"}`} />
              </div>

              <div className="flex items-center gap-4 p-3 rounded-lg border transition-colors">
                <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0">G</div>
                <div>
                  <p className="font-semibold text-sm">Google AI</p>
                  <p className="text-xs opacity-60">GenAI Leader</p>
                </div>
              </div>
            </Card>
          </Link>

          {/* C. LIFE UNPLUGGED */}
          <Card isDark={isDark}>
            <div className="flex items-center gap-3 mb-4">
              {/* Replaced Camera with BookOpen */}
              <BookOpen size={20} className={isDark ? "text-neutral-400" : "text-neutral-500"} />
              <h3 className="font-semibold text-lg">Life Unplugged</h3>
            </div>
            
            <p className={`text-xs mb-4 leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              When I&apos;m not on the clock, I&apos;m deep diving into documentation or testing bleeding-edge tools to optimize my workflow.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <div className={`p-3 rounded-lg border ${isDark ? 'bg-neutral-800/30 border-neutral-800' : 'bg-neutral-50 border-neutral-100'}`}>
                <p className="font-medium text-xs mb-1">Continuous Learning</p>
                <p className="text-[10px] opacity-60">Upskilling & Research</p>
              </div>
              <div className={`p-3 rounded-lg border ${isDark ? 'bg-neutral-800/30 border-neutral-800' : 'bg-neutral-50 border-neutral-100'}`}>
                <p className="font-medium text-xs mb-1">Tech Exploration</p>
                <p className="text-[10px] opacity-60">Testing New Tools</p>
              </div>
            </div>
          </Card>

        </div>

        {/* =========================================
            SECTION 4: CLIENT TESTIMONIALS 
            ========================================= */}
        <Card isDark={isDark} className="col-span-1 lg:col-span-3">
          <div className="flex items-center gap-3 mb-6">
            <MessageSquareQuote size={20} className={isDark ? "text-neutral-400" : "text-neutral-500"} />
            <h3 className="font-semibold text-lg">Client Testimonials</h3>
          </div>

          <div className="relative h-60 md:h-50 flex items-center justify-center">
            {testimonials.map((t, index) => (
              <div 
                key={t.id}
                className={`
                  absolute inset-0 transition-opacity duration-700 ease-in-out flex flex-col md:flex-row gap-6 items-start md:items-center
                  ${index === currentTestimonial ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}
                `}
              >
                <div className="shrink-0">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center overflow-hidden border ${isDark ? 'bg-white border-neutral-700' : 'bg-white border-neutral-200'}`}>
                    {t.hasImage ? (
                      <Image 
                        src={t.image!} 
                        width={64} 
                        height={64} 
                        alt={t.name} 
                        className="object-contain" 
                      />
                    ) : (
                      <div className="w-full h-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                        {t.initials}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex-1">
                  <p className={`text-sm md:text-base italic leading-relaxed mb-4 ${isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>
                    &quot;{t.quote}&quot;
                  </p>
                  <div>
                    <p className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-black'}`}>{t.name}</p>
                    <p className="text-xs opacity-50 mb-0.5">{t.role}</p>
                    <p className="text-[10px] opacity-40 font-mono">{t.email}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center gap-2 mt-2">
            {testimonials.map((_, idx) => (
              <div 
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentTestimonial ? (isDark ? 'w-6 bg-white' : 'w-6 bg-black') : (isDark ? 'w-1.5 bg-neutral-800' : 'w-1.5 bg-neutral-200')}`}
              />
            ))}
          </div>

        </Card>

      </div>

      {/* FOOTER */}
      <div className="max-w-7xl mx-auto w-full mt-20">
        <div 
          className={`
            border-t pt-8 text-center text-sm transition-colors
            ${isDark ? 'border-neutral-800 text-neutral-400' : 'border-neutral-200 text-neutral-500'}
          `}
        >
          © 2026 Al-jon Santiago. All rights reserved.
        </div>
      </div>

    </div>
  );
}