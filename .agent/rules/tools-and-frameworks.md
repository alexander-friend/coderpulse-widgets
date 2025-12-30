# CoderPulse Widgets - Tools and Frameworks

## Core Frameworks
- **Lit**: Primary framework for building web components. Avoid direct DOM manipulation where possible.
- **Vite**: Build tool and dev server. Configured for multi-output (NPM and Embed).
- **TypeScript**: All code must be written in TypeScript.

## Testing
- **Vitest**: Unit testing with JSDOM.
- **Testing Library**: Use @testing-library/dom for accessible testing.

## Linting & Formatting
- **ESLint**: Enforces code standards and Lit best practices.
- **Prettier**: Enforces consistent formatting.
- **Husky**: Runs linters on pre-commit.