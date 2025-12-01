import { Badge } from "@/components/ui/badge";
import type { BlogMetadata } from "@/src/lib/blogs";

interface BlogHeaderProps {
  metadata: BlogMetadata;
}

export function BlogHeader({ metadata }: BlogHeaderProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <header className="mb-8 pb-8 border-b-4 border-[#00ff00]">
      <h1 className="blog-title text-5xl md:text-6xl font-bold mb-4 text-[#00ffff] leading-tight" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
        {metadata.title}
      </h1>
      <div className="flex flex-wrap items-center gap-4 text-lg">
        <span className="text-[#00ff00] font-bold">{formatDate(metadata.date)}</span>
        <span className="text-foreground/60">•</span>
        <span className="text-[#00ff00] font-bold">{metadata.author}</span>
        {metadata.readTime && (
          <>
            <span className="text-foreground/60">•</span>
            <span className="text-[#00ff00] font-bold">{metadata.readTime} min read</span>
          </>
        )}
      </div>
      {metadata.tags && metadata.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-6">
          {metadata.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-[#ff00ff]/20 text-[#00ccff] border-2 border-[#ff00ff] font-bold text-sm px-3 py-1"
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </header>
  );
}

