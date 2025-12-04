"use client";

export function ImagePlaceholder() {
  return (
    <div className="h-full w-full flex items-center justify-center border-2 border-[#00ff00]/50 bg-[#0a0a0a] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(0, 255, 0, 0.1) 10px,
            rgba(0, 255, 0, 0.1) 20px
          )`,
        }}
      />
      <div className="relative z-10 text-center p-4">
        <div className="text-[#00ff00]/50 font-mono text-sm mb-2">
          <div className="border-2 border-dashed border-[#00ff00]/30 p-8">
            <div className="text-[#00ffff]/70 text-lg mb-2">📷</div>
            <div className="text-[#00ff00]/50 text-xs">
              Image placeholder
            </div>
            <div className="text-[#00ff00]/30 text-xs mt-1">
              Coming soon
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

