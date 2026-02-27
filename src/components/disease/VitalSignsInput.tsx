import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HeartPulse, Thermometer, Activity, Wind } from "lucide-react";

export interface VitalSigns {
  bloodPressureSystolic: string;
  bloodPressureDiastolic: string;
  heartRate: string;
  temperature: string;
  spO2: string;
}

interface VitalSignsInputProps {
  vitals: VitalSigns;
  onVitalsChange: (vitals: VitalSigns) => void;
}

const vitalFields = [
  { key: "bloodPressureSystolic" as const, label: "BP Systolic", unit: "mmHg", icon: Activity, placeholder: "120", normal: "90-120" },
  { key: "bloodPressureDiastolic" as const, label: "BP Diastolic", unit: "mmHg", icon: Activity, placeholder: "80", normal: "60-80" },
  { key: "heartRate" as const, label: "Heart Rate", unit: "bpm", icon: HeartPulse, placeholder: "72", normal: "60-100" },
  { key: "temperature" as const, label: "Temperature", unit: "°F", icon: Thermometer, placeholder: "98.6", normal: "97-99" },
  { key: "spO2" as const, label: "SpO2", unit: "%", icon: Wind, placeholder: "98", normal: "95-100" },
];

export default function VitalSignsInput({ vitals, onVitalsChange }: VitalSignsInputProps) {
  const handleChange = (key: keyof VitalSigns, value: string) => {
    onVitalsChange({ ...vitals, [key]: value });
  };

  const getStatus = (key: keyof VitalSigns, value: string) => {
    if (!value) return "neutral";
    const num = parseFloat(value);
    if (isNaN(num)) return "neutral";
    const ranges: Record<string, [number, number]> = {
      bloodPressureSystolic: [90, 120],
      bloodPressureDiastolic: [60, 80],
      heartRate: [60, 100],
      temperature: [97, 99],
      spO2: [95, 100],
    };
    const [low, high] = ranges[key];
    if (num < low || num > high) return "warning";
    return "normal";
  };

  return (
    <Card variant="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <HeartPulse className="h-5 w-5 text-destructive" />
          Vital Signs Monitor
        </CardTitle>
        <p className="text-sm text-muted-foreground">Enter your current vitals for more accurate diagnosis</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {vitalFields.map((field) => {
            const status = getStatus(field.key, vitals[field.key]);
            const Icon = field.icon;
            return (
              <div
                key={field.key}
                className={`p-3 rounded-xl border transition-all ${
                  status === "warning" ? "border-destructive/40 bg-destructive/5" :
                  status === "normal" ? "border-green-500/40 bg-green-500/5" :
                  "border-border bg-secondary/30"
                }`}
              >
                <div className="flex items-center gap-1.5 mb-2">
                  <Icon className={`h-3.5 w-3.5 ${
                    status === "warning" ? "text-destructive" :
                    status === "normal" ? "text-green-500" :
                    "text-muted-foreground"
                  }`} />
                  <Label className="text-xs font-medium">{field.label}</Label>
                </div>
                <Input
                  type="number"
                  placeholder={field.placeholder}
                  value={vitals[field.key]}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className="h-8 text-sm"
                />
                <p className="text-[10px] text-muted-foreground mt-1">Normal: {field.normal} {field.unit}</p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
