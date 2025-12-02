import fs from "fs";
import path from "path";

export interface BlogMetadata {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags?: string[];
  readTime?: number;
}

// Get all blog posts metadata
export async function getAllBlogs(): Promise<BlogMetadata[]> {
  const blogsDirectory = path.join(process.cwd(), "lib/content/blogs");

  if (!fs.existsSync(blogsDirectory)) {
    return [];
  }

  const files = fs.readdirSync(blogsDirectory);
  const blogs: BlogMetadata[] = [];

  for (const file of files) {
    if (file.endsWith(".mdx")) {
      try {
        const slug = file.replace(/\.mdx$/, "");
        // Use dynamic import with explicit path
        const blogModule = await import(
          `@/lib/content/blogs/${file}`
        );
        const { metadata } = blogModule;

        if (metadata) {
          blogs.push({
            slug,
            ...metadata,
          });
        }
      } catch (error) {
        console.error(`Error loading blog ${file}:`, error);
      }
    }
  }

  // Sort by date (newest first)
  return blogs.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

// Get a single blog post by slug
export async function getBlogBySlug(slug: string): Promise<{
  metadata: BlogMetadata;
  Component: React.ComponentType;
} | null> {
  try {
    const { default: Component, metadata } = await import(
      `@/lib/content/blogs/${slug}.mdx`
    );

    if (!metadata) {
      return null;
    }

    return {
      metadata: {
        slug,
        ...metadata,
      },
      Component,
    };
  } catch (error) {
    console.error(`Error loading blog ${slug}:`, error);
    return null;
  }
}

// Get all blog slugs for static generation
export function getAllBlogSlugs(): string[] {
  const blogsDirectory = path.join(process.cwd(), "lib/content/blogs");

  if (!fs.existsSync(blogsDirectory)) {
    return [];
  }

  const files = fs.readdirSync(blogsDirectory);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

