import { platform } from "os";
import type { EnvironmentContext } from "./schema.js";

// Detect operating system
export function detectOS(): string {
  const p = platform();
  if (p === "darwin") return "macOS";
  if (p === "linux") return "Linux";
  return p;
}

// Detect shell
export function detectShell(): string {
  const shell = process.env.SHELL || "";

  if (shell.includes("zsh")) return "zsh";
  if (shell.includes("bash")) return "bash";
  if (shell.includes("fish")) return "fish";

  return "unknown";
}

// Get current working directory
export function getCwd(): string {
  return process.cwd();
}

// Check if a command is available in PATH
async function isCommandAvailable(command: string): Promise<boolean> {
  try {
    const proc = Bun.spawn(["which", command], {
      stdout: "ignore",
      stderr: "ignore",
    });
    await proc.exited;
    return proc.exitCode === 0;
  } catch {
    return false;
  }
}

// Detect available tools
export async function detectAvailableTools(): Promise<string[]> {
  const toolsToCheck = ["rg", "fd", "jq", "lsof", "ss", "netstat"];
  const available: string[] = [];

  for (const tool of toolsToCheck) {
    if (await isCommandAvailable(tool)) {
      available.push(tool);
    }
  }

  return available;
}

// Build complete environment context
export async function getEnvironmentContext(): Promise<EnvironmentContext> {
  return {
    os: detectOS(),
    shell: detectShell(),
    cwd: getCwd(),
    availableTools: await detectAvailableTools(),
  };
}

// Build context string for LLM prompt
export function buildContextString(context: EnvironmentContext): string {
  const lines = [
    `OS: ${context.os}`,
    `Shell: ${context.shell}`,
    `Working Directory: ${context.cwd}`,
  ];

  if (context.availableTools.length > 0) {
    lines.push(`Available Tools: ${context.availableTools.join(", ")}`);
  }

  return lines.join("\n");
}
