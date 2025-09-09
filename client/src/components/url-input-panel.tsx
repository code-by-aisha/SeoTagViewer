import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Globe, Search, ExternalLink, FileDown, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { apiRequest } from "@/lib/queryClient";
import { seoAnalysisRequestSchema, type SeoAnalysisRequest, type SeoAnalysisResult } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

interface URLInputPanelProps {
  onAnalysisResult: (result: SeoAnalysisResult) => void;
  isAnalyzing: boolean;
  setIsAnalyzing: (analyzing: boolean) => void;
  analysisResult: SeoAnalysisResult | null;
}

export function URLInputPanel({ onAnalysisResult, isAnalyzing, setIsAnalyzing, analysisResult }: URLInputPanelProps) {
  const { toast } = useToast();

  const form = useForm<SeoAnalysisRequest>({
    resolver: zodResolver(seoAnalysisRequestSchema),
    defaultValues: {
      url: "",
    },
  });

  const analyzeMutation = useMutation({
    mutationFn: async (data: SeoAnalysisRequest) => {
      const response = await apiRequest("POST", "/api/seo/analyze", data);
      return response.json();
    },
    onMutate: () => {
      setIsAnalyzing(true);
    },
    onSuccess: (result: SeoAnalysisResult) => {
      onAnalysisResult(result);
      toast({
        title: "Analysis Complete",
        description: `SEO analysis completed with a score of ${result.score}/100`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Analysis Failed",
        description: error.message || "Failed to analyze the website. Please try again.",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsAnalyzing(false);
    },
  });

  const onSubmit = (data: SeoAnalysisRequest) => {
    analyzeMutation.mutate(data);
  };

  const handleExportPDF = () => {
    // TODO: Implement PDF export
    toast({
      title: "Coming Soon",
      description: "PDF export functionality will be available soon.",
    });
  };

  const handleExportCSV = () => {
    // TODO: Implement CSV export
    toast({
      title: "Coming Soon", 
      description: "CSV export functionality will be available soon.",
    });
  };

  return (
    <Card className="sticky top-24 z-20 card-3d bg-animated animate-scale-in mb-8 w-full max-w-sm">
      <CardContent className="p-5">
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center font-display">
          <Globe className="text-primary mr-2 h-5 w-5 animate-glow-pulse" />
          Website Analysis
        </h2>

        {/* URL Input Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website URL</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="example.com (https:// will be added automatically)"
                        className="pr-10 input-futuristic"
                        data-testid="input-url"
                        {...field}
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Enter any website URL (https:// is added automatically)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full button-3d neon-glow"
              disabled={isAnalyzing}
              data-testid="button-analyze"
            >
              {isAnalyzing ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Analyzing...
                </div>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Analyze SEO
                </>
              )}
            </Button>
          </form>
        </Form>

        {/* Quick Stats */}
        {analysisResult && (
          <div className="mt-6 pt-6 border-t border-border">
            <h3 className="text-sm font-medium text-foreground mb-3">Quick Overview</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary" data-testid="text-score">
                  {analysisResult.score}
                </div>
                <div className="text-xs text-muted-foreground">SEO Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-chart-2" data-testid="text-issues">
                  {analysisResult.issues.filter(issue => issue.severity === 'critical' || issue.severity === 'high').length}
                </div>
                <div className="text-xs text-muted-foreground">Critical Issues</div>
              </div>
            </div>
          </div>
        )}

        {/* Export Options */}
        {analysisResult && (
          <div className="mt-6 pt-6 border-t border-border">
            <h3 className="text-sm font-medium text-foreground mb-3">Export Analysis</h3>
            <div className="flex space-x-2">
              <Button 
                variant="secondary" 
                size="sm" 
                className="flex-1 button-3d"
                onClick={handleExportPDF}
                data-testid="button-export-pdf"
              >
                <FileText className="mr-1 h-3 w-3" />
                PDF
              </Button>
              <Button 
                variant="secondary" 
                size="sm" 
                className="flex-1 button-3d"
                onClick={handleExportCSV}
                data-testid="button-export-csv"
              >
                <FileDown className="mr-1 h-3 w-3" />
                CSV
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}