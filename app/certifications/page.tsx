"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ArrowLeft, Award, X, Calendar } from "lucide-react";
import { useTheme } from "@/components/theme-context";

// --- TYPE DEFINITIONS ---
interface Certificate {
  id: number;
  title: string;
  issuer: string;
  year: string;
  image: string;
  tags: string[];
  credentialLink?: string; // Optional URL to verify
}

// --- DATA ---
const certifications: Certificate[] = [
  {
    id: 1,
    title: "Intro to Mistral AI",
    issuer: "Scrimba",
    year: "2025",
    image: "/certificates/MIstralAI_Certificate.png",
    tags: ["AI", "LLM", "Prompt Engineering"],
    // You can add a link if Scrimba provides a verify URL
    // credentialLink: "https://scrimba.com/..." 
  },
  // You can add more certificates here later following the same format
];

export default function CertificationsPage() {
  const { isDark } = useTheme();
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedCert]);

  return (
    <div className="min-h-screen p-8 md:p-12 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Navigation */}
        <Link href="/" className="inline-flex items-center gap-2 text-sm opacity-60 hover:opacity-100 mb-8 transition-colors">
            <ArrowLeft size={16} /> Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold mb-4">Certifications</h1>
        <p className="opacity-60 mb-10 text-lg max-w-2xl">
            Continuous learning and validation of skills across AI, Cloud, and Software Engineering.
        </p>
        
        {/* CERTIFICATES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert) => (
                <div 
                    key={cert.id}
                    onClick={() => setSelectedCert(cert)}
                    className={`
                        group relative p-6 rounded-xl border cursor-pointer transition-all duration-300 hover:scale-[1.02] flex flex-col h-full
                        ${isDark 
                            ? 'bg-neutral-900 border-neutral-800 hover:border-neutral-700' 
                            : 'bg-white border-neutral-200 hover:border-neutral-300 shadow-sm hover:shadow-md'
                        }
                    `}
                >
                    {/* Card Header: Icon + Year */}
                    <div className="flex justify-between items-start mb-4">
                        <div className={`p-2 rounded-lg ${isDark ? 'bg-neutral-800 text-neutral-200' : 'bg-neutral-100 text-neutral-700'}`}>
                            <Award size={20} />
                        </div>
                        <span className="text-xs font-mono opacity-50 flex items-center gap-1">
                            <Calendar size={12} /> {cert.year}
                        </span>
                    </div>

                    {/* Card Content */}
                    <div className="mb-4">
                        <h3 className="font-bold text-lg leading-tight mb-1">{cert.title}</h3>
                        <p className={`text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                            {cert.issuer}
                        </p>
                    </div>

                    {/* Certificate Thumbnail Preview */}
                    <div className={`
                        relative w-full aspect-4/3 rounded-lg overflow-hidden mb-4 border
                        ${isDark ? 'border-neutral-800 bg-neutral-800' : 'border-neutral-100 bg-neutral-50'}
                    `}>
                        <Image 
                            src={cert.image} 
                            alt={cert.title}
                            fill
                            className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-100"
                        />
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-auto">
                        {cert.tags.map(tag => (
                            <span 
                                key={tag} 
                                className={`
                                    text-[10px] px-2 py-1 rounded font-medium border
                                    ${isDark 
                                        ? 'bg-neutral-800 border-neutral-700 text-neutral-300' 
                                        : 'bg-neutral-100 border-neutral-200 text-neutral-600'
                                    }
                                `}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* --- FULL VIEW MODAL --- */}
      {selectedCert && (
        <div className="fixed inset-0 z-100 flex justify-center items-center p-4 sm:p-6">
            <div 
                className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
                onClick={() => setSelectedCert(null)}
            />

            <div 
                className={`
                    relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl flex flex-col
                    ${isDark ? 'bg-neutral-900' : 'bg-white'}
                `}
            >
                {/* Close Button */}
                <button 
                    onClick={() => setSelectedCert(null)}
                    className="absolute top-4 right-4 z-50 p-2 rounded-full cursor-pointer bg-black/50 text-white hover:bg-black/70 transition-colors"
                >
                    <X size={20} />
                </button>

                {/* Main Image Container (Scrollable if image is very long) */}
                <div className="flex-1 overflow-auto bg-neutral-950 flex items-center justify-center p-4">
                    <div className="relative w-full h-full min-h-[50vh] max-h-[80vh]">
                         <Image 
                            src={selectedCert.image} 
                            alt={selectedCert.title}
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>

                {/* Modal Footer / Details */}
                <div className={`p-6 border-t ${isDark ? 'border-neutral-800 bg-neutral-900' : 'border-neutral-200 bg-white'}`}>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h2 className="text-2xl font-bold">{selectedCert.title}</h2>
                            <p className={`text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                                Issued by <span className="font-medium">{selectedCert.issuer}</span> • {selectedCert.year}
                            </p>
                        </div>

                        
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}