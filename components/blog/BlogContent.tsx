"use client";

interface BlogContentProps {
  children: React.ReactNode;
}

export function BlogContent({ children }: BlogContentProps) {
  const contentStyles = [
    // Base styles
    "text-foreground/90",
    
    // Headings - only color and font styles, spacing handled by MDX components
    "[&>h1]:text-[#00ffff]",
    "[&>h2]:text-[#00ffff]",
    "[&>h3]:text-[#00ffff]",
    
    "[&>p]:my-4",
    // Lists
    "[&>ul]:list-disc [&>ul]:list-inside [&>ul]:space-y-2",
    "[&>ol]:list-decimal [&>ol]:list-inside [&>ol]:space-y-2",
    
    // Code
    "[&>code]:px-2 [&>code]:py-1 [&>code]:bg-[#00ff00]/20 [&>code]:text-[#00ff00]",
    "[&>code]:rounded [&>code]:font-mono [&>code]:text-sm [&>code]:border [&>code]:border-[#00ff00]/30",
    
    // Code blocks
    "[&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:bg-[#0a0a0a]",
    "[&>pre]:border-2 [&>pre]:border-[#00ff00] [&>pre]:overflow-x-auto",
    
    // Links
    "[&>a]:text-[#00ffff] [&>a]:underline [&>a]:decoration-2 [&>a]:underline-offset-4",
    "[&>a]:font-semibold [&>a]:hover:text-[#00ffff]/80",
    
    // Blockquotes
    "[&>blockquote]:border-l-4 [&>blockquote]:border-[#00ff00] [&>blockquote]:pl-4",
    "[&>blockquote]:py-2 [&>blockquote]:italic",
  ].join(" ");

  return (
    <article className="prose prose-lg max-w-6xl">
      <div className={contentStyles}>
        {children}
      </div>
    </article>
  );
}

