import { useState } from "react";
import { Search, HelpCircle, Settings } from "lucide-react";
import { URLInputPanel } from "@/components/url-input-panel";
import { AnalysisResults } from "@/components/analysis-results";
import { GooglePreview } from "@/components/google-preview";
import { SocialPreviews } from "@/components/social-previews";
import { MobilePreview } from "@/components/mobile-preview";
import { Card } from "@/components/ui/card";
import { type SeoAnalysisResult } from "@shared/schema";

export default function Home() {
  const [analysisResult, setAnalysisResult] = useState<SeoAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm sticky top-0 z-40 bg-animated backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Search className="text-2xl text-primary mr-3 h-8 w-8 animate-glow-pulse" />
                <h1 className="text-xl font-bold text-foreground font-display glitch-text">SEO Analyzer</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                className="text-muted-foreground hover:text-accent transition-all duration-300 hover:scale-110 neon-glow p-2 rounded-lg button-3d"
                data-testid="button-help"
              >
                <HelpCircle className="h-5 w-5" />
              </button>
              <button 
                className="text-muted-foreground hover:text-accent transition-all duration-300 hover:scale-110 neon-glow p-2 rounded-lg button-3d"
                data-testid="button-settings"
              >
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">

          {/* Left Sidebar - URL Input & Controls */}
          <div className="xl:col-span-1">
            <div className="sticky top-24">
              <URLInputPanel 
                onAnalysisResult={setAnalysisResult} 
                isAnalyzing={isAnalyzing}
                setIsAnalyzing={setIsAnalyzing}
                analysisResult={analysisResult}
              />
            </div>
          </div>

          {/* Main Analysis Area */}
          <div className="xl:col-span-3">
            {analysisResult ? (
              <AnalysisResults result={analysisResult} />
            ) : (
              <Card className="border border-border shadow-sm card-3d animate-scale-in bg-animated h-full min-h-[400px] flex items-center justify-center">
                <div className="text-center p-8">
                  <Search className="h-16 w-16 text-accent mx-auto mb-4 animate-float" />
                  <h2 className="text-xl font-semibold text-foreground mb-2 font-display">
                    Ready to Analyze
                  </h2>
                  <p className="text-muted-foreground">
                    Enter a website URL in the panel to get started with SEO analysis.
                  </p>
                </div>
              </Card>
            )}
          </div>

        </div>

        {/* Preview Section */}
        {analysisResult && (
          <div className="mt-12 animate-slide-in-up">
            <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center font-display">
              <Search className="text-primary mr-3 h-8 w-8 animate-glow-pulse" />
              Search & Social Previews
            </h2>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <Card className="card-3d bg-animated p-6 animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
                <GooglePreview result={analysisResult} />
              </Card>
              <Card className="card-3d bg-animated p-6 animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
                <SocialPreviews result={analysisResult} />
              </Card>
            </div>
          </div>
        )}

      </div>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Search className="text-primary mr-2 h-6 w-6 animate-glow-pulse" />
              <span className="text-lg font-bold text-foreground font-display">SEO Analyzer</span>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Analyze your website's SEO performance and get actionable insights to improve your search rankings.
            </p>
            <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground">
              <span>© 2024 SEO Analyzer</span>
              <span>•</span>
              <span>Built with React & TypeScript</span>
              <span>•</span>
              <span>Powered by Modern Web Technologies</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}