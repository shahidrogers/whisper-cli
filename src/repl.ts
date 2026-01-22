import * as readline from "readline";
import type { WhisperConfig } from "./schema.js";
import { RiskLevel } from "./schema.js";
import { getEnvironmentContext } from "./tools.js";
import { generateCommand } from "./openrouter.js";
import { evaluatePolicy } from "./policy.js";
import { executeCommand } from "./executor.js";
import { logAuditEntry, readAuditHistory, formatAuditEntry } from "./logger.js";
import { saveConfig } from "./config.js";
import { createSpinner } from "./spinner.js";

// Message for conversation history
interface ConversationMessage {
  role: "user" | "assistant";
  content: string;
}

// REPL state
interface ReplState {
  config: WhisperConfig;
  armMode: boolean;
  armExpiry: number | null;
  dryRun: boolean;
  running: boolean;
  conversationHistory: ConversationMessage[];
}

// Color codes for terminal output
const colors = {
  reset: "\x1b[0m",
  dim: "\x1b[2m",
  bold: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  orange: "\x1b[38;5;214m", // Papaya orange
};

// Risk level badges
function getRiskBadge(risk: RiskLevel): string {
  switch (risk) {
    case RiskLevel.SAFE:
      return `${colors.green}[SAFE]${colors.reset}`;
    case RiskLevel.CAUTION:
      return `${colors.yellow}[CAUTION]${colors.reset}`;
    case RiskLevel.DANGEROUS:
      return `${colors.red}[DANGEROUS]${colors.reset}`;
  }
}

// Show message in a box
function showBoxedMessage(message: string): void {
  console.log(`\n${colors.orange}╭─────────────────────────────────────────────╮${colors.reset}`);

  // Word wrap the message to fit in the box
  const maxWidth = 43;
  const words = message.split(' ');
  let lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    if (currentLine.length + word.length + 1 <= maxWidth) {
      currentLine += (currentLine ? ' ' : '') + word;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);

  // Display lines
  for (const line of lines) {
    const padding = maxWidth - line.length;
    console.log(`${colors.orange}│${colors.reset} ${line}${' '.repeat(padding)} ${colors.orange}│${colors.reset}`);
  }

  console.log(`${colors.orange}╰─────────────────────────────────────────────╯${colors.reset}\n`);
}

// Animated ASCII art for whisper
async function showWhisperAsciiArt(): Promise<void> {
  const art = [
    "                                                      ",
    " ██╗    ██╗██╗  ██╗██╗███████╗██████╗ ███████╗██████╗ ",
    " ██║    ██║██║  ██║██║██╔════╝██╔══██╗██╔════╝██╔══██╗",
    " ██║ █╗ ██║███████║██║███████╗██████╔╝█████╗  ██████╔╝",
    " ██║███╗██║██╔══██║██║╚════██║██╔═══╝ ██╔══╝  ██╔══██╗",
    " ╚███╔███╔╝██║  ██║██║███████║██║     ███████╗██║  ██║",
    "  ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝╚══════╝╚═╝     ╚══════╝╚═╝  ╚═╝",
    "                                                      ",
  ];

  const frames = 20;
  const delay = 30;

  // Clear screen
  process.stdout.write("\x1b[2J\x1b[0f");

  // Fade in animation
  for (let frame = 0; frame <= frames; frame++) {
    const opacity = frame / frames;

    // Move cursor to top
    process.stdout.write("\x1b[0f");

    for (let i = 0; i < art.length; i++) {
      const line = art[i];
      let displayLine = "";

      for (let j = 0; j < line.length; j++) {
        const char = line[j];
        // Show character based on animation progress
        const charPosition = (i * line.length + j) / (art.length * line.length);
        if (opacity >= charPosition) {
          // Add color gradient effect
          if (char !== " ") {
            const colorCode = Math.floor(90 + (opacity * 10));
            displayLine += `\x1b[${colorCode}m${char}\x1b[0m`;
          } else {
            displayLine += char;
          }
        } else {
          displayLine += " ";
        }
      }

      process.stdout.write(displayLine + "\n");
    }

    await new Promise(resolve => setTimeout(resolve, delay));
  }

  // Final render with orange color
  process.stdout.write("\x1b[0f");
  for (const line of art) {
    let coloredLine = "";
    for (const char of line) {
      if (char !== " ") {
        coloredLine += `${colors.orange}${char}${colors.reset}`;
      } else {
        coloredLine += char;
      }
    }
    console.log(coloredLine);
  }

  // Wait a moment before continuing
  await new Promise(resolve => setTimeout(resolve, 500));
}

