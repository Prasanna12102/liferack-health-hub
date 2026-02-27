import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Activity, AlertTriangle, Shield, Pill, CheckCircle,
  Clock, TrendingUp, Stethoscope, Brain, Heart, Zap
} from "lucide-react";

const diagnosisData = {
  name: "Upper Respiratory Tract Infection",
  confidence: 92,
  severity: "Moderate",
  affectedOrgans: [
    { name: "Lungs", risk: "Medium", icon: "🫁", description: "Mild inflammation in bronchial tubes" },
    { name: "Throat", risk: "High", icon: "🗣️", description: "Acute pharyngitis detected" },
    { name: "Sinuses", risk: "Medium", icon: "👃", description: "Sinus congestion present" },
    { name: "Immune System", risk: "Low", icon: "🛡️", description: "Slightly weakened immune response" },
  ],
  symptoms: [
    "Persistent cough with mucus",
    "Sore and inflamed throat",
    "Nasal congestion & runny nose",
    "Mild to moderate fever",
    "Fatigue and body aches",
    "Headache and sinus pressure",
  ],
  similarConditions: [
    { name: "Common Cold", confidence: 78, difference: "Less severe, no fever typically" },
    { name: "Influenza", confidence: 65, difference: "More sudden onset, higher fever" },
    { name: "COVID-19", confidence: 45, difference: "Loss of taste/smell, breathing difficulty" },
    { name: "Allergic Rhinitis", confidence: 30, difference: "No fever, seasonal pattern" },
  ],
  progression: [
    { stage: "Day 1-2", title: "Onset", description: "Initial throat irritation, mild fatigue", severity: 20 },
    { stage: "Day 3-5", title: "Peak Symptoms", description: "Maximum congestion, fever, body aches", severity: 80 },
    { stage: "Day 6-8", title: "Recovery Phase", description: "Symptoms begin to subside, energy returns", severity: 50 },
    { stage: "Day 9-14", title: "Resolution", description: "Full recovery expected, residual cough possible", severity: 15 },
  ],
  complications: [
    "Bacterial sinusitis if symptoms persist beyond 10 days",
    "Bronchitis with prolonged cough and chest tightness",
    "Ear infection (otitis media), especially in younger patients",
    "Pneumonia in immunocompromised individuals",
  ],
  prevention: [
    "Hand hygiene with soap for 20+ seconds",
    "Avoid close contact with infected individuals",
    "Boost immunity with vitamin C and zinc supplements",
    "Get adequate sleep (7-9 hours per night)",
    "Stay hydrated (8+ glasses of water daily)",
  ],
  treatmentRoadmap: [
    { phase: "Immediate", icon: Pill, items: ["Rest and hydration", "OTC pain relievers (Acetaminophen)", "Warm saltwater gargles", "Honey & lemon tea for throat"] },
    { phase: "Days 1-3", icon: Stethoscope, items: ["Decongestant nasal spray", "Cough suppressant if needed", "Monitor temperature twice daily", "Light, nutritious meals"] },
    { phase: "Days 4-7", icon: Activity, items: ["Gradual return to activity", "Continue hydration", "Humidifier for air moisture", "Consult doctor if no improvement"] },
    { phase: "Recovery", icon: Heart, items: ["Resume normal activities", "Strengthen immune system", "Probiotic foods for gut health", "Follow-up if symptoms return"] },
  ],
};

