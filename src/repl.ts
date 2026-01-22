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
import { AVAILABLE_MODELS, getModelById, listModels } from "./models.js";
import packageJson from "../package.json" assert { type: "json" };

const VERSION = packageJson.version;

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
  cyan: "\x1b[38;5;214m", // Papaya orange (used for highlights)
  orange: "\x1b[38;5;214m", // Papaya orange
  slate: "\x1b[38;5;245m",
  accent: "\x1b[38;5;214m",
};

const ANSI_PATTERN = /\x1b\[[0-9;]*m/g;

function visibleLength(text: string): number {
  return text.replace(ANSI_PATTERN, "").length;
}

function getTerminalWidth(): number {
  const columns = process.stdout.columns ?? 80;
  return Math.max(64, Math.min(96, columns - 4));
}

function padRight(text: string, width: number): string {
  return text + " ".repeat(Math.max(0, width - visibleLength(text)));
}

function wrapWords(text: string, width: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    if (!current) {
      current = word;
      continue;
    }

    if (visibleLength(current) + 1 + word.length <= width) {
      current += ` ${word}`;
    } else {
      lines.push(current);
      current = word;
    }
  }

  if (current) lines.push(current);
  return lines.length > 0 ? lines : [""];
}

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

function renderPanel(title: string, lines: string[], borderColor: string = colors.orange): void {
  const width = getTerminalWidth();
  const contentWidth = width - 4;
  const headerText = ` ${colors.bold}${title}${colors.reset} `;
  const dashCount = Math.max(0, width - 2 - visibleLength(headerText));

  console.log(`\n${borderColor}╭${colors.reset}${headerText}${borderColor}${"─".repeat(dashCount)}╮${colors.reset}`);
  for (const line of lines) {
    console.log(`${borderColor}│${colors.reset} ${padRight(line, contentWidth)} ${borderColor}│${colors.reset}`);
  }
  console.log(`${borderColor}╰${"─".repeat(width - 2)}╯${colors.reset}\n`);
}

// Show message in a box
function showBoxedMessage(message: string): void {
  const width = getTerminalWidth();
  const contentWidth = width - 4;
  const lines = wrapWords(message, contentWidth);
  renderPanel("Whisper", lines, colors.orange);
}

// Show command preview in a framed box
function showCommandPreview(command: string, explanation: string, risk: RiskLevel, autoRun: boolean = false): void {
  const width = getTerminalWidth();
  const contentWidth = width - 4;
  const badge = getRiskBadge(risk);
  const statusText = autoRun ? "AUTO-RUN" : "CONFIRM";

  // Get border color based on risk level
  let borderColor: string;
  switch (risk) {
    case RiskLevel.SAFE:
      borderColor = colors.green;
      break;
    case RiskLevel.CAUTION:
      borderColor = colors.yellow;
      break;
    case RiskLevel.DANGEROUS:
      borderColor = colors.red;
      break;
  }

  const headerText = ` ${badge} ${colors.dim}${statusText}${colors.reset} `;
  const dashCount = Math.max(0, width - 2 - visibleLength(headerText));
  console.log(`\n${borderColor}╭${colors.reset}${headerText}${borderColor}${"─".repeat(dashCount)}╮${colors.reset}`);

  // Command block
  const commandPrefixPlain = "Command: ";
  const commandPrefix = `${colors.bold}Command${colors.reset}: `;
  const commandLines = wrapWords(command, contentWidth - commandPrefixPlain.length);
  commandLines.forEach((line, idx) => {
    const text = idx === 0
      ? `${commandPrefix}${line}`
      : `${" ".repeat(commandPrefixPlain.length)}${line}`;
    console.log(`${borderColor}│${colors.reset} ${padRight(text, contentWidth)} ${borderColor}│${colors.reset}`);
  });

  // Explanation block
  const explanationPrefixPlain = "Why: ";
  const explanationPrefix = `${colors.dim}Why${colors.reset}: `;
  const explanationLines = wrapWords(explanation, contentWidth - explanationPrefixPlain.length);
  explanationLines.forEach((line, idx) => {
    const text = idx === 0
      ? `${explanationPrefix}${colors.dim}${line}${colors.reset}`
      : `${" ".repeat(explanationPrefixPlain.length)}${colors.dim}${line}${colors.reset}`;
    console.log(`${borderColor}│${colors.reset} ${padRight(text, contentWidth)} ${borderColor}│${colors.reset}`);
  });

  console.log(`${borderColor}╰${"─".repeat(width - 2)}╯${colors.reset}\n`);
}

// Show output frame
function showOutputHeader(label: string = "Output"): void {
  const width = getTerminalWidth();
  const labelText = ` ${label} `;
  const dashCount = Math.max(0, width - visibleLength(labelText) - 3);
  console.log(`${colors.dim}╭─${labelText}${"─".repeat(dashCount)}╮${colors.reset}`);
}

