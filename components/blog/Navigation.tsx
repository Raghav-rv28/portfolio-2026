"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export function Navigation() {
  return (
    <nav className="w-full border-b-4 border-[#00ff00] bg-[#0a0a0a] py-4 md:py-6 px-6 md:px-8">
      <div className="w-full mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Home className="w-5 h-5 text-[#00ff00] group-hover:text-[#00ffff] transition-colors" />
          <span className="font-black text-xl text-[#00ff00] group-hover:text-[#00ffff] transition-colors">
            Terminal
          </span>
        </Link>
        <Link href="/blogs">
          <Button
            variant="outline"
            className="border-2 border-[#00ffff] text-[#00ffff] hover:bg-[#00ffff] hover:text-[#0a0a0a] font-bold px-6 py-2"
          >
            Blogs
          </Button>
        </Link>
      </div>
    </nav>
  );
}

