import { CheckCircle, AlertTriangle, XCircle, Tag, Lightbulb, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { type SeoAnalysisResult } from "@shared/schema";

interface AnalysisResultsProps {
  result: SeoAnalysisResult;
}

export function AnalysisResults({ result }: AnalysisResultsProps) {
  const getStatusIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <XCircle className="h-4 w-4" />;
      case 'high':
        return <AlertTriangle className="h-4 w-4" />;
      case 'medium':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'destructive';
      case 'high':
        return 'destructive';
      case 'medium':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getProgressColor = (length: number, min: number, max: number) => {
    if (length < min || length > max) return 'bg-destructive';
    if (length < min + 10 || length > max - 10) return 'bg-chart-4';
    return 'bg-chart-2';
  };

  return (
    <div className="space-y-6 animate-slide-in-up">
      
      {/* Analysis Status Banner */}
      <div className="bg-chart-2/10 border border-chart-2/20 rounded-lg p-4 neon-glow card-3d">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <CheckCircle className="text-chart-2 h-5 w-5" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-foreground">
              Analysis Complete
            </h3>
            <p className="text-sm text-muted-foreground">
              SEO score: {result.score}/100 • {result.issues.length} issues found
            </p>
          </div>
        </div>
      </div>

      {/* Meta Tags Analysis */}
      <Card className="card-3d bg-animated">
        <CardHeader>
          <CardTitle className="flex items-center font-display">
            <Tag className="text-primary mr-2 h-5 w-5 animate-glow-pulse" />
            Meta Tags Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Title Tag */}
          <div className="border border-border rounded-lg p-4" data-testid="analysis-title">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center">
                <Badge 
                  variant={result.metaTags.title ? 
                    (result.characterCounts.title >= 30 && result.characterCounts.title <= 60 ? 'default' : 'secondary') 
                    : 'destructive'
                  }
                  className="mr-3"
                >
                  {result.metaTags.title ? 
                    (result.characterCounts.title >= 30 && result.characterCounts.title <= 60 ? (
                      <>
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Good
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="mr-1 h-3 w-3" />
                        Warning
                      </>
                    )) : (
                      <>
                        <XCircle className="mr-1 h-3 w-3" />
                        Missing
                      </>
                    )
                  }
                </Badge>
                <h3 className="text-sm font-medium text-foreground">Title Tag</h3>
              </div>
              <div className="text-xs text-muted-foreground">
                {result.characterCounts.title}/60 characters
              </div>
            </div>
            
            {result.metaTags.title ? (
              <>
                <div className="bg-muted rounded-md p-3 mb-3">
                  <code className="text-sm text-foreground font-mono" data-testid="text-title-content">
                    {result.metaTags.title}
                  </code>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex-1 bg-muted rounded-full h-2 mr-3">
                    <div 
                      className={`h-2 rounded-full ${getProgressColor(result.characterCounts.title, 30, 60)}`}
                      style={{ width: `${Math.min(100, (result.characterCounts.title / 60) * 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {Math.round((result.characterCounts.title / 60) * 100)}% of optimal
                  </span>
                </div>
              </>
            ) : (
              <div className="bg-destructive/10 border border-destructive/20 rounded-md p-3">
                <p className="text-xs text-destructive">
                  <XCircle className="inline mr-1 h-3 w-3" />
                  Title tag is missing. This is critical for SEO.
                </p>
              </div>
            )}
          </div>

          {/* Meta Description */}
          <div className="border border-border rounded-lg p-4" data-testid="analysis-description">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center">
                <Badge 
                  variant={result.metaTags.description ? 
                    (result.characterCounts.description >= 120 && result.characterCounts.description <= 160 ? 'default' : 'secondary') 
                    : 'destructive'
                  }
                  className="mr-3"
                >
                  {result.metaTags.description ? 
                    (result.characterCounts.description >= 120 && result.characterCounts.description <= 160 ? (
                      <>
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Good
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="mr-1 h-3 w-3" />
                        Warning
                      </>
                    )) : (
                      <>
                        <XCircle className="mr-1 h-3 w-3" />
                        Missing
                      </>
                    )
                  }
                </Badge>
                <h3 className="text-sm font-medium text-foreground">Meta Description</h3>
              </div>
              <div className="text-xs text-muted-foreground">
                {result.characterCounts.description}/160 characters
              </div>
            </div>
            
            {result.metaTags.description ? (
              <>
                <div className="bg-muted rounded-md p-3 mb-3">
                  <code className="text-sm text-foreground font-mono" data-testid="text-description-content">
                    {result.metaTags.description}
                  </code>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex-1 bg-muted rounded-full h-2 mr-3">
                    <div 
                      className={`h-2 rounded-full ${getProgressColor(result.characterCounts.description, 120, 160)}`}
                      style={{ width: `${Math.min(100, (result.characterCounts.description / 160) * 100)}%` }}
                    ></div>
                  </div>
                  <span className={`text-xs ${result.characterCounts.description > 160 ? 'text-chart-4' : 'text-muted-foreground'}`}>
                    {Math.round((result.characterCounts.description / 160) * 100)}%
                    {result.characterCounts.description > 160 ? ' (too long)' : ''}
                  </span>
                </div>
                {result.characterCounts.description > 160 && (
                  <div className="bg-chart-4/10 border border-chart-4/20 rounded-md p-3">
                    <p className="text-xs text-chart-4">
                      <Info className="inline mr-1 h-3 w-3" />
                      Description is {result.characterCounts.description - 160} characters too long and may be truncated in search results.
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-destructive/10 border border-destructive/20 rounded-md p-3">
                <p className="text-xs text-destructive">
                  <XCircle className="inline mr-1 h-3 w-3" />
                  Meta description is missing. This affects click-through rates.
                </p>
              </div>
            )}
          </div>

          {/* Open Graph Tags */}
          <div className="border border-border rounded-lg p-4" data-testid="analysis-opengraph">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center">
                <Badge 
                  variant={[result.metaTags.ogTitle, result.metaTags.ogDescription, result.metaTags.ogImage, result.metaTags.ogUrl].filter(Boolean).length >= 3 ? 'default' : 'destructive'}
                  className="mr-3"
                >
                  {[result.metaTags.ogTitle, result.metaTags.ogDescription, result.metaTags.ogImage, result.metaTags.ogUrl].filter(Boolean).length >= 3 ? (
                    <>
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Good
                    </>
                  ) : (
                    <>
                      <XCircle className="mr-1 h-3 w-3" />
                      Missing
                    </>
                  )}
                </Badge>
                <h3 className="text-sm font-medium text-foreground">Open Graph Tags</h3>
              </div>
              <span className="text-xs text-muted-foreground">
                {[result.metaTags.ogTitle, result.metaTags.ogDescription, result.metaTags.ogImage, result.metaTags.ogUrl].filter(Boolean).length}/4 present
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-muted rounded-md p-3">
                <div className="text-xs font-medium text-muted-foreground mb-1">og:title</div>
                <code className="text-xs text-foreground font-mono">
                  {result.metaTags.ogTitle || 'Not set'}
                </code>
              </div>
              <div className="bg-muted rounded-md p-3">
                <div className="text-xs font-medium text-muted-foreground mb-1">og:description</div>
                <code className="text-xs text-foreground font-mono">
                  {result.metaTags.ogDescription || 'Not set'}
                </code>
              </div>
              <div className="bg-muted rounded-md p-3">
                <div className="text-xs font-medium text-muted-foreground mb-1">og:image</div>
                <code className="text-xs text-foreground font-mono">
                  {result.metaTags.ogImage ? `${result.metaTags.ogImage.substring(0, 30)}...` : 'Not set'}
                </code>
              </div>
              <div className="bg-muted rounded-md p-3">
                <div className="text-xs font-medium text-muted-foreground mb-1">og:url</div>
                <code className="text-xs text-foreground font-mono">
                  {result.metaTags.ogUrl || 'Not set'}
                </code>
              </div>
            </div>
          </div>

          {/* Twitter Cards */}
          <div className="border border-border rounded-lg p-4" data-testid="analysis-twitter">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center">
                <Badge 
                  variant={[result.metaTags.twitterCard, result.metaTags.twitterTitle, result.metaTags.twitterDescription].filter(Boolean).length >= 2 ? 'default' : 'destructive'}
                  className="mr-3"
                >
                  {[result.metaTags.twitterCard, result.metaTags.twitterTitle, result.metaTags.twitterDescription].filter(Boolean).length >= 2 ? (
                    <>
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Good
                    </>
                  ) : (
                    <>
                      <XCircle className="mr-1 h-3 w-3" />
                      Missing
                    </>
                  )}
                </Badge>
                <h3 className="text-sm font-medium text-foreground">Twitter Card Tags</h3>
              </div>
              <span className="text-xs text-muted-foreground">
                {[result.metaTags.twitterCard, result.metaTags.twitterTitle, result.metaTags.twitterDescription].filter(Boolean).length}/3 present
              </span>
            </div>
            {[result.metaTags.twitterCard, result.metaTags.twitterTitle, result.metaTags.twitterDescription].filter(Boolean).length < 2 && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-md p-3">
                <p className="text-xs text-destructive">
                  <XCircle className="inline mr-1 h-3 w-3" />
                  Missing critical Twitter Card tags for optimal social sharing.
                </p>
              </div>
            )}
          </div>

        </CardContent>
      </Card>

      {/* Recommendations Panel */}
      <Card className="card-3d bg-animated">
        <CardHeader>
          <CardTitle className="flex items-center font-display">
            <Lightbulb className="text-chart-4 mr-2 h-5 w-5 animate-glow-pulse" />
            Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            
            {result.recommendations.map((rec, index) => (
              <div 
                key={index}
                className={`flex items-start p-4 rounded-lg border ${
                  rec.priority === 'critical' ? 'bg-destructive/10 border-destructive/20' :
                  rec.priority === 'high' ? 'bg-chart-4/10 border-chart-4/20' :
                  'bg-primary/10 border-primary/20'
                }`}
                data-testid={`recommendation-${index}`}
              >
                <div className="flex-shrink-0">
                  {getStatusIcon(rec.priority)}
                </div>
                <div className="ml-3 flex-1">
                  <h4 className="text-sm font-medium text-foreground">
                    {rec.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {rec.description}
                  </p>
                  <div className="mt-2">
                    <Badge 
                      variant={getStatusColor(rec.priority) as any}
                      className="text-xs"
                    >
                      {rec.priority.charAt(0).toUpperCase() + rec.priority.slice(1)} Priority
                    </Badge>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </CardContent>
      </Card>

    </div>
  );
}
