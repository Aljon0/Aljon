"use client";

import Link from "next/link";
import { ArrowLeft, Award } from "lucide-react";
import { useTheme } from "@/components/theme-context"; // Import Global State

// Data derived from your screenshot
const certifications = [
  { title: "Huawei Developer Expert", issuer: "Huawei", year: "2025", tags: ["Mobile", "Cloud"] },
  { title: "Generative AI Leader", issuer: "Google", year: "2025", tags: ["AI", "Leadership"] },
  { title: "Software Engineering", issuer: "TestDome", year: "2024", tags: ["Core Concept"] },
  { title: "Generative AI Professional", issuer: "Oracle", year: "2025", tags: ["AI", "Cloud"] },
  { title: "JavaScript", issuer: "TestDome", year: "2024", tags: ["Frontend"] },
  { title: "PHP", issuer: "TestDome", year: "2024", tags: ["Backend"] },
  { title: "SQL", issuer: "TestDome", year: "2024", tags: ["Database"] },
  { title: "Scrum Master", issuer: "TestDome", year: "2024", tags: ["Management"] },
];

export default function CertificationsPage() {
  const { isDark } = useTheme(); // Use global theme

  return (
    <div className="min-h-screen p-8 md:p-12 animate-in fade-in duration-500">
      <div className="max-w-5xl mx-auto">
        {/* Navigation */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm opacity-60 hover:opacity-100 mb-8 transition-colors"
        >
            <ArrowLeft size={16} /> Back to Home
        </Link>
        
        {/* Header */}
        <div className="flex flex-col gap-2 mb-10">
          <h1 className="text-4xl font-bold tracking-tight">Certifications</h1>
          <p className="opacity-60 max-w-lg">
            Continuous learning and validation of skills across Cloud, AI, and Software Engineering.
          </p>
        </div>
        
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((cert, index) => (
            <div 
              key={index} 
              className={`
                group p-6 rounded-xl border transition-colors
                ${isDark ? 'bg-neutral-900 border-neutral-800 hover:border-neutral-600' : 'bg-white border-neutral-200 hover:border-neutral-300 shadow-sm'}
              `}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg ${isDark ? 'bg-neutral-800' : 'bg-neutral-100'}`}>
                    <Award size={20} />
                </div>
                <span className="text-xs font-mono opacity-50">{cert.year}</span>
              </div>
              
              <h3 className={`font-semibold text-lg leading-tight mb-1 group-hover:text-blue-500 transition-colors`}>
                {cert.title}
              </h3>
              <p className="text-sm opacity-60 mb-4">{cert.issuer}</p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {cert.tags.map(tag => (
                   <span key={tag} className={`text-[10px] px-2 py-1 rounded ${isDark ? 'bg-neutral-800' : 'bg-neutral-100'}`}>
                     {tag}
                   </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}