"use client";

import { useState } from "react";

interface ProjectSectionProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export function ProjectSection({
  children,
  title,
  className = "",
}: ProjectSectionProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`relative border-2 transition-all duration-200 bg-[#0a0a0a] flex flex-col h-full ${
        isFocused
          ? "border-[#00ffff] shadow-[0_0_20px_rgba(0,255,255,0.4)]"
          : "border-[#00ff00]/50 shadow-[0_0_10px_rgba(0,255,0,0.2)]"
      } ${className}`}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
      style={{
        boxShadow: isFocused
          ? "0 0 20px rgba(0, 255, 255, 0.4), inset 0 0 20px rgba(0, 255, 255, 0.05)"
          : "0 0 10px rgba(0, 255, 0, 0.2), inset 0 0 10px rgba(0, 255, 0, 0.02)",
      }}
    >
      {title && (
        <div className="sticky top-0 bg-[#0a0a0a] border-b border-[#00ff00]/30 px-3 py-2 z-10 shrink-0">
          <h3
            className="text-[#00ffff] text-sm font-bold"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {title}
          </h3>
        </div>
      )}
      <div className="flex-1 p-3 text-[#00ff00] font-mono text-sm leading-relaxed overflow-auto min-h-0">
        {children}
      </div>
    </div>
  );
}

