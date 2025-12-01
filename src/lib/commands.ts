import { personal } from "@/src/data/personal";
import { projects } from "@/src/data/projects";
import { experience } from "@/src/data/experience";
import { skills } from "@/src/data/skills";
import { getPathString, formatUptime, type TerminalState } from "./terminal";
import { redirect } from "next/navigation";

export type CommandResult = {
  output: string;
  shouldClear?: boolean;
  shouldOpenModal?: boolean;
};

export type HistoryProvider = {
  getAllWithTimestamps: () => Array<{ command: string; timestamp: Date }>;
};

const rootFolders = ["about", "projects", "experience", "skills", "contact", "blog"];
const rootFiles = ["readme.txt", "resume.pdf"];

export function executeCommand(
  command: string,
  state: TerminalState,
  historyProvider?: HistoryProvider
): CommandResult {
  const parts = command.trim().split(/\s+/);
  const cmd = parts[0]?.toLowerCase() || "";
  const args = parts.slice(1);

  switch (cmd) {
    case "help":
      return handleHelp();
    case "clear":
      return { output: "", shouldClear: true };
    case "ls":
      return handleLs(state.currentPath);
    case "cd":
      return handleCd(args, state.currentPath);
    case "cat":
      return handleCat(args, state.currentPath);
    case "whoami":
      return handleWhoami();
    case "neofetch":
      return handleNeofetch(state);
    case "gui":
      return { output: "", shouldOpenModal: true };
    case "date":
      return handleDate();
    case "uptime":
      return handleUptime(state.startTime);
    case "pwd":
      return handlePwd(state.currentPath);
    case "history":
      return handleHistory(historyProvider);
    case "":
      return { output: "" };
    default:
      return {
        output: `Command not found: ${cmd}\nType 'help' to see available commands.`,
      };
  }
}

function handleHelp(): CommandResult {
  const commands = [
    "help          - Show this help message",
    "clear         - Clear the terminal screen",
    "ls            - List files and folders",
    "cd [folder]   - Change directory (cd .. to go back)",
    "cat [file]    - Display file contents",
    "whoami        - Display user information",
    "neofetch      - Display system information",
    "gui           - Open GUI mode (just kidding!)",
    "date          - Show current date and time",
    "uptime        - Show system uptime",
    "pwd           - Print working directory",
    "history       - Show command history",
    "",
    "Navigation:",
    "  cd about        - Navigate to about folder",
    "  cd projects     - Navigate to projects folder",
    "  cd experience   - Navigate to experience folder",
    "  cd skills       - Navigate to skills folder",
    "  cd contact      - Navigate to contact folder",
    "  cd blog         - Navigate to blog folder",
    "",
    "  Inside any folder, use 'cat data.txt' to view contents",
  ];
  return { output: commands.join("\n") };
}

function handleLs(path: string[]): CommandResult {
  if (path.length === 0) {
    const items = [...rootFolders.map((f) => `${f}/`), ...rootFiles];
    return { output: items.join("  ") };
  }
  if (path[0] === "projects") {
    // Projects folder contains data.txt and individual project files
    const projectNames = projects.map((p) => p.id);
    return { output: `data.txt  ${projectNames.join("  ")}` };
  }
  // All other folders contain data.txt
  if (path.length === 1 && rootFolders.includes(path[0])) {
    return { output: "data.txt" };
  }
  return { output: "" };
}

function handleCd(args: string[], currentPath: string[]): CommandResult {
  if (args.length === 0) {
    return { output: "cd: missing argument\nUsage: cd [folder] or cd .." };
  }
  const target = args[0];
  
  // Handle going up one directory
  if (target === "..") {
    if (currentPath.length === 0) {
      return { output: "Already at root directory" };
    }
    // Valid navigation - return empty output (success)
    return { output: "" };
  }
  
  // Handle navigating into a folder
  // Can only navigate into root folders when at root, or navigate into subfolders
  if (currentPath.length === 0) {
    // At root - can navigate into any root folder
    if (rootFolders.includes(target.toLowerCase())) {
      return { output: "" }; // Valid navigation
    }
    return {
      output: `cd: no such file or directory: ${target}\nAvailable folders: ${rootFolders.join(", ")}`,
    };
  }
  
  if( target === "blog") {
    // navigate to the /blog page
    redirect("/blogs");
  }
  if (!rootFolders.includes(target.toLowerCase())) {
    return { output: `cd: no such file or directory: ${target}\nAvailable folders: ${rootFolders.join(", ")}` };
  }
  return { output: "" };
}

