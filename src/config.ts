import { join } from "path";
import { homedir } from "os";
import { mkdir } from "fs/promises";
import {
  WhisperConfig,
  WhisperConfigSchema,
  DEFAULT_CONFIG,
} from "./schema.js";

// XDG Base Directory paths
export function getConfigPath(): string {
  const xdgConfig = process.env.XDG_CONFIG_HOME;
  const configDir = xdgConfig
    ? join(xdgConfig, "whisper")
    : join(homedir(), ".config", "whisper");
  return join(configDir, "config.json");
}

export function getConfigDir(): string {
  const xdgConfig = process.env.XDG_CONFIG_HOME;
  return xdgConfig
    ? join(xdgConfig, "whisper")
    : join(homedir(), ".config", "whisper");
}

// Load configuration from disk
export async function loadConfig(): Promise<WhisperConfig> {
  const configPath = getConfigPath();

  try {
    const file = Bun.file(configPath);
    if (await file.exists()) {
      const json = await file.json();
      // Validate and merge with defaults
      const parsed = WhisperConfigSchema.parse(json);
      return parsed;
    }
  } catch (error) {
    console.error("Failed to load config, using defaults:", error);
  }

  return DEFAULT_CONFIG;
}

// Save configuration to disk
export async function saveConfig(config: WhisperConfig): Promise<void> {
  const configDir = getConfigDir();
  const configPath = getConfigPath();

  try {
    // Ensure config directory exists
    await mkdir(configDir, { recursive: true });

    // Validate before saving
    const validated = WhisperConfigSchema.parse(config);

    // Write config file
    await Bun.write(configPath, JSON.stringify(validated, null, 2));
  } catch (error) {
    throw new Error(`Failed to save config: ${error}`);
  }
}

// Initialize config (create default if doesn't exist)
export async function initConfig(): Promise<WhisperConfig> {
  const config = await loadConfig();

  // If config file doesn't exist, create it with defaults
  const configPath = getConfigPath();
  const file = Bun.file(configPath);

  if (!(await file.exists())) {
    await saveConfig(DEFAULT_CONFIG);
    return DEFAULT_CONFIG;
  }

  return config;
}
