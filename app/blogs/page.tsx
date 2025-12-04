import { BlogWindow } from "@/components/blog/BlogWindow";
import { Navigation } from "@/components/blog/Navigation";
import { BlogCard } from "@/components/blog/BlogCard";
import { getAllBlogs } from "@/lib/blogs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs | Portfolio",
  description: "Latest blog posts and articles",
};

export default async function BlogsPage() {
  const blogs = await getAllBlogs();

  return (
    <BlogWindow title=" Raghav Rudhra's Blogs">
      <div className="w-full h-[90vh] dark flex flex-col justify-center items-center gap-10">
        <Navigation />
        <main className="flex-1 w-full mx-auto">
          {blogs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-foreground/60">No blog posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              {blogs.map((blog) => (
                <div key={blog.slug} className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-22px)] max-w-md">
                  <BlogCard blog={blog} />
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </BlogWindow>
  );
}

