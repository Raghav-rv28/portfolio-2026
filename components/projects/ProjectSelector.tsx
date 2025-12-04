"use client";

import { Project } from "@/lib/data/projects";

interface ProjectSelectorProps {
  projects: Project[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export function ProjectSelector({
  projects,
  selectedIndex,
  onSelect,
}: ProjectSelectorProps) {
  return (
    <div className="h-full overflow-y-auto">
      <div className="flex flex-col gap-1 p-1">
        {projects.map((project, index) => (
          <button
            key={project.id}
            onClick={() => onSelect(index)}
            className={`text-left px-3 py-2 font-mono text-sm transition-all duration-200 border ${
              index === selectedIndex
                ? "bg-[#00ff00]/10 border-[#00ff00] text-[#00ff00] shadow-[0_0_10px_rgba(0,255,0,0.3)]"
                : "border-[#00ff00]/30 text-[#00ff00]/70 hover:border-[#00ff00]/50 hover:text-[#00ff00] hover:bg-[#00ff00]/5"
            }`}
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <div className="flex items-center gap-2">
              <span className={index === selectedIndex ? "text-[#00ffff]" : ""}>
                {index === selectedIndex ? "▶" : " "}
              </span>
              <span className="truncate">{project.name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

