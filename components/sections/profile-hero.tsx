import Image from "next/image";
import { Mail, MapPin } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle"; // Assume you built a simple toggle
import { Card } from "@/components/ui/card";

export function ProfileHero() {
  return (
    <Card isDark={false} className="col-span-1 md:col-span-2 lg:col-span-3 row-span-2 flex flex-col md:flex-row gap-6 items-center md:items-start">
      <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-background shadow-lg shrink-0">
         {/* Replace with your actual image path */}
        <div className="bg-neutral-200 w-full h-full flex items-center justify-center text-neutral-500">
           Profile.jpg
        </div>
      </div>
      
      <div className="flex-1 text-center md:text-left space-y-3">
        <div className="flex justify-between items-start">
            <div>
                <h1 className="text-3xl font-bold">Your Name</h1>
                <p className="text-neutral-500 dark:text-neutral-400 flex items-center justify-center md:justify-start gap-1 mt-1">
                    <MapPin size={16} /> Location, Country
                </p>
            </div>
            <ThemeToggle />
        </div>
        
        <div className="inline-flex px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
            Full Stack Developer
        </div>

        <p className="text-muted-foreground leading-relaxed max-w-xl">
            I craft cinematic web experiences and robust backend solutions. 
            Passionate about modern minimalism and efficient code.
        </p>

        <a 
          href="mailto:youremail@example.com" 
          className="inline-flex items-center gap-2 bg-primary text-background px-5 py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity mt-2"
        >
          <Mail size={18} /> Send Email
        </a>
      </div>
    </Card>
  );
}