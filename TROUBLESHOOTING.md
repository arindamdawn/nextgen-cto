# HMR Error Troubleshooting Guide

## Issue: "Module factory is not available" Error

This error appears in the browser console during development but not in incognito mode or production builds.

### Why This Happens

This is a **Hot Module Replacement (HMR)** cache issue that occurs when:
1. Browser cache holds onto old module references
2. Next.js dev server updates modules via HMR
3. The cached modules try to reference non-existent factories
4. Incognito mode works because it has no cache

### Solutions (In Order of Preference)

#### 1. Quick Fix - Hard Refresh Browser
```bash
# Windows/Linux
Ctrl + Shift + R

# Mac
Cmd + Shift + R
```

#### 2. Clear Next.js Cache
```bash
# Stop dev server first (Ctrl+C)
pnpm run clean
pnpm dev
```

Or use the shortcut:
```bash
pnpm run dev:clean
```

#### 3. Full Reset (Nuclear Option)
```bash
# Stop dev server
rm -rf .next
rm -rf node_modules/.cache
rm -rf node_modules
pnpm install
pnpm dev
```

#### 4. Clear Browser Cache
1. Open DevTools (F12)
2. Right-click on refresh button
3. Select "Empty Cache and Hard Reload"

### Prevention

The ErrorBoundary has been updated to ignore HMR-related errors in development mode, so this error should now be caught and logged as a warning instead of breaking the UI.

### When to Worry

- ✅ **Don't worry** if you see this only in development mode
- ✅ **Don't worry** if it disappears after a hard refresh
- ✅ **Don't worry** if incognito mode works fine
- ❌ **Do investigate** if it appears in production
- ❌ **Do investigate** if it persists after cache clearing

### Available Scripts

```bash
# Clean cache
pnpm run clean

# Clean and start dev server
pnpm run dev:clean

# Or use the shell script
./scripts/clear-cache.sh
pnpm dev
```

### Technical Details

The error occurs because:
1. ErrorBoundary is a class component that gets instantiated
2. During HMR, the module graph is updated
3. Cached instances reference old module factories
4. The old factories are deleted during the HMR update
5. The browser throws an error when trying to access them

### Code Changes Made

Updated `ErrorBoundary.tsx` to detect and ignore HMR errors:
- Checks for HMR-related error messages
- Logs warning instead of showing error UI
- Only affects development mode
- Production behavior unchanged

### Additional Tips

1. **Use Incognito for Testing**: If you want a clean state, use incognito mode
2. **Restart Dev Server**: When in doubt, restart the dev server
3. **Check Port Conflicts**: Make sure no other process is using port 3000
4. **Update Dependencies**: Keep Next.js and React updated

### Related Issues
- [Next.js HMR Documentation](https://nextjs.org/docs/architecture/fast-refresh)
- [React Fast Refresh](https://github.com/facebook/react/tree/main/packages/react-refresh)

## Common Development Errors

### Port Already in Use
```bash
# Error: Port 3000 is in use
# Solution: Kill the process or use a different port
lsof -ti:3000 | xargs kill -9
# Or let Next.js auto-assign a port
```

### Module Not Found After Adding Dependencies
```bash
# Solution: Restart dev server
# Stop server (Ctrl+C)
pnpm dev
```

### TypeScript Errors Not Showing
```bash
# Run type check manually
pnpm run type-check
```

### Build Works but Dev Doesn't
```bash
# Clear everything
pnpm run clean
rm -rf node_modules
pnpm install
pnpm dev
```

---

**Remember**: Most HMR errors in development are temporary and don't affect production builds. When in doubt, restart the dev server! 🚀
