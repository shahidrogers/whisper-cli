import { join } from "path";
import { homedir } from "os";
import { mkdir } from "fs/promises";
import type { AuditEntry } from "./schema.js";

// Get log directory path
export function getLogDir(): string {
  const xdgData = process.env.XDG_DATA_HOME;
  return xdgData
    ? join(xdgData, "whisper")
    : join(homedir(), ".local", "share", "whisper");
}

// Get log file path
export function getLogPath(): string {
  return join(getLogDir(), "log.jsonl");
}

// Ensure log directory exists
async function ensureLogDir(): Promise<void> {
  const logDir = getLogDir();
  await mkdir(logDir, { recursive: true });
}

// Append audit entry to log file (JSONL format)
export async function logAuditEntry(entry: AuditEntry): Promise<void> {
  try {
    await ensureLogDir();

    const logPath = getLogPath();
    const line = JSON.stringify(entry) + "\n";

    // Append to log file
    const file = Bun.file(logPath);
    const writer = file.writer();

    // If file exists, read existing content first
    if (await file.exists()) {
      const existingContent = await file.text();
      writer.write(existingContent);
    }

    writer.write(line);
    await writer.end();
  } catch (error) {
    console.error("Failed to write audit log:", error);
  }
}

// Read recent audit entries
export async function readAuditHistory(limit: number = 20): Promise<AuditEntry[]> {
  try {
    const logPath = getLogPath();
    const file = Bun.file(logPath);

    if (!(await file.exists())) {
      return [];
    }

    const content = await file.text();
    const lines = content.trim().split("\n").filter(line => line.length > 0);

    // Parse JSONL entries
    const entries: AuditEntry[] = [];
    for (const line of lines) {
      try {
        const entry = JSON.parse(line) as AuditEntry;
        entries.push(entry);
      } catch {
        // Skip malformed lines
        continue;
      }
    }

    // Return last N entries
    return entries.slice(-limit);
  } catch (error) {
    console.error("Failed to read audit history:", error);
    return [];
  }
}

// Format audit entry for display
export function formatAuditEntry(entry: AuditEntry): string {
  const timestamp = new Date(entry.timestamp).toLocaleString();
  const status = entry.executed
    ? entry.exitCode === 0
      ? "✓"
      : "✗"
    : "-";
  const risk = entry.riskLevel.padEnd(9);

  return `[${timestamp}] ${status} [${risk}] ${entry.command}`;
}
