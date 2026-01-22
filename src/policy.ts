import { RiskLevel, type PolicyDecision, type WhisperConfig } from "./schema.js";

// Safe commands that can be auto-executed
const SAFE_COMMANDS = new Set([
  "pwd",
  "ls",
  "cat",
  "head",
  "tail",
  "wc",
  "stat",
  "grep",
  "rg",
  "find",
  "fd",
  "ps",
  "pgrep",
  "lsof",
  "ss",
  "netstat",
  "echo",
  "date",
  "whoami",
  "hostname",
  "uname",
  "env",
  "printenv",
  "which",
  "whereis",
  "file",
  "type",
  "man",
  "help",
  "history",
]);

// Safe git subcommands
const SAFE_GIT_SUBCOMMANDS = new Set([
  "status",
  "diff",
  "log",
  "show",
  "branch",
  "remote",
  "config",
  "blame",
  "reflog",
]);

// Dangerous command patterns
const DANGEROUS_PATTERNS = [
  /rm\s+-rf/,
  /rm\s+-fr/,
  /git\s+reset\s+--hard/,
  /mkfs/,
  /\bdd\b/,
  /format/i,
  /:\(\)\{.*\|.*&\s*\}/, // Fork bomb pattern
  />\s*\/dev\/sda/, // Writing to raw disk
  /chmod\s+-R\s+777/,
  /chown\s+-R/,
];

// Mutation verbs (require confirmation)
const MUTATION_VERBS = new Set([
  "rm",
  "mv",
  "cp",
  "chmod",
  "chown",
  "kill",
  "killall",
  "pkill",
  "touch",
  "truncate",
  "unlink",
]);

// Package managers (require confirmation)
const PACKAGE_MANAGERS = new Set([
  "npm",
  "yarn",
  "pnpm",
  "bun",
  "pip",
  "pip3",
  "brew",
  "apt",
  "apt-get",
  "yum",
  "dnf",
  "pacman",
  "cargo",
]);

// Sensitive paths
const SENSITIVE_PATHS = [
  "/etc",
  "/var",
  "/usr",
  "/bin",
  "/sbin",
  "/boot",
  "/sys",
  "/proc",
  "~/.ssh",
  "~/.config",
  "/home",
  "/root",
];

// Token parser: split command into tokens
export function tokenizeCommand(command: string): string[] {
  // Simple tokenization (not full shell parsing)
  return command.trim().split(/\s+/);
}

// Pattern detectors
export function hasSudo(command: string): boolean {
  const tokens = tokenizeCommand(command);
  return tokens[0] === "sudo";
}

export function hasRedirection(command: string): boolean {
  return /[>><&]/.test(command);
}

// Safe filter commands that can be used in pipes
const SAFE_FILTERS = new Set([
  "grep",
  "rg",
  "awk",
  "sed",
  "head",
  "tail",
  "wc",
  "sort",
  "uniq",
  "cut",
  "tr",
  "column",
  "less",
  "more",
  "cat",
]);

// Check if pipe is only using safe filters
export function hasSafePipe(command: string): boolean {
  if (!command.includes("|")) return false;

  // Split by pipe and check each part
  const parts = command.split("|");

  // First part should be a safe command
  const firstCommand = parts[0]?.trim().split(/\s+/)[0];
  if (!firstCommand || !SAFE_COMMANDS.has(firstCommand)) {
    return false;
  }

  // All subsequent parts should be safe filters
  for (let i = 1; i < parts.length; i++) {
    const part = parts[i]?.trim();
    if (!part) return false;

    const cmd = part.split(/\s+/)[0];
    if (!cmd || !SAFE_FILTERS.has(cmd)) {
      return false;
    }
  }

  return true;
}

export function hasChaining(command: string): boolean {
  return /[;&]/.test(command) || /\|\|/.test(command) || /&&/.test(command);
}