export default function DiagnosisResults() {
  return (
    <div className="space-y-5 animate-fade-in">
      {/* Main Diagnosis Card */}
      <Card variant="glass" className="border-2 border-accent/30 overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-30 pointer-events-none" />
        <CardContent className="p-6 relative">
          <div className="flex items-start gap-4">
            <div className="h-16 w-16 rounded-2xl gradient-accent flex items-center justify-center shrink-0">
              <Brain className="h-8 w-8 text-accent-foreground" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-xl font-bold">{diagnosisData.name}</h3>
                <Badge variant="outline" className={`text-xs ${
                  diagnosisData.severity === "High" ? "border-destructive text-destructive" :
                  diagnosisData.severity === "Moderate" ? "border-amber-500 text-amber-600" :
                  "border-green-500 text-green-600"
                }`}>
                  {diagnosisData.severity} Severity
                </Badge>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className="h-2.5 flex-1 max-w-[200px] rounded-full bg-secondary overflow-hidden">
                  <div className="h-full gradient-accent rounded-full transition-all duration-1000 animate-progress-fill" style={{ width: `${diagnosisData.confidence}%` }} />
                </div>
                <span className="text-sm font-semibold text-accent">{diagnosisData.confidence}% confidence</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Affected Organs Visualization */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Zap className="h-5 w-5 text-amber-500" />
            Affected Organs & Systems
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {diagnosisData.affectedOrgans.map((organ, idx) => (
              <div
                key={organ.name}
                className={`p-4 rounded-xl border text-center transition-all hover:scale-105 animate-scale-in ${
                  organ.risk === "High" ? "border-destructive/30 bg-destructive/5" :
                  organ.risk === "Medium" ? "border-amber-500/30 bg-amber-500/5" :
                  "border-green-500/30 bg-green-500/5"
                }`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <span className="text-3xl">{organ.icon}</span>
                <p className="font-semibold text-sm mt-2">{organ.name}</p>
                <Badge variant="outline" className={`text-[10px] mt-1 ${
                  organ.risk === "High" ? "border-destructive/50 text-destructive" :
                  organ.risk === "Medium" ? "border-amber-500/50 text-amber-600" :
                  "border-green-500/50 text-green-600"
                }`}>
                  {organ.risk} Risk
                </Badge>
                <p className="text-[11px] text-muted-foreground mt-1.5">{organ.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Disease Progression Timeline */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Clock className="h-5 w-5 text-primary" />
            Disease Progression Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
            <div className="space-y-6">
              {diagnosisData.progression.map((phase, idx) => (
                <div key={phase.stage} className="relative flex items-start gap-4 animate-slide-in-up" style={{ animationDelay: `${idx * 150}ms` }}>
                  <div className={`relative z-10 h-12 w-12 rounded-full flex items-center justify-center shrink-0 ${
                    phase.severity > 60 ? "gradient-danger" :
                    phase.severity > 30 ? "gradient-warning" :
                    "gradient-success"
                  }`}>
                    <span className="text-white text-xs font-bold">{phase.severity}%</span>
                  </div>
                  <div className="flex-1 pb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">{phase.stage}</Badge>
                      <span className="font-semibold text-sm">{phase.title}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{phase.description}</p>
                    <div className="h-1.5 rounded-full bg-secondary mt-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${
                          phase.severity > 60 ? "gradient-danger" :
                          phase.severity > 30 ? "gradient-warning" :
                          "gradient-success"
                        }`}
                        style={{ width: `${phase.severity}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Similar Conditions Comparison */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-primary" />
              Differential Diagnosis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {diagnosisData.similarConditions.map((condition, idx) => (
              <div key={condition.name} className="p-3 rounded-xl bg-secondary/30 border border-border animate-slide-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{condition.name}</span>
                  <span className={`text-xs font-semibold ${
                    condition.confidence > 70 ? "text-destructive" :
                    condition.confidence > 50 ? "text-amber-500" :
                    "text-muted-foreground"
                  }`}>{condition.confidence}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-secondary overflow-hidden mb-2">
                  <div className="h-full gradient-primary rounded-full" style={{ width: `${condition.confidence}%` }} />
                </div>
                <p className="text-xs text-muted-foreground">{condition.difference}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Symptoms & Complications combined */}
        <div className="space-y-5">
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Symptoms Detected
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-2">
                {diagnosisData.symptoms.map((symptom, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-amber-500/5 border border-amber-500/20 text-sm animate-slide-in-up" style={{ animationDelay: `${idx * 50}ms` }}>
                    <div className="h-2 w-2 rounded-full bg-amber-500 shrink-0" />
                    {symptom}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Shield className="h-5 w-5 text-destructive" />
                Possible Complications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {diagnosisData.complications.map((comp, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm animate-slide-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                    <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                    <span>{comp}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Treatment Roadmap */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Pill className="h-5 w-5 text-green-500" />
            Treatment Roadmap
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {diagnosisData.treatmentRoadmap.map((phase, idx) => {
              const Icon = phase.icon;
              return (
                <div key={phase.phase} className="relative p-4 rounded-xl bg-green-500/5 border border-green-500/20 animate-scale-in" style={{ animationDelay: `${idx * 150}ms` }}>
                  {idx < diagnosisData.treatmentRoadmap.length - 1 && (
                    <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10">
                      <div className="h-6 w-6 rounded-full gradient-success flex items-center justify-center">
                        <span className="text-white text-xs">→</span>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-8 w-8 rounded-lg gradient-success flex items-center justify-center">
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-semibold text-sm">{phase.phase}</span>
                  </div>
                  <ul className="space-y-1.5">
                    {phase.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs">
                        <CheckCircle className="h-3 w-3 text-green-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Prevention */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Shield className="h-5 w-5 text-primary" />
            Prevention Measures
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {diagnosisData.prevention.map((measure, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-primary/5 border border-primary/20 text-sm animate-slide-in-up" style={{ animationDelay: `${idx * 80}ms` }}>
                <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>{measure}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
