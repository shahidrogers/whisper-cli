#!/usr/bin/env bun

import { platform } from "os";
import * as readline from "readline";
import { initConfig, saveConfig } from "./config.js";
import { startRepl } from "./repl.js";

async function promptForApiKey(): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log("\nWelcome to Whisper CLI!");
  console.log("\nTo get started, you need an OpenRouter API key.");
  console.log("Get your free key at: https://openrouter.ai/");
  console.log("(You can also set the OPENROUTER_API_KEY environment variable)\n");

  return new Promise((resolve) => {
    rl.question("Enter your OpenRouter API key: ", (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function main() {
  // Check platform
  const p = platform();
  if (p !== "darwin" && p !== "linux") {
    console.error(`Error: Unsupported platform: ${p}`);
    console.error("Whisper CLI only supports macOS and Linux");
    process.exit(1);
  }

  try {
    // Initialize configuration
    let config = await initConfig();

    // Check for API key (env var takes precedence)
    const envApiKey = process.env.OPENROUTER_API_KEY;

    if (!envApiKey && !config.api_key) {
      // No API key found, prompt for it
      const apiKey = await promptForApiKey();

      if (!apiKey) {
        console.error("\nError: API key is required");
        process.exit(1);
      }

      // Save API key to config
      config.api_key = apiKey;
      await saveConfig(config);
      console.log("\nAPI key saved to config file.");
      console.log("You can change it later by editing: ~/.config/whisper/config.json\n");
    }

    // Set the API key for this session
    if (envApiKey) {
      // Environment variable takes precedence
      process.env.OPENROUTER_API_KEY = envApiKey;
    } else if (config.api_key) {
      // Use saved API key
      process.env.OPENROUTER_API_KEY = config.api_key;
    }

    // Start REPL
    await startRepl(config);
  } catch (error) {
    console.error("Fatal error:", error);
    process.exit(1);
  }
}

main();