// Build prompt with badges
function buildPrompt(state: ReplState): string {
  let prompt = "whisper";

  const badges: string[] = [];
  if (state.dryRun) badges.push(`${colors.orange}DRY${colors.reset}`);
  if (state.armMode) badges.push(`${colors.red}ARMED${colors.reset}`);

  if (badges.length > 0) {
    prompt += ` [${badges.join(" ")}]`;
  }

  prompt += "> ";
  return prompt;
}

// Show help
function showHelp(): void {
  console.log(`
${colors.bold}Whisper CLI - Natural Language Terminal Assistant${colors.reset}

${colors.bold}Usage:${colors.reset}
  Type natural language requests to generate and execute shell commands.
  Follow-up questions work! Ask "list apps on port 3000" then "port 4000?"

${colors.bold}Meta Commands:${colors.reset}
  /help              Show this help message
  /exit              Quit (or press Ctrl+D)
  /dry               Toggle dry-run mode (show commands without executing)
  /model <name>      Change the LLM model
  /key               Change your OpenRouter API key
  /history           Show last 20 commands from audit log
  /clear             Clear conversation history
  /arm               Enable dangerous commands for 60 seconds
  /unarm             Disable arm mode

${colors.bold}Safety Levels:${colors.reset}
  ${colors.green}SAFE${colors.reset}       - Auto-executed (e.g., ls, cat, git status)
  ${colors.yellow}CAUTION${colors.reset}    - Requires confirmation (e.g., kill, mv, rm)
  ${colors.red}DANGEROUS${colors.reset}  - Blocked without /arm mode (e.g., sudo, rm -rf)

${colors.bold}Examples:${colors.reset}
  "show me all files"
  "what's using port 8080"
  "find all .log files modified today"
  "show git commit history"
`);
}

// Show history
async function showHistory(): Promise<void> {
  const entries = await readAuditHistory(20);

  if (entries.length === 0) {
    console.log("No command history yet.");
    return;
  }

  console.log(`\n${colors.bold}Recent Commands:${colors.reset}\n`);
  for (const entry of entries) {
    console.log(formatAuditEntry(entry));
  }
  console.log();
}

// Ask for confirmation
async function askConfirmation(
  rl: readline.Interface,
  command: string,
  explanation: string,
  risk: RiskLevel
): Promise<boolean> {
  return new Promise((resolve) => {
    console.log(`\n${getRiskBadge(risk)} ${colors.bold}${command}${colors.reset}`);
    console.log(`${colors.dim}${explanation}${colors.reset}\n`);

    rl.question("Proceed? (y/n) [default: n] ", (answer) => {
      resolve(answer.trim().toLowerCase() === "y");
    });
  });
}

