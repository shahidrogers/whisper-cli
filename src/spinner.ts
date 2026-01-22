// Sleek loading animation with papaya orange accent

const ACCENT = "\x1b[38;5;214m";
const MUTED = "\x1b[38;5;245m";
const RESET = "\x1b[0m";

class LoadingSpinner {
  private frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
  private currentFrame = 0;
  private intervalId: Timer | null = null;
  private isRunning = false;

  start(message: string = "Thinking"): void {
    if (this.isRunning) return;

    this.isRunning = true;
    this.currentFrame = 0;

    // Hide cursor
    process.stdout.write("\x1b[?25l");

    // Initial render
    this.render(message);

    this.intervalId = setInterval(() => {
      this.currentFrame = (this.currentFrame + 1) % this.frames.length;
      this.render(message);
    }, 80);
  }

  private render(message: string): void {
    const frame = this.frames[this.currentFrame];
    process.stdout.write(`\r${ACCENT}${frame}${RESET} ${message}${MUTED}…${RESET}`);
  }

  stop(): void {
    if (!this.isRunning) return;

    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    this.isRunning = false;

    // Clear the line
    process.stdout.write("\r\x1b[K");

    // Show cursor
    process.stdout.write("\x1b[?25h");
  }
}

export function createSpinner(): LoadingSpinner {
  return new LoadingSpinner();
}