function showOutputFooter(): void {
  const width = getTerminalWidth();
  console.log(`${colors.dim}╰${"─".repeat(width - 2)}╯${colors.reset}`);
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

  const frames = 8;
  const delay = 12;

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
  await new Promise(resolve => setTimeout(resolve, 120));
}

// Build prompt with badges
function buildPrompt(state: ReplState): string {
  // Get current directory (shortened)
  const cwd = process.cwd();
  const home = require("os").homedir();
  const shortCwd = cwd.startsWith(home) ? `~${cwd.slice(home.length)}` : cwd;
  const dirName = shortCwd.split('/').pop() || shortCwd;

  let prompt = `${colors.accent}whisper${colors.reset} ${colors.slate}${dirName}${colors.reset}`;

  const badges: string[] = [];
  if (state.dryRun) badges.push(`${colors.orange}DRY${colors.reset}`);
  if (state.armMode) badges.push(`${colors.red}ARMED${colors.reset}`);

  if (badges.length > 0) {
    prompt += ` ${colors.dim}·${colors.reset} ${badges.join(" ")}`;
  }

  prompt += ` ${colors.accent}›${colors.reset} `;
  return prompt;
}

// Show help
function showHelp(): void {
  console.log(`
${colors.bold}Whisper${colors.reset} ${colors.dim}Natural Language Terminal Assistant${colors.reset}

${colors.bold}Try:${colors.reset}
  ${colors.accent}show me all files${colors.reset}
  ${colors.accent}what's using port 8080${colors.reset}
  ${colors.accent}find all .log files modified today${colors.reset}

${colors.bold}Usage:${colors.reset}
  Type natural language to generate commands, or type direct shell commands to skip the LLM.
  Follow-up questions work: "list apps on port 3000" then "port 4000?"
  Press ${colors.accent}Tab${colors.reset} to autocomplete paths.

${colors.bold}Meta:${colors.reset}
  ${colors.accent}/help${colors.reset}        Show this help message
  ${colors.accent}/exit${colors.reset}        Quit (or press Ctrl+D)
  ${colors.accent}/dry${colors.reset}         Toggle dry-run mode
  ${colors.accent}/models${colors.reset}      List all available models
  ${colors.accent}/model <id>${colors.reset}  Change the LLM model
  ${colors.accent}/key${colors.reset}         Change your OpenRouter API key
  ${colors.accent}/history${colors.reset}     Show last 20 commands from audit log
  ${colors.accent}/clear${colors.reset}       Clear conversation history
  ${colors.accent}/arm${colors.reset}         Enable dangerous commands for 60 seconds
  ${colors.accent}/unarm${colors.reset}       Disable arm mode

${colors.bold}Safety:${colors.reset}
  ${colors.green}SAFE${colors.reset}     Auto-executed (e.g., ls, cat, git status)
  ${colors.yellow}CAUTION${colors.reset} Requires confirmation (e.g., kill, mv, rm)
  ${colors.red}DANGEROUS${colors.reset} Blocked without /arm (e.g., sudo, rm -rf)
`);
}

// Show first-run tips
function showFirstRunTips(): void {
  renderPanel("Welcome", [
    `${colors.green}•${colors.reset} Type what you want in plain English`,
    `${colors.green}•${colors.reset} Press ${colors.accent}Tab${colors.reset} to autocomplete paths`,
    `${colors.green}•${colors.reset} Press ${colors.accent}ESC${colors.reset} while thinking to cancel`,
    `${colors.bold}Try:${colors.reset} ${colors.dim}"show me all files"${colors.reset} or ${colors.dim}"cd node"${colors.reset} then press Tab`,
  ], colors.orange);
}

