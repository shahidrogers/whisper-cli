import { z } from "zod";

// Risk levels for command classification
export enum RiskLevel {
  SAFE = "SAFE",
  CAUTION = "CAUTION",
  DANGEROUS = "DANGEROUS",
}

// Zod schema for LLM response (JSON contract)
export const CommandResponseSchema = z.object({
  command: z.string().optional().describe("The shell command to execute"),
  explanation: z.string().optional().describe("Brief explanation of what the command does"),
  message: z.string().optional().describe("Message from the LLM if it needs to ask a clarifying question or doesn't know"),
  risk_hint: z
    .enum(["SAFE", "CAUTION", "DANGEROUS"])
    .optional()
    .describe("Optional risk hint from the LLM"),
  exit_codes: z
    .record(z.string())
    .optional()
    .describe("Map of exit codes to human-readable messages (e.g., {'0': 'Success', '1': 'No processes found'})"),
});

export type CommandResponse = z.infer<typeof CommandResponseSchema>;

// Policy decision result
export interface PolicyDecision {
  allowed: boolean;
  riskLevel: RiskLevel;
  requiresConfirmation: boolean;
  reason?: string;
  blockingRule?: string;
}

// Audit log entry
export interface AuditEntry {
  timestamp: string;
  userInput: string;
  command: string;
  explanation: string;
  riskLevel: RiskLevel;
  allowed: boolean;
  executed: boolean;
  exitCode?: number;
  duration?: number;
  dryRun: boolean;
  armMode: boolean;
}

// Configuration schema
export const WhisperConfigSchema = z.object({
  api_key: z.string().optional(),
  default_model: z.string().default("qwen/qwen-2.5-7b-instruct"),
  fallback_model: z.string().default("google/gemini-2.5-flash-lite"),
  auto_run_safe: z.boolean().default(true),
  max_output_lines: z.number().default(300),
  command_timeout_ms: z.number().default(10000),
  arm_duration_seconds: z.number().default(60),
  custom_denylist: z.array(z.string()).default([]),
  custom_allowlist: z.array(z.string()).default([]),
});

export type WhisperConfig = z.infer<typeof WhisperConfigSchema>;

// Default configuration
export const DEFAULT_CONFIG: WhisperConfig = {
  api_key: undefined,
  default_model: "qwen/qwen-2.5-7b-instruct",
  fallback_model: "google/gemini-2.5-flash-lite",
  auto_run_safe: true,
  max_output_lines: 300,
  command_timeout_ms: 10000,
  arm_duration_seconds: 60,
  custom_denylist: [],
  custom_allowlist: [],
};

// Environment context
export interface EnvironmentContext {
  os: string;
  shell: string;
  cwd: string;
  availableTools: string[];
}
