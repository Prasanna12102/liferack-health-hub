import { useState } from "react";
import {
  Upload,
  FileText,
  Camera,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const recentUploads = [
  {
    id: 1,
    name: "Complete Blood Count",
    date: "Dec 15, 2024",
    status: "normal",
    analyzed: true,
  },
  {
    id: 2,
    name: "Lipid Profile",
    date: "Dec 10, 2024",
    status: "abnormal",
    analyzed: true,
  },
  {
    id: 3,
    name: "Thyroid Panel",
    date: "Dec 5, 2024",
    status: "normal",
    analyzed: true,
  },
  {
    id: 4,
    name: "Liver Function Test",
    date: "Nov 28, 2024",
    status: "normal",
    analyzed: true,
  },
];

const testResults = [
  { name: "Hemoglobin", value: "14.2 g/dL", range: "13.5-17.5", status: "normal", trend: "up" },
  { name: "WBC Count", value: "7,500/μL", range: "4,500-11,000", status: "normal", trend: "stable" },
  { name: "Cholesterol", value: "220 mg/dL", range: "< 200", status: "high", trend: "up" },
  { name: "Blood Sugar", value: "95 mg/dL", range: "70-100", status: "normal", trend: "down" },
  { name: "Vitamin D", value: "28 ng/mL", range: "30-100", status: "low", trend: "up" },
];

export default function MedicalReports() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    simulateUpload();
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold">Medical Report Analyzer</h1>
        <p className="text-muted-foreground mt-1">
          Upload and analyze your medical reports with AI-powered insights
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card variant="glass" className="animate-slide-in-up">
            <CardHeader>
              <CardTitle>Upload Report</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="upload" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="upload">Drag & Drop</TabsTrigger>
                  <TabsTrigger value="scan">Scan Document</TabsTrigger>
                  <TabsTrigger value="manual">Manual Entry</TabsTrigger>
                </TabsList>

                <TabsContent value="upload">
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={cn(
                      "border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300",
                      isDragging
                        ? "border-primary bg-primary/5 scale-[1.02]"
                        : "border-border hover:border-primary/50 hover:bg-secondary/30"
                    )}
                  >
                    <div className="flex flex-col items-center gap-4">
                      <div
                        className={cn(
                          "h-16 w-16 rounded-2xl flex items-center justify-center transition-all duration-300",
                          isDragging ? "gradient-primary scale-110" : "bg-secondary"
                        )}
                      >
                        <Upload
                          className={cn(
                            "h-8 w-8",
                            isDragging ? "text-primary-foreground" : "text-muted-foreground"
                          )}
                        />
                      </div>
                      <div>
                        <p className="text-lg font-medium">
                          {isDragging ? "Drop your file here" : "Drag & drop your report"}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          or click to browse (PDF, JPG, PNG)
                        </p>
                      </div>
                      <Button variant="outline" onClick={simulateUpload}>
                        Browse Files
                      </Button>
                    </div>
                  </div>

                  {isUploading && (
                    <div className="mt-6 animate-fade-in">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Uploading...</span>
                        <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} className="h-2" />
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="scan">
                  <div className="border-2 border-dashed rounded-2xl p-12 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="h-16 w-16 rounded-2xl bg-secondary flex items-center justify-center">
                        <Camera className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-lg font-medium">Scan Document</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Use your camera to scan a physical report
                        </p>
                      </div>
                      <Button variant="gradient">
                        <Camera className="mr-2 h-4 w-4" />
                        Open Camera
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="manual">
                  <div className="border-2 border-dashed rounded-2xl p-12 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="h-16 w-16 rounded-2xl bg-secondary flex items-center justify-center">
                        <FileText className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-lg font-medium">Manual Entry</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Enter test values manually
                        </p>
                      </div>
                      <Button variant="gradient">Enter Values</Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Analysis Results */}
          <Card variant="glass" className="animate-slide-in-up" style={{ animationDelay: "100ms" }}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Latest Analysis Results</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Complete Blood Count - Dec 15, 2024
                </p>
              </div>
              <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Normal
              </span>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {testResults.map((test, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          "h-3 w-3 rounded-full",
                          test.status === "normal" && "bg-green-500",
                          test.status === "high" && "bg-red-500",
                          test.status === "low" && "bg-amber-500"
                        )}
                      />
                      <div>
                        <p className="font-medium">{test.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Normal range: {test.range}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-semibold">{test.value}</span>
                      {test.trend === "up" && (
                        <TrendingUp className="h-5 w-5 text-green-500" />
                      )}
                      {test.trend === "down" && (
                        <TrendingDown className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Uploads */}
          <Card variant="glass" className="animate-slide-in-right">
            <CardHeader>
              <CardTitle className="text-lg">Recent Uploads</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentUploads.map((report, index) => (
                <div
                  key={report.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-all cursor-pointer hover:scale-[1.02]"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
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
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{report.name}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {report.date}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Health Tips */}
          <Card variant="glass" className="animate-slide-in-right" style={{ animationDelay: "100ms" }}>
            <CardHeader>
              <CardTitle className="text-lg">AI Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                <p className="text-sm font-medium text-amber-800">
                  ⚠️ High Cholesterol Detected
                </p>
                <p className="text-xs text-amber-600 mt-1">
                  Consider reducing saturated fat intake and increasing physical activity.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                <p className="text-sm font-medium text-blue-800">
                  💡 Vitamin D Supplement
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  Your Vitamin D levels are slightly low. Consider supplements or more sun exposure.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
