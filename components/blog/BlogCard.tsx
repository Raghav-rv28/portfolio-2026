import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { BlogMetadata } from "@/src/lib/blogs";

interface BlogCardProps {
  blog: BlogMetadata;
}

export function BlogCard({ blog }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Link href={`/blogs/${blog.slug}`} className="block h-full">
      <Card className="blog-card h-full flex flex-col bg-[#0a0a0a] border-[#00ff00] hover:border-[#00ffff] transition-all duration-300">
        <CardHeader>
          <div className="flex items-start justify-between gap-4 mb-2">
            <CardTitle className="blog-title text-2xl font-bold text-[#00ffff] line-clamp-2 flex-1" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              {blog.title}
            </CardTitle>
            {blog.readTime && (
              <Badge
                variant="outline"
                className="border-[#00ff00] text-[#00ff00] font-bold shrink-0"
              >
                {blog.readTime} min
              </Badge>
            )}
          </div>
          <CardDescription className="text-[#00ff00]/70 text-base font-medium">
            {formatDate(blog.date)} • {blog.author}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <p className="text-foreground/80 text-lg mb-4 line-clamp-3 flex-1">
            {blog.description}
          </p>
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-auto">
              {blog.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-[#ff00ff]/20 text-[#ff00ff] border border-[#ff00ff]/50 font-bold"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}

