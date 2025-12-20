import { useState } from "react";
import {
  Camera,
  Upload,
  Type,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Flame,
  Droplets,
  Dumbbell,
  Apple,
  Heart,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const nutritionData = {
  calories: 285,
  carbs: 45,
  protein: 12,
  fat: 8,
  fiber: 6,
  sugar: 12,
};

const benefits = [
  "Rich in dietary fiber for digestive health",
  "Contains essential vitamins A, C, and K",
  "Good source of plant-based protein",
  "Low glycemic index for stable blood sugar",
  "High antioxidant content",
];

export default function FoodRecognition() {
  const [goal, setGoal] = useState<"weight-loss" | "weight-gain">("weight-loss");
  const [showResults, setShowResults] = useState(false);
  const [foodInput, setFoodInput] = useState("");

  const handleAnalyze = () => {
    setShowResults(true);
  };

  const matchStatus: "perfect" | "recommended" | "not-suitable" = goal === "weight-loss" ? "recommended" : "perfect";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold">Food Recognition</h1>
        <p className="text-muted-foreground mt-1">
          Analyze your meals for nutritional insights
        </p>
      </div>

      {/* Goal Selection */}
      <Card variant="glass" className="animate-slide-in-up">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">Your Current Goal</h3>
              <p className="text-sm text-muted-foreground">
                Food recommendations are based on your selected goal
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant={goal === "weight-loss" ? "gradient" : "outline"}
                onClick={() => setGoal("weight-loss")}
                className="gap-2"
              >
                <TrendingUp className="h-4 w-4 rotate-180" />
                Weight Loss
              </Button>
              <Button
                variant={goal === "weight-gain" ? "gradient" : "outline"}
                onClick={() => setGoal("weight-gain")}
                className="gap-2"
              >
                <Dumbbell className="h-4 w-4" />
                Weight Gain
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card variant="glass" className="animate-slide-in-up" style={{ animationDelay: "100ms" }}>
          <CardHeader>
            <CardTitle>Food Input</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="camera" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="camera">Camera</TabsTrigger>
                <TabsTrigger value="upload">Upload</TabsTrigger>
                <TabsTrigger value="text">Text</TabsTrigger>
              </TabsList>

              <TabsContent value="camera">
                <div className="border-2 border-dashed rounded-2xl p-12 text-center hover:border-primary/50 transition-colors">
                  <div className="flex flex-col items-center gap-4">
                    <div className="h-20 w-20 rounded-2xl gradient-primary flex items-center justify-center animate-pulse-glow">
                      <Camera className="h-10 w-10 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-lg font-medium">Take a Photo</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Capture your meal for instant analysis
                      </p>
                    </div>
                    <Button variant="gradient" onClick={handleAnalyze}>
                      <Camera className="mr-2 h-4 w-4" />
                      Open Camera
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="upload">
                <div className="border-2 border-dashed rounded-2xl p-12 text-center hover:border-primary/50 transition-colors">
                  <div className="flex flex-col items-center gap-4">
                    <div className="h-20 w-20 rounded-2xl bg-secondary flex items-center justify-center">
                      <Upload className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-lg font-medium">Upload Image</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Select a food image from your device
                      </p>
                    </div>
                    <Button variant="outline" onClick={handleAnalyze}>
                      Browse Files
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="text">
                <div className="space-y-4">
                  <Input
                    placeholder="Enter food name (e.g., Grilled Chicken Salad)"
                    value={foodInput}
                    onChange={(e) => setFoodInput(e.target.value)}
                    className="h-12"
                  />
                  <Button
                    variant="gradient"
                    className="w-full"
                    onClick={handleAnalyze}
                    disabled={!foodInput}
                  >
                    <Type className="mr-2 h-4 w-4" />
                    Analyze Food
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Results Section */}
        {showResults && (
          <div className="space-y-6 animate-slide-in-right">
            {/* Match Status */}
            <Card
              variant="glass"
              className={cn(
                "border-2",
                matchStatus === "perfect" ? "border-green-500/50" : "border-primary/50"
              )}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      "h-14 w-14 rounded-2xl flex items-center justify-center",
                      matchStatus === "perfect" ? "bg-green-100" : "bg-primary/10"
                    )}
                  >
                    {matchStatus === "perfect" ? (
                      <CheckCircle className="h-7 w-7 text-green-600" />
                    ) : (
                      <AlertTriangle className="h-7 w-7 text-primary" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold capitalize">
                      {matchStatus.replace("-", " ")}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {matchStatus === "perfect"
                        ? "This food perfectly aligns with your weight gain goal"
                        : "Good choice for your weight loss goal"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Nutrition Breakdown */}
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Apple className="h-5 w-5 text-primary" />
                  Nutrition Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-orange-100 to-orange-50 border border-orange-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Flame className="h-5 w-5 text-orange-500" />
                      <span className="text-sm font-medium text-orange-700">Calories</span>
                    </div>
                    <p className="text-2xl font-bold text-orange-600">{nutritionData.calories}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Droplets className="h-5 w-5 text-blue-500" />
                      <span className="text-sm font-medium text-blue-700">Carbs</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-600">{nutritionData.carbs}g</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Protein</span>
                      <span className="font-medium">{nutritionData.protein}g</span>
                    </div>
                    <Progress value={(nutritionData.protein / 50) * 100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Fat</span>
                      <span className="font-medium">{nutritionData.fat}g</span>
                    </div>
                    <Progress value={(nutritionData.fat / 65) * 100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Fiber</span>
                      <span className="font-medium">{nutritionData.fiber}g</span>
                    </div>
                    <Progress value={(nutritionData.fiber / 25) * 100} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Health Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 animate-slide-in-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
