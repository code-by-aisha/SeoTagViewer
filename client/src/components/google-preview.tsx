import { Globe, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type SeoAnalysisResult } from "@shared/schema";

interface GooglePreviewProps {
  result: SeoAnalysisResult;
}

export function GooglePreview({ result }: GooglePreviewProps) {
  const truncateDescription = (text: string, maxLength: number = 160) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Globe className="text-primary mr-2 h-5 w-5" />
          Google Search Result
        </CardTitle>
      </CardHeader>
      <CardContent>
        
        <div className="bg-white border rounded-lg p-4 shadow-sm" data-testid="google-preview">
          <div className="mb-4">
            <div className="flex items-center text-xs text-green-700 mb-1">
              <Globe className="mr-1 h-3 w-3" />
              <span data-testid="text-preview-url">{result.url}</span>
              <svg className="ml-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <h4 className="text-lg text-blue-800 hover:underline cursor-pointer mb-1" data-testid="text-preview-title">
              {result.metaTags.title || "Untitled Page"}
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed" data-testid="text-preview-description">
              {result.metaTags.description ? 
                truncateDescription(result.metaTags.description) : 
                "No meta description available for this page."
              }
            </p>
          </div>
          
          <div className="border-t pt-3">
            <div className="flex items-center text-xs text-gray-500">
              <span>About this result</span>
              <Info className="ml-1 h-3 w-3" />
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-muted/50 rounded-md">
          <p className="text-xs text-muted-foreground">
            <Info className="inline mr-1 h-3 w-3" />
            This preview shows how your page would appear in Google search results.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
