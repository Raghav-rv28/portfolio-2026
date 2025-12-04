"use client";

import { TerminalWindow } from "@/components/TerminalWindow";

interface BlogWindowProps {
  title: string;
  children: React.ReactNode;
}

export function BlogWindow({ title, children }: BlogWindowProps) {
  return (
    <TerminalWindow title={title} className="max-w-7xl">
      {children}
    </TerminalWindow>
  );
}

