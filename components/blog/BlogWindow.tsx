"use client";

interface BlogWindowProps {
  title: string;
  children: React.ReactNode;
}

export function BlogWindow({ title, children }: BlogWindowProps) {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-[#0a0a0a] px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="relative w-full max-w-7xl h-full max-h-[98vh] flex flex-col border-2 border-[#00ff00] bg-[#0a0a0a] mx-auto my-2 sm:my-4" style={{ boxShadow: '0 0 20px rgba(0, 255, 0, 0.3), inset 0 0 20px rgba(0, 255, 0, 0.05)' }}>
        {/* Title Bar */}
        <div className="select-none relative flex items-center justify-between px-3 py-2 bg-[#0a0a0a] border-b-2 border-[#00ff00] min-h-[32px] before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[rgba(0,255,0,0.5)] before:to-transparent">
          <div className="flex items-center gap-2">
            <span className="text-[#00ff00] font-mono text-xs sm:text-sm truncate max-w-[60vw] sm:max-w-none">
              {title}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {/* Minimize Button */}
            <button
              className="flex items-center justify-center cursor-default relative transition-all duration-200 flex-shrink-0 w-4 h-4 border border-[#00ff00] bg-[#0a0a0a] hover:bg-[#00ff00] hover:shadow-[0_0_8px_currentColor] active:scale-95 group"
              aria-label="Minimize"
              disabled
              tabIndex={-1}
            >
              <span className="text-[#00ff00] text-xs leading-none font-bold group-hover:text-[#0a0a0a] transition-colors">−</span>
            </button>
            {/* Close Button */}
            <button
              className="flex items-center justify-center cursor-default relative transition-all duration-200 flex-shrink-0 w-4 h-4 border border-[#ff0000] bg-[#0a0a0a] hover:bg-[#ff0000] hover:shadow-[0_0_8px_currentColor] active:scale-95 group"
              aria-label="Close"
              disabled
              tabIndex={-1}
            >
              <span className="text-[#ff0000] text-xs leading-none font-bold group-hover:text-[#0a0a0a] transition-colors">×</span>
            </button>
          </div>
        </div>
        {/* Window Content */}
        <div className="relative flex-1 overflow-y-auto min-h-0">
          {children}
        </div>
      </div>
    </div>
  );
}

