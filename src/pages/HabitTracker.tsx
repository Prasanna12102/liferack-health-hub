import { useState } from "react";
import {
  Footprints,
  Droplets,
  Apple,
  Smartphone,
  Scale,
  TrendingUp,
  TrendingDown,
  Flame,
  Clock,
  Target,
  Quote,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProgressRing } from "@/components/shared/ProgressRing";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { cn } from "@/lib/utils";

const weeklySteps = [
  { day: "Mon", steps: 8500, goal: 10000 },
  { day: "Tue", steps: 12000, goal: 10000 },
  { day: "Wed", steps: 6800, goal: 10000 },
  { day: "Thu", steps: 9200, goal: 10000 },
  { day: "Fri", steps: 11500, goal: 10000 },
  { day: "Sat", steps: 14200, goal: 10000 },
  { day: "Sun", steps: 7600, goal: 10000 },
];

const waterData = [
  { day: "Mon", liters: 2.1 },
  { day: "Tue", liters: 2.8 },
  { day: "Wed", liters: 1.9 },
  { day: "Thu", liters: 2.5 },
  { day: "Fri", liters: 3.0 },
  { day: "Sat", liters: 2.7 },
  { day: "Sun", liters: 2.4 },
];

const habitCards = [
  { id: "steps", title: "Steps", icon: Footprints, value: "8,456", goal: "10,000", color: "primary" },
  { id: "water", title: "Water Intake", icon: Droplets, value: "2.4L", goal: "3L", color: "accent" },
  { id: "nutrition", title: "Nutrition", icon: Apple, value: "1,850", goal: "2,200 cal", color: "success" },
  { id: "screen", title: "Screen Time", icon: Smartphone, value: "4h 32m", goal: "< 6h", color: "warning" },
  { id: "weight", title: "Weight Goal", icon: Scale, value: "-2.5kg", goal: "Target: 70kg", color: "primary" },
];

export default function HabitTracker() {
  const [selectedHabit, setSelectedHabit] = useState<string | null>(null);
  const [timeFilter, setTimeFilter] = useState("week");

  return (
    <div className="space-y-6">
      {/* Header with Quote */}
      <div className="animate-fade-in">
        <Card variant="glass" className="border-l-4 border-l-primary">
          <CardContent className="py-6">
            <div className="flex items-start gap-4">
              <Quote className="h-8 w-8 text-primary shrink-0" />
              <div>
                <p className="text-lg font-medium italic">
                  "Small daily improvements over time lead to stunning results."
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Track your habits, build consistency, and achieve your health goals.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Habit Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {habitCards.map((habit, index) => (
          <Card
            key={habit.id}
            variant={selectedHabit === habit.id ? "glass" : "interactive"}
            className={cn(
              "cursor-pointer animate-slide-in-up",
              selectedHabit === habit.id && "ring-2 ring-primary"
            )}
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => setSelectedHabit(habit.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={cn(
                    "h-10 w-10 rounded-xl flex items-center justify-center",
                    habit.color === "primary" && "gradient-primary",
                    habit.color === "accent" && "gradient-accent",
                    habit.color === "success" && "gradient-success",
                    habit.color === "warning" && "gradient-warning"
                  )}
                >
                  <habit.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-sm font-medium">{habit.title}</span>
              </div>
              <p className="text-2xl font-bold">{habit.value}</p>
              <p className="text-xs text-muted-foreground">{habit.goal}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed View */}
      {selectedHabit && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-slide-in-up">
          {/* Main Chart */}
          <Card variant="glass" className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="capitalize">{selectedHabit} Overview</CardTitle>
              <div className="flex gap-2">
                {["day", "week", "month"].map((filter) => (
                  <Button
                    key={filter}
                    variant={timeFilter === filter ? "gradient" : "ghost"}
                    size="sm"
                    onClick={() => setTimeFilter(filter)}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </Button>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                {selectedHabit === "steps" ? (
                  <BarChart data={weeklySteps}>
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
                    <Bar
                      dataKey="steps"
                      fill="hsl(234, 89%, 60%)"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                ) : (
                  <LineChart data={waterData}>
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
                    <Line
                      type="monotone"
                      dataKey="liters"
                      stroke="hsl(186, 100%, 42%)"
                      strokeWidth={3}
                      dot={{ fill: "hsl(186, 100%, 42%)", strokeWidth: 2 }}
                    />
                  </LineChart>
                )}
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Stats Sidebar */}
          <div className="space-y-4">
            <Card variant="glass">
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <ProgressRing
                    progress={selectedHabit === "steps" ? 84 : 80}
                    size={140}
                    strokeWidth={10}
                    label={selectedHabit === "steps" ? "84%" : "80%"}
                    sublabel="of goal"
                    variant={selectedHabit === "steps" ? "primary" : "accent"}
                  />
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Today's Progress</p>
                </div>
              </CardContent>
            </Card>

            <Card variant="glass">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">vs Yesterday</span>
                  <span className="flex items-center gap-1 text-green-600 font-medium">
                    <TrendingUp className="h-4 w-4" />
                    +12%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Weekly Avg</span>
                  <span className="font-medium">
                    <AnimatedCounter value={9800} />
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Best Day</span>
                  <span className="font-medium">Saturday</span>
                </div>
              </CardContent>
            </Card>

            {selectedHabit === "steps" && (
              <Card variant="glass">
                <CardContent className="p-4">
                  <h4 className="font-medium mb-3">Activity Summary</h4>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center p-3 rounded-xl bg-secondary/50">
                      <Footprints className="h-5 w-5 mx-auto mb-1 text-primary" />
                      <p className="text-lg font-bold">8.4k</p>
                      <p className="text-xs text-muted-foreground">Steps</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-secondary/50">
                      <Flame className="h-5 w-5 mx-auto mb-1 text-orange-500" />
                      <p className="text-lg font-bold">420</p>
                      <p className="text-xs text-muted-foreground">Calories</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-secondary/50">
                      <Clock className="h-5 w-5 mx-auto mb-1 text-green-500" />
                      <p className="text-lg font-bold">2.5h</p>
                      <p className="text-xs text-muted-foreground">Active</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}

      {!selectedHabit && (
        <Card variant="glass" className="animate-fade-in">
          <CardContent className="py-12 text-center">
            <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">Select a habit to view details</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Click on any habit card above to see detailed analytics
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
