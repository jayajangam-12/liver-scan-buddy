import { useState } from "react";
import { ImageUpload } from "@/components/ImageUpload";
import { AnalysisProgress } from "@/components/AnalysisProgress";
import { ResultsDashboard } from "@/components/ResultsDashboard";
import { Button } from "@/components/ui/button";
import { Microscope, RotateCcw } from "lucide-react";

type AnalysisStage = "upload" | "analyzing" | "results";

interface AnalysisResult {
  classification: "malignant" | "benign" | "indeterminate";
  confidence: number;
  tumorPresent: boolean;
  detectionScore: number;
  cellularDensity: number;
  tissueDifferentiation: string;
  timestamp: string;
}

const Index = () => {
  const [stage, setStage] = useState<AnalysisStage>("upload");
  const [imagePreview, setImagePreview] = useState<string>("");
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleImageUpload = (file: File, preview: string) => {
    setImagePreview(preview);
    setStage("analyzing");
  };

  const handleAnalysisComplete = () => {
    // Simulate DenseNet121 analysis results
    const mockResult: AnalysisResult = {
      classification: Math.random() > 0.5 ? "malignant" : "benign",
      confidence: Math.floor(Math.random() * 15 + 85),
      tumorPresent: Math.random() > 0.3,
      detectionScore: Math.floor(Math.random() * 20 + 75),
      cellularDensity: Math.floor(Math.random() * 30 + 60),
      tissueDifferentiation: ["Well differentiated", "Moderately differentiated", "Poorly differentiated"][
        Math.floor(Math.random() * 3)
      ],
      timestamp: new Date().toLocaleString(),
    };
    setResult(mockResult);
    setStage("results");
  };

  const handleReset = () => {
    setStage("upload");
    setImagePreview("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Microscope className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">LiverScope AI</h1>
                <p className="text-xs text-muted-foreground">DenseNet121 Tumor Detection</p>
              </div>
            </div>
            {stage === "results" && (
              <Button onClick={handleReset} variant="outline" size="sm">
                <RotateCcw className="w-4 h-4 mr-2" />
                New Analysis
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {stage === "upload" && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-foreground">
                  Liver Tumor Detection
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Upload histopathology images for AI-powered analysis using DenseNet121 deep learning model
                </p>
              </div>
              <div className="max-w-2xl mx-auto">
                <ImageUpload onImageUpload={handleImageUpload} />
              </div>
            </div>
          )}

          {stage === "analyzing" && (
            <div className="max-w-2xl mx-auto">
              <AnalysisProgress onComplete={handleAnalysisComplete} />
            </div>
          )}

          {stage === "results" && result && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-foreground">Analysis Results</h2>
                <p className="text-muted-foreground">
                  Completed at {result.timestamp}
                </p>
              </div>
              <ResultsDashboard result={result} imagePreview={imagePreview} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
