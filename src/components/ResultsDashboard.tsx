import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Activity, 
  AlertCircle, 
  CheckCircle2, 
  TrendingUp,
  FileImage
} from "lucide-react";

interface AnalysisResult {
  classification: "malignant" | "benign" | "indeterminate";
  confidence: number;
  tumorPresent: boolean;
  detectionScore: number;
  cellularDensity: number;
  tissueDifferentiation: string;
  timestamp: string;
}

interface ResultsDashboardProps {
  result: AnalysisResult;
  imagePreview: string;
}

export const ResultsDashboard = ({ result, imagePreview }: ResultsDashboardProps) => {
  const getClassificationColor = () => {
    switch (result.classification) {
      case "malignant":
        return "destructive";
      case "benign":
        return "success";
      default:
        return "warning";
    }
  };

  const getClassificationIcon = () => {
    switch (result.classification) {
      case "malignant":
        return <AlertCircle className="w-5 h-5" />;
      case "benign":
        return <CheckCircle2 className="w-5 h-5" />;
      default:
        return <Activity className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Classification</CardTitle>
            {getClassificationIcon()}
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Badge variant={getClassificationColor()} className="text-sm capitalize">
                {result.classification}
              </Badge>
              <p className="text-xs text-muted-foreground">
                Confidence: {result.confidence}%
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tumor Detection</CardTitle>
            <TrendingUp className="w-5 h-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-2xl font-bold">
                {result.tumorPresent ? "Detected" : "Not Detected"}
              </p>
              <Progress value={result.detectionScore} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Score: {result.detectionScore}%
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cellular Density</CardTitle>
            <Activity className="w-5 h-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-2xl font-bold">{result.cellularDensity}%</p>
              <Progress value={result.cellularDensity} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileImage className="w-5 h-5" />
              Original Image
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
              <img
                src={imagePreview}
                alt="Histopathology"
                className="w-full h-full object-cover"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Analysis Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Model</span>
                <span className="font-medium">DenseNet121</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tissue Type</span>
                <span className="font-medium">Liver</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Differentiation</span>
                <span className="font-medium">{result.tissueDifferentiation}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Analysis Time</span>
                <span className="font-medium">{result.timestamp}</span>
              </div>
            </div>

            <div className="pt-4 border-t space-y-3">
              <h4 className="text-sm font-semibold">Confidence Metrics</h4>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Overall Confidence</span>
                    <span>{result.confidence}%</span>
                  </div>
                  <Progress value={result.confidence} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Detection Accuracy</span>
                    <span>{result.detectionScore}%</span>
                  </div>
                  <Progress value={result.detectionScore} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
