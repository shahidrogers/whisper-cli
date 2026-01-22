import { describe, test, expect } from "bun:test";
import { CommandResponseSchema, WhisperConfigSchema } from "../src/schema";

describe("Schema Validation - CommandResponse", () => {
  test("validates correct CommandResponse", () => {
    const valid = {
      command: "ls -la",
      explanation: "List all files",
      risk_hint: "SAFE",
    };

    const result = CommandResponseSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  test("validates CommandResponse without risk_hint", () => {
    const valid = {
      command: "ls -la",
      explanation: "List all files",
    };

    const result = CommandResponseSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  test("accepts CommandResponse with message instead of command", () => {
    const valid = {
      message: "I'm not sure what you mean. Could you clarify?",
    };

    const result = CommandResponseSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  test("accepts CommandResponse with only command and explanation", () => {
    const valid = {
      command: "ls -la",
      explanation: "List all files",
    };

    const result = CommandResponseSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  test("rejects CommandResponse with invalid risk_hint", () => {
    const invalid = {
      command: "ls -la",
      explanation: "List all files",
      risk_hint: "INVALID",
    };

    const result = CommandResponseSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  test("accepts valid risk_hint values", () => {
    const riskHints = ["SAFE", "CAUTION", "DANGEROUS"];

    for (const hint of riskHints) {
      const valid = {
        command: "test",
        explanation: "test",
        risk_hint: hint,
      };

      const result = CommandResponseSchema.safeParse(valid);
      expect(result.success).toBe(true);
    }
  });
});

describe("Schema Validation - WhisperConfig", () => {
  test("validates correct WhisperConfig", () => {
    const valid = {
      default_model: "qwen/qwen-2.5-7b-instruct",
      fallback_model: "google/gemini-2.5-flash-lite",
      auto_run_safe: true,
      max_output_lines: 300,
      command_timeout_ms: 10000,
      arm_duration_seconds: 60,
      custom_denylist: [],
      custom_allowlist: [],
    };

    const result = WhisperConfigSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  test("applies defaults for missing fields", () => {
    const minimal = {};

    const result = WhisperConfigSchema.safeParse(minimal);
    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.default_model).toBe("qwen/qwen-2.5-7b-instruct");
      expect(result.data.fallback_model).toBe("google/gemini-2.5-flash-lite");
      expect(result.data.auto_run_safe).toBe(true);
      expect(result.data.max_output_lines).toBe(300);
      expect(result.data.command_timeout_ms).toBe(10000);
      expect(result.data.arm_duration_seconds).toBe(60);
      expect(result.data.custom_denylist).toEqual([]);
      expect(result.data.custom_allowlist).toEqual([]);
    }
  });

  test("validates custom lists", () => {
    const valid = {
      custom_denylist: ["docker", "kubectl"],
      custom_allowlist: ["mycommand"],
    };

    const result = WhisperConfigSchema.safeParse(valid);
    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.custom_denylist).toEqual(["docker", "kubectl"]);
      expect(result.data.custom_allowlist).toEqual(["mycommand"]);
    }
  });

  test("rejects invalid types", () => {
    const invalid = {
      auto_run_safe: "yes", // should be boolean
      max_output_lines: "300", // should be number
    };

    const result = WhisperConfigSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });
});
