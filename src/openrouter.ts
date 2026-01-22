import { CommandResponse, CommandResponseSchema } from "./schema.js";
import type { EnvironmentContext } from "./schema.js";
import { buildContextString } from "./tools.js";

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const LLM_TIMEOUT_MS = 30000; // 30 second timeout

// Timeout wrapper for fetch
async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeoutMs: number
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Request timed out after 30 seconds");
    }
    throw error;
  }
}

// System prompt with few-shot examples
function buildSystemPrompt(context: EnvironmentContext): string {
  const contextStr = buildContextString(context);

  return `You are a shell command generator. Convert natural language requests into shell commands.

Environment:
${contextStr}

CRITICAL: Respond ONLY with valid JSON in ONE of these formats:

Format 1 - Command response:
{
  "command": "the shell command",
  "explanation": "brief explanation",
  "risk_hint": "SAFE" | "CAUTION" | "DANGEROUS",
  "exit_codes": {
    "0": "human-readable success message",
    "1": "human-readable failure message",
    ...
  }
}

Format 2 - Message response (when you need clarification or don't know):
{
  "message": "your question or explanation"
}

Examples:

User: "show me all files"
{
  "command": "ls -la",
  "explanation": "List all files including hidden ones with details",
  "risk_hint": "SAFE",
  "exit_codes": {
    "0": "Successfully listed files",
    "1": "Permission denied or directory not found"
  }
}

User: "what's using port 8080"
{
  "command": "lsof -i :8080",
  "explanation": "Find processes listening on port 8080",
  "risk_hint": "SAFE",
  "exit_codes": {
    "0": "Found processes using port 8080",
    "1": "No processes found on port 8080"
  }
}

User: "what port is my metro bundler running on"
{
  "command": "lsof -i -P -n | grep -i metro",
  "explanation": "Find metro bundler process and show the port it's using",
  "risk_hint": "SAFE",
  "exit_codes": {
    "0": "Found metro bundler process",
    "1": "Metro bundler is not running"
  }
}

User: "check if nginx is running"
{
  "command": "pgrep nginx",
  "explanation": "Check for nginx processes",
  "risk_hint": "SAFE",
  "exit_codes": {
    "0": "nginx is running",
    "1": "nginx is not running"
  }
}

User: "y"
{
  "message": "I'm not sure what you mean by 'y'. Could you provide more context about what you'd like to do?"
}

User: "delete temp directory"
{
  "command": "rm -rf ./temp",
  "explanation": "Recursively delete temp directory",
  "risk_hint": "DANGEROUS",
  "exit_codes": {
    "0": "Successfully deleted temp directory",
    "1": "Failed to delete - permission denied or not found"
  }
}

Rules:
- ONLY output JSON, no other text
- Use ${context.shell} shell syntax
- Prefer safe, read-only commands when possible
- Mark destructive operations as DANGEROUS
- Mark mutations as CAUTION
- ALWAYS include exit_codes with human-readable messages for common exit codes (especially 0 and 1)
- exit_codes should be context-specific (e.g., for lsof, exit code 1 means "no processes found", not generic failure)
- If unclear what the user wants, use "message" format to ask for clarification
- When using lsof to find processes, use "lsof -i -P -n | grep <name>" instead of "lsof -i :*" to avoid glob expansion issues
- Avoid shell glob patterns (*, ?, []) in arguments unless properly quoted
- Use grep with pipes for searching process names rather than relying on command-specific filters
- For port searches, use specific ports (lsof -i :8080) or pipe to grep (lsof -i -P -n | grep)`;
}

// Parse JSON response, handling markdown code blocks
function parseJSONResponse(text: string): unknown {
  // Strip markdown code blocks if present
  let cleaned = text.trim();

  // Remove ```json ... ``` or ``` ... ```
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  }

  return JSON.parse(cleaned);
}

// Call OpenRouter API
async function callOpenRouter(
  model: string,
  userMessage: string,
  systemPrompt: string,
  apiKey: string,
  conversationHistory: ConversationMessage[] = []
): Promise<string> {
  // Build messages array with history
  const messages: Array<{ role: string; content: string }> = [
    { role: "system", content: systemPrompt },
    ...conversationHistory,
    { role: "user", content: userMessage },
  ];

  const response = await fetchWithTimeout(
    OPENROUTER_API_URL,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": "https://github.com/your-username/whisper-cli",
        "X-Title": "Whisper CLI",
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.2,
        max_tokens: 500,
      }),
    },
    LLM_TIMEOUT_MS
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenRouter API error: ${response.status} ${error}`);
  }

  const data = await response.json();

  if (!data.choices || !data.choices[0]?.message?.content) {
    throw new Error("Invalid response format from OpenRouter");
  }

  return data.choices[0].message.content;
}

// Conversation message type
interface ConversationMessage {
  role: "user" | "assistant";
  content: string;
}

// Generate command with 3-tier retry logic
export async function generateCommand(
  userInput: string,
  context: EnvironmentContext,
  defaultModel: string,
  fallbackModel: string,
  conversationHistory: ConversationMessage[] = []
): Promise<CommandResponse> {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error(
      "OPENROUTER_API_KEY environment variable not set. Get your key at https://openrouter.ai/"
    );
  }

  const systemPrompt = buildSystemPrompt(context);

  // Attempt 1: Default model
  try {
    const responseText = await callOpenRouter(
      defaultModel,
      userInput,
      systemPrompt,
      apiKey,
      conversationHistory
    );

    const parsed = parseJSONResponse(responseText);
    return CommandResponseSchema.parse(parsed);
  } catch (error) {
    console.error("Attempt 1 failed:", error);
  }

  // Attempt 2: Re-prompt with stricter instruction
  try {
    const stricterPrompt = `${systemPrompt}

IMPORTANT: Your response must be ONLY valid JSON. Do not include any text before or after the JSON object.`;

    const responseText = await callOpenRouter(
      defaultModel,
      userInput,
      stricterPrompt,
      apiKey,
      conversationHistory
    );

    const parsed = parseJSONResponse(responseText);
    return CommandResponseSchema.parse(parsed);
  } catch (error) {
    console.error("Attempt 2 failed:", error);
  }

  // Attempt 3: Fallback model
  try {
    const responseText = await callOpenRouter(
      fallbackModel,
      userInput,
      systemPrompt,
      apiKey,
      conversationHistory
    );

    const parsed = parseJSONResponse(responseText);
    return CommandResponseSchema.parse(parsed);
  } catch (error) {
    throw new Error(
      `All 3 attempts failed to generate a valid command. Last error: ${error}`
    );
  }
}
