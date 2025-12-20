import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Utensils,
  Activity,
  Stethoscope,
  Users,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/" },
  { title: "Medical Reports", icon: FileText, path: "/medical-reports" },
  { title: "Food Recognition", icon: Utensils, path: "/food-recognition" },
  { title: "Habit Tracker", icon: Activity, path: "/habit-tracker" },
  { title: "Disease Recognition", icon: Stethoscope, path: "/disease-recognition" },
  { title: "Patient Management", icon: Users, path: "/patient-management" },
];

interface AppSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function AppSidebar({ collapsed, onToggle }: AppSidebarProps) {
  const location = useLocation();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen transition-all duration-300 ease-in-out",
        "bg-sidebar border-r border-sidebar-border",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="text-xl font-bold text-gradient animate-fade-in">
              Liferack AI
            </span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                "hover:bg-sidebar-accent group relative overflow-hidden",
                isActive
                  ? "bg-primary text-primary-foreground shadow-glow"
                  : "text-sidebar-foreground hover:text-sidebar-foreground"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 shrink-0 transition-transform duration-200",
                  "group-hover:scale-110",
                  isActive && "animate-bounce-in"
                )}
              />
              {!collapsed && (
                <span className="font-medium animate-fade-in">{item.title}</span>
              )}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/10 to-transparent animate-shimmer" />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="absolute bottom-4 left-0 right-0 px-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="w-full justify-center"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4" />
              <span className="ml-2">Collapse</span>
            </>
          )}
        </Button>
      </div>
    </aside>
  );
}
