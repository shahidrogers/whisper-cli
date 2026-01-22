import type { WhisperConfig } from "./schema.js";

// Output buffer with line limit
export class OutputBuffer {
  private lines: string[] = [];
  private maxLines: number;
  private truncated = false;

  constructor(maxLines: number = 300) {
    this.maxLines = maxLines;
  }

  addLine(line: string): void {
    if (this.lines.length >= this.maxLines) {
      this.truncated = true;
      return;
    }
    this.lines.push(line);
  }

  getLines(): string[] {
    return this.lines;
  }

  isTruncated(): boolean {
    return this.truncated;
  }

  getOutput(): string {
    let output = this.lines.join("\n");
    if (this.truncated) {
      output += `\n\n... (output truncated at ${this.maxLines} lines)`;
    }
    return output;
  }
}

// Get the shell to use for command execution
function getShell(): string {
  return process.env.SHELL || "/bin/sh";
}

// Command execution result
export interface ExecutionResult {
  exitCode: number;
  output: string;
  duration: number;
  truncated: boolean;
  timedOut: boolean;
}

// Execute command with timeout and output buffering
export async function executeCommand(
  command: string,
  config: WhisperConfig
): Promise<ExecutionResult> {
  const startTime = Date.now();
  const buffer = new OutputBuffer(config.max_output_lines);

  try {
    const shell = getShell();

    // Spawn process through shell to support pipes, redirects, etc.
    const proc = Bun.spawn([shell, "-c", command], {
      stdout: "pipe",
      stderr: "pipe",
    });

    // Set up timeout
    const timeoutMs = config.command_timeout_ms;
    const timeoutHandle = setTimeout(() => {
      proc.kill();
    }, timeoutMs);

    let timedOut = false;

    // Stream stdout
    const stdoutReader = proc.stdout.getReader();
    const stderrReader = proc.stderr.getReader();

    // Helper to read stream
    async function readStream(
      reader: ReadableStreamDefaultReader<Uint8Array>
    ): Promise<void> {
      const decoder = new TextDecoder();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const text = decoder.decode(value, { stream: true });
          const lines = text.split("\n");

          for (const line of lines) {
            if (line.trim()) {
              buffer.addLine(line);
              console.log(line);
            }
          }
        }
      } finally {
        reader.releaseLock();
      }
    }

    // Read both streams concurrently
    await Promise.all([readStream(stdoutReader), readStream(stderrReader)]);

    // Wait for process to exit
    const exitCode = await proc.exited;

    // Clear timeout
    clearTimeout(timeoutHandle);

    // Check if process was killed by timeout
    if (exitCode === null || exitCode === 124 || exitCode === 137) {
      timedOut = true;
    }

    const duration = Date.now() - startTime;

    return {
      exitCode: exitCode ?? -1,
      output: buffer.getOutput(),
      duration,
      truncated: buffer.isTruncated(),
      timedOut,
    };
  } catch (error) {
    const duration = Date.now() - startTime;

    return {
      exitCode: -1,
      output: `Error executing command: ${error}`,
      duration,
      truncated: false,
      timedOut: false,
    };
  }
}
