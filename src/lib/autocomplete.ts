import { projects } from "@/src/data/projects";

export interface AutocompleteResult {
  matches: string[];
  isComplete: boolean;
}

const allCommands = [
  "help",
  "clear",
  "ls",
  "cd",
  "cat",
  "whoami",
  "neofetch",
  "gui",
  "date",
  "uptime",
  "pwd",
  "contact",
  "projects",
  "experience",
  "skills",
];

const rootFolders = [
  "about",
  "projects",
  "experience",
  "skills",
  "contact",
  "blog",
];

const rootFiles = ["readme.txt", "resume.pdf"];

export function autocomplete(
  input: string,
  currentPath: string[]
): AutocompleteResult {
  const parts = input.trim().split(/\s+/);
  const command = parts[0]?.toLowerCase() || "";
  const arg = parts[1] || "";

  // Autocomplete command name
  if (parts.length === 1 || (parts.length === 2 && !arg)) {
    const matches = allCommands.filter((cmd) => cmd.startsWith(command));
    return {
      matches: matches.length === 1 ? [matches[0]] : matches,
      isComplete: matches.length === 1,
    };
  }

  // Autocomplete arguments for specific commands
  if (command === "cd") {
    const folders = currentPath.length === 0 ? rootFolders : [];
    const matches = folders.filter((folder) => folder.startsWith(arg));
    return {
      matches: matches.length === 1 ? [matches[0]] : matches,
      isComplete: matches.length === 1,
    };
  }

  if (command === "cat") {
    // In root directory
    if (currentPath.length === 0) {
      const files = [...rootFiles, ...projects.map((p) => p.id)];
      const matches = files.filter((file) => file.startsWith(arg));
      return {
        matches: matches.length === 1 ? [matches[0]] : matches,
        isComplete: matches.length === 1,
      };
    }

    // In projects directory
    if (currentPath[0] === "projects") {
      const projectIds = projects.map((p) => p.id);
      const matches = projectIds.filter((id) => id.startsWith(arg));
      return {
        matches: matches.length === 1 ? [matches[0]] : matches,
        isComplete: matches.length === 1,
      };
    }
  }

  return { matches: [], isComplete: false };
}

export function getAutocompleteSuggestion(
  input: string,
  currentPath: string[]
): string | null {
  const result = autocomplete(input, currentPath);
  if (result.matches.length === 1 && result.isComplete) {
    const parts = input.trim().split(/\s+/);
    if (parts.length === 1) {
      return result.matches[0];
    }
    if (parts.length === 2) {
      return `${parts[0]} ${result.matches[0]}`;
    }
  }
  return null;
}

