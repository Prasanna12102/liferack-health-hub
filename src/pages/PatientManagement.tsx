import {
  Activity,
  FileText,
  Apple,
  Stethoscope,
  TrendingUp,
  Calendar,
  Brain,
  Heart,
  Shield,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ProgressRing } from "@/components/shared/ProgressRing";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from "recharts";
import { cn } from "@/lib/utils";

const healthMetrics = [
  { subject: "Nutrition", score: 85, fullMark: 100 },
  { subject: "Activity", score: 78, fullMark: 100 },
  { subject: "Sleep", score: 72, fullMark: 100 },
  { subject: "Hydration", score: 90, fullMark: 100 },
  { subject: "Mental", score: 82, fullMark: 100 },
  { subject: "Medical", score: 88, fullMark: 100 },
];

const healthTimeline = [
  { month: "Jul", score: 72 },
  { month: "Aug", score: 75 },
  { month: "Sep", score: 78 },
  { month: "Oct", score: 82 },
  { month: "Nov", score: 85 },
  { month: "Dec", score: 88 },
];

const moduleInsights = [
  {
    module: "Medical Reports",
    icon: FileText,
    status: "normal",
    insight: "All recent tests within normal range",
    lastUpdate: "Dec 15, 2024",
  },
  {
    module: "Food Recognition",
    icon: Apple,
    status: "good",
    insight: "Balanced diet maintained this week",
    lastUpdate: "Today",
  },
  {
    module: "Habit Tracker",
    icon: Activity,
    status: "improving",
    insight: "Step count up 15% from last week",
    lastUpdate: "Today",
  },
  {
    module: "Disease Recognition",
    icon: Stethoscope,
    status: "clear",
    insight: "No health concerns detected",
    lastUpdate: "Dec 10, 2024",
  },
];

const aiRecommendations = [
  {
    priority: "high",
    title: "Increase Water Intake",
    description: "You're averaging 2.1L daily. Aim for 3L to optimize hydration levels.",
    icon: "💧",
  },
  {
    priority: "medium",
    title: "Add More Fiber",
    description: "Consider adding more vegetables to meet your 25g daily fiber goal.",
    icon: "🥗",
  },
  {
    priority: "low",
    title: "Schedule Check-up",
    description: "It's been 3 months since your last comprehensive health check.",
    icon: "📅",
  },
];

export default function PatientManagement() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold">Patient Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive health analytics and AI-powered insights
          </p>
        </div>
        <Button variant="gradient" className="gap-2">
          <FileText className="h-4 w-4" />
          Generate Health Report
        </Button>
      </div>

      {/* Health Score Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card variant="glass" className="lg:col-span-1 animate-slide-in-up">
          <CardContent className="p-6 flex flex-col items-center justify-center h-full">
            <ProgressRing
              progress={88}
              size={160}
              strokeWidth={12}
              label="88"
              sublabel="Health Score"
              variant="success"
            />
            <div className="mt-4 flex items-center gap-2 text-green-600">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-medium">+6% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card variant="glass" className="lg:col-span-3 animate-slide-in-up" style={{ animationDelay: "100ms" }}>
          <CardHeader>
            <CardTitle>Health Score Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={healthTimeline}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                <XAxis dataKey="month" stroke="hsl(220, 9%, 46%)" fontSize={12} />
                <YAxis stroke="hsl(220, 9%, 46%)" fontSize={12} domain={[60, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0, 0%, 100%)",
                    border: "none",
                    borderRadius: "12px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="hsl(142, 76%, 36%)"
                  strokeWidth={3}
                  fill="url(#colorScore)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Radar Chart */}
        <Card variant="glass" className="animate-slide-in-up" style={{ animationDelay: "200ms" }}>
          <CardHeader>
            <CardTitle>Health Metrics Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={healthMetrics}>
                <PolarGrid stroke="hsl(220, 13%, 91%)" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: "hsl(220, 9%, 46%)", fontSize: 12 }}
                />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="hsl(234, 89%, 60%)"
                  fill="hsl(234, 89%, 60%)"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Module Insights */}
        <Card variant="glass" className="animate-slide-in-up" style={{ animationDelay: "300ms" }}>
          <CardHeader>
            <CardTitle>Module Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {moduleInsights.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div
                  className={cn(
                    "h-10 w-10 rounded-xl flex items-center justify-center shrink-0",
                    item.status === "normal" && "bg-green-100 text-green-600",
                    item.status === "good" && "bg-blue-100 text-blue-600",
                    item.status === "improving" && "bg-purple-100 text-purple-600",
                    item.status === "clear" && "bg-cyan-100 text-cyan-600"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{item.module}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {item.insight}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {item.lastUpdate}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* AI Recommendations */}
        <Card variant="glass" className="animate-slide-in-up" style={{ animationDelay: "400ms" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {aiRecommendations.map((rec, index) => (
              <div
                key={index}
                className={cn(
                  "p-4 rounded-xl border-l-4",
                  rec.priority === "high" && "bg-red-50 border-l-red-500",
                  rec.priority === "medium" && "bg-amber-50 border-l-amber-500",
                  rec.priority === "low" && "bg-blue-50 border-l-blue-500"
                )}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{rec.icon}</span>
                  <h4 className="font-medium text-sm">{rec.title}</h4>
                </div>
                <p className="text-xs text-muted-foreground">{rec.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Reports Analyzed", value: 24, icon: FileText, color: "primary" },
          { label: "Foods Tracked", value: 156, icon: Apple, color: "accent" },
          { label: "Active Days", value: 28, icon: Activity, color: "success" },
          { label: "Health Checks", value: 8, icon: Heart, color: "warning" },
        ].map((stat, index) => (
          <Card
            key={index}
            variant="glass"
            className="animate-slide-in-up"
            style={{ animationDelay: `${500 + index * 100}ms` }}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">{stat.label}</span>
                <div
                  className={cn(
                    "h-8 w-8 rounded-lg flex items-center justify-center",
                    stat.color === "primary" && "gradient-primary",
                    stat.color === "accent" && "gradient-accent",
                    stat.color === "success" && "gradient-success",
                    stat.color === "warning" && "gradient-warning"
                  )}
                >
                  <stat.icon className="h-4 w-4 text-primary-foreground" />
                </div>
              </div>
              <p className="text-2xl font-bold">
                <AnimatedCounter value={stat.value} />
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
