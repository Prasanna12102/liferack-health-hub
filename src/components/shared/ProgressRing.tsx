import { cn } from "@/lib/utils";

interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  label?: string;
  sublabel?: string;
  variant?: "primary" | "accent" | "success" | "warning";
}

export function ProgressRing({
  progress,
  size = 120,
  strokeWidth = 8,
  className,
  label,
  sublabel,
  variant = "primary",
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  const colorVariants = {
    primary: "stroke-primary",
    accent: "stroke-accent",
    success: "stroke-green-500",
    warning: "stroke-amber-500",
  };

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-secondary"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={cn(
            "transition-all duration-1000 ease-out",
            colorVariants[variant]
          )}
          style={{
            filter: "drop-shadow(0 0 6px currentColor)",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {label && <span className="text-2xl font-bold">{label}</span>}
        {sublabel && (
          <span className="text-sm text-muted-foreground">{sublabel}</span>
        )}
      </div>
    </div>
  );
}
