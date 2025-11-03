import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";

interface AnalysisProgressProps {
  onComplete: () => void;
}

export const AnalysisProgress = ({ onComplete }: AnalysisProgressProps) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState("Preprocessing image...");

  useEffect(() => {
    const stages = [
      { progress: 20, text: "Preprocessing image..." },
      { progress: 40, text: "Loading DenseNet121 model..." },
      { progress: 60, text: "Extracting features..." },
      { progress: 80, text: "Analyzing tissue patterns..." },
      { progress: 100, text: "Generating results..." },
    ];

    let currentStage = 0;
    const interval = setInterval(() => {
      if (currentStage < stages.length) {
        setProgress(stages[currentStage].progress);
        setStage(stages[currentStage].text);
        currentStage++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 500);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <Card className="p-8">
      <div className="space-y-6">
        <div className="flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        </div>
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-center">Analyzing Image</h3>
          <p className="text-sm text-muted-foreground text-center">{stage}</p>
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-muted-foreground text-center">{progress}% Complete</p>
        </div>
      </div>
    </Card>
  );
};
