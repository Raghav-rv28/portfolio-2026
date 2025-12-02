export interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  content: string;
}

export const projects: Project[] = [
  {
    id: "pure-tracker",
    name: "Pure Tracker",
    description: "Professional jewelry inventory and bookkeeping system with real-time tracking, partial sales support, and hybrid caching architecture",
    techStack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "PostgreSQL",
      "Drizzle ORM",
      "Clerk",
      "shadcn/ui",
      "Tailwind CSS",
      "IndexedDB",
      "Turbopack"
    ],
    liveUrl: "https://pure-tracker.vercel.app",
    content: `# Pure Tracker

A comprehensive jewelry inventory management and bookkeeping system designed for gold and jewelry businesses. Features real-time inventory tracking, transaction management, and advanced caching strategies for optimal performance.

## Features

- **Jewelry Inventory Management**
  - Category-specific metadata (rings, chains, earrings, bracelets, diamonds, etc.)
  - Weight, karat, and purity tracking
  - Dynamic metadata fields based on product category
  - Image support and product history

- **Transaction Management**
  - Purchase and sale tracking
  - Partial product sales with review workflow
  - Multi-product sales grouping
  - Order types: sale, order, hold
  - Payment method tracking (cash, card, gold weight)

- **Vendor & Customer Management**
  - Vendor balance tracking
  - Customer profiles with order history
  - Outstanding balance management
  - Payment history tracking

- **Dashboard & Analytics**
  - Real-time statistics (inventory count, sales, vendors)
  - Recent activity feed
  - Customizable quick actions
  - Gold price tracking integration

- **User Management**
  - Clerk authentication integration
  - Role-based access (employee, manager, admin)
  - User activity tracking
  - Optimized onboarding with metadata caching

## Technical Highlights

- **Hybrid Caching Architecture**
  - Next.js 16 server-side caching (\`use cache\`) for reduced database load
  - IndexedDB client-side caching for offline support and instant filtering
  - Incremental cache updates for optimal performance
  - 10x faster user lookups via Clerk metadata optimization

- **Modern Next.js Architecture**
  - Server Components for efficient data fetching
  - Server Actions for type-safe database operations
  - App Router with optimized routing
  - Turbopack for fast development builds

- **Type-Safe Database Layer**
  - Drizzle ORM with PostgreSQL (Neon serverless)
  - Comprehensive schema with relations and foreign keys
  - Automatic transaction creation and inventory updates
  - Price history tracking with audit trail

- **Performance Optimizations**
  - Granular entity storage in IndexedDB
  - Batch query optimization
  - Parallel data fetching for dashboard stats
  - Efficient diff and patch operations

- **UI/UX Excellence**
  - shadcn/ui component library built on Radix UI
  - Fully responsive mobile-first design
  - Dark mode support
  - Accessible components with proper ARIA labels
  - Smooth animations and transitions

## Performance

- Supports real-time inventory updates with sub-second latency
- Hybrid caching reduces database queries by 80%+
- Offline-capable with IndexedDB fallback
- Optimized user onboarding (10x faster lookups)
- Server-side rendering for fast initial loads

## Architecture

- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Clerk with metadata-based user tracking
- **Caching**: Next.js 16 \`use cache\` + IndexedDB hybrid strategy
- **UI Framework**: Next.js 16 App Router with Server Components
- **Styling**: Tailwind CSS with shadcn/ui components
- **Build Tool**: Turbopack for development, Next.js for production

Live Demo: https://pure-tracker.vercel.app`,
  },
  {
    id: "bed-company-ecommerce",
    name: "Bed Company E-commerce Showcase",
    description: "Modern, mobile-first furniture showcase website for beds and mattresses with full admin management system",
    techStack: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Drizzle ORM", "PostgreSQL", "Neon", "shadcn/ui"],
    liveUrl: "https://bed-company.vercel.app",
    content: `# Bed Company E-commerce Showcase

A modern, mobile-first showcase website for a furniture store specializing in beds and mattresses. The platform features a beautiful public-facing site with product browsing, search, and contact functionality, plus a comprehensive admin panel for content management.

## Features

### Public-Facing Site
- **Homepage** with hero section, featured products, and interactive bed layers visualization
- **Product Catalog** with search, category filtering, and responsive grid layout
- **Product Detail Pages** with image galleries, specifications, features, and stock status
- **About Us Page** with dynamic store information and company story
- **Contact Page** with form validation, store hours, and Google Maps integration
- **Interactive Bed Layers** component with clickable data points
- **Responsive Design** optimized for all screen sizes

### Admin Management System
- **Secure Authentication** with session-based login and bcrypt password hashing
- **Admin Dashboard** with product statistics and quick access
- **Product Management** with full CRUD operations (Create, Read, Update, Delete)
- **Store Information Management** for contact details, hours, and social media
- **Feature System** for assigning marketing features and badges to products
- **Image Management** with support for multiple product images

## Technical Highlights

- **Next.js 16 App Router** with Server Components and Suspense boundaries
- **Type-Safe Database** with Drizzle ORM and Neon Serverless PostgreSQL
- **Modern UI Components** built with shadcn/ui and Radix UI primitives
- **Advanced Animations** using Framer Motion and CSS transitions
- **SEO Optimized** with dynamic metadata generation
- **Performance Optimized** with lazy loading, code splitting, and image optimization
- **Mobile-First Design** with Tailwind CSS 4 and responsive breakpoints

## Architecture

- **Server-Side Rendering** for optimal SEO and performance
- **Type-Safe Queries** with Drizzle ORM for database operations
- **Component-Based Architecture** with reusable UI components
- **Environment-Based Configuration** for development and production
- **Cookie-Based Sessions** for secure admin authentication

## Database Schema

- **Products Table**: Categories, images, features, specifications, pricing
- **Admin Users Table**: Email-based authentication with password hashing
- **Store Info Table**: Contact information, hours, social media links
- **Features System**: Flexible feature assignment for products

## Performance

- Optimized bundle sizes with dynamic imports
- Lazy loading for heavy components
- Efficient database queries with proper indexing
- Fast page loads with Next.js optimizations

Live Demo: https://bed-company.vercel.app`,
  },
  {
    id: "variable-pricing-shopify-app",
    name: "Variable Pricing Shopify App",
    description: "Shopify admin app for automated weight-based product pricing with bulk updates, tiered pricing, and professional PDF document generation",
    techStack: ["Remix", "TypeScript", "React", "Shopify App Remix", "Prisma", "PostgreSQL", "Shopify Polaris", "Shopify UI Extensions", "Vite"],
    content: `# Variable Pricing Shopify App

A comprehensive Shopify admin application that automates product pricing based on weight calculations. The app enables merchants to set up simple or tiered pricing rules, perform bulk price updates across collections, and generate professional PDF documents (invoices, appraisals, and delivery receipts) for orders.

## Technical Highlights

- **Remix Framework**: Modern full-stack framework with server-side rendering
- **Shopify App Remix**: Official Shopify integration with OAuth, GraphQL API, and webhooks
- **Type-Safe Development**: Full TypeScript implementation
- **Prisma ORM**: Type-safe database access with PostgreSQL
- **Shopify Polaris**: Consistent UI components matching Shopify admin design
- **Shopify UI Extensions**: Custom admin extensions for enhanced functionality
- **GraphQL API**: Efficient data fetching from Shopify Admin API
- **Bulk Operations**: Optimized bulk mutations for price updates
- **Session Management**: Secure session storage with Prisma

## Architecture

- **Server-Side Rendering**: Remix loader/action pattern for data fetching
- **GraphQL Queries**: Efficient data fetching with cursor-based pagination
- **Bulk Mutations**: Optimized bulk product variant updates
- **Extension System**: Modular admin extensions for specific features
- **Route-Based Architecture**: File-based routing with Remix conventions
- **Environment Configuration**: Secure environment variable management

## Key Functionalities

### Pricing Calculation

- **Weight Extraction**: Automatically extracts weight from product variant inventory items
- **Price Calculation**: Multiplies weight by configured multiplier(s)
- **Tier Matching**: Finds appropriate pricing tier based on weight thresholds
- **Bulk Processing**: Handles large product catalogs efficiently

### Document Generation

- **Invoice Generation**: Complete invoice with line items, taxes, discounts, and totals
- **Appraisal Documents**: Professional valuation documents with disclaimers
- **Delivery Receipts**: Delivery confirmation documents with signature sections
- **Dynamic Content**: Pulls order data, customer information, and product details
- **Print Styling**: CSS optimized for both screen and print media

## Performance Optimizations

- **Cursor-Based Pagination**: Efficient handling of large product catalogs
- **Bulk GraphQL Mutations**: Minimizes API calls for price updates
- **Lazy Loading**: Components loaded on demand
- **Optimized Queries**: Selective field fetching to reduce payload size
- **Error Handling**: Graceful error handling with user-friendly messages

## Security Features

- **OAuth Authentication**: Secure Shopify OAuth flow
- **Session Management**: Secure session storage
- **CORS Handling**: Proper CORS configuration for print routes
- **Input Validation**: Server-side validation for all inputs
- **Error Boundaries**: Graceful error handling

## Development Workflow

- **Shopify CLI Integration**: Seamless local development with tunneling
- **Hot Module Replacement**: Fast development iteration
- **TypeScript**: Type safety throughout the codebase
- **ESLint**: Code quality and consistency
- **Prisma Migrations**: Database schema versioning

## Deployment

- **Vercel Ready**: Optimized for Vercel deployment with @vercel/remix
- **Docker Support**: Containerized deployment option
- **Environment Variables**: Secure configuration management
- **Database Migrations**: Automated schema deployment
**Note**: This project is deployed on Shopify store and is for internal use only.`,
  },

];