// Handle meta commands
async function handleMetaCommand(
  command: string,
  state: ReplState,
  rl: readline.Interface
): Promise<boolean> {
  const parts = command.slice(1).trim().split(/\s+/);
  const cmd = parts[0];
  const args = parts.slice(1);

  switch (cmd) {
    case "help":
      showHelp();
      return true;

    case "exit":
    case "quit":
      state.running = false;
      return true;

    case "dry":
      state.dryRun = !state.dryRun;
      console.log(
        `Dry-run mode ${state.dryRun ? "enabled" : "disabled"}`
      );
      return true;

    case "model":
      if (args.length === 0) {
        console.log(`Current model: ${state.config.default_model}`);
      } else {
        state.config.default_model = args[0];
        await saveConfig(state.config);
        console.log(`Model changed to: ${args[0]}`);
      }
      return true;

    case "history":
      await showHistory();
      return true;

    case "arm":
      state.armMode = true;
      state.armExpiry = Date.now() + state.config.arm_duration_seconds * 1000;
      console.log(
        `${colors.red}⚠ Dangerous commands enabled for ${state.config.arm_duration_seconds} seconds${colors.reset}`
      );
      return true;

    case "unarm":
      state.armMode = false;
      state.armExpiry = null;
      console.log("Dangerous commands disabled");
      return true;

    case "key":
      return new Promise((resolve) => {
        rl.question("Enter new OpenRouter API key: ", async (answer) => {
          const newKey = answer.trim();
          if (newKey) {
            state.config.api_key = newKey;
            process.env.OPENROUTER_API_KEY = newKey;
            await saveConfig(state.config);
            console.log("API key updated and saved");
          } else {
            console.log("API key unchanged");
          }
          resolve(true);
        });
      });

    case "clear":
      state.conversationHistory = [];
      console.log("Conversation history cleared");
      return true;

    default:
      console.log(`Unknown meta command: ${cmd}`);
      console.log('Type "/help" for available commands');
      return true;
  }
}

// Available meta commands for autocomplete
const META_COMMANDS = [
  { command: "/help", description: "Show this help message" },
  { command: "/exit", description: "Quit (or press Ctrl+D)" },
  { command: "/dry", description: "Toggle dry-run mode" },
  { command: "/model", description: "Change the LLM model" },
  { command: "/key", description: "Change your OpenRouter API key" },
  { command: "/history", description: "Show last 20 commands" },
  { command: "/clear", description: "Clear conversation history" },
  { command: "/arm", description: "Enable dangerous commands for 60s" },
  { command: "/unarm", description: "Disable arm mode" },
];

