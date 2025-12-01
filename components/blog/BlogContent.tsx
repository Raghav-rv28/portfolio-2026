"use client";

interface BlogContentProps {
  children: React.ReactNode;
}

export function BlogContent({ children }: BlogContentProps) {
  return (
    <article className="prose prose-lg max-w-none">
      <div className="text-foreground/90 *:mb-6 [&>h1]:text-4xl [&>h1]:font-bold [&>h1]:text-[#00ffff] [&>h1]:mb-6 [&>h1]:mt-8 [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:text-[#00ffff] [&>h2]:mb-4 [&>h2]:mt-8 [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:text-[#00ffff] [&>h3]:mb-3 [&>h3]:mt-6 [&>p]:text-lg [&>p]:leading-relaxed [&>p]:mb-4 [&>ul]:list-disc [&>ul]:list-inside [&>ul]:space-y-2 [&>ul]:mb-4 [&>ol]:list-decimal [&>ol]:list-inside [&>ol]:space-y-2 [&>ol]:mb-4 [&>li]:text-lg [&>code]:px-2 [&>code]:py-1 [&>code]:bg-[#00ff00]/20 [&>code]:text-[#00ff00] [&>code]:rounded [&>code]:font-mono [&>code]:text-sm [&>code]:border [&>code]:border-[#00ff00]/30 [&>pre]:p-4 [&>pre]:mb-4 [&>pre]:rounded-lg [&>pre]:bg-[#0a0a0a] [&>pre]:border-2 [&>pre]:border-[#00ff00] [&>pre]:overflow-x-auto [&>a]:text-[#00ffff] [&>a]:underline [&>a]:decoration-2 [&>a]:underline-offset-4 [&>a]:font-semibold [&>a]:hover:text-[#00ffff]/80 [&>blockquote]:border-l-4 [&>blockquote]:border-[#00ff00] [&>blockquote]:pl-4 [&>blockquote]:py-2 [&>blockquote]:my-4 [&>blockquote]:italic">
        {children}
      </div>
    </article>
  );
}

