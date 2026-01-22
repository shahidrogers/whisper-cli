# Whisper CLI

A natural language terminal assistant that converts your intentions into safe shell commands with comprehensive safety guardrails.

## Features

- 🗣️ **Natural Language Interface**: Type what you want, not memorize syntax
- 🛡️ **Multi-Tier Safety System**: Three-level risk classification (SAFE, CAUTION, DANGEROUS)
- ⚡ **Smart Auto-Execution**: Safe read-only commands run automatically
- 🔒 **Confirmation Gates**: Risky operations require explicit approval
- 📝 **Complete Audit Log**: Every command logged to JSONL for accountability
- 🚫 **Dangerous Command Blocking**: sudo, rm -rf, and other destructive commands blocked unless armed
- 🔄 **Retry Logic**: 3-tier LLM fallback for reliable command generation
- 🎯 **Context-Aware**: Understands your environment (OS, shell, working directory)

## Installation

### Prerequisites

- [Bun](https://bun.sh/) v1.0.0 or later
- macOS or Linux
- [OpenRouter API key](https://openrouter.ai/) (free tier available)

### Quick Install (Recommended)

```bash
# Clone and install with one command
git clone https://github.com/shahidrogers/whisper-cli
cd whisper-cli
./install.sh
```

That's it! Now you can run `whisper` from any directory.

### Manual Installation

If you prefer to install manually:

```bash
# Clone the repository
git clone https://github.com/shahidrogers/whisper-cli
cd whisper-cli

# Install dependencies
bun install

# Build the project
bun run build

# Install globally (creates 'whisper' command)
npm link
```

### Run Locally (Without Global Install)

If you prefer not to install globally:

```bash
# After cloning and installing dependencies
bun run dev
# or after building:
./dist/index.js
```

## Quick Start

1. Run Whisper CLI:

```bash
bun run dev
# or after building:
./dist/index.js
```

2. On first launch, you'll be prompted to enter your OpenRouter API key:

```
Welcome to Whisper CLI!

To get started, you need an OpenRouter API key.
Get your free key at: https://openrouter.ai/

Enter your OpenRouter API key: sk-or-...
```

Your API key will be saved to `~/.config/whisper/config.json` for future use.

**Note**: You can also set the `OPENROUTER_API_KEY` environment variable instead, which takes precedence over the saved key.

3. Start typing natural language commands:

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
- Commands with redirection: `>`, `|`, `&&`
- Unknown commands

### 🔴 DANGEROUS (Blocked Without /arm)

Highly destructive commands blocked by default:
- `sudo` commands (ALWAYS blocked, even with /arm)
- `rm -rf` (recursive deletion)
- `git reset --hard`
- Commands touching sensitive paths (`/etc`, `~/.ssh`, `/var`)
- System utilities: `dd`, `mkfs`, `format`

## Conversation History

Whisper CLI remembers your conversation context! Ask follow-up questions naturally:

```
whisper> list apps running on port 3000
→ lsof -i :3000

whisper> port 4000?
→ lsof -i :4000
```

History is automatically kept for the last 10 exchanges. Use `/clear` to start fresh.

## Meta Commands

Control Whisper CLI behavior with meta commands:

| Command | Description |
|---------|-------------|
| `/help` | Show help message |
| `/exit` | Quit (also Ctrl+D) |
| `/dry` | Toggle dry-run mode (preview without executing) |
| `/model <name>` | Change LLM model |
| `/key` | Change your OpenRouter API key |
| `/history` | Show last 20 commands from audit log |
| `/clear` | Clear conversation history |
| `/arm` | Enable dangerous commands for 60 seconds |
| `/unarm` | Disable arm mode immediately |

## Configuration

### Config File Location

`~/.config/whisper/config.json`

### Default Configuration

```json
{
  "api_key": "sk-or-...",
  "default_model": "qwen/qwen-2.5-7b-instruct",
  "fallback_model": "google/gemini-2.5-flash-lite",
  "auto_run_safe": true,
  "max_output_lines": 300,
  "command_timeout_ms": 10000,
  "arm_duration_seconds": 60,
  "custom_denylist": [],
  "custom_allowlist": []
}
```

**Note**: The `api_key` field is set when you enter your key on first launch. You can change it anytime using the `/key` meta command or by editing the config file directly.

### Custom Rules

Add custom safety rules to your config:

```json
{
  "custom_denylist": ["docker", "kubectl"],
  "custom_allowlist": ["mycompanytool"]
}
```

### Audit Logs

All commands are logged to: `~/.local/share/whisper/log.jsonl`

Each entry includes:
- Timestamp
- User input
- Generated command
- Risk level
- Execution result
- Exit code and duration

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

### 1. Pattern Detection

Whisper CLI analyzes commands for dangerous patterns:
- Redirection operators (`>`, `|`, `>>`)
- Command chaining (`;`, `&&`, `||`)
- Subshells (`$(...)`, `` `...` ``)
- Sensitive paths (`/etc`, `/var`, `~/.ssh`)

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

If you need to change your API key:
1. Use the `/key` meta command within Whisper CLI, or
2. Edit `~/.config/whisper/config.json` and change the `api_key` field, or
3. Set the `OPENROUTER_API_KEY` environment variable (takes precedence)

### "All 3 attempts failed to generate a valid command"

The LLM couldn't generate a valid JSON response. Try:
1. Rephrasing your request more clearly
2. Checking your API key is valid
3. Verifying you have API credits

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

## Development

### Run in Development Mode

```bash
bun run dev
```

### Run Tests

```bash
bun test
```

### Type Check

```bash
bun run lint
```

### Project Structure

```
whisper-cli/
├── src/
│   ├── index.ts          # Entry point
│   ├── repl.ts           # Main REPL loop
│   ├── openrouter.ts     # LLM integration
│   ├── policy.ts         # Safety engine
│   ├── executor.ts       # Command execution
│   ├── schema.ts         # Type definitions
│   ├── config.ts         # Configuration management
│   ├── logger.ts         # Audit logging
│   └── tools.ts          # Environment detection
├── tests/
│   ├── policy.test.ts    # Policy engine tests
│   └── schema.test.ts    # Schema validation tests
└── docs/
    └── specs.md          # Technical specifications
```

## Architecture

### Command Flow

1. **Input**: User types natural language
2. **LLM**: OpenRouter generates JSON command response
3. **Validation**: Zod validates response schema
4. **Classification**: Policy engine determines risk level
5. **Decision**: Apply safety rules and custom lists
6. **Confirmation**: Show prompt if required
7. **Execution**: Run command with timeout
8. **Logging**: Write audit entry to JSONL

### Safety Layers

1. **Custom Denylist**: Unconditional blocking
2. **Custom Allowlist**: Override risk classification
3. **Pattern Detection**: Analyze command structure
4. **Risk Classification**: SAFE/CAUTION/DANGEROUS
5. **Policy Enforcement**: Block, confirm, or auto-run
6. **Audit Logging**: Complete accountability trail

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass (`bun test`)
5. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) file for details

## Acknowledgments

- Built with [Bun](https://bun.sh/)
- LLM integration via [OpenRouter](https://openrouter.ai/)
- Schema validation with [Zod](https://zod.dev/)

## Roadmap

Future enhancements:
- Windows support
- Full shell AST parsing
- Command chaining support
- Background task management
- Trust rules for frequently used patterns
- Integration with shell history
- Plugin system for custom commands

## Support

- Report bugs: [GitHub Issues](https://github.com/shahidrogers/whisper-cli/issues)
- Discussions: [GitHub Discussions](https://github.com/shahidrogers/whisper-cli/discussions)
