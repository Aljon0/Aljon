import { Card } from "@/components/ui/card";

const roles = [
  {
    company: "Standard Chartered",
    role: "Principal AI Engineer",
    year: "2025",
  },
  {
    company: "Centre of Excellence for GenAI",
    role: "AI Ops Engineer",
    year: "2025",
  },
  {
    company: "Your Freelance Client",
    role: "Video Prompt Engineer",
    year: "2026",
    // Added specific personalized context
  }
];

export function Experience() {
  return (
    <Card title="Experience" className="h-full" isDark={false}>
      <div className="relative border-l border-neutral-200 dark:border-neutral-800 ml-2 space-y-8 pb-2">
        {roles.map((job, index) => (
          <div key={index} className="ml-6 relative">
            <span className="absolute -left-7.75 top-1 h-3 w-3 rounded-full bg-neutral-300 dark:bg-neutral-600 border-2 border-background" />
            <h4 className="font-semibold text-sm">{job.role}</h4>
            <p className="text-xs text-neutral-500">{job.company}</p>
            <span className="text-[10px] font-mono text-neutral-400 mt-1 block">{job.year}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}