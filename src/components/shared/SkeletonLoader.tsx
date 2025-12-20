import { cn } from "@/lib/utils";

interface SkeletonLoaderProps {
  className?: string;
  variant?: "card" | "text" | "avatar" | "chart";
}

export function SkeletonLoader({ className, variant = "card" }: SkeletonLoaderProps) {
  if (variant === "avatar") {
    return (
      <div className={cn("h-10 w-10 rounded-full bg-muted animate-pulse", className)} />
    );
  }

  if (variant === "text") {
    return (
      <div className={cn("h-4 w-full rounded bg-muted animate-pulse", className)} />
    );
  }

  if (variant === "chart") {
    return (
      <div className={cn("rounded-2xl bg-muted animate-pulse", className)}>
        <div className="p-6 space-y-4">
          <div className="h-4 w-1/3 rounded bg-muted-foreground/20" />
          <div className="h-48 rounded-lg bg-muted-foreground/10" />
        </div>
      </div>
    );
  }

  return (
    <div className={cn("rounded-2xl bg-muted animate-pulse p-6", className)}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-4 w-24 rounded bg-muted-foreground/20" />
          <div className="h-10 w-10 rounded-xl bg-muted-foreground/20" />
        </div>
        <div className="h-8 w-20 rounded bg-muted-foreground/20" />
        <div className="h-3 w-32 rounded bg-muted-foreground/20" />
      </div>
    </div>
  );
}
