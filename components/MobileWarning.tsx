"use client";

export default function MobileWarning() {
  return (
    <div className="fixed top-0 left-0 right-0 bg-yellow-500/90 text-black px-4 py-2 text-center text-sm font-mono z-50">
      <span className="font-bold">⚠</span> Best viewed on desktop. Terminal experience optimized for larger screens.
    </div>
  );
}

