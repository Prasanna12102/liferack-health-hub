import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface BodyRegion {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  organs: string[];
}

const bodyRegions: BodyRegion[] = [
  { id: "head", name: "Head & Brain", x: 42, y: 2, width: 16, height: 12, organs: ["Brain", "Eyes", "Ears", "Sinuses"] },
  { id: "throat", name: "Throat & Neck", x: 44, y: 14, width: 12, height: 6, organs: ["Thyroid", "Tonsils", "Larynx"] },
  { id: "chest-left", name: "Left Chest", x: 34, y: 20, width: 16, height: 16, organs: ["Heart", "Left Lung"] },
  { id: "chest-right", name: "Right Chest", x: 50, y: 20, width: 16, height: 16, organs: ["Right Lung", "Bronchi"] },
  { id: "upper-abdomen", name: "Upper Abdomen", x: 36, y: 36, width: 28, height: 10, organs: ["Liver", "Stomach", "Pancreas", "Spleen"] },
  { id: "lower-abdomen", name: "Lower Abdomen", x: 36, y: 46, width: 28, height: 12, organs: ["Intestines", "Kidneys", "Appendix"] },
  { id: "pelvis", name: "Pelvic Region", x: 38, y: 58, width: 24, height: 8, organs: ["Bladder", "Reproductive Organs"] },
  { id: "left-arm", name: "Left Arm", x: 20, y: 22, width: 14, height: 30, organs: ["Joints", "Muscles", "Nerves"] },
  { id: "right-arm", name: "Right Arm", x: 66, y: 22, width: 14, height: 30, organs: ["Joints", "Muscles", "Nerves"] },
  { id: "left-leg", name: "Left Leg", x: 34, y: 66, width: 14, height: 32, organs: ["Knee", "Hip Joint", "Muscles"] },
  { id: "right-leg", name: "Right Leg", x: 52, y: 66, width: 14, height: 32, organs: ["Knee", "Hip Joint", "Muscles"] },
];

interface BodyMapScannerProps {
  selectedRegions: string[];
  onRegionToggle: (regionId: string) => void;
}

export default function BodyMapScanner({ selectedRegions, onRegionToggle }: BodyMapScannerProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const getRegionColor = (regionId: string) => {
    if (selectedRegions.includes(regionId)) return "fill-destructive/40 stroke-destructive";
    if (hoveredRegion === regionId) return "fill-accent/20 stroke-accent";
    return "fill-primary/5 stroke-primary/20";
  };

  return (
    <Card variant="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          🫀 Body Map Scanner
        </CardTitle>
        <p className="text-sm text-muted-foreground">Click on body areas where you feel discomfort</p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Body Map SVG */}
          <div className="relative flex-1 min-h-[400px] bg-secondary/30 rounded-2xl p-4 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full max-w-[250px] h-auto">
              {/* Body outline */}
              <ellipse cx="50" cy="8" rx="7" ry="8" className="fill-muted stroke-muted-foreground/30" strokeWidth="0.5" />
              <rect x="44" y="16" width="12" height="4" rx="2" className="fill-muted stroke-muted-foreground/30" strokeWidth="0.5" />
              <path d="M 36 20 Q 36 18 40 18 L 60 18 Q 64 18 64 20 L 66 36 Q 68 52 62 52 L 38 52 Q 32 52 34 36 Z" className="fill-muted stroke-muted-foreground/30" strokeWidth="0.5" />
              <path d="M 36 20 L 24 28 Q 20 30 22 50 L 24 52" className="fill-muted stroke-muted-foreground/30" strokeWidth="0.5" />
              <path d="M 64 20 L 76 28 Q 80 30 78 50 L 76 52" className="fill-muted stroke-muted-foreground/30" strokeWidth="0.5" />
              <path d="M 38 52 L 36 66 L 34 98" className="fill-none stroke-muted-foreground/30" strokeWidth="8" strokeLinecap="round" />
              <path d="M 62 52 L 64 66 L 66 98" className="fill-none stroke-muted-foreground/30" strokeWidth="8" strokeLinecap="round" />

              {/* Clickable regions */}
              {bodyRegions.map((region) => (
                <rect
                  key={region.id}
                  x={region.x}
                  y={region.y}
                  width={region.width}
                  height={region.height}
                  rx="2"
                  className={cn(
                    "cursor-pointer transition-all duration-300",
                    getRegionColor(region.id)
                  )}
                  strokeWidth="0.5"
                  opacity="0.7"
                  onMouseEnter={() => setHoveredRegion(region.id)}
                  onMouseLeave={() => setHoveredRegion(null)}
                  onClick={() => onRegionToggle(region.id)}
                />
              ))}

              {/* Pulse animation on selected regions */}
              {selectedRegions.map((regionId) => {
                const region = bodyRegions.find(r => r.id === regionId);
                if (!region) return null;
                return (
                  <circle
                    key={`pulse-${regionId}`}
                    cx={region.x + region.width / 2}
                    cy={region.y + region.height / 2}
                    r="3"
                    className="fill-destructive animate-pulse-slow"
                    opacity="0.6"
                  />
                );
              })}
            </svg>

            {/* Hover tooltip */}
            {hoveredRegion && (
              <div className="absolute top-4 right-4 glass-card rounded-xl p-3 animate-fade-in">
                <p className="text-sm font-semibold">{bodyRegions.find(r => r.id === hoveredRegion)?.name}</p>
                <p className="text-xs text-muted-foreground">Click to select</p>
              </div>
            )}
          </div>

          {/* Selected regions list */}
          <div className="flex-1 space-y-3">
            <p className="text-sm font-medium">Selected Areas ({selectedRegions.length})</p>
            {selectedRegions.length === 0 ? (
              <p className="text-sm text-muted-foreground italic">Click on body areas to select affected regions</p>
            ) : (
              <div className="space-y-2 max-h-[350px] overflow-y-auto pr-2">
                {selectedRegions.map((regionId) => {
                  const region = bodyRegions.find(r => r.id === regionId);
                  if (!region) return null;
                  return (
                    <div
                      key={regionId}
                      className="p-3 rounded-xl bg-destructive/5 border border-destructive/20 animate-scale-in cursor-pointer hover:bg-destructive/10 transition-colors"
                      onClick={() => onRegionToggle(regionId)}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{region.name}</span>
                        <span className="text-xs text-muted-foreground">✕</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {region.organs.map((organ) => (
                          <Badge key={organ} variant="outline" className="text-xs border-destructive/30 text-destructive">
                            {organ}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