function handleCat(args: string[], path: string[]): CommandResult {
  if (args.length === 0) {
    return { output: "cat: missing argument\nUsage: cat [file]" };
  }
  const filename = args[0].toLowerCase();

  // Root directory files
  if (path.length === 0) {
    if (filename === "readme.txt") {
      return {
        output: `Welcome to ${personal.name}'s Portfolio Terminal!

This is an interactive terminal interface. Type 'help' to see available commands.

Quick start:
  - Type 'ls' to see available folders
  - Type 'cd [folder]' to navigate into a folder
  - Type 'cat data.txt' inside a folder to view its contents
  - Type 'cat readme.txt' to see this file again
  - Type 'whoami' to learn about me
  - Type 'neofetch' for a fun system summary

Enjoy exploring!`,
      };
    }
    if (filename === "resume.pdf") {
      return {
        output: `Resume PDF is not available in terminal mode.

To download my resume, please visit:
${personal.linkedin}

Or contact me at: ${personal.email}`,
      };
    }
  }

  // Handle data.txt in different folders
  if (filename === "data.txt" && path.length === 1) {
    const folder = path[0].toLowerCase();
    switch (folder) {
      case "about":
        return {
          output: `About ${personal.name}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${personal.name}
${personal.title}

${personal.bio}

Location: ${personal.location}
Experience: ${personal.yearsExperience}+ years`,
        };
      case "experience":
        return handleExperience();
      case "skills":
        return handleSkills();
      case "contact":
        return handleContact();
      case "blog":
        return {
          output: `Blog
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Coming soon! Check back later for technical articles and insights.

In the meantime, you can find me on:
- LinkedIn: ${personal.linkedin}
- GitHub: ${personal.github}`,
        };
      default:
        break;
    }
  }

  // Projects directory
  if (path.length === 1 && path[0] === "projects") {
    if (filename === "data.txt") {
      return handleProjects();
    }
    const project = projects.find((p) => p.id === filename);
    if (project) {
      return { output: project.content };
    }
  }

  // Try to find project by name from root (backward compatibility)
  const project = projects.find((p) => p.id === filename);
  if (project) {
    return { output: project.content };
  }

  return {
    output: `cat: ${filename}: No such file or directory\nUse 'ls' to see available files.`,
  };
}

function handleWhoami(): CommandResult {
  return {
    output: `${personal.name}\n${personal.title}\n\n${personal.bio}`,
  };
}

function handleNeofetch(state: TerminalState): CommandResult {
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return {
    output: `
            _     _           _        _   
           / \\   | |__   ___ | |_ __ _| |_ 
          / _ \\  | '_ \\ / _ \\| __/ _\` | __|
         / ___ \\ | | | | (_) | || (_| | |_ 
        /_/   \\_\\|_| |_|\\___/ \\__\\__,_|\\__|
                                          
       ${personal.name}@portfolio
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        OS: Portfolio Terminal v1.0
      🖥️ Hostname: ${personal.name.toLowerCase().replace(/\s+/g, "-")}-portfolio
        Uptime: ${formatUptime(state.startTime)}
        Shell: /bin/bash
        Editor: NeoVim
        Location: ${personal.location}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    Experience: ${personal.yearsExperience}+ years
        Focus: Backend Architecture & Cloud
        Stack: TypeScript, Node.js, AWS, Docker
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        Date: ${dateStr}
        Time: ${timeStr}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`,
  };
}

function handleDate(): CommandResult {
  const now = new Date();
  return {
    output: now.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    }),
  };
}

function handleUptime(startTime: Date): CommandResult {
  return { output: `up ${formatUptime(startTime)}` };
}

function handlePwd(path: string[]): CommandResult {
  return { output: getPathString(path) };
}

function handleContact(): CommandResult {
  return {
    output: `Contact Information
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Email:    ${personal.email}
LinkedIn: ${personal.linkedin}
GitHub:   ${personal.github}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Click on the links above to open in a new tab.`,
  };
}

function handleProjects(): CommandResult {
  const projectList = projects
    .map(
      (p, i) =>
        `${i + 1}. ${p.name}\n   ${p.description}\n   Tech: ${p.techStack.join(", ")}`
    )
    .join("\n\n");
  return {
    output: `Projects
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${projectList}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Type 'cd projects' then 'cat [project-id]' for detailed information.
Or type 'cat [project-id]' from root directory.`,
  };
}

function handleExperience(): CommandResult {
  const expList = experience
    .map((exp) => {
      const dateRange = `${exp.startDate} - ${exp.endDate}`;
      const achievements = exp.achievements.map((a) => `  • ${a}`).join("\n");
      return `${exp.role} at ${exp.company}\n${dateRange}\n${achievements}`;
    })
    .join("\n\n");
  return {
    output: `Work Experience
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${expList}`,
  };
}

function handleSkills(): CommandResult {
  const skillsList = skills
    .map((category) => {
      const items = category.items.join(", ");
      return `${category.name.padEnd(20)} ${items}`;
    })
    .join("\n");
  return {
    output: `Technical Skills
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${skillsList}`,
  };
}

function handleHistory(historyProvider?: HistoryProvider): CommandResult {
  if (!historyProvider) {
    return { output: "History not available." };
  }

  const history = historyProvider.getAllWithTimestamps();
  
  if (history.length === 0) {
    return { output: "No command history found." };
  }

  // Format timestamps
  const formatTime = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days}d ago`;
    }
    if (hours > 0) {
      return `${hours}h ago`;
    }
    if (minutes > 0) {
      return `${minutes}m ago`;
    }
    return `${seconds}s ago`;
  };

  // Create table format
  const maxIndexWidth = String(history.length).length;
  const maxTimeWidth = 10; // "999d ago" is max
  
  const header = `  ${"#".padEnd(maxIndexWidth)}  ${"Time".padEnd(maxTimeWidth)}  Command`;
  const separator = "  " + "─".repeat(maxIndexWidth) + "  " + "─".repeat(maxTimeWidth) + "  " + "─".repeat(50);
  
  const rows = history
    .map((entry, index) => {
      const num = String(index + 1).padEnd(maxIndexWidth);
      const time = formatTime(entry.timestamp).padEnd(maxTimeWidth);
      const cmd = entry.command;
      return `  ${num}  ${time}  ${cmd}`;
    })
    .reverse(); // Show most recent first

  return {
    output: `Command History
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${header}
${separator}
${rows.join("\n")}

Total: ${history.length} command${history.length !== 1 ? "s" : ""}`,
  };
}

