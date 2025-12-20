import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number | ReactNode;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "primary" | "accent" | "success" | "warning";
  className?: string;
  delay?: number;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = "default",
  className,
  delay = 0,
}: StatCardProps) {
  const iconVariants = {
    default: "bg-secondary text-secondary-foreground",
    primary: "gradient-primary text-primary-foreground",
    accent: "gradient-accent text-accent-foreground",
    success: "gradient-success text-primary-foreground",
    warning: "gradient-warning text-primary-foreground",
  };

  return (
    <Card
      variant="glass"
      className={cn(
        "p-6 animate-slide-in-up hover:shadow-lg transition-all duration-300",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold tracking-tight">{value}</p>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
          {trend && (
            <div
              className={cn(
                "inline-flex items-center gap-1 text-sm font-medium",
                trend.isPositive ? "text-green-600" : "text-red-500"
              )}
            >
              <span>{trend.isPositive ? "↑" : "↓"}</span>
              <span>{Math.abs(trend.value)}%</span>
              <span className="text-muted-foreground">vs last week</span>
            </div>
          )}
        </div>
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl",
            iconVariants[variant]
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </Card>
  );
}
