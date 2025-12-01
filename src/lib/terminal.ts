export type TerminalState = {
  currentPath: string[];
  startTime: Date;
};

export function getInitialState(): TerminalState {
  // Try to restore state from sessionStorage
  if (typeof window !== "undefined") {
    try {
      const saved = sessionStorage.getItem("terminal_state");
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          currentPath: parsed.currentPath || [],
          startTime: parsed.startTime ? new Date(parsed.startTime) : new Date(),
        };
      }
    } catch (error) {
      console.warn("Failed to restore terminal state:", error);
    }
  }
  
  return {
    currentPath: [],
    startTime: new Date(),
  };
}

export function saveState(state: TerminalState): void {
  if (typeof window !== "undefined") {
    try {
      sessionStorage.setItem(
        "terminal_state",
        JSON.stringify({
          currentPath: state.currentPath,
          startTime: state.startTime.toISOString(),
        })
      );
    } catch (error) {
      console.warn("Failed to save terminal state:", error);
    }
  }
}

export function navigatePath(currentPath: string[], target: string): string[] {
  if (target === "..") {
    return currentPath.slice(0, -1);
  }
  const validFolders = ["about", "projects", "experience", "skills", "contact", "blog"];
  if (validFolders.includes(target.toLowerCase())) {
    return [...currentPath, target.toLowerCase()];
  }
  return currentPath;
}

export function getPathString(path: string[]): string {
  if (path.length === 0) return "~";
  return `~/${path.join("/")}`;
}

export function formatUptime(startTime: Date): string {
  const now = new Date();
  const diff = now.getTime() - startTime.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""}, ${hours % 24} hour${hours % 24 !== 1 ? "s" : ""}`;
  }
  if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""}, ${minutes % 60} minute${minutes % 60 !== 1 ? "s" : ""}`;
  }
  if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""}, ${seconds % 60} second${seconds % 60 !== 1 ? "s" : ""}`;
  }
  return `${seconds} second${seconds !== 1 ? "s" : ""}`;
}

