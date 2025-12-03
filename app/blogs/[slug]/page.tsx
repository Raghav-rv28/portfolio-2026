import { BlogWindow } from "@/components/blog/BlogWindow";
import { Navigation } from "@/components/blog/Navigation";
import { BlogHeader } from "@/components/blog/BlogHeader";
import { BlogContent } from "@/components/blog/BlogContent";
import { getBlogBySlug, getAllBlogSlugs } from "@/lib/blogs";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Blog Post Not Found",
    };
  }

  return {
    title: `${blog.metadata.title} | Blogs`,
    description: blog.metadata.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const { Component, metadata } = blog;

  return (
    <BlogWindow title={metadata.title}>
      <div className="w-full dark flex flex-col px-6 md:px-8">
        <Navigation />
        <main className="flex-1 w-full flex flex-col justify-center items-center mx-auto">
          <BlogHeader metadata={metadata} />
          <BlogContent>
            <Component />
          </BlogContent>
        </main>
      </div>
    </BlogWindow>
  );
}

