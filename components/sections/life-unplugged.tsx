import { Card } from "@/components/ui/card";

export function LifeUnplugged() {
  return (
    <Card title="Life Unplugged" className="bg-neutral-50 dark:bg-neutral-900/50" isDark={false}>
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          When I&apos;m not deploying code, I focus on aesthetics and clarity in the real world.
        </p>
        <div className="grid grid-cols-2 gap-3">
             <div className="p-3 bg-background rounded-md shadow-sm">
                <p className="font-medium text-xs mb-1">Photography</p>
                <p className="text-[10px] text-neutral-500">Cinematic & Moody</p>
             </div>
             <div className="p-3 bg-background rounded-md shadow-sm">
                <p className="font-medium text-xs mb-1">Style</p>
                <p className="text-[10px] text-neutral-500">Streetwear & Grooming</p>
             </div>
        </div>
      </div>
    </Card>
  );
}