// Show history (simple text version for non-TTY)
async function showHistorySimple(): Promise<void> {
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

// Interactive history browser with search
async function showHistoryInteractive(rl: readline.Interface): Promise<void> {
  const allEntries = await readAuditHistory(100);

  if (allEntries.length === 0) {
    console.log("No command history yet.");
    return;
  }

  let searchQuery = "";
  let filteredEntries = allEntries.reverse(); // Most recent first
  let selectedIndex = 0;
  let showingDetails = false;

  const stdin = process.stdin;
  const stdout = process.stdout;
  const useAltScreen = Boolean(stdout.isTTY);
  if (useAltScreen) {
    // Alternate screen prevents scrollback spam during interactive menus.
    stdout.write("\x1b[?1049h\x1b[?25l");
  }

  const filterEntries = (query: string) => {
    if (!query) return allEntries;
    const lowerQuery = query.toLowerCase();
    return allEntries.filter(entry =>
      entry.command.toLowerCase().includes(lowerQuery) ||
      entry.userInput.toLowerCase().includes(lowerQuery) ||
      entry.explanation.toLowerCase().includes(lowerQuery)
    );
  };

  const formatEntryLine = (entry: AuditEntry, isSelected: boolean) => {
    const timestamp = new Date(entry.timestamp).toLocaleTimeString();
    const status = entry.executed
      ? entry.exitCode === 0
        ? `${colors.green}✓${colors.reset}`
        : `${colors.red}✗${colors.reset}`
      : `${colors.dim}-${colors.reset}`;

    let riskBadge = "";
    if (entry.riskLevel === "SAFE") riskBadge = `${colors.green}S${colors.reset}`;
    else if (entry.riskLevel === "CAUTION") riskBadge = `${colors.yellow}C${colors.reset}`;
    else riskBadge = `${colors.red}D${colors.reset}`;

    const marker = isSelected ? "→" : " ";
    const lineColor = isSelected ? colors.cyan : "";
    const reset = isSelected ? colors.reset : "";

    return `${lineColor}${marker} ${timestamp} ${status} ${riskBadge} ${entry.command.slice(0, 60)}${reset}`;
  };

  const showDetails = (entry: AuditEntry) => {
    stdout.write("\x1b[2J\x1b[H");
    console.log(`${colors.bold}Command Details${colors.reset}\n`);
    console.log(`${colors.dim}Timestamp:${colors.reset} ${new Date(entry.timestamp).toLocaleString()}`);
    console.log(`${colors.dim}User Input:${colors.reset} ${entry.userInput}`);
    console.log(`${colors.dim}Command:${colors.reset} ${entry.command}`);
    console.log(`${colors.dim}Explanation:${colors.reset} ${entry.explanation}`);
    console.log(`${colors.dim}Risk Level:${colors.reset} ${entry.riskLevel}`);
    console.log(`${colors.dim}Executed:${colors.reset} ${entry.executed ? "Yes" : "No"}`);
    if (entry.executed) {
      console.log(`${colors.dim}Exit Code:${colors.reset} ${entry.exitCode}`);
      console.log(`${colors.dim}Duration:${colors.reset} ${entry.duration}ms`);
    }
    console.log(`${colors.dim}Dry Run:${colors.reset} ${entry.dryRun ? "Yes" : "No"}`);
    console.log(`${colors.dim}Armed:${colors.reset} ${entry.armMode ? "Yes" : "No"}`);
    console.log(`\n${colors.dim}Press any key to go back...${colors.reset}`);
  };

  const render = () => {
    if (showingDetails) return;

    stdout.write("\x1b[2J\x1b[H");
    console.log(`${colors.bold}Command History${colors.reset} ${colors.dim}(${filteredEntries.length} entries)${colors.reset}`);

    if (searchQuery) {
      console.log(`${colors.dim}Search: ${searchQuery}_${colors.reset}`);
    } else {
      console.log(`${colors.dim}Type to search, ↑/↓ to navigate, Enter for details, Esc to exit${colors.reset}`);
    }
    console.log();

    const maxDisplay = 15;
    const startIdx = Math.max(0, selectedIndex - Math.floor(maxDisplay / 2));
    const endIdx = Math.min(filteredEntries.length, startIdx + maxDisplay);

    for (let i = startIdx; i < endIdx; i++) {
      console.log(formatEntryLine(filteredEntries[i], i === selectedIndex));
    }

    if (filteredEntries.length === 0) {
      console.log(`${colors.yellow}No matching commands found${colors.reset}`);
    }
  };

  await new Promise<void>((resolve) => {
    function cleanup() {
      stdin.removeListener("keypress", onKeypress);
      if (stdin.isTTY) {
        stdin.setRawMode(false);
      }
      // Restore main screen and cursor.
      if (useAltScreen) {
        stdout.write("\x1b[?1049l\x1b[?25h");
      } else {
        stdout.write("\x1b[2J\x1b[H");
      }
    }

    function finish() {
      cleanup();
      resolve();
    }

    const onKeypress = (_str: string, key: { name?: string; ctrl?: boolean }) => {
      // If showing details, any key goes back
      if (showingDetails) {
        showingDetails = false;
        render();
        return;
      }

      if (key?.name === "up") {
        selectedIndex = Math.max(0, selectedIndex - 1);
        render();
        return;
      }
      if (key?.name === "down") {
        selectedIndex = Math.min(filteredEntries.length - 1, selectedIndex + 1);
        render();
        return;
      }
      if (key?.name === "return") {
        if (filteredEntries.length > 0) {
          showingDetails = true;
          showDetails(filteredEntries[selectedIndex]);
        }
        return;
      }
      if (key?.name === "escape" || key?.name === "q") {
        finish();
        return;
      }
      if (key?.name === "backspace") {
        if (searchQuery.length > 0) {
          searchQuery = searchQuery.slice(0, -1);
          filteredEntries = filterEntries(searchQuery);
          selectedIndex = 0;
          render();
        }
        return;
      }
      if (key?.ctrl && key?.name === "c") {
        finish();
        return;
      }

      // Regular character input for search
      if (_str && !key?.ctrl && !key?.meta && _str.length === 1 && _str.charCodeAt(0) >= 32) {
        searchQuery += _str;
        filteredEntries = filterEntries(searchQuery);
        selectedIndex = 0;
        render();
      }
    };

    readline.emitKeypressEvents(stdin);
    if (stdin.isTTY) {
      stdin.setRawMode(true);
    }
    stdin.on("keypress", onKeypress);
    render();
  });
}

async function promptModelSelection(state: ReplState, rl: readline.Interface): Promise<void> {
  const models = AVAILABLE_MODELS;
  if (models.length === 0) {
    console.log(`${colors.red}No models available.${colors.reset}`);
    return;
  }

  let index = Math.max(0, models.findIndex((model) => model.id === state.config.selected_model));
  const stdin = process.stdin;
  const stdout = process.stdout;
  const useAltScreen = Boolean(stdout.isTTY);
  if (useAltScreen) {
    // Alternate screen prevents scrollback spam during interactive menus.
    stdout.write("\x1b[?1049h\x1b[?25l");
  }

  const render = () => {
    stdout.write("\x1b[2J\x1b[H");
    console.log(`${colors.bold}Select a model:${colors.reset}`);
    console.log(
      `${colors.dim}Use ↑/↓ to move, Enter to select, Esc to cancel${colors.reset}\n`
    );

    for (let i = 0; i < models.length; i += 1) {
      const model = models[i];
      const isSelected = i === index;
      const marker = isSelected ? "→" : " ";
      const recommended = model.recommended ? ` ${colors.green}★${colors.reset}` : "";
      const lineColor = isSelected ? colors.accent : "";

      // Price display
      const price = model.pricePer1MTokens === 0 ? "free" : `$${model.pricePer1MTokens}/1M`;

      // Compact single line display
      console.log(
        `${lineColor}${marker} ${model.name}${recommended}${colors.reset} ${colors.dim}· ${model.speed} · ${price}${colors.reset}`
      );
    }
    console.log();
  };

  const selected = await new Promise<(typeof models)[number] | null>((resolve) => {
    function cleanup() {
      stdin.removeListener("keypress", onKeypress);
      if (stdin.isTTY) {
        stdin.setRawMode(false);
      }
      // Restore main screen and cursor.
      if (useAltScreen) {
        stdout.write("\x1b[?1049l\x1b[?25h");
      } else {
        stdout.write("\x1b[2J\x1b[H");
      }
    }

    function finish(value: (typeof models)[number] | null) {
      cleanup();
      resolve(value);
    }

    const onKeypress = (_str: string, key: { name?: string }) => {
      if (key?.name === "up") {
        index = (index - 1 + models.length) % models.length;
        render();
        return;
      }
      if (key?.name === "down") {
        index = (index + 1) % models.length;
        render();
        return;
      }
      if (key?.name === "return") {
        finish(models[index]);
        return;
      }
      if (key?.name === "escape" || key?.name === "q") {
        finish(null);
      }
    };

    readline.emitKeypressEvents(stdin);
    if (stdin.isTTY) {
      stdin.setRawMode(true);
    }
    stdin.on("keypress", onKeypress);
    render();
  });

  if (!selected) {
    console.log(`${colors.yellow}Cancelled${colors.reset}\n`);
    return;
  }

  state.config.selected_model = selected.id;
  await saveConfig(state.config);
  console.log(`${colors.green}✓${colors.reset} Model: ${colors.bold}${selected.name}${colors.reset}\n`);
}

// Ask for confirmation
async function askConfirmation(
  rl: readline.Interface,
  command: string,
  explanation: string,
  risk: RiskLevel
): Promise<boolean> {
  return new Promise((resolve) => {
    showCommandPreview(command, explanation, risk, false);

    rl.question(`${colors.bold}Proceed?${colors.reset} (y/n) ${colors.dim}[default: n]${colors.reset} `, (answer) => {
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

    case "models":
      if (!process.stdin.isTTY) {
        console.log(`\n${colors.bold}Available Models:${colors.reset}\n`);
        console.log(listModels(state.config.selected_model));
        console.log(`\n${colors.dim}Use "/model <id>" to select a model${colors.reset}\n`);
        return true;
      }
      await promptModelSelection(state, rl);
      return true;

    case "model":
      if (args.length === 0) {
        const currentModel = getModelById(state.config.selected_model);
        if (currentModel) {
          console.log(`\n${colors.bold}Current:${colors.reset} ${currentModel.name}`);
        } else {
          console.log(`\n${colors.bold}Current:${colors.reset} ${state.config.selected_model}`);
        }
        console.log(`${colors.dim}Use "/models" to see all options${colors.reset}\n`);
      } else {
        const modelId = args.join(" ");
        const model = getModelById(modelId);

        if (!model) {
          console.log(`${colors.red}Error: Model not found: ${modelId}${colors.reset}`);
          console.log(`${colors.dim}Use "/models" to see all available models${colors.reset}`);
        } else {
          state.config.selected_model = modelId;
          await saveConfig(state.config);
          console.log(`${colors.green}✓${colors.reset} Model: ${colors.bold}${model.name}${colors.reset}\n`);
        }
      }
      return true;

    case "history":
      if (process.stdin.isTTY) {
        await showHistoryInteractive(rl);
      } else {
        await showHistorySimple();
      }
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
      process.stdout.write("\x1b[2J\x1b[H");
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
  { command: "/models", description: "List all available models" },
  { command: "/model", description: "Change the LLM model" },
  { command: "/key", description: "Change your OpenRouter API key" },
  { command: "/history", description: "Show last 20 commands" },
  { command: "/clear", description: "Clear conversation history" },
  { command: "/arm", description: "Enable dangerous commands for 60s" },
  { command: "/unarm", description: "Disable arm mode" },
];

// Get file/directory completions for a path
function getPathCompletions(partial: string): string[] {
  const fs = require("fs");
  const path = require("path");

  try {
    // Handle empty or whitespace
    if (!partial || partial.trim() === "") {
      partial = ".";
    }

    // Expand ~ to home directory
    const home = require("os").homedir();
    if (partial === "~") {
      partial = home;
    } else if (partial.startsWith("~/")) {
      partial = partial.replace("~", home);
    }

    // Get directory and filename parts
    const dir = path.dirname(partial);
    const base = path.basename(partial);

    // Resolve directory
    const searchDir = dir === "." ? process.cwd() : path.resolve(process.cwd(), dir);

    if (!fs.existsSync(searchDir)) {
      return [];
    }

    // Read directory contents
    const entries = fs.readdirSync(searchDir, { withFileTypes: true });

    // Filter and format matches
    const matches = entries
      .filter((entry: any) => {
        // Skip hidden files unless user typed a dot
        if (entry.name.startsWith(".") && !base.startsWith(".")) {
          return false;
        }
        return entry.name.startsWith(base);
      })
      .map((entry: any) => {
        const fullPath = dir === "." ? entry.name : path.join(dir, entry.name);
        // Add trailing slash for directories
        return entry.isDirectory() ? fullPath + "/" : fullPath;
      })
      .sort();

    return matches;
  } catch (error) {
    return [];
  }
}

// Custom readline with arrow key autocomplete
async function readLineWithAutocomplete(
  prompt: string,
  rl: readline.Interface
): Promise<string> {
  return new Promise((resolve) => {
    let input = "";
    let selectedIndex = -1;
    let suggestions: Array<{ command: string; description: string }> = [];
    let pathCompletions: string[] = [];
    let lastDrawnSuggestions = 0;
    let completionMode: "meta" | "path" | null = null;

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
      if (completionMode === "meta" && suggestions.length > 0) {
        stdout.write("\n");
        stdout.write(`${colors.dim}${'─'.repeat(70)}${colors.reset}\n`);
        suggestions.forEach((item, idx) => {
          if (idx === selectedIndex) {
            stdout.write(`${colors.orange}▸ ${colors.bold}${item.command.padEnd(18)}${colors.reset} ${colors.dim}│${colors.reset} ${item.description}${colors.reset}`);
          } else {
            stdout.write(`  ${colors.dim}${item.command.padEnd(18)} │ ${item.description}${colors.reset}`);
          }
          if (idx < suggestions.length - 1) {
            stdout.write("\n");
          }
        });
        stdout.write(`\n${colors.dim}${'─'.repeat(70)}${colors.reset}`);

        // +3 accounts for the blank line plus two separator lines.
        lastDrawnSuggestions = suggestions.length + 3;

        // Move cursor back up to input line
        readline.moveCursor(stdout, 0, -lastDrawnSuggestions);
        // Position at end of input
        readline.cursorTo(stdout, inputEndCol);
      } else if (completionMode === "path" && pathCompletions.length > 0) {
        stdout.write("\n");
        const maxDisplay = Math.min(pathCompletions.length, 10);
        for (let i = 0; i < maxDisplay; i++) {
          const completion = pathCompletions[i];
          if (i === selectedIndex) {
            stdout.write(`${colors.cyan}▸ ${completion}${colors.reset}`);
          } else {
            stdout.write(`  ${colors.dim}${completion}${colors.reset}`);
          }
          if (i < maxDisplay - 1) {
            stdout.write("\n");
          }
        }
        if (pathCompletions.length > maxDisplay) {
          stdout.write(`\n${colors.dim}  ... ${pathCompletions.length - maxDisplay} more${colors.reset}`);
          // +2 accounts for the blank line plus the "... more" line.
          lastDrawnSuggestions = maxDisplay + 2;
        } else {
          // +1 accounts for the blank line before the list.
          lastDrawnSuggestions = maxDisplay + 1;
        }

        // Move cursor back up to input line
        readline.moveCursor(stdout, 0, -lastDrawnSuggestions);
        // Position at end of input
        readline.cursorTo(stdout, inputEndCol);
      } else {
        lastDrawnSuggestions = 0;
      }
    };

    const updateSuggestions = () => {
      const hadSuggestions = suggestions.length > 0 || pathCompletions.length > 0;

      if (input.startsWith("/") && input.length >= 1) {
        // Meta command completion
        completionMode = "meta";
        pathCompletions = [];
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
        completionMode = null;
        pathCompletions = [];
        selectedIndex = -1;
      }
    };

    const updatePathCompletions = () => {
      // Try to find what we're completing
      const words = input.split(/\s+/);
      if (words.length === 0) {
        pathCompletions = [];
        return;
      }

      // Get the last word (what we're trying to complete)
      const lastWord = words[words.length - 1] || "";

      // Only show completions if we have at least something to complete
      if (lastWord.length === 0 && words.length === 1) {
        pathCompletions = [];
        return;
      }

      pathCompletions = getPathCompletions(lastWord);
      completionMode = pathCompletions.length > 0 ? "path" : null;
      selectedIndex = pathCompletions.length > 0 ? 0 : -1;
    };

    const onKeypress = (str: string, key: any) => {
      if (!key) return;

      if (key.name === "return" || key.name === "enter") {
        // Store result before clearing
        let result = input;
        let appliedCompletion = false;
        let shouldRedrawLine = false;

        // If we have meta suggestions and one is selected, use it
        if (completionMode === "meta" && suggestions.length > 0 && selectedIndex >= 0 && selectedIndex < suggestions.length) {
          result = suggestions[selectedIndex].command;
          appliedCompletion = result !== input;
        } else if (completionMode === "path" && pathCompletions.length > 0 && selectedIndex >= 0 && selectedIndex < pathCompletions.length) {
          // If we have path completions and one is selected, use it
          const words = input.split(/\s+/);
          words[words.length - 1] = pathCompletions[selectedIndex];
          result = words.join(" ");
          appliedCompletion = true;
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
          lastDrawnSuggestions = 0;
          shouldRedrawLine = true;
        }

        if (appliedCompletion) {
          input = result;
          shouldRedrawLine = true;
        }

        // Redraw only if we modified the line or cleared suggestions.
        if (shouldRedrawLine) {
          readline.cursorTo(stdout, 0);
          readline.clearLine(stdout, 0);
          stdout.write(prompt + result);
        }
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
          pathCompletions = [];
          completionMode = null;
          updateSuggestions();
          redraw();
          return;
        }
        // Regular backspace - delete one character
        if (input.length > 0) {
          input = input.slice(0, -1);
          pathCompletions = [];
          completionMode = null;
          updateSuggestions();
          redraw();
        }
        return;
      }

      // Ctrl+U - clear from cursor to beginning (clear entire line in our case)
      if (key.ctrl && key.name === "u") {
        input = "";
        pathCompletions = [];
        completionMode = null;
        updateSuggestions();
        redraw();
        return;
      }

      // Ctrl+K - clear from cursor to end (clear entire line in our case)
      if (key.ctrl && key.name === "k") {
        input = "";
        pathCompletions = [];
        completionMode = null;
        updateSuggestions();
        redraw();
        return;
      }

      if (key.name === "up") {
        const maxItems = completionMode === "meta" ? suggestions.length : pathCompletions.length;
        if (maxItems > 0) {
          selectedIndex = selectedIndex <= 0 ? maxItems - 1 : selectedIndex - 1;
          redraw();
        }
        return;
      }

      if (key.name === "down") {
        const maxItems = completionMode === "meta" ? suggestions.length : pathCompletions.length;
        if (maxItems > 0) {
          selectedIndex = selectedIndex >= maxItems - 1 ? 0 : selectedIndex + 1;
          redraw();
        }
        return;
      }

      if (key.name === "tab") {
        if (completionMode === "meta" && suggestions.length > 0) {
          selectedIndex = selectedIndex >= suggestions.length - 1 ? 0 : selectedIndex + 1;
          redraw();
        } else if (completionMode === "path" && pathCompletions.length > 0) {
          if (pathCompletions.length === 1) {
            // Single match - auto-complete
            const words = input.split(/\s+/);
            words[words.length - 1] = pathCompletions[0];
            input = words.join(" ");
            pathCompletions = [];
            completionMode = null;
            selectedIndex = -1;
            updateSuggestions();
            redraw();
          } else {
            // Multiple matches - cycle through
            selectedIndex = selectedIndex >= pathCompletions.length - 1 ? 0 : selectedIndex + 1;
            redraw();
          }
        } else {
          // Try to get path completions
          updatePathCompletions();
          redraw();
        }
        return;
      }

      // Regular character input
      if (str && !key.ctrl && !key.meta) {
        input += str;
        // Clear path completions when typing
        pathCompletions = [];
        completionMode = null;
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

  console.log(`${colors.bold}Whisper${colors.reset} ${colors.dim}v${VERSION}${colors.reset} ${colors.slate}— Natural Language Terminal Assistant${colors.reset}`);

  // Display current model
  const currentModel = getModelById(state.config.selected_model);
  const modelName = currentModel ? currentModel.name : state.config.selected_model;
  console.log(
    `${colors.slate}Model:${colors.reset} ${modelName} ${colors.dim}·${colors.reset} ${colors.accent}/models${colors.reset} ${colors.dim}·${colors.reset} ${colors.accent}/help${colors.reset} ${colors.dim}·${colors.reset} ${colors.accent}/exit${colors.reset}\n`
  );

  // Show first-run tips if this is the first time
  if (!state.config.first_run_complete) {
    showFirstRunTips();
    state.config.first_run_complete = true;
    await saveConfig(state.config);
  }

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

    // Check if this looks like a direct shell command (starts with a known command)
    // If so, skip LLM and execute directly
    const commonCommands = [
      'ls', 'cd', 'pwd', 'cat', 'echo', 'grep', 'find', 'ps', 'top', 'kill',
      'mv', 'cp', 'rm', 'mkdir', 'rmdir', 'touch', 'chmod', 'chown',
      'git', 'npm', 'yarn', 'bun', 'node', 'python', 'pip',
      'curl', 'wget', 'ssh', 'scp', 'rsync', 'tar', 'zip', 'unzip',
      'vim', 'nano', 'emacs', 'less', 'more', 'head', 'tail',
      'df', 'du', 'free', 'uptime', 'who', 'whoami', 'date',
      'export', 'env', 'printenv', 'which', 'whereis', 'man',
      'history', 'clear', 'exit'
    ];

    const words = userInput.trim().split(/\s+/);
    const firstWord = words[0];

    // Check if this looks like natural language that needs LLM context
    // Words like "it", "that", "this", "them" indicate reference to previous context
    const naturalLanguagePronouns = ['it', 'that', 'this', 'them', 'those', 'these', 'here', 'there'];
    const hasNaturalLanguage = words.slice(1).some(word =>
      naturalLanguagePronouns.includes(word.toLowerCase())
    );

    const isDirectCommand = commonCommands.includes(firstWord) && !hasNaturalLanguage;

    // Handle cd specially - it needs to change Whisper's own working directory
    if (firstWord === 'cd') {
      const args = userInput.trim().split(/\s+/).slice(1);
      let targetDir = args[0] || require("os").homedir();

      // Expand ~ to home directory
      const home = require("os").homedir();
      if (targetDir === '~') {
        targetDir = home;
      } else if (targetDir.startsWith('~/')) {
        targetDir = targetDir.replace('~', home);
      }

      try {
        // Resolve the path relative to current directory
        const path = require("path");
        const resolvedPath = path.resolve(process.cwd(), targetDir);

        // Check if directory exists
        const fs = require("fs");
        if (!fs.existsSync(resolvedPath)) {
          console.log(`${colors.red}✗ Directory not found:${colors.reset} ${targetDir}\n`);
          continue;
        }

        const stats = fs.statSync(resolvedPath);
        if (!stats.isDirectory()) {
          console.log(`${colors.red}✗ Not a directory:${colors.reset} ${targetDir}\n`);
          continue;
        }

        // Change Whisper's working directory
        process.chdir(resolvedPath);
        console.log(`${colors.green}✓${colors.reset} ${colors.dim}Changed directory to ${process.cwd()}${colors.reset}\n`);
      } catch (error) {
        console.log(`${colors.red}✗ Failed to change directory:${colors.reset} ${error}\n`);
      }
      continue;
    }

    if (isDirectCommand) {
      // This looks like a direct shell command, execute it without LLM
      const command = userInput;
      const explanation = `Direct shell command: ${command}`;

      // Evaluate policy
      const policy = evaluatePolicy(command, state.config, state.armMode);

      // Check if command is blocked
      if (!policy.allowed) {
        console.log(`\n${colors.red}✗ Blocked:${colors.reset} ${policy.reason}`);
        if (policy.blockingRule) {
          console.log(`${colors.dim}Rule: ${policy.blockingRule}${colors.reset}\n`);
        }

        if (policy.riskLevel === RiskLevel.DANGEROUS && !state.armMode) {
          console.log(`${colors.bold}To enable dangerous commands:${colors.reset}`);
          console.log(`  • Use ${colors.cyan}/arm${colors.reset} to enable for 60 seconds`);
          console.log(`  • Use ${colors.cyan}/dry${colors.reset} to preview the command without executing\n`);
        } else {
          console.log(`${colors.dim}This command was blocked by your safety rules.${colors.reset}\n`);
        }

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
      }
      // For safe direct commands, just run silently without preview box

      if (!confirmed) {
        console.log(`${colors.yellow}Cancelled${colors.reset}`);

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
        console.log(`${colors.accent}→${colors.reset} ${colors.dim}${command}${colors.reset}`);
        showOutputHeader("Output");

        const result = await executeCommand(command, state.config);

        showOutputFooter();

        const statusIcon = result.exitCode === 0 ? `${colors.green}✓${colors.reset}` : `${colors.red}✗${colors.reset}`;
        const exitMessage = result.exitCode === 0 ? "Success" : `Exit code: ${result.exitCode}`;

        console.log(`${statusIcon} ${exitMessage} ${colors.dim}(${result.duration}ms)${colors.reset}`);

        if (result.timedOut) {
          console.log(`${colors.yellow}⚠ Command timed out${colors.reset}`);
        }

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

      console.log();
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
          state.config.selected_model,
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
        console.log(`\n${colors.red}✗ Error: Invalid response from LLM${colors.reset}`);
        console.log(`${colors.dim}The model couldn't generate a valid command.${colors.reset}\n`);
        console.log(`${colors.bold}Try:${colors.reset}`);
        console.log(`  • Rephrase your request more specifically`);
        console.log(`  • Use ${colors.cyan}/models${colors.reset} to switch to a different model`);
        console.log(`  • Check ${colors.cyan}/history${colors.reset} for examples of successful commands\n`);
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
          console.log(`${colors.dim}Rule: ${policy.blockingRule}${colors.reset}\n`);
        }

        // Provide helpful suggestions based on the risk level
        if (policy.riskLevel === RiskLevel.DANGEROUS && !state.armMode) {
          console.log(`${colors.bold}To enable dangerous commands:${colors.reset}`);
          console.log(`  • Use ${colors.cyan}/arm${colors.reset} to enable for 60 seconds`);
          console.log(`  • Use ${colors.cyan}/dry${colors.reset} to preview the command without executing\n`);
        } else {
          console.log(`${colors.dim}This command was blocked by your safety rules.${colors.reset}\n`);
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
      }
      // For safe commands, just run silently without preview box

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
        console.log(`${colors.accent}→${colors.reset} ${colors.dim}${command}${colors.reset}`);
        showOutputHeader("Output");

        const result = await executeCommand(command, state.config);

        showOutputFooter();

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
      console.log(`\n${colors.red}✗ Error:${colors.reset} ${error}\n`);

      // Provide context-specific help
      const errorStr = String(error).toLowerCase();
      console.log(`${colors.bold}Troubleshooting:${colors.reset}`);

      if (errorStr.includes("api") || errorStr.includes("key") || errorStr.includes("unauthorized")) {
        console.log(`  • Check your API key with ${colors.cyan}/key${colors.reset}`);
        console.log(`  • Verify you have credits at ${colors.cyan}https://openrouter.ai${colors.reset}`);
      } else if (errorStr.includes("timeout")) {
        console.log(`  • The request timed out - try again`);
        console.log(`  • Consider using a faster model with ${colors.cyan}/models${colors.reset}`);
      } else if (errorStr.includes("network") || errorStr.includes("fetch")) {
        console.log(`  • Check your internet connection`);
        console.log(`  • OpenRouter API may be temporarily unavailable`);
      } else {
        console.log(`  • Try rephrasing your request`);
        console.log(`  • Use ${colors.cyan}/help${colors.reset} for usage information`);
        console.log(`  • Use ${colors.cyan}/clear${colors.reset} to reset conversation history`);
      }
      console.log();
    }

    console.log(); // Blank line between iterations
  }

  rl.close();
  console.log("\nGoodbye!");
}
