"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import GUIModal from "@/components/GUIModal";
import MobileWarning from "@/components/MobileWarning";
import { Button } from "@/components/ui/button";

// Dynamically import Terminal to avoid SSR issues with xterm.js
const Terminal = dynamic(() => import("@/components/Terminal"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-[#0a0a0a] flex items-center justify-center text-green-400 font-mono">
      Loading terminal...
    </div>
  ),
});

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <main className="relative w-full h-screen overflow-hidden">
      {isMobile && <MobileWarning />}
      <Link
        href="/blogs"
        className="absolute bottom-6 right-10 z-50"
        aria-label="Go to blogs"
      >
        <Button
          variant="outline"
          className="border-2 border-[#00ffff] text-[#00ffff] hover:bg-[#00ffff] hover:text-[#0a0a0a] font-bold px-4 py-2 bg-[#0a0a0a]/80 backdrop-blur-sm"
        >
          Blogs
        </Button>
      </Link>
      <Terminal onOpenModal={() => setShowModal(true)} />
      <GUIModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </main>
  );
}
