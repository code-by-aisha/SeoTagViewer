import { Smartphone, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type SeoAnalysisResult } from "@shared/schema";

interface MobilePreviewProps {
  result: SeoAnalysisResult;
}

export function MobilePreview({ result }: MobilePreviewProps) {
  const truncateDescription = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <Card className="card-3d bg-animated">
      <CardHeader>
        <CardTitle className="flex items-center text-lg font-display">
          <Smartphone className="text-primary mr-2 h-5 w-5 animate-glow-pulse" />
          Mobile Search Preview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center">
          <div className="preview-phone bg-white rounded-lg overflow-hidden shadow-xl" data-testid="mobile-preview">
            <div className="h-full p-4 pt-8">
              {/* Mobile search interface */}
              <div className="bg-gray-100 rounded-full p-3 mb-4">
                <div className="flex items-center">
                  <svg className="h-4 w-4 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="text-gray-600 text-sm" data-testid="text-mobile-search">
                    {new URL(result.url).hostname}
                  </span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="pb-4">
                  <div className="flex items-center text-xs text-green-700 mb-1">
                    <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <span data-testid="text-mobile-url">{result.url}</span>
                  </div>
                  <h4 className="text-blue-700 font-medium mb-1 leading-tight" data-testid="text-mobile-title">
                    {result.metaTags.title || "Untitled Page"}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed" data-testid="text-mobile-description">
                    {result.metaTags.description ? 
                      truncateDescription(result.metaTags.description) : 
                      "No meta description available for this page."
                    }
                  </p>
                </div>
                
                <div className="border-t pt-4">
                  <div className="text-xs text-gray-500 mb-2">Related searches</div>
                  <div className="space-y-2">
                    <div className="text-sm text-blue-700">SEO optimization</div>
                    <div className="text-sm text-blue-700">Meta tags checker</div>
                    <div className="text-sm text-blue-700">Website analysis</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-3 bg-muted/50 rounded-md text-center">
          <p className="text-xs text-muted-foreground">
            <Info className="inline mr-1 h-3 w-3" />
            Mobile search results are optimized for smaller screens and shorter attention spans.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
