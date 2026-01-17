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
  Download,
  Share2,
  CalendarClock,
  FileDown,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ProgressRing } from "@/components/shared/ProgressRing";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { StatCard } from "@/components/shared/StatCard";
import { Link } from "react-router-dom";
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
  BarChart,
  Bar,
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

const weeklyActivityData = [
  { day: "Mon", steps: 8500, calories: 420 },
  { day: "Tue", steps: 12000, calories: 580 },
  { day: "Wed", steps: 6800, calories: 340 },
  { day: "Thu", steps: 9200, calories: 460 },
  { day: "Fri", steps: 11500, calories: 550 },
  { day: "Sat", steps: 14200, calories: 680 },
  { day: "Sun", steps: 7600, calories: 380 },
];

const recentReports = [
  { name: "Blood Test Report", date: "Dec 15, 2024", status: "normal", type: "Blood Work" },
  { name: "Lipid Profile", date: "Dec 10, 2024", status: "abnormal", type: "Biochemistry" },
  { name: "Thyroid Panel", date: "Dec 5, 2024", status: "normal", type: "Endocrinology" },
  { name: "CBC Report", date: "Nov 28, 2024", status: "normal", type: "Blood Work" },
];

const moduleInsights = [
  {
    module: "Medical Reports",
    icon: FileText,
    status: "normal",
    insight: "All recent tests within normal range",
    lastUpdate: "Dec 15, 2024",
    count: 24,
  },
  {
    module: "Food Recognition",
    icon: Apple,
    status: "good",
    insight: "Balanced diet maintained this week",
    lastUpdate: "Today",
    count: 156,
  },
  {
    module: "Habit Tracker",
    icon: Activity,
    status: "improving",
    insight: "Step count up 15% from last week",
    lastUpdate: "Today",
    count: 28,
  },
  {
    module: "Disease Recognition",
    icon: Stethoscope,
    status: "clear",
    insight: "No health concerns detected",
    lastUpdate: "Dec 10, 2024",
    count: 8,
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

const exportActions = [
  { label: "Export Report (PDF)", icon: FileDown },
  { label: "Share with Doctor", icon: Share2 },
  { label: "Download Data", icon: Download },
  { label: "Schedule Consultation", icon: CalendarClock },
];

export default function PatientManagement() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold">
            Good Morning, <span className="text-gradient">John</span> 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive health analytics and AI-powered insights
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">View Reports</Button>
          <Button variant="gradient" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            Health Insights
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Today's Steps"
          value={<AnimatedCounter value={8456} />}
          subtitle="Goal: 10,000 steps"
          icon={Activity}
          trend={{ value: 12, isPositive: true }}
          variant="primary"
          delay={0}
        />
        <StatCard
          title="Health Score"
          value="88"
          subtitle="Excellent condition"
          icon={Heart}
          trend={{ value: 3, isPositive: true }}
          variant="success"
          delay={100}
        />
        <StatCard
          title="Reports Analyzed"
          value={<AnimatedCounter value={24} />}
          subtitle="This month"
          icon={FileText}
          trend={{ value: 8, isPositive: true }}
          variant="accent"
          delay={200}
        />
        <StatCard
          title="Active Days"
          value={<AnimatedCounter value={28} />}
          subtitle="Streak"
          icon={Sparkles}
          trend={{ value: 5, isPositive: true }}
          variant="warning"
          delay={300}
        />
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
        {/* Weekly Activity Chart */}
        <Card variant="glass" className="lg:col-span-2 animate-slide-in-up" style={{ animationDelay: "200ms" }}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Weekly Activity</CardTitle>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="text-xs">Steps</Button>
              <Button variant="secondary" size="sm" className="text-xs">Calories</Button>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={weeklyActivityData}>
                <defs>
                  <linearGradient id="colorSteps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(234, 89%, 60%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(234, 89%, 60%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                <XAxis dataKey="day" stroke="hsl(220, 9%, 46%)" fontSize={12} />
                <YAxis stroke="hsl(220, 9%, 46%)" fontSize={12} />
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
                  dataKey="steps"
                  stroke="hsl(234, 89%, 60%)"
                  strokeWidth={3}
                  fill="url(#colorSteps)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Radar Chart */}
        <Card variant="glass" className="animate-slide-in-up" style={{ animationDelay: "300ms" }}>
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
      </div>

      {/* Reports and Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Reports - Full Details */}
        <Card variant="glass" className="lg:col-span-2 animate-slide-in-up" style={{ animationDelay: "400ms" }}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Health Reports Summary
            </CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/medical-reports">View All</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentReports.map((report, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      "h-10 w-10 rounded-xl flex items-center justify-center",
                      report.status === "normal"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    )}
                  >
                    {report.status === "normal" ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <AlertCircle className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{report.name}</p>
                    <p className="text-sm text-muted-foreground">{report.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-sm text-muted-foreground">{report.date}</p>
                  <span
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium",
                      report.status === "normal"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    )}
                  >
                    {report.status}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* AI Recommendations */}
        <Card variant="glass" className="animate-slide-in-up" style={{ animationDelay: "500ms" }}>
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

      {/* Module Insights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {moduleInsights.map((item, index) => (
          <Card
            key={index}
            variant="glass"
            className="animate-slide-in-up"
            style={{ animationDelay: `${600 + index * 100}ms` }}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
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
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-sm">{item.module}</p>
                    <span className="text-lg font-bold">{item.count}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{item.insight}</p>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {item.lastUpdate}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Export & Share Section */}
      <Card variant="glass" className="animate-slide-in-up" style={{ animationDelay: "1000ms" }}>
        <CardHeader>
          <CardTitle>Export & Share</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {exportActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="gap-2 flex-1 min-w-[180px]"
              >
                <action.icon className="h-4 w-4" />
                {action.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card variant="glass" className="animate-slide-in-up" style={{ animationDelay: "1100ms" }}>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Button
              variant="outline"
              className="w-full justify-start gap-3 h-14"
              asChild
            >
              <Link to="/medical-reports">
                <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Upload Report</p>
                  <p className="text-xs text-muted-foreground">Analyze medical reports</p>
                </div>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-3 h-14"
              asChild
            >
              <Link to="/food-recognition">
                <div className="h-10 w-10 rounded-xl gradient-accent flex items-center justify-center">
                  <Apple className="h-5 w-5 text-accent-foreground" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Log Food</p>
                  <p className="text-xs text-muted-foreground">Track your nutrition</p>
                </div>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-3 h-14"
              asChild
            >
              <Link to="/disease-recognition">
                <div className="h-10 w-10 rounded-xl gradient-success flex items-center justify-center">
                  <Stethoscope className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Check Symptoms</p>
                  <p className="text-xs text-muted-foreground">AI-powered diagnosis</p>
                </div>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
