import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ChevronRight, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Question {
  id: number;
  question: string;
  options: string[];
}

const diagnosticQuestions: Question[] = [
  { id: 1, question: "How long have you been experiencing these symptoms?", options: ["Less than 24 hours", "1-3 days", "3-7 days", "More than a week"] },
  { id: 2, question: "How would you rate your pain level?", options: ["No pain", "Mild discomfort", "Moderate pain", "Severe pain"] },
  { id: 3, question: "Do you have any fever?", options: ["No fever", "Low grade (99-100°F)", "Moderate (100-102°F)", "High (above 102°F)"] },
  { id: 4, question: "Have you experienced any of these recently?", options: ["Travel to new area", "Contact with sick person", "Change in diet/lifestyle", "None of these"] },
  { id: 5, question: "Do you have any pre-existing conditions?", options: ["Diabetes", "Heart condition", "Respiratory issues", "None"] },
];

interface MultiStageDiagnosisProps {
  onComplete: (answers: Record<number, string>) => void;
  isComplete: boolean;
}

export default function MultiStageDiagnosis({ onComplete, isComplete }: MultiStageDiagnosisProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleAnswer = (questionId: number, answer: string) => {
    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);

    if (currentStep < diagnosticQuestions.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    } else {
      onComplete(newAnswers);
    }
  };

  const progress = ((Object.keys(answers).length) / diagnosticQuestions.length) * 100;

  return (
    <Card variant="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <HelpCircle className="h-5 w-5 text-primary" />
          Diagnostic Questions
        </CardTitle>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full gradient-primary rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground font-medium">
            {Object.keys(answers).length}/{diagnosticQuestions.length}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        {isComplete ? (
          <div className="text-center py-6 animate-scale-in">
            <div className="h-16 w-16 rounded-full gradient-success flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <p className="font-semibold">All questions answered!</p>
            <p className="text-sm text-muted-foreground">Your responses enhance prediction accuracy</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Step indicators */}
            <div className="flex items-center gap-1 mb-4">
              {diagnosticQuestions.map((_, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "h-1.5 flex-1 rounded-full transition-all duration-300",
                    idx < currentStep ? "gradient-primary" :
                    idx === currentStep ? "gradient-accent" :
                    "bg-secondary"
                  )}
                />
              ))}
            </div>

            {/* Current question */}
            <div className="animate-fade-in" key={currentStep}>
              <p className="text-base font-medium mb-4">
                {diagnosticQuestions[currentStep].question}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {diagnosticQuestions[currentStep].options.map((option) => (
                  <Button
                    key={option}
                    variant={answers[diagnosticQuestions[currentStep].id] === option ? "accent" : "outline"}
                    className="justify-start h-auto py-3 px-4 text-sm"
                    onClick={() => handleAnswer(diagnosticQuestions[currentStep].id, option)}
                  >
                    <ChevronRight className="h-4 w-4 mr-2 shrink-0" />
                    {option}
                  </Button>
                ))}
              </div>
            </div>

            {/* Previous answers */}
            {currentStep > 0 && (
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground mb-2">Previous Answers</p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(answers).map(([qId, answer]) => (
                    <Badge key={qId} variant="secondary" className="text-xs cursor-pointer" onClick={() => setCurrentStep(parseInt(qId) - 1)}>
                      Q{qId}: {answer}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
