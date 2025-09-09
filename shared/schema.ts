import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const seoAnalyses = pgTable("seo_analyses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  url: text("url").notNull(),
  title: text("title"),
  metaDescription: text("meta_description"),
  metaKeywords: text("meta_keywords"),
  ogTitle: text("og_title"),
  ogDescription: text("og_description"),
  ogImage: text("og_image"),
  ogUrl: text("og_url"),
  twitterCard: text("twitter_card"),
  twitterTitle: text("twitter_title"),
  twitterDescription: text("twitter_description"),
  twitterImage: text("twitter_image"),
  score: integer("score").notNull().default(0),
  issues: jsonb("issues").$type<SeoIssue[]>().notNull().default([]),
  recommendations: jsonb("recommendations").$type<SeoRecommendation[]>().notNull().default([]),
  createdAt: text("created_at").default(sql`(datetime('now'))`),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertSeoAnalysisSchema = createInsertSchema(seoAnalyses).omit({
  id: true,
  createdAt: true,
});

export const seoAnalysisRequestSchema = z.object({
  url: z.string().url("Please enter a valid URL"),
});

export interface SeoIssue {
  type: 'error' | 'warning' | 'info';
  field: string;
  message: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
}

export interface SeoRecommendation {
  type: 'error' | 'warning' | 'info';
  title: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  field?: string;
}

export interface MetaTags {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterSite?: string;
  viewport?: string;
  robots?: string;
  canonical?: string;
}

export interface SeoAnalysisResult {
  url: string;
  metaTags: MetaTags;
  score: number;
  issues: SeoIssue[];
  recommendations: SeoRecommendation[];
  characterCounts: {
    title: number;
    description: number;
  };
}

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertSeoAnalysis = z.infer<typeof insertSeoAnalysisSchema>;
export type SeoAnalysis = typeof seoAnalyses.$inferSelect;
export type SeoAnalysisRequest = z.infer<typeof seoAnalysisRequestSchema>;
