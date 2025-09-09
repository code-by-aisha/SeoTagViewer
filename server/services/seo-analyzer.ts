import * as cheerio from 'cheerio';
import { type MetaTags, type SeoAnalysisResult, type SeoIssue, type SeoRecommendation } from '@shared/schema';

export class SeoAnalyzer {
  async fetchHtml(url: string): Promise<string> {
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; SEO-Analyzer/1.0)',
        },
        timeout: 10000,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.text();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch URL: ${error.message}`);
      }
      throw new Error('Failed to fetch URL: Unknown error');
    }
  }

  extractMetaTags(html: string): MetaTags {
    const $ = cheerio.load(html);
    
    return {
      title: $('title').first().text().trim() || undefined,
      description: $('meta[name="description"]').attr('content')?.trim() || undefined,
      keywords: $('meta[name="keywords"]').attr('content')?.trim() || undefined,
      ogTitle: $('meta[property="og:title"]').attr('content')?.trim() || undefined,
      ogDescription: $('meta[property="og:description"]').attr('content')?.trim() || undefined,
      ogImage: $('meta[property="og:image"]').attr('content')?.trim() || undefined,
      ogUrl: $('meta[property="og:url"]').attr('content')?.trim() || undefined,
      ogType: $('meta[property="og:type"]').attr('content')?.trim() || undefined,
      twitterCard: $('meta[name="twitter:card"]').attr('content')?.trim() || undefined,
      twitterTitle: $('meta[name="twitter:title"]').attr('content')?.trim() || undefined,
      twitterDescription: $('meta[name="twitter:description"]').attr('content')?.trim() || undefined,
      twitterImage: $('meta[name="twitter:image"]').attr('content')?.trim() || undefined,
      twitterSite: $('meta[name="twitter:site"]').attr('content')?.trim() || undefined,
      viewport: $('meta[name="viewport"]').attr('content')?.trim() || undefined,
      robots: $('meta[name="robots"]').attr('content')?.trim() || undefined,
      canonical: $('link[rel="canonical"]').attr('href')?.trim() || undefined,
    };
  }

  analyzeMetaTags(url: string, metaTags: MetaTags): SeoAnalysisResult {
    const issues: SeoIssue[] = [];
    const recommendations: SeoRecommendation[] = [];
    let score = 100;

    // Title analysis
    if (!metaTags.title) {
      issues.push({
        type: 'error',
        field: 'title',
        message: 'Title tag is missing',
        severity: 'critical'
      });
      recommendations.push({
        type: 'error',
        title: 'Add Title Tag',
        description: 'Every page must have a unique, descriptive title tag between 30-60 characters.',
        priority: 'critical',
        field: 'title'
      });
      score -= 20;
    } else {
      const titleLength = metaTags.title.length;
      if (titleLength < 30) {
        issues.push({
          type: 'warning',
          field: 'title',
          message: 'Title tag is too short',
          severity: 'medium'
        });
        recommendations.push({
          type: 'warning',
          title: 'Expand Title Tag',
          description: 'Title is too short. Consider expanding it to 30-60 characters for better SEO.',
          priority: 'medium',
          field: 'title'
        });
        score -= 5;
      } else if (titleLength > 60) {
        issues.push({
          type: 'warning',
          field: 'title',
          message: 'Title tag is too long',
          severity: 'medium'
        });
        recommendations.push({
          type: 'warning',
          title: 'Shorten Title Tag',
          description: 'Title is too long and may be truncated in search results. Keep it under 60 characters.',
          priority: 'medium',
          field: 'title'
        });
        score -= 5;
      }
    }

    // Meta description analysis
    if (!metaTags.description) {
      issues.push({
        type: 'error',
        field: 'description',
        message: 'Meta description is missing',
        severity: 'high'
      });
      recommendations.push({
        type: 'error',
        title: 'Add Meta Description',
        description: 'Add a compelling meta description between 120-160 characters to improve click-through rates.',
        priority: 'high',
        field: 'description'
      });
      score -= 15;
    } else {
      const descLength = metaTags.description.length;
      if (descLength < 120) {
        issues.push({
          type: 'warning',
          field: 'description',
          message: 'Meta description is too short',
          severity: 'medium'
        });
        recommendations.push({
          type: 'warning',
          title: 'Expand Meta Description',
          description: 'Meta description is too short. Expand it to 120-160 characters for better visibility.',
          priority: 'medium',
          field: 'description'
        });
        score -= 5;
      } else if (descLength > 160) {
        issues.push({
          type: 'warning',
          field: 'description',
          message: 'Meta description is too long',
          severity: 'medium'
        });
        recommendations.push({
          type: 'warning',
          title: 'Shorten Meta Description',
          description: `Meta description is ${descLength - 160} characters too long and may be truncated in search results.`,
          priority: 'medium',
          field: 'description'
        });
        score -= 5;
      }
    }

    // Open Graph analysis
    const ogTagsPresent = [metaTags.ogTitle, metaTags.ogDescription, metaTags.ogImage, metaTags.ogUrl].filter(Boolean).length;
    if (ogTagsPresent === 0) {
      issues.push({
        type: 'warning',
        field: 'og',
        message: 'Open Graph tags are missing',
        severity: 'medium'
      });
      recommendations.push({
        type: 'warning',
        title: 'Add Open Graph Tags',
        description: 'Add Open Graph tags (og:title, og:description, og:image, og:url) to improve social media sharing.',
        priority: 'medium',
        field: 'og'
      });
      score -= 10;
    } else if (ogTagsPresent < 4) {
      issues.push({
        type: 'warning',
        field: 'og',
        message: 'Some Open Graph tags are missing',
        severity: 'low'
      });
      recommendations.push({
        type: 'warning',
        title: 'Complete Open Graph Tags',
        description: `${4 - ogTagsPresent} Open Graph tags are missing. Complete the set for better social sharing.`,
        priority: 'low',
        field: 'og'
      });
      score -= 5;
    }

    // Twitter Card analysis
    const twitterTagsPresent = [metaTags.twitterCard, metaTags.twitterTitle, metaTags.twitterDescription].filter(Boolean).length;
    if (twitterTagsPresent === 0) {
      issues.push({
        type: 'warning',
        field: 'twitter',
        message: 'Twitter Card tags are missing',
        severity: 'low'
      });
      recommendations.push({
        type: 'warning',
        title: 'Add Twitter Card Tags',
        description: 'Add Twitter Card tags (twitter:card, twitter:title, twitter:description) for better Twitter sharing.',
        priority: 'low',
        field: 'twitter'
      });
      score -= 5;
    } else if (twitterTagsPresent < 3) {
      recommendations.push({
        type: 'info',
        title: 'Complete Twitter Card Tags',
        description: 'Consider adding missing Twitter Card tags for optimal Twitter sharing experience.',
        priority: 'low',
        field: 'twitter'
      });
      score -= 2;
    }

    // Viewport meta tag
    if (!metaTags.viewport) {
      issues.push({
        type: 'warning',
        field: 'viewport',
        message: 'Viewport meta tag is missing',
        severity: 'medium'
      });
      recommendations.push({
        type: 'warning',
        title: 'Add Viewport Meta Tag',
        description: 'Add viewport meta tag for better mobile responsiveness: <meta name="viewport" content="width=device-width, initial-scale=1">',
        priority: 'medium',
        field: 'viewport'
      });
      score -= 5;
    }

    // Additional recommendations
    if (score >= 90) {
      recommendations.push({
        type: 'info',
        title: 'Consider Structured Data',
        description: 'Add JSON-LD structured data to help search engines better understand your content.',
        priority: 'low'
      });
    }

    return {
      url,
      metaTags,
      score: Math.max(0, score),
      issues,
      recommendations,
      characterCounts: {
        title: metaTags.title?.length || 0,
        description: metaTags.description?.length || 0,
      }
    };
  }

  async analyzeSeo(url: string): Promise<SeoAnalysisResult> {
    try {
      const html = await this.fetchHtml(url);
      const metaTags = this.extractMetaTags(html);
      return this.analyzeMetaTags(url, metaTags);
    } catch (error) {
      throw error;
    }
  }
}

export const seoAnalyzer = new SeoAnalyzer();
