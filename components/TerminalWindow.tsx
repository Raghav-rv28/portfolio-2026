"use client";

import { ReactNode } from "react";

interface TerminalWindowProps {
  title: string;
  children: ReactNode;
  className?: string;
  showControls?: boolean;
  titleRight?: ReactNode;
}

export function TerminalWindow({
  title = "Raghav Rudhra's Portfolio Terminal v1.0",
  children,
  className = "",
  showControls = true,
  titleRight,
}: TerminalWindowProps) {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-[#0a0a0a] px-3 sm:px-4 md:px-6 lg:px-8">
      <div
        className={`relative w-full h-full max-w-[98vw] max-h-[98vh] flex flex-col border-2 border-[#00ff00] bg-[#0a0a0a] mx-auto my-2 sm:my-4 ${className}`}
        style={{
          boxShadow:
            "0 0 20px rgba(0, 255, 0, 0.3), inset 0 0 20px rgba(0, 255, 0, 0.05)",
        }}
      >
        {/* Title Bar */}
        <div className="select-none relative flex items-center justify-between px-3 py-2 bg-[#0a0a0a] border-b-2 border-[#00ff00] min-h-[32px] before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[rgba(0,255,0,0.5)] before:to-transparent">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className="text-[#00ff00] font-mono text-xs sm:text-sm truncate">
              {title}
            </span>
          </div>
          {titleRight && (
            <div className="flex items-center gap-2 ml-4 shrink-0">
              {titleRight}
            </div>
          )}
          {showControls && (
            <div className="flex items-center gap-2 ml-4 shrink-0">
              {/* Minimize Button */}
              <button
                className="flex items-center justify-center cursor-default relative transition-all duration-200 shrink-0 w-4 h-4 border border-[#00ff00] bg-[#0a0a0a] hover:bg-[#00ff00] hover:shadow-[0_0_8px_currentColor] active:scale-95 group"
                aria-label="Minimize"
                disabled
                tabIndex={-1}
              >
                <span className="text-[#00ff00] text-xs leading-none font-bold group-hover:text-[#0a0a0a] transition-colors">
                  −
                </span>
              </button>
              {/* Close Button */}
              <button
                className="flex items-center justify-center cursor-default relative transition-all duration-200 shrink-0 w-4 h-4 border border-[#ff0000] bg-[#0a0a0a] hover:bg-[#ff0000] hover:shadow-[0_0_8px_currentColor] active:scale-95 group"
                aria-label="Close"
                disabled
                tabIndex={-1}
              >
                <span className="text-[#ff0000] text-xs leading-none font-bold group-hover:text-[#0a0a0a] transition-colors">
                  ×
                </span>
              </button>
            </div>
          )}
        </div>
        {/* Window Content */}
        <div className="relative flex-1 overflow-y-auto min-h-0">{children}</div>
      </div>
    </div>
  );
}

