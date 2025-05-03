# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands
- Build: `npm run build` (creates both dev and prod builds)
- Watch: `npm run watch` (development mode with auto-rebuild)
- ESLint: Not explicitly defined, use `npx eslint src/**/*.js`
- Type check: `npx tsc --noEmit` (verification only)

## Code Style Guidelines
- **Formatting**: Standard JS style, 2-space indentation
- **Types**: TypeScript definitions in `/types` directory with strict typing
- **Naming**: camelCase for variables/functions, PascalCase for classes
- **Imports**: Prefer ES6 imports, organize by module path
- **Error Handling**: Use standard try/catch patterns
- **Structure**: Follow existing module organization - core, command, geo, etc.
- **Library Pattern**: Use UMD module pattern for compatibility
- **TypeScript**: Maintain type definitions in `/types` when adding new features