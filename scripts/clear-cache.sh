#!/bin/bash

# Clear Next.js cache and restart dev server
echo "🧹 Clearing Next.js cache..."
rm -rf .next

echo "🧹 Clearing node_modules/.cache..."
rm -rf node_modules/.cache

echo "✨ Cache cleared successfully!"
echo "💡 Run 'pnpm dev' to start the development server"
