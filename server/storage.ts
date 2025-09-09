import { type User, type InsertUser, type SeoAnalysis, type InsertSeoAnalysis } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getSeoAnalysis(id: string): Promise<SeoAnalysis | undefined>;
  getSeoAnalysisByUrl(url: string): Promise<SeoAnalysis | undefined>;
  createSeoAnalysis(analysis: InsertSeoAnalysis): Promise<SeoAnalysis>;
  getRecentAnalyses(limit?: number): Promise<SeoAnalysis[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private seoAnalyses: Map<string, SeoAnalysis>;

  constructor() {
    this.users = new Map();
    this.seoAnalyses = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getSeoAnalysis(id: string): Promise<SeoAnalysis | undefined> {
    return this.seoAnalyses.get(id);
  }

  async getSeoAnalysisByUrl(url: string): Promise<SeoAnalysis | undefined> {
    return Array.from(this.seoAnalyses.values()).find(
      (analysis) => analysis.url === url,
    );
  }

  async createSeoAnalysis(insertAnalysis: InsertSeoAnalysis): Promise<SeoAnalysis> {
    const id = randomUUID();
    const createdAt = new Date().toISOString();
    const analysis: SeoAnalysis = { ...insertAnalysis, id, createdAt };
    this.seoAnalyses.set(id, analysis);
    return analysis;
  }

  async getRecentAnalyses(limit: number = 10): Promise<SeoAnalysis[]> {
    return Array.from(this.seoAnalyses.values())
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime())
      .slice(0, limit);
  }
}

export const storage = new MemStorage();
