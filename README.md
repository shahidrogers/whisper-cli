# Whisper CLI

**Stop memorizing. Start talking.**

Whisper CLI is your natural language terminal assistant. Forget arcane flags, obscure syntax, and Stack Overflow searches—just type what you want in plain English, and Whisper translates it into the exact shell command you need.

```bash
whisper> show me all files modified today
→ find . -mtime 0

whisper> what's using port 8080
→ lsof -ti:8080

whisper> kill that process
→ kill 12345
```

Safe commands run automatically. Risky ones ask first.

---

## Features

- 🗣️ **Natural Language Interface**: Type what you want in plain English
- ⚡ **Smart & Safe**: Auto-runs safe commands, asks before anything risky
- 💬 **Remembers Context**: Ask follow-up questions naturally
- 🎨 **Beautiful Terminal UI**: Clean, color-coded output
- 🚀 **Works Both Ways**: Use natural language OR type shell commands directly

## Quick Start

1. Install and run:

```bash
npm install -g @shahidrogers/whisper-cli
whisper
```

2. On first launch, enter your OpenRouter API key (get one free at https://openrouter.ai/)

3. Start typing what you want:

```
whisper> show me all files
→ ls -la

whisper> what's using port 8080
→ lsof -ti:8080

whisper> find all .log files modified today
→ find . -name "*.log" -mtime 0
```

## Safety Model

Whisper CLI classifies every command into three risk levels:

### 🟢 SAFE (Auto-executed)

Read-only commands that can't harm your system:
- File viewing: `ls`, `cat`, `head`, `tail`, `grep`, `find`
- Process inspection: `ps`, `lsof`, `netstat`
- Git read operations: `git status`, `git diff`, `git log`
- System info: `pwd`, `whoami`, `hostname`, `date`

### 🟡 CAUTION (Requires Confirmation)

Commands that modify state or require user approval:
- File mutations: `rm`, `mv`, `cp`, `chmod`
- Process control: `kill`, `killall`
- Package managers: `npm`, `pip`, `brew`
- Commands with redirection or chaining: `>`, `&&`, `||`
- Unknown commands

**Note**: Simple read-only pipes like `ps aux | grep node` remain SAFE and auto-execute.

### 🔴 DANGEROUS (Blocked Without /arm)

Highly destructive commands blocked by default:
- `sudo` commands (ALWAYS blocked, even with /arm)
- `rm -rf` (recursive deletion)
- `git reset --hard`
- Commands touching sensitive paths (`/etc`, `~/.ssh`, `/var`)
- System utilities: `dd`, `mkfs`, `format`

## Conversation Memory

Whisper remembers your recent conversation, so you can ask follow-up questions naturally:

```
whisper> list apps running on port 3000
→ lsof -i :3000

whisper> port 4000?
→ lsof -i :4000

whisper> kill it
→ kill 12345
```

Use `/clear` when you want to start fresh.

## Direct Commands

If you already know the exact command, just type it. Whisper runs it directly without using AI:

```
whisper> ls -la
→ ls -la

whisper> git status
→ git status
```

This is faster and saves API calls. The `cd` command even changes Whisper's working directory, so you can navigate naturally:

```
whisper> cd ~/projects
✓ Changed directory to /Users/you/projects

whisper> pwd
→ /Users/you/projects
```

## Meta Commands

Control Whisper CLI behavior with meta commands:

| Command | Description |
|---------|-------------|
| `/help` | Show help message |
| `/exit` | Quit (also Ctrl+D) |
| `/dry` | Toggle dry-run mode (preview without executing) |
| `/models` | List all available models (interactive picker in TTY) |
| `/model <id>` | Change LLM model (e.g., `/model xiaomi/mimo-v2-flash:free`) |
| `/key` | Change your OpenRouter API key |
| `/history` | Interactive history browser with search (arrow keys, Enter for details, ESC to exit) |
| `/clear` | Clear conversation history and screen |
| `/arm` | Enable dangerous commands for 60 seconds |
| `/unarm` | Disable arm mode immediately |

**Keyboard shortcuts**: Tab for autocomplete, ESC to cancel while thinking, Ctrl+U/K to clear input, arrows for suggestions.

## Configuration

Your settings live at `~/.config/whisper/config.json`. Change them with meta commands like `/model` or edit the file directly.

### Default Configuration

```json
{
  "api_key": "sk-or-...",
  "selected_model": "xiaomi/mimo-v2-flash:free",
  "default_model": "xiaomi/mimo-v2-flash:free",
  "fallback_model": "mistralai/devstral-2512:free",
  "auto_run_safe": true,
  "max_output_lines": 300,
  "command_timeout_ms": 10000,
  "arm_duration_seconds": 60,
  "custom_denylist": [],
  "custom_allowlist": [],
  "first_run_complete": false
}
```

The `api_key` is set on first launch. Change it anytime with `/key`.

### Switching Models

The default free model works great for most commands. If you want to try others, use `/models` to see the list:

**Free options**: MiMo-V2-Flash (default), Devstral 2
**Paid options**: Claude, Gemini, DeepSeek, and more

Switch anytime with `/models` for an interactive picker.

### Custom Rules

Add custom safety rules to your config:

```json
{
  "custom_denylist": ["docker", "kubectl"],
  "custom_allowlist": ["mycompanytool"]
}
```

### Audit Logs

Every command you run is logged to `~/.local/share/whisper/log.jsonl` for accountability. Use `/history` to browse past commands interactively.

## Examples

### File Operations

```
whisper> show me all files
→ ls -la

whisper> find all Python files in this directory
→ find . -name "*.py"

whisper> show me the last 50 lines of error.log
→ tail -n 50 error.log
```

### Process Management

```
whisper> what's using port 8080
→ lsof -ti:8080

whisper> show all node processes
→ ps aux | grep node

whisper> kill process 1234
[CAUTION] kill 1234
Send SIGTERM to process 1234
Proceed? (y/n) [default: n]
```

### Git Operations

```
whisper> show me recent commits
→ git log --oneline -10

whisper> what files changed in the last commit
→ git show --name-only HEAD

whisper> show uncommitted changes
→ git diff
```

### System Information

```
whisper> how much disk space is free
→ df -h

whisper> what's my IP address
→ ifconfig | grep "inet "

whisper> show system uptime
→ uptime
```

## Safety Features

### 1. Pattern Detection & Classification

Whisper CLI analyzes commands for dangerous patterns:
- Redirection operators (`>`, `>>`)
- Command chaining (`;`, `&&`, `||`)
- Subshells (`$(...)`, `` `...` ``)
- Sensitive paths (`/etc`, `/var`, `~/.ssh`, `/usr`, `/bin`)
- Dangerous patterns (`rm -rf`, `git reset --hard`, `dd`, `mkfs`)

**Smart Pipe Detection**: Whisper recognizes safe command pipelines and won't block legitimate patterns:

```bash
# SAFE - Read-only command piped to safe filters
ps aux | grep node
cat error.log | tail -n 100 | grep ERROR
find . -name "*.js" | wc -l

# CAUTION - Includes redirection or mutations
ps aux | grep node > output.txt      # File redirection requires confirmation
git add . && git commit -m "msg"     # Chaining requires confirmation

# DANGEROUS - Blocked without /arm
rm -rf ./temp && echo "done"
sudo apt-get install nginx
```

**Why the distinction?**
- **Pipes to filters** (`grep`, `awk`, `sort`, `head`, `tail`, etc.) are purely read-only transformations → SAFE
- **Redirection** (`>`) writes to files → Could overwrite important data → CAUTION
- **Chaining** (`&&`, `;`) could link an innocent command with a dangerous one → CAUTION
- **Destructive commands** → DANGEROUS (requires /arm)

This means the LLM can naturally generate pipes and chains - they're not blocked, just reviewed when they involve mutations or redirection.

### 2. Arm Mode

For dangerous operations, use `/arm` to enable for 60 seconds:

```
whisper> /arm
⚠ Dangerous commands enabled for 60 seconds

whisper> delete temp directory
[DANGEROUS] rm -rf ./temp
Recursively delete temp directory
Proceed? (y/n) [default: n] y
```

### 3. Dry-Run Mode

Preview commands without executing:

```
whisper> /dry
Dry-run mode enabled

whisper> delete all log files
[DRY RUN] Would execute: rm *.log
```

### 4. sudo Protection

`sudo` commands are ALWAYS blocked, regardless of arm mode, for security:

```
whisper> install nginx
✗ Blocked: sudo commands are always blocked for safety
```

## Troubleshooting

### Changing Your API Key

Use `/key` in Whisper, or set the `OPENROUTER_API_KEY` environment variable.

### "All 3 attempts failed to generate a valid command"

The LLM couldn't generate a valid JSON response. This usually means:
1. Your request is too ambiguous - try being more specific
2. The model is struggling with JSON formatting - try `/models` to switch to a different model
3. Your API key may be invalid or out of credits - check at https://openrouter.ai/

**Tip**: Use direct shell commands (e.g., `ls -la`) to bypass the LLM entirely when you know the exact command.

### Commands timeout

Increase timeout in config:
```json
{
  "command_timeout_ms": 30000
}
```

### False positives in risk classification

Use custom allowlist:
```json
{
  "custom_allowlist": ["mytool"]
}
```

---

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

- Report bugs: [GitHub Issues](https://github.com/shahidrogers/whisper-cli/issues)
- Discussions: [GitHub Discussions](https://github.com/shahidrogers/whisper-cli/discussions)
