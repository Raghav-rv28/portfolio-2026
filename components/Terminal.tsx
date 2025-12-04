"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Terminal as XTerm } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";
import { executeCommand } from "@/lib/commands";
import { CommandHistory } from "@/lib/history";
import { getAutocompleteSuggestion } from "@/lib/autocomplete";
import {
  getInitialState,
  navigatePath,
  getPathString,
  formatUptime,
  saveState,
  type TerminalState,
} from "@/lib/terminal";
import { personal } from "@/lib/data/personal";
import { TerminalWindow } from "@/components/TerminalWindow";

interface TerminalProps {
  onOpenModal: () => void;
}

export default function Terminal({ onOpenModal }: TerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  const historyRef = useRef<CommandHistory>(new CommandHistory());
  const [state, setState] = useState<TerminalState>(getInitialState);
  const currentLineRef = useRef<string>("");
  const isTypingWelcomeRef = useRef<boolean>(true);
  const stateRef = useRef<TerminalState>(getInitialState());

  const writePrompt = useCallback((term: XTerm, path: string[]) => {
    const prompt = `\r\n${getPathString(path)} $ `;
    term.write(prompt);
  }, []);

  const writeWelcomeMessage = useCallback((term: XTerm) => {
    const welcomeText = `Welcome to ${personal.name}'s Portfolio Terminal! Type 'help' to see available commands.`;
    let index = 0;
    const typeChar = () => {
      if (index < welcomeText.length) {
        term.write(welcomeText[index]);
        index++;
        setTimeout(typeChar, 15);
      } else {
        isTypingWelcomeRef.current = false;
        writePrompt(term, stateRef.current.currentPath);
      }
    };
    typeChar();
  }, [writePrompt]);

  const handleCommand = useCallback(
    (command: string, term: XTerm) => {
      if (!command.trim() && !isTypingWelcomeRef.current) {
        writePrompt(term, stateRef.current.currentPath);
        return;
      }

      historyRef.current.add(command);
      historyRef.current.resetIndex();

      // Execute command first to validate (especially for cd)
      const result = executeCommand(command, stateRef.current, historyRef.current);

      // Handle cd command - update path only if command was successful (no error output)
      const parts = command.trim().split(/\s+/);
      if (parts[0]?.toLowerCase() === "cd" && parts.length > 1) {
        // Only update path if there's no error (empty output means success for cd)
        if (!result.output || result.output === "") {
          const newPath = navigatePath(stateRef.current.currentPath, parts[1]);
          stateRef.current.currentPath = newPath;
          const newState = { ...stateRef.current, currentPath: newPath };
          setState(newState);
          saveState(newState);
        }
      }

      if (result.shouldClear) {
        // Only clear the screen, don't reset state
        term.clear();
        writePrompt(term, stateRef.current.currentPath);
        return;
      }

      if (result.shouldOpenModal) {
        // Open modal without clearing terminal or resetting state
        onOpenModal();
        // Don't write prompt here - keep the current line intact
        return;
      }

      if (result.output) {
        // Split output by newlines and write each line separately
        // For links, we'll use OSC 8 escape sequences
        const lines = result.output.split("\n");
        lines.forEach((line, index) => {
          // Process links in the line
          const processedLine = line.replace(
            /(https?:\/\/[^\s]+)/g,
            (url) => `\x1b]8;;${url}\x1b\\${url}\x1b]8;;\x1b\\`
          );
          term.writeln(processedLine);
        });
      }

      if (!isTypingWelcomeRef.current) {
        writePrompt(term, stateRef.current.currentPath);
      }
    },
    [onOpenModal, writePrompt]
  );

  useEffect(() => {
    if (!terminalRef.current || xtermRef.current) return; // Prevent re-initialization

    const term = new XTerm({
      theme: {
        background: "#0a0a0a",
        foreground: "#00ff00",
        cursor: "#00ffff",
        cursorAccent: "#00ffff",
      },
      fontFamily: '"Geist Mono", "Courier New", monospace',
      fontSize: 18,
      lineHeight: 1.7,
      cursorBlink: true,
      cursorStyle: "block",
      allowTransparency: true,
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    
    xtermRef.current = term;
    fitAddonRef.current = fitAddon;
    
    term.open(terminalRef.current);
    
    // Wait for terminal to be fully initialized before fitting
    // Check if renderer is ready before calling fit()
    const fitTerminal = () => {
      if (!fitAddonRef.current || !terminalRef.current || !xtermRef.current) return;
      
      try {
        // Check if renderer exists before fitting
        const core = (xtermRef.current as any)._core;
        if (core && core._renderService && core._renderService._renderer) {
          fitAddonRef.current.fit();
        }
      } catch (error) {
        // Silently ignore - will retry
      }
    };
    
    // Use multiple delayed attempts with renderer checks
    const attemptFit = (delay: number) => {
      setTimeout(() => {
        const core = (xtermRef.current as any)?._core;
        if (core?._renderService?._renderer) {
          fitTerminal();
        } else if (delay < 500) {
          attemptFit(delay + 50);
        }
      }, delay);
    };
    
    attemptFit(50);

    // Handle window resize with debouncing and renderer check
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!fitAddonRef.current || !xtermRef.current) return;
        
        try {
          const core = (xtermRef.current as any)?._core;
          if (core?._renderService?._renderer) {
            fitAddonRef.current.fit();
          }
        } catch (error) {
          // Silently ignore resize errors
        }
      }, 100);
    };
    window.addEventListener("resize", handleResize);

    // Start welcome message
    writeWelcomeMessage(term);

    // Handle input
    let currentLine = "";
    let escapeSequence = "";
    
    const updateLine = (newLine: string) => {
      currentLine = newLine;
      currentLineRef.current = newLine;
      const prompt = `${getPathString(stateRef.current.currentPath)} $ `;
      // Move to start of line, clear entire line, then rewrite prompt and new line
      term.write("\r\x1b[2K"); // \r = return to start, \x1b[2K = clear entire line
      term.write(`${prompt}${newLine}`);
    };
    
    term.onData((data) => {
      if (isTypingWelcomeRef.current) return;

      // Check if data itself contains escape sequences (handles cases where it comes in one chunk)
      if (data.includes("\x1b[") || data.includes("\u001b[")) {
        if (data.includes("A") && (data.includes("\x1b[A") || data.includes("\u001b[A") || data.endsWith("A"))) {
          // Up arrow
          const prev = historyRef.current.getPrevious();
          if (prev !== null) {
            updateLine(prev);
          }
          escapeSequence = "";
          return;
        }
        if (data.includes("B") && (data.includes("\x1b[B") || data.includes("\u001b[B") || data.endsWith("B"))) {
          // Down arrow
          const next = historyRef.current.getNext();
          if (next !== null) {
            updateLine(next);
          } else {
            updateLine("");
          }
          escapeSequence = "";
          return;
        }
      }

      // Handle escape sequences (arrow keys) - multi-chunk handling
      if (escapeSequence) {
        escapeSequence += data;
        
        // Check for complete escape sequences (arrow keys)
        // Format: ESC[ followed by A (up) or B (down)
        if (escapeSequence.includes("[A") || escapeSequence.endsWith("A")) {
          // Up arrow
          const prev = historyRef.current.getPrevious();
          if (prev !== null) {
            updateLine(prev);
          }
          escapeSequence = "";
          return;
        }
        
        if (escapeSequence.includes("[B") || escapeSequence.endsWith("B")) {
          // Down arrow
          const next = historyRef.current.getNext();
          if (next !== null) {
            updateLine(next);
          } else {
            updateLine("");
          }
          escapeSequence = "";
          return;
        }
        
        // Reset if sequence is too long or doesn't match expected pattern
        if (escapeSequence.length > 10) {
          escapeSequence = "";
        }
        return;
      }

      const code = data.charCodeAt(0);

      // ESC key (code 27) - start of escape sequence
      if (code === 27) {
        escapeSequence = data;
        return;
      }
      
      // If we receive '[' after ESC, continue building escape sequence
      if (data === "[" && escapeSequence) {
        escapeSequence += data;
        return;
      }

      // Enter key
      if (code === 13) {
        term.writeln("");
        handleCommand(currentLine, term);
        currentLine = "";
        currentLineRef.current = "";
        return;
      }

      // Backspace
      if (code === 127 || code === 8) {
        if (currentLine.length > 0) {
          currentLine = currentLine.slice(0, -1);
          currentLineRef.current = currentLine;
          term.write("\b \b");
        }
        return;
      }

      // Tab key - autocomplete
      if (code === 9) {
        const suggestion = getAutocompleteSuggestion(currentLine, stateRef.current.currentPath);
        if (suggestion) {
          const parts = currentLine.trim().split(/\s+/);
          if (parts.length === 1) {
            currentLine = suggestion;
          } else {
            currentLine = `${parts[0]} ${suggestion.split(/\s+/)[1]}`;
          }
          currentLineRef.current = currentLine;
          // Clear current line and rewrite
          const prompt = `${getPathString(stateRef.current.currentPath)} $ `;
          term.write("\r" + " ".repeat(prompt.length + currentLine.length + 10));
          term.write(`\r${prompt}${currentLine}`);
        }
        return;
      }

      // Regular character
      if (code >= 32 && code <= 126) {
        // Reset any partial escape sequence
        if (escapeSequence) {
          escapeSequence = "";
        }
        currentLine += data;
        currentLineRef.current = currentLine;
        term.write(data);
      }
    });

    // Save state periodically
    const saveInterval = setInterval(() => {
      if (stateRef.current) {
        saveState(stateRef.current);
      }
    }, 2000);

    return () => {
      clearTimeout(resizeTimeout);
      clearInterval(saveInterval);
      window.removeEventListener("resize", handleResize);
      // Don't dispose terminal on unmount to preserve state
      // term.dispose();
    };
  }, [writeWelcomeMessage, handleCommand]);

  // Update state ref when state changes
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  // Update prompt when path changes
  useEffect(() => {
    if (xtermRef.current && !isTypingWelcomeRef.current) {
      const term = xtermRef.current;
      const prompt = `${getPathString(state.currentPath)} $ `;
      // Clear current input line and update prompt
      const currentInput = currentLineRef.current;
      term.write("\r" + " ".repeat(prompt.length + currentInput.length + 10));
      term.write(`\r${prompt}${currentInput}`);
    }
  }, [state.currentPath]);

  return (
    <TerminalWindow title="Raghav Rudhra's Portfolio Terminal v1.0">
      <div className="relative flex-1 overflow-hidden min-h-0">
        <div
          ref={terminalRef}
          className="w-full h-full bg-[#0a0a0a]"
          style={{ fontFamily: '"Geist Mono", "Courier New", monospace' }}
        />
      </div>
    </TerminalWindow>
  );
}

