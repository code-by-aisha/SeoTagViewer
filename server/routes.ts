import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { seoAnalyzer } from "./services/seo-analyzer";
import { seoAnalysisRequestSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // SEO Analysis endpoint
  app.post("/api/seo/analyze", async (req, res) => {
    try {
      const { url } = seoAnalysisRequestSchema.parse(req.body);
      
      // Check if we have a recent analysis for this URL
      const existingAnalysis = await storage.getSeoAnalysisByUrl(url);
      
      if (existingAnalysis && existingAnalysis.createdAt) {
        const analysisDate = new Date(existingAnalysis.createdAt);
        const hoursSince = (Date.now() - analysisDate.getTime()) / (1000 * 60 * 60);
        
        // Return cached result if less than 1 hour old
        if (hoursSince < 1) {
          return res.json({
            ...existingAnalysis,
            metaTags: {
              title: existingAnalysis.title,
              description: existingAnalysis.metaDescription,
              keywords: existingAnalysis.metaKeywords,
              ogTitle: existingAnalysis.ogTitle,
              ogDescription: existingAnalysis.ogDescription,
              ogImage: existingAnalysis.ogImage,
              ogUrl: existingAnalysis.ogUrl,
              twitterCard: existingAnalysis.twitterCard,
              twitterTitle: existingAnalysis.twitterTitle,
              twitterDescription: existingAnalysis.twitterDescription,
              twitterImage: existingAnalysis.twitterImage,
            },
            characterCounts: {
              title: existingAnalysis.title?.length || 0,
              description: existingAnalysis.metaDescription?.length || 0,
            }
          });
        }
      }
      
      // Perform new analysis
      const analysisResult = await seoAnalyzer.analyzeSeo(url);
      
      // Store the analysis
      const storedAnalysis = await storage.createSeoAnalysis({
        url: analysisResult.url,
        title: analysisResult.metaTags.title || null,
        metaDescription: analysisResult.metaTags.description || null,
        metaKeywords: analysisResult.metaTags.keywords || null,
        ogTitle: analysisResult.metaTags.ogTitle || null,
        ogDescription: analysisResult.metaTags.ogDescription || null,
        ogImage: analysisResult.metaTags.ogImage || null,
        ogUrl: analysisResult.metaTags.ogUrl || null,
        twitterCard: analysisResult.metaTags.twitterCard || null,
        twitterTitle: analysisResult.metaTags.twitterTitle || null,
        twitterDescription: analysisResult.metaTags.twitterDescription || null,
        twitterImage: analysisResult.metaTags.twitterImage || null,
        score: analysisResult.score,
        issues: analysisResult.issues,
        recommendations: analysisResult.recommendations,
      });
      
      res.json(analysisResult);
      
    } catch (error) {
      console.error("SEO analysis error:", error);
      
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch URL')) {
          return res.status(400).json({ 
            message: "Unable to access the website. Please check the URL and try again.",
            details: error.message 
          });
        }
        
        if (error.message.includes('Invalid URL')) {
          return res.status(400).json({ 
            message: "Please enter a valid URL starting with http:// or https://" 
          });
        }
      }
      
      res.status(500).json({ 
        message: "An error occurred while analyzing the website. Please try again later." 
      });
    }
  });

  // Get recent analyses
  app.get("/api/seo/recent", async (req, res) => {
    try {
      const analyses = await storage.getRecentAnalyses(10);
      res.json(analyses);
    } catch (error) {
      console.error("Error fetching recent analyses:", error);
      res.status(500).json({ message: "Failed to fetch recent analyses" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