// Custom readline with arrow key autocomplete
async function readLineWithAutocomplete(
  prompt: string,
  rl: readline.Interface
): Promise<string> {
  return new Promise((resolve) => {
    let input = "";
    let selectedIndex = -1;
    let suggestions: Array<{ command: string; description: string }> = [];
    let lastDrawnSuggestions = 0;

    const stdin = process.stdin;
    const stdout = process.stdout;

    // Show prompt
    stdout.write(prompt);

    const redraw = () => {
      // Save cursor position (we should be at end of input)
      const inputEndCol = prompt.length + input.length;

      // If we drew suggestions before, clear them
      if (lastDrawnSuggestions > 0) {
        // Move down to first suggestion line (without creating new line)
        readline.moveCursor(stdout, 0, 1);
        // Clear all suggestion lines
        for (let i = 0; i < lastDrawnSuggestions; i++) {
          readline.clearLine(stdout, 0);
          if (i < lastDrawnSuggestions - 1) {
            readline.moveCursor(stdout, 0, 1);
          }
        }
        // Move back up to input line
        readline.moveCursor(stdout, 0, -lastDrawnSuggestions);
        // Position at beginning of input line
        readline.cursorTo(stdout, 0);
      } else {
        // Just go to beginning of current line
        readline.cursorTo(stdout, 0);
      }

      // Clear the input line
      readline.clearLine(stdout, 0);

      // Redraw prompt and input
      stdout.write(prompt + input);

      // Show suggestions if any
      if (suggestions.length > 0) {
        stdout.write("\n");
        suggestions.forEach((item, idx) => {
          if (idx === selectedIndex) {
            stdout.write(`${colors.orange}> ${item.command}${colors.reset} ${colors.dim}- ${item.description}${colors.reset}`);
          } else {
            stdout.write(`  ${colors.dim}${item.command} - ${item.description}${colors.reset}`);
          }
          if (idx < suggestions.length - 1) {
            stdout.write("\n");
          }
        });

        lastDrawnSuggestions = suggestions.length;

        // Move cursor back up to input line
        readline.moveCursor(stdout, 0, -suggestions.length);
        // Position at end of input
        readline.cursorTo(stdout, inputEndCol);
      } else {
        lastDrawnSuggestions = 0;
      }
    };

    const updateSuggestions = () => {
      const hadSuggestions = suggestions.length > 0;

      if (input.startsWith("/") && input.length >= 1) {
        suggestions = META_COMMANDS.filter((cmd) => cmd.command.startsWith(input));

        // If suggestions just appeared, select first item
        if (suggestions.length > 0 && !hadSuggestions) {
          selectedIndex = 0;
        } else if (suggestions.length > 0 && selectedIndex >= suggestions.length) {
          selectedIndex = suggestions.length - 1;
        } else if (suggestions.length === 0) {
          selectedIndex = -1;
        }
      } else {
        suggestions = [];
        selectedIndex = -1;
      }
    };

    const onKeypress = (str: string, key: any) => {
      if (!key) return;

      if (key.name === "return" || key.name === "enter") {
        // Store result before clearing
        let result = input;

        // If we have suggestions and one is selected, use it
        if (suggestions.length > 0 && selectedIndex >= 0 && selectedIndex < suggestions.length) {
          result = suggestions[selectedIndex].command;
          // Need to update display if using suggestion
          readline.cursorTo(stdout, 0);
          readline.clearLine(stdout, 0);
          stdout.write(prompt + result);
        }

        // Clear suggestions if any
        if (lastDrawnSuggestions > 0) {
          readline.moveCursor(stdout, 0, 1);
          for (let i = 0; i < lastDrawnSuggestions; i++) {
            readline.clearLine(stdout, 0);
            if (i < lastDrawnSuggestions - 1) {
              readline.moveCursor(stdout, 0, 1);
            }
          }
          readline.moveCursor(stdout, 0, -lastDrawnSuggestions);
        }

        // Move to end of line and go to next line
        readline.cursorTo(stdout, prompt.length + result.length);
        stdout.write("\n");

        stdin.setRawMode(false);
        stdin.removeListener("keypress", onKeypress);

        resolve(result);
        return;
      }

      if (key.ctrl && key.name === "c") {
        stdout.write("\n");
        stdin.setRawMode(false);
        stdin.removeListener("keypress", onKeypress);
        process.exit(0);
      }

      if (key.ctrl && key.name === "d") {
        if (input.length === 0) {
          stdout.write("\n");
          stdin.setRawMode(false);
          stdin.removeListener("keypress", onKeypress);
          resolve("");
          return;
        }
      }

      if (key.name === "backspace") {
        // Command+Delete (macOS) - clear entire line
        if (key.meta) {
          input = "";
          updateSuggestions();
          redraw();
          return;
        }
        // Regular backspace - delete one character
        if (input.length > 0) {
          input = input.slice(0, -1);
          updateSuggestions();
          redraw();
        }
        return;
      }

      // Ctrl+U - clear from cursor to beginning (clear entire line in our case)
      if (key.ctrl && key.name === "u") {
        input = "";
        updateSuggestions();
        redraw();
        return;
      }

      // Ctrl+K - clear from cursor to end (clear entire line in our case)
      if (key.ctrl && key.name === "k") {
        input = "";
        updateSuggestions();
        redraw();
        return;
      }

      if (key.name === "up") {
        if (suggestions.length > 0) {
          selectedIndex = selectedIndex <= 0 ? suggestions.length - 1 : selectedIndex - 1;
          redraw();
        }
        return;
      }

      if (key.name === "down") {
        if (suggestions.length > 0) {
          selectedIndex = selectedIndex >= suggestions.length - 1 ? 0 : selectedIndex + 1;
          redraw();
        }
        return;
      }

      if (key.name === "tab") {
        if (suggestions.length > 0) {
          selectedIndex = selectedIndex >= suggestions.length - 1 ? 0 : selectedIndex + 1;
          redraw();
        }
        return;
      }

      // Regular character input
      if (str && !key.ctrl && !key.meta) {
        input += str;
        updateSuggestions();
        redraw();
      }
    };

    // Enable keypress events
    readline.emitKeypressEvents(stdin);
    if (stdin.isTTY) {
      stdin.setRawMode(true);
    }

    stdin.on("keypress", onKeypress);
  });
}

