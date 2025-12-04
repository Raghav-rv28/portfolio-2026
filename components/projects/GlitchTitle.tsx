"use client";

import { useEffect, useState } from "react";

interface GlitchTitleProps {
  title: string;
}

export function GlitchTitle({ title }: GlitchTitleProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    setIsGlitching(true);
    const timer = setTimeout(() => setIsGlitching(false), 250);
    return () => clearTimeout(timer);
  }, [title]);

  return (
    <div className="relative">
      <h1
        className={`text-2xl sm:text-3xl md:text-4xl font-mono text-[#00ffff] select-none ${
          isGlitching ? "glitch-active" : ""
        }`}
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {title}
      </h1>
    </div>
  );
}

