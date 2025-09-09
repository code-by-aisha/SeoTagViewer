import { Facebook, Twitter, Info } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { type SeoAnalysisResult } from "@shared/schema";

interface SocialPreviewsProps {
  result: SeoAnalysisResult;
}

export function SocialPreviews({ result }: SocialPreviewsProps) {
  const getOgImage = () => {
    return result.metaTags.ogImage || "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400";
  };

  const getTwitterImage = () => {
    return result.metaTags.twitterImage || result.metaTags.ogImage || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400";
  };

  return (
    <div className="space-y-8">

      {/* Facebook Preview */}
      <Card className="card-3d bg-animated">
        <CardHeader>
          <CardTitle className="flex items-center text-lg font-display">
            <Facebook className="text-blue-600 mr-2 h-5 w-5 animate-glow-pulse" />
            Facebook Share Preview
          </CardTitle>
        </CardHeader>
        <CardContent>

          <div className="bg-white border rounded-lg overflow-hidden shadow-sm" data-testid="facebook-preview">
            <img
              src={getOgImage()}
              alt="Open Graph preview image"
              className="w-full h-40 object-cover"
            />

            <div className="p-4">
              <div className="text-xs text-gray-500 mb-1 uppercase" data-testid="text-facebook-domain">
                {new URL(result.url).hostname}
              </div>
              <h4 className="text-sm font-semibold text-gray-900 mb-1" data-testid="text-facebook-title">
                {result.metaTags.ogTitle || result.metaTags.title || "Untitled Page"}
              </h4>
              <p className="text-xs text-gray-600" data-testid="text-facebook-description">
                {result.metaTags.ogDescription || result.metaTags.description || "No description available"}
              </p>
            </div>
          </div>

          <div className="mt-4 p-3 bg-muted/50 rounded-md">
            <p className="text-xs text-muted-foreground">
              <Info className="inline mr-1 h-3 w-3" />
              Preview uses Open Graph meta tags (og:title, og:description, og:image).
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Twitter Preview */}
      <Card className="card-3d bg-animated">
        <CardHeader>
          <CardTitle className="flex items-center text-lg font-display">
            <Twitter className="text-blue-400 mr-2 h-5 w-5 animate-glow-pulse" />
            Twitter Card Preview
          </CardTitle>
        </CardHeader>
        <CardContent>

          <div className="bg-white border rounded-lg overflow-hidden shadow-sm max-w-lg" data-testid="twitter-preview">
            <div className="p-4 border-b">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                <div>
                  <div className="text-sm font-semibold">User Name</div>
                  <div className="text-xs text-gray-500">@username • 2h</div>
                </div>
              </div>
              <p className="text-sm mt-3">Check out this awesome website!</p>
            </div>

            <div className="border rounded-lg overflow-hidden m-4 mt-0">
              <img
                src={getTwitterImage()}
                alt="Twitter card preview image"
                className="w-full h-32 object-cover"
              />

              <div className="p-3 bg-gray-50 border-t">
                <div className="text-xs text-gray-500 mb-1" data-testid="text-twitter-domain">
                  {new URL(result.url).hostname}
                </div>
                <h4 className="text-sm font-semibold text-gray-900 mb-1" data-testid="text-twitter-title">
                  {result.metaTags.twitterTitle || result.metaTags.title || "Untitled Page"}
                </h4>
                <p className="text-xs text-gray-600" data-testid="text-twitter-description">
                  {result.metaTags.twitterDescription ||
                   result.metaTags.description ||
                   "No Twitter card description available"}
                </p>
              </div>
            </div>
          </div>

          <div className={`mt-4 p-3 rounded-md ${
            !result.metaTags.twitterCard ?
            'bg-destructive/10 border border-destructive/20' :
            'bg-muted/50'
          }`}>
            <p className={`text-xs ${
              !result.metaTags.twitterCard ? 'text-destructive' : 'text-muted-foreground'
            }`}>
              {!result.metaTags.twitterCard ? (
                <>
                  <Twitter className="inline mr-1 h-3 w-3" />
                  Twitter Card tags are missing. Add twitter:card, twitter:title, and twitter:description for better social sharing.
                </>
              ) : (
                <>
                  <Info className="inline mr-1 h-3 w-3" />
                  Preview uses Twitter Card meta tags (twitter:card, twitter:title, twitter:description).
                </>
              )}
            </p>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}