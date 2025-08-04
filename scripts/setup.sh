#!/bin/bash

# EditX Studio Setup Script
# This script helps you set up the EditX Studio project

set -e

echo "🎨 Welcome to EditX Studio Setup!"
echo "=================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18.0 or higher."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18.0 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) is installed"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

echo "✅ npm $(npm -v) is installed"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# Create environment file
echo ""
echo "🔧 Setting up environment variables..."
if [ ! -f .env.local ]; then
    cp .env.example .env.local
    echo "✅ Created .env.local file"
    echo "⚠️  Please edit .env.local with your API keys"
else
    echo "✅ .env.local already exists"
fi

# Create necessary directories
echo ""
echo "📁 Creating project directories..."
mkdir -p public/uploads
mkdir -p components/ui
mkdir -p components/editor
mkdir -p components/layout
mkdir -p lib
mkdir -p hooks
mkdir -p types

echo "✅ Project directories created"

# Check if git is installed and initialize if needed
if command -v git &> /dev/null; then
    if [ ! -d .git ]; then
        echo ""
        echo "🔧 Initializing git repository..."
        git init
        echo "✅ Git repository initialized"
    else
        echo "✅ Git repository already exists"
    fi
else
    echo "⚠️  Git is not installed. Consider installing git for version control."
fi

# Build the project
echo ""
echo "🔨 Building the project..."
npm run build

echo ""
echo "🎉 Setup complete!"
echo "=================="
echo ""
echo "Next steps:"
echo "1. Edit .env.local with your API keys"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "📚 Documentation: README.md"
echo "🐛 Issues: https://github.com/your-username/editx-studio/issues"
echo ""
echo "Happy editing! 🎨"