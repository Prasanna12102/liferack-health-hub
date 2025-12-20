import {
  Activity,
  Droplets,
  Footprints,
  Apple,
  Heart,
  TrendingUp,
  FileText,
  Stethoscope,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/shared/StatCard";
import { ProgressRing } from "@/components/shared/ProgressRing";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { Link } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const weeklyActivityData = [
  { day: "Mon", steps: 8500, calories: 420 },
  { day: "Tue", steps: 12000, calories: 580 },
  { day: "Wed", steps: 6800, calories: 340 },
  { day: "Thu", steps: 9200, calories: 460 },
  { day: "Fri", steps: 11500, calories: 550 },
  { day: "Sat", steps: 14200, calories: 680 },
  { day: "Sun", steps: 7600, calories: 380 },
];

const healthScoreData = [
  { month: "Jan", score: 72 },
  { month: "Feb", score: 75 },
  { month: "Mar", score: 78 },
  { month: "Apr", score: 82 },
  { month: "May", score: 85 },
  { month: "Jun", score: 88 },
];

const recentReports = [
  { name: "Blood Test Report", date: "Dec 15, 2024", status: "normal" },
  { name: "Lipid Profile", date: "Dec 10, 2024", status: "abnormal" },
  { name: "CBC Report", date: "Dec 5, 2024", status: "normal" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold">
            Good Morning, <span className="text-gradient">John</span> 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's your health overview for today
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">View Reports</Button>
          <Button variant="gradient">
            <TrendingUp className="mr-2 h-4 w-4" />
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
          icon={Footprints}
          trend={{ value: 12, isPositive: true }}
          variant="primary"
          delay={0}
        />
        <StatCard
          title="Water Intake"
          value="2.4L"
          subtitle="Goal: 3L"
          icon={Droplets}
          trend={{ value: 8, isPositive: true }}
          variant="accent"
          delay={100}
        />
        <StatCard
          title="Calories Burned"
          value={<AnimatedCounter value={486} />}
          subtitle="Active calories"
          icon={Activity}
          trend={{ value: 5, isPositive: true }}
          variant="success"
          delay={200}
        />
        <StatCard
          title="Health Score"
          value="88"
          subtitle="Excellent condition"
          icon={Heart}
          trend={{ value: 3, isPositive: true }}
          variant="warning"
          delay={300}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Chart */}
        <Card variant="glass" className="lg:col-span-2 animate-slide-in-up" style={{ animationDelay: "200ms" }}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Weekly Activity</CardTitle>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="text-xs">
                Steps
              </Button>
              <Button variant="secondary" size="sm" className="text-xs">
                Calories
              </Button>
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

        {/* Health Score */}
        <Card variant="glass" className="animate-slide-in-up" style={{ animationDelay: "300ms" }}>
          <CardHeader>
            <CardTitle>Overall Health Score</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <ProgressRing
              progress={88}
              size={180}
              strokeWidth={12}
              label="88"
              sublabel="Excellent"
              variant="success"
            />
            <div className="mt-6 grid grid-cols-2 gap-4 w-full">
              <div className="text-center p-3 rounded-xl bg-secondary/50">
                <p className="text-2xl font-bold text-green-600">+3%</p>
                <p className="text-xs text-muted-foreground">This Month</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-secondary/50">
                <p className="text-2xl font-bold text-primary">92</p>
                <p className="text-xs text-muted-foreground">Target Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Reports */}
        <Card variant="glass" className="animate-slide-in-up" style={{ animationDelay: "400ms" }}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Recent Reports
            </CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/medical-reports">View All</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentReports.map((report, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer"
              >
                <div>
                  <p className="font-medium text-sm">{report.name}</p>
                  <p className="text-xs text-muted-foreground">{report.date}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    report.status === "normal"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {report.status}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Health Score Trend */}
        <Card variant="glass" className="animate-slide-in-up" style={{ animationDelay: "500ms" }}>
          <CardHeader>
            <CardTitle>Health Score Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={healthScoreData}>
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
                <Bar
                  dataKey="score"
                  fill="hsl(234, 89%, 60%)"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card variant="glass" className="animate-slide-in-up" style={{ animationDelay: "600ms" }}>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
