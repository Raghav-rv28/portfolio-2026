export interface HistoryEntry {
  command: string;
  timestamp: Date;
}

export class CommandHistory {
  private history: HistoryEntry[] = [];
  private currentIndex: number = -1;
  private maxSize: number = 100;
  private storageKey: string = "terminal_history";

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    if (typeof window === "undefined") return;
    
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        this.history = parsed.map((entry: { command: string; timestamp: string }) => ({
          command: entry.command,
          timestamp: new Date(entry.timestamp),
        }));
        // Limit to maxSize
        if (this.history.length > this.maxSize) {
          this.history = this.history.slice(-this.maxSize);
        }
      }
    } catch (error) {
      console.warn("Failed to load history from localStorage:", error);
    }
  }

  private saveToStorage(): void {
    if (typeof window === "undefined") return;
    
    try {
      const toStore = this.history.map((entry) => ({
        command: entry.command,
        timestamp: entry.timestamp.toISOString(),
      }));
      localStorage.setItem(this.storageKey, JSON.stringify(toStore));
    } catch (error) {
      console.warn("Failed to save history to localStorage:", error);
    }
  }

  add(command: string): void {
    if (command.trim() && command !== this.history[this.history.length - 1]?.command) {
      this.history.push({
        command: command.trim(),
        timestamp: new Date(),
      });
      if (this.history.length > this.maxSize) {
        this.history.shift();
      }
      this.saveToStorage();
    }
    this.currentIndex = this.history.length;
  }

  getPrevious(): string | null {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      return this.history[this.currentIndex].command;
    }
    return null;
  }

  getNext(): string | null {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      return this.history[this.currentIndex].command;
    }
    if (this.currentIndex === this.history.length - 1) {
      this.currentIndex = this.history.length;
      return "";
    }
    return null;
  }

  getAll(): string[] {
    return this.history.map((entry) => entry.command);
  }

  getAllWithTimestamps(): HistoryEntry[] {
    return [...this.history];
  }

  resetIndex(): void {
    this.currentIndex = this.history.length;
  }
}

