"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import GUIModal from "@/components/GUIModal";
import MobileWarning from "@/components/MobileWarning";

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
      <Terminal onOpenModal={() => setShowModal(true)} />
      <GUIModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </main>
  );
}
