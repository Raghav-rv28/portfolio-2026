import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { BlogMetadata } from "@/lib/blogs";

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
      <Card className="blog-card flex flex-col h-full justify-end p-20 bg-[#0a0a0a] border-[#00ff00] hover:border-[#00ffff] transition-all duration-300">
        <Link href={`/blogs/${blog.slug}`} className="h-full">
        <CardHeader className="pt-6">
          <div className="flex items-start justify-between gap-4 mb-2">
            <CardTitle className="blog-title text-2xl font-bold text-[#00ffff] line-clamp-2 flex-1" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              {blog.title}
            </CardTitle>
          </div>
          <CardDescription className="text-[#00ff00] text-base font-medium">
            {formatDate(blog.date)} • {blog.author}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col pb-6">
          <p className="text-foreground/80 text-lg mb-4 line-clamp-3 flex-1">
            {blog.description}
          </p>
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {blog.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-[#ff00ff]/20 text-[#ff00ff] border border-[#ff00ff]/50 font-bold px-2.5 py-1"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
        </Link>
      </Card>
  );
}

