import { useState } from "react";
import {
  Camera,
  Upload,
  Type,
  AlertTriangle,
  Shield,
  Activity,
  Pill,
  HeartPulse,
  Quote,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const diseaseResult = {
  name: "Common Cold",
  confidence: 87,
  symptoms: [
    "Runny or stuffy nose",
    "Sore throat",
    "Cough",
    "Mild body aches",
    "Sneezing",
    "Low-grade fever",
  ],
  complications: [
    "Can lead to ear infection if untreated",
    "May worsen into bronchitis",
    "Could trigger asthma symptoms",
  ],
  prevention: [
    "Wash hands frequently with soap",
    "Avoid close contact with sick individuals",
    "Don't touch your face with unwashed hands",
    "Get adequate sleep and rest",
    "Maintain a healthy diet rich in vitamins",
  ],
};

export default function DiseaseRecognition() {
  const [showResults, setShowResults] = useState(false);
  const [symptoms, setSymptoms] = useState("");

  const handleAnalyze = () => {
    setShowResults(true);
  };

  return (
    <div className="space-y-6">
      {/* Header with Quote */}
      <div className="animate-fade-in">
        <Card variant="glass" className="border-l-4 border-l-accent overflow-hidden">
          <CardContent className="py-6 relative">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="flex-1">
                <div className="flex items-start gap-4 mb-4">
                  <Quote className="h-8 w-8 text-accent shrink-0" />
                  <p className="text-lg font-medium italic">
                    "An ounce of prevention is worth a pound of cure."
                  </p>
                </div>
                <p className="text-muted-foreground">
                  Our AI-powered disease recognition helps you identify potential health
                  conditions early. Simply describe your symptoms or upload an image for
                  instant analysis.
                </p>
              </div>
              <div className="hidden md:block">
                <div className="h-24 w-24 rounded-2xl gradient-accent flex items-center justify-center animate-float">
                  <HeartPulse className="h-12 w-12 text-accent-foreground" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card variant="glass" className="animate-slide-in-up" style={{ animationDelay: "100ms" }}>
          <CardHeader>
            <CardTitle>Describe Your Symptoms</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="text" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="camera">Camera</TabsTrigger>
                <TabsTrigger value="upload">Upload</TabsTrigger>
                <TabsTrigger value="text">Symptoms</TabsTrigger>
              </TabsList>

              <TabsContent value="camera">
                <div className="border-2 border-dashed rounded-2xl p-12 text-center hover:border-accent/50 transition-colors">
                  <div className="flex flex-col items-center gap-4">
                    <div className="h-20 w-20 rounded-2xl gradient-accent flex items-center justify-center">
                      <Camera className="h-10 w-10 text-accent-foreground" />
                    </div>
                    <div>
                      <p className="text-lg font-medium">Capture Image</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Take a photo of visible symptoms
                      </p>
                    </div>
                    <Button variant="accent" onClick={handleAnalyze}>
                      <Camera className="mr-2 h-4 w-4" />
                      Open Camera
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="upload">
                <div className="border-2 border-dashed rounded-2xl p-12 text-center hover:border-accent/50 transition-colors">
                  <div className="flex flex-col items-center gap-4">
                    <div className="h-20 w-20 rounded-2xl bg-secondary flex items-center justify-center">
                      <Upload className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-lg font-medium">Upload Image</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Select an image showing symptoms
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
                  <Textarea
                    placeholder="Describe your symptoms in detail... (e.g., 'I have a runny nose, sore throat, and mild fever for the past 2 days')"
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    className="min-h-[200px] resize-none"
                  />
                  <Button
                    variant="accent"
                    className="w-full"
                    onClick={handleAnalyze}
                    disabled={!symptoms.trim()}
                  >
                    <Activity className="mr-2 h-4 w-4" />
                    Analyze Symptoms
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Results Section */}
        {showResults && (
          <div className="space-y-4 animate-slide-in-right">
            {/* Disease Identified */}
            <Card variant="glass" className="border-2 border-accent/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-2xl gradient-accent flex items-center justify-center">
                    <Activity className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Identified Condition</p>
                    <h3 className="text-2xl font-bold">{diseaseResult.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="h-2 flex-1 rounded-full bg-secondary overflow-hidden">
                        <div
                          className="h-full gradient-accent rounded-full transition-all duration-1000"
                          style={{ width: `${diseaseResult.confidence}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{diseaseResult.confidence}% match</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Symptoms */}
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  Common Symptoms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {diseaseResult.symptoms.map((symptom, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-2 rounded-lg bg-amber-50 text-amber-800 text-sm animate-slide-in-up"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="h-2 w-2 rounded-full bg-amber-500" />
                      {symptom}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Complications */}
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Shield className="h-5 w-5 text-red-500" />
                  Possible Complications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {diseaseResult.complications.map((complication, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-sm animate-slide-in-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <AlertTriangle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                      <span>{complication}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Prevention */}
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Pill className="h-5 w-5 text-green-500" />
                  Prevention Measures
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {diseaseResult.prevention.map((measure, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-sm animate-slide-in-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                      <span>{measure}</span>
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