export function hasSubshell(command: string): boolean {
  return /\$\(/.test(command) || /`/.test(command);
}

export function touchesSensitivePath(command: string): boolean {
  return SENSITIVE_PATHS.some((path) => command.includes(path));
}

// Check for dangerous patterns
function matchesDangerousPattern(command: string): boolean {
  return DANGEROUS_PATTERNS.some((pattern) => pattern.test(command));
}

// Classify risk level
export function classifyRisk(command: string): RiskLevel {
  const tokens = tokenizeCommand(command);
  const baseCommand = tokens[0];

  if (!baseCommand) {
    return RiskLevel.DANGEROUS;
  }

  // Check dangerous patterns first
  if (matchesDangerousPattern(command)) {
    return RiskLevel.DANGEROUS;
  }

  // sudo is always dangerous
  if (hasSudo(command)) {
    return RiskLevel.DANGEROUS;
  }

  // Touching sensitive paths is dangerous
  if (touchesSensitivePath(command)) {
    return RiskLevel.DANGEROUS;
  }

  // Check for safe pipes first (before marking as caution)
  if (hasSafePipe(command)) {
    // Safe command piped to safe filters remains SAFE
    return RiskLevel.SAFE;
  }

  // Redirection, chaining, or subshells are caution
  if (hasRedirection(command) || hasChaining(command) || hasSubshell(command) || command.includes("|")) {
    return RiskLevel.CAUTION;
  }

  // Check if it's a safe git command
  if (baseCommand === "git" && tokens.length > 1) {
    const subcommand = tokens[1];
    if (SAFE_GIT_SUBCOMMANDS.has(subcommand)) {
      return RiskLevel.SAFE;
    }
    // Other git commands are caution
    return RiskLevel.CAUTION;
  }

  // Mutation verbs require confirmation
  if (MUTATION_VERBS.has(baseCommand)) {
    return RiskLevel.CAUTION;
  }

  // Package managers require confirmation
  if (PACKAGE_MANAGERS.has(baseCommand)) {
    return RiskLevel.CAUTION;
  }

  // Check safe allowlist
  if (SAFE_COMMANDS.has(baseCommand)) {
    return RiskLevel.SAFE;
  }

  // Default: unknown commands are caution
  return RiskLevel.CAUTION;
}

// Evaluate policy decision
export function evaluatePolicy(
  command: string,
  config: WhisperConfig,
  armMode: boolean
): PolicyDecision {
  // Check custom denylist first (unconditional block)
  for (const pattern of config.custom_denylist) {
    if (command.includes(pattern)) {
      return {
        allowed: false,
        riskLevel: RiskLevel.DANGEROUS,
        requiresConfirmation: false,
        reason: "Blocked by custom denylist",
        blockingRule: pattern,
      };
    }
  }

  // Check custom allowlist (overrides risk classification)
  for (const pattern of config.custom_allowlist) {
    if (command.includes(pattern)) {
      return {
        allowed: true,
        riskLevel: RiskLevel.SAFE,
        requiresConfirmation: false,
        reason: "Allowed by custom allowlist",
      };
    }
  }

  // Classify risk
  const riskLevel = classifyRisk(command);

  // sudo is ALWAYS blocked, even with arm mode
  if (hasSudo(command)) {
    return {
      allowed: false,
      riskLevel: RiskLevel.DANGEROUS,
      requiresConfirmation: false,
      reason: "sudo commands are always blocked for safety",
      blockingRule: "sudo_always_blocked",
    };
  }

  // DANGEROUS commands
  if (riskLevel === RiskLevel.DANGEROUS) {
    if (!armMode) {
      return {
        allowed: false,
        riskLevel: RiskLevel.DANGEROUS,
        requiresConfirmation: false,
        reason: "Dangerous command blocked. Use :arm to enable.",
        blockingRule: "dangerous_without_arm",
      };
    }

    // Even with arm mode, dangerous commands require confirmation
    return {
      allowed: true,
      riskLevel: RiskLevel.DANGEROUS,
      requiresConfirmation: true,
      reason: "Dangerous command requires confirmation",
    };
  }

  // CAUTION commands always require confirmation
  if (riskLevel === RiskLevel.CAUTION) {
    return {
      allowed: true,
      riskLevel: RiskLevel.CAUTION,
      requiresConfirmation: true,
      reason: "Command requires confirmation",
    };
  }

  // SAFE commands
  return {
    allowed: true,
    riskLevel: RiskLevel.SAFE,
    requiresConfirmation: !config.auto_run_safe,
    reason: "Safe command",
  };
}
