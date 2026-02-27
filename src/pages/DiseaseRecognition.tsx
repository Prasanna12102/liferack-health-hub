import { useState } from "react";
import {
  Camera, Upload, Activity, HeartPulse, Quote, Search,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BodyMapScanner from "@/components/disease/BodyMapScanner";
import VitalSignsInput, { type VitalSigns } from "@/components/disease/VitalSignsInput";
import MultiStageDiagnosis from "@/components/disease/MultiStageDiagnosis";
import DiagnosisResults from "@/components/disease/DiagnosisResults";

export default function DiseaseRecognition() {
  const [showResults, setShowResults] = useState(false);
  const [symptoms, setSymptoms] = useState("");
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [diagnosticComplete, setDiagnosticComplete] = useState(false);
  const [vitals, setVitals] = useState<VitalSigns>({
    bloodPressureSystolic: "",
    bloodPressureDiastolic: "",
    heartRate: "",
    temperature: "",
    spO2: "",
  });

  const handleRegionToggle = (regionId: string) => {
    setSelectedRegions((prev) =>
      prev.includes(regionId)
        ? prev.filter((r) => r !== regionId)
        : [...prev, regionId]
    );
  };

  const handleAnalyze = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setShowResults(false);
    setSymptoms("");
    setSelectedRegions([]);
    setDiagnosticComplete(false);
    setVitals({ bloodPressureSystolic: "", bloodPressureDiastolic: "", heartRate: "", temperature: "", spO2: "" });
  };

  const canAnalyze = symptoms.trim() || selectedRegions.length > 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-in">
        <Card variant="glass" className="border-l-4 border-l-accent overflow-hidden">
          <CardContent className="py-6 relative">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="flex-1">
                <div className="flex items-start gap-4 mb-4">
                  <Quote className="h-8 w-8 text-accent shrink-0" />
                  <p className="text-lg font-medium italic">
                    "The good physician treats the disease; the great physician treats the patient who has the disease."
                  </p>
                </div>
                <p className="text-muted-foreground">
                  Advanced AI-powered diagnosis with body mapping, vital signs analysis,
                  organ health prediction, and multi-stage diagnostic flow for comprehensive health assessment.
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

      {!showResults ? (
        <div className="space-y-6">
          {/* Body Map Scanner */}
          <div className="animate-slide-in-up" style={{ animationDelay: "100ms" }}>
            <BodyMapScanner
              selectedRegions={selectedRegions}
              onRegionToggle={handleRegionToggle}
            />
          </div>

          {/* Vital Signs */}
          <div className="animate-slide-in-up" style={{ animationDelay: "200ms" }}>
            <VitalSignsInput vitals={vitals} onVitalsChange={setVitals} />
          </div>

          {/* Symptom Input */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card variant="glass" className="animate-slide-in-up" style={{ animationDelay: "300ms" }}>
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
                          <p className="text-sm text-muted-foreground mt-1">Take a photo of visible symptoms</p>
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
                          <p className="text-sm text-muted-foreground mt-1">Select an image showing symptoms</p>
                        </div>
                        <Button variant="outline" onClick={handleAnalyze}>Browse Files</Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="text">
                    <div className="space-y-4">
                      <Textarea
                        placeholder="Describe your symptoms in detail... (e.g., 'I have a persistent cough, sore throat, and moderate fever for the past 3 days')"
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                        className="min-h-[180px] resize-none"
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Multi-Stage Diagnosis */}
            <div className="animate-slide-in-up" style={{ animationDelay: "400ms" }}>
              <MultiStageDiagnosis
                onComplete={() => setDiagnosticComplete(true)}
                isComplete={diagnosticComplete}
              />
            </div>
          </div>

          {/* Analyze Button */}
          <div className="flex justify-center animate-slide-in-up" style={{ animationDelay: "500ms" }}>
            <Button
              variant="accent"
              size="lg"
              className="px-12 py-6 text-lg glow-primary"
              onClick={handleAnalyze}
              disabled={!canAnalyze}
            >
              <Search className="mr-2 h-5 w-5" />
              Run AI Diagnosis
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Back / Reset */}
          <div className="flex gap-3 animate-fade-in">
            <Button variant="outline" onClick={handleReset}>
              ← New Diagnosis
            </Button>
          </div>

          {/* Full Results */}
          <DiagnosisResults />
        </div>
      )}
    </div>
  );
}
