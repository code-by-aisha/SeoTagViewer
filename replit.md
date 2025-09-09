# replit.md

## Overview

This is an SEO Analyzer web application built with a modern full-stack TypeScript architecture. The application allows users to analyze websites for SEO performance, providing detailed insights including meta tag analysis, Google search previews, social media previews, and actionable recommendations. The system features real-time analysis with caching capabilities and a comprehensive UI built with React and shadcn/ui components.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client-side is built with React 18 using TypeScript and modern tooling:
- **Framework**: React with Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent design system
- **Type Safety**: Full TypeScript implementation with strict type checking
- **Form Handling**: React Hook Form with Zod validation for type-safe form management

### Backend Architecture
The server-side follows a REST API pattern with Express.js:
- **Framework**: Express.js with TypeScript for type-safe server development
- **API Design**: RESTful endpoints with standardized JSON responses
- **Data Validation**: Zod schemas for request/response validation
- **Storage Strategy**: Pluggable storage interface with in-memory implementation for development
- **Service Layer**: Dedicated SEO analysis service using Cheerio for HTML parsing
- **Caching**: Built-in result caching to avoid redundant analysis (1-hour cache window)

### Database Schema
The application uses Drizzle ORM with PostgreSQL:
- **Users Table**: Basic user management with username/password authentication
- **SEO Analyses Table**: Comprehensive storage of analysis results including meta tags, scores, issues, and recommendations
- **Schema Management**: Drizzle Kit for migrations and database management
- **Type Safety**: Full TypeScript integration with database schema

### Data Flow Architecture
1. **Analysis Request**: User submits URL through validated form
2. **Cache Check**: System checks for recent analysis (< 1 hour old)
3. **Web Scraping**: If no cache, fetches and parses HTML using Cheerio
4. **Analysis Engine**: Evaluates SEO factors and generates scored recommendations
5. **Data Persistence**: Stores results in PostgreSQL for caching and history
6. **Response Formatting**: Returns structured data for multiple preview formats

### SEO Analysis Engine
The core analysis system evaluates multiple SEO factors:
- **Meta Tag Analysis**: Title, description, keywords, Open Graph, Twitter Cards
- **Content Optimization**: Character count validation, keyword density
- **Technical SEO**: Viewport settings, canonical URLs, robots directives
- **Social Media Optimization**: Facebook and Twitter preview generation
- **Scoring Algorithm**: Weighted scoring system with actionable recommendations
- **Issue Classification**: Categorized by severity (critical, high, medium, low)

### Component Architecture
The UI follows a modular component design:
- **Preview Components**: Dedicated components for Google, Facebook, Twitter, and mobile previews
- **Analysis Results**: Structured display of scores, issues, and recommendations
- **Form Components**: Reusable form elements with validation integration
- **UI Components**: shadcn/ui component library for consistent design patterns

### Security and Validation
- **Input Validation**: Zod schemas ensure URL format validation
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Type Safety**: End-to-end TypeScript for compile-time error prevention
- **Request Sanitization**: Express middleware for request parsing and validation

## External Dependencies

### Core Framework Dependencies
- **@neondatabase/serverless**: PostgreSQL connection for serverless environments
- **drizzle-orm**: Type-safe ORM for database operations
- **drizzle-zod**: Schema validation integration
- **express**: Web server framework
- **vite**: Build tool and development server
- **react**: Frontend framework
- **@tanstack/react-query**: Server state management

### UI and Styling
- **tailwindcss**: Utility-first CSS framework
- **@radix-ui/***: Accessible component primitives (30+ components)
- **class-variance-authority**: Type-safe variant management
- **lucide-react**: Icon library

### Development and Tooling
- **typescript**: Type safety and development experience
- **tsx**: TypeScript execution environment
- **esbuild**: Fast JavaScript bundler for production
- **postcss**: CSS processing pipeline

### Validation and Forms
- **zod**: Schema validation library
- **react-hook-form**: Form state management
- **@hookform/resolvers**: Integration between React Hook Form and Zod

### Web Scraping and Analysis
- **cheerio**: Server-side HTML parsing and manipulation
- **date-fns**: Date utility library for timestamp handling

### Development Environment
- **@replit/vite-plugin-runtime-error-modal**: Enhanced error reporting
- **@replit/vite-plugin-cartographer**: Development tooling integration