#!/bin/bash
set -e

echo "🎯 Installing Whisper CLI..."

# Check if Bun is installed
if ! command -v bun &> /dev/null; then
    echo "❌ Bun is not installed. Please install it first:"
    echo "   curl -fsSL https://bun.sh/install | bash"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
bun install

# Build the project
echo "🔨 Building project..."
bun run build

# Install globally
echo "🌍 Installing globally..."
npm link

echo ""
echo "✅ Installation complete!"
echo ""
echo "You can now run 'whisper' from any directory."
echo ""
echo "To get started:"
echo "  1. Run: whisper"
echo "  2. Enter your OpenRouter API key when prompted"
echo "  3. Get your free API key at: https://openrouter.ai/"
echo ""