// Main REPL function
export async function startRepl(initialConfig: WhisperConfig): Promise<void> {
  const state: ReplState = {
    config: initialConfig,
    armMode: false,
    armExpiry: null,
    dryRun: false,
    running: true,
    conversationHistory: [],
  };

  // Show animated ASCII art
  await showWhisperAsciiArt();

  console.log(`${colors.bold}Natural Language Terminal Assistant${colors.reset}`);
  console.log(`Type "/help" for usage, "/exit" to quit\n`);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // Get environment context once
  const context = await getEnvironmentContext();

  // Main loop
  while (state.running) {
    // Check arm mode expiry
    if (state.armMode && state.armExpiry && Date.now() > state.armExpiry) {
      state.armMode = false;
      state.armExpiry = null;
      console.log(`\n${colors.yellow}Arm mode expired${colors.reset}\n`);
    }

    // Display prompt and read input with autocomplete
    let userInput = await readLineWithAutocomplete(buildPrompt(state), rl);
    userInput = userInput.trim();

    // Handle empty input (including Ctrl+D)
    if (!userInput) {
      continue;
    }

    // Handle meta commands
    if (userInput.startsWith("/")) {
      // Only process if it's a complete command (not just "/")
      if (userInput.length > 1) {
        await handleMetaCommand(userInput, state, rl);
      }
      continue;
    }

    try {
      // Generate command from LLM with spinner
      const spinner = createSpinner();
      let cancelled = false;
      const abortController = new AbortController();

      // Set up escape key handler
      const stdin = process.stdin;
      const onKeypress = (str: string, key: any) => {
        if (key && key.name === "escape") {
          cancelled = true;
          abortController.abort();
          spinner.stop();
          stdin.setRawMode(false);
          stdin.removeListener("keypress", onKeypress);
          console.log(`${colors.yellow}Cancelled${colors.reset}\n`);
        }
      };

      readline.emitKeypressEvents(stdin);
      if (stdin.isTTY) {
        stdin.setRawMode(true);
      }
      stdin.on("keypress", onKeypress);

      spinner.start("Thinking");

      let response;
      try {
        response = await generateCommand(
          userInput,
          context,
          state.config.default_model,
          state.config.fallback_model,
          state.conversationHistory
        );
      } catch (error) {
        spinner.stop();
        if (stdin.isTTY && stdin.setRawMode) {
          stdin.setRawMode(false);
        }
        stdin.removeListener("keypress", onKeypress);

        // If cancelled, we already showed the message
        if (cancelled) {
          continue;
        }

        // Otherwise, show the error
        throw error;
      }

      spinner.stop();
      if (stdin.isTTY && stdin.setRawMode) {
        stdin.setRawMode(false);
      }
      stdin.removeListener("keypress", onKeypress);

      if (cancelled) {
        continue;
      }

      // Check if LLM returned a message instead of a command
      if (response.message) {
        showBoxedMessage(response.message);

        // Add to conversation history
        state.conversationHistory.push({ role: "user", content: userInput });
        state.conversationHistory.push({ role: "assistant", content: response.message });

        // Keep history limited to last 10 exchanges (20 messages)
        if (state.conversationHistory.length > 20) {
          state.conversationHistory = state.conversationHistory.slice(-20);
        }

        continue;
      }

      // Validate we have a command
      if (!response.command || !response.explanation) {
        console.log(`\n${colors.red}Error: Invalid response from LLM${colors.reset}\n`);
        continue;
      }

      const { command, explanation, exit_codes } = response;

      // Add to conversation history
      state.conversationHistory.push({ role: "user", content: userInput });
      state.conversationHistory.push({
        role: "assistant",
        content: `Command: ${command}\nExplanation: ${explanation}`
      });

      // Keep history limited to last 10 exchanges (20 messages)
      if (state.conversationHistory.length > 20) {
        state.conversationHistory = state.conversationHistory.slice(-20);
      }

      // Evaluate policy
      const policy = evaluatePolicy(command, state.config, state.armMode);

      // Check if command is blocked
      if (!policy.allowed) {
        console.log(`\n${colors.red}✗ Blocked:${colors.reset} ${policy.reason}`);
        if (policy.blockingRule) {
          console.log(`${colors.dim}Rule: ${policy.blockingRule}${colors.reset}`);
        }

        // Log blocked attempt
        await logAuditEntry({
          timestamp: new Date().toISOString(),
          userInput,
          command,
          explanation,
          riskLevel: policy.riskLevel,
          allowed: false,
          executed: false,
          dryRun: state.dryRun,
          armMode: state.armMode,
        });

        continue;
      }

      // Check if confirmation required
      let confirmed = true;
      if (policy.requiresConfirmation) {
        confirmed = await askConfirmation(rl, command, explanation, policy.riskLevel);
      } else {
        // Auto-run: show command dimmed
        console.log(`${colors.dim}→ ${command}${colors.reset}`);
      }

      if (!confirmed) {
        console.log(`${colors.yellow}Cancelled${colors.reset}`);

        // Log cancelled command
        await logAuditEntry({
          timestamp: new Date().toISOString(),
          userInput,
          command,
          explanation,
          riskLevel: policy.riskLevel,
          allowed: true,
          executed: false,
          dryRun: state.dryRun,
          armMode: state.armMode,
        });

        continue;
      }

      // Execute command (or dry-run)
      if (state.dryRun) {
        console.log(`${colors.orange}[DRY RUN]${colors.reset} Would execute: ${command}`);

        await logAuditEntry({
          timestamp: new Date().toISOString(),
          userInput,
          command,
          explanation,
          riskLevel: policy.riskLevel,
          allowed: true,
          executed: false,
          dryRun: true,
          armMode: state.armMode,
        });
      } else {
        console.log(); // Blank line before output

        const result = await executeCommand(command, state.config);

        console.log(); // Blank line after output

        // Show exit code and duration with human-readable message
        const statusIcon = result.exitCode === 0 ? `${colors.green}✓${colors.reset}` : `${colors.red}✗${colors.reset}`;

        // Get human-readable message for exit code if available
        let exitMessage = `Exit code: ${result.exitCode}`;
        if (exit_codes && exit_codes[result.exitCode.toString()]) {
          exitMessage = exit_codes[result.exitCode.toString()];
        }

        console.log(`${statusIcon} ${exitMessage} ${colors.dim}(${result.duration}ms)${colors.reset}`);

        if (result.timedOut) {
          console.log(`${colors.yellow}⚠ Command timed out${colors.reset}`);
        }

        // Log execution
        await logAuditEntry({
          timestamp: new Date().toISOString(),
          userInput,
          command,
          explanation,
          riskLevel: policy.riskLevel,
          allowed: true,
          executed: true,
          exitCode: result.exitCode,
          duration: result.duration,
          dryRun: false,
          armMode: state.armMode,
        });
      }
    } catch (error) {
      console.error(`${colors.red}Error:${colors.reset} ${error}`);
    }

    console.log(); // Blank line between iterations
  }

  rl.close();
  console.log("\nGoodbye!");
}
