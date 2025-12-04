"use client";

import { useState, useEffect, useCallback } from "react";
import { projects, type Project } from "@/lib/data/projects";
import { GlitchTitle } from "@/components/projects/GlitchTitle";
import { ProjectSelector } from "@/components/projects/ProjectSelector";
import { ProjectSection } from "@/components/projects/ProjectSection";
import { ImagePlaceholder } from "@/components/projects/ImagePlaceholder";
import MobileWarning from "@/components/MobileWarning";
import { TerminalWindow } from "@/components/TerminalWindow";

export default function ProjectsPage() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const selectedProject = projects[selectedIndex];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handlePrevious = useCallback(() => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : projects.length - 1));
  }, []);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev < projects.length - 1 ? prev + 1 : 0));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        handlePrevious();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrevious, handleNext]);

  const renderMarkdown = (content: string) => {
    // Simple markdown rendering - split by lines and apply basic formatting
    const lines = content.split("\n");
    return (
      <div className="space-y-2">
        {lines.map((line, idx) => {
          // Headers
          if (line.startsWith("# ")) {
            return (
              <h1
                key={idx}
                className="text-xl font-bold text-[#00ffff] mt-4 mb-2"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {line.replace(/^# /, "")}
              </h1>
            );
          }
          if (line.startsWith("## ")) {
            return (
              <h2
                key={idx}
                className="text-lg font-bold text-[#00ffff] mt-3 mb-2"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {line.replace(/^## /, "")}
              </h2>
            );
          }
          if (line.startsWith("### ")) {
            return (
              <h3
                key={idx}
                className="text-base font-bold text-[#00ffff] mt-2 mb-1"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {line.replace(/^### /, "")}
              </h3>
            );
          }
          // Bullet points
          if (line.trim().startsWith("- ")) {
            return (
              <div
                key={idx}
                className="ml-4 text-[#00ff00]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                • {line.replace(/^-\s+/, "")}
              </div>
            );
          }
          // Bold text
          if (line.includes("**")) {
            const parts = line.split(/(\*\*.*?\*\*)/g);
            return (
              <p key={idx} className="text-[#00ff00]">
                {parts.map((part, pIdx) =>
                  part.startsWith("**") && part.endsWith("**") ? (
                    <strong
                      key={pIdx}
                      className="text-[#00ffff] font-bold"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {part.replace(/\*\*/g, "")}
                    </strong>
                  ) : (
                    <span key={pIdx} style={{ fontFamily: "var(--font-mono)" }}>
                      {part}
                    </span>
                  )
                )}
              </p>
            );
          }
          // Regular paragraph
          if (line.trim()) {
            return (
              <p
                key={idx}
                className="text-[#00ff00]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {line}
              </p>
            );
          }
          // Empty line
          return <br key={idx} />;
        })}
      </div>
    );
  };

  const titleRight = (
    <>
      <div className="flex items-center gap-4 text-[#00ff00] font-mono text-sm">
        <span>
          {selectedIndex + 1} / {projects.length}
        </span>
        <div className="flex gap-2">
          <button
            onClick={handlePrevious}
            className="px-3 py-1 border border-[#00ff00] hover:bg-[#00ff00] hover:text-[#0a0a0a] transition-colors"
            aria-label="Previous project"
          >
            ↑
          </button>
          <button
            onClick={handleNext}
            className="px-3 py-1 border border-[#00ff00] hover:bg-[#00ff00] hover:text-[#0a0a0a] transition-colors"
            aria-label="Next project"
          >
            ↓
          </button>
        </div>
      </div>
    </>
  );

  return (
    <>
      {isMobile && <MobileWarning />}
      <TerminalWindow
        title="Raghav Rudhra's Projects"
        titleRight={titleRight}
        className="h-screen"
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="px-4 py-3 border-b-2 border-[#00ff00]/50 shrink-0">
            <GlitchTitle title={selectedProject.name} />
          </div>

          {/* Main Content - Split Layout */}
          <div className="flex-1 flex min-h-0">
        {/* Left Column - 3 sections */}
        <div className="w-1/2 flex flex-col border-r-2 border-[#00ff00]/50">
          {/* Top Left: Project Selector */}
          <div className="h-1/3 border-b-2 border-[#00ff00]/50 overflow-hidden">
            <ProjectSection title="Projects" className="h-full">
              <ProjectSelector
                projects={projects}
                selectedIndex={selectedIndex}
                onSelect={setSelectedIndex}
              />
            </ProjectSection>
          </div>

          {/* Middle Left: Description */}
          <div className="h-1/3 border-b-2 border-[#00ff00]/50 overflow-hidden">
            <ProjectSection title="Description" className="h-full">
              <p
                className="text-[#00ff00]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {selectedProject.description}
              </p>
              {selectedProject.liveUrl && (
                <div className="mt-3">
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00ffff] underline hover:text-[#00ffff]/80 transition-colors"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    🔗 Live Demo
                  </a>
                </div>
              )}
            </ProjectSection>
          </div>

          {/* Bottom Left: Tech Stack */}
          <div className="h-1/3 overflow-hidden">
            <ProjectSection title="Tech Stack" className="h-full">
              <div className="flex flex-wrap gap-2">
                {selectedProject.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 border border-[#00ff00]/50 text-[#00ff00] bg-[#00ff00]/5 text-xs hover:border-[#00ffff] hover:bg-[#00ffff]/10 transition-colors"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </ProjectSection>
          </div>
        </div>

        {/* Right Column - 2 sections */}
        <div className="w-1/2 flex flex-col">
          {/* Top Right: Image Placeholder */}
          <div className="h-1/2 border-b-2 border-[#00ff00]/50 overflow-hidden">
            <ImagePlaceholder />
          </div>

          {/* Bottom Right: Content */}
          <div className="h-1/2 overflow-hidden">
            <ProjectSection title="Details" className="h-full">
              {renderMarkdown(selectedProject.content)}
            </ProjectSection>
          </div>
        </div>
      </div>
      </div>
      </TerminalWindow>
    </>
  );
}

