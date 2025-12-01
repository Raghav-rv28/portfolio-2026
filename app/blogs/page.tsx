import { Navigation } from "@/components/blog/Navigation";
import { BlogCard } from "@/components/blog/BlogCard";
import { getAllBlogs } from "@/src/lib/blogs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs | Portfolio",
  description: "Latest blog posts and articles",
};

export default async function BlogsPage() {
  const blogs = await getAllBlogs();

  return (
    <div className="w-full min-h-screen dark flex flex-col">
      <Navigation />
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-12 md:py-16">
        <header className="mb-16 md:mb-20 text-center">
          <h1 className="blog-title text-6xl md:text-7xl font-bold mb-6 text-[#00ff00]" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            BLOGS
          </h1>
        </header>

        {blogs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-foreground/60">No blog posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {blogs.map((blog) => (
              <div key={blog.slug} className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-22px)] max-w-md">
                <BlogCard blog={blog} />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

