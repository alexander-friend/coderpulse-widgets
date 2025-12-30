# CoderPulse Widgets

A collection of open source widgets and components for the CoderPulse ecosystem.

## About

**CoderPulse Widgets** is a collection of high-performance, open-source UI components built by the team at [CoderPulse](https://coderpulse.io/?utm_source=github&utm_medium=readme&utm_campaign=widgets).

Our goal is to provide developers with premium, drop-in widgets that just work. Available as an **NPM package** for modern apps, and a **WordPress Plugin** for content sites.

Checks out our full suite of developer tools:

- [CoderPulse.io](https://coderpulse.io) - The complete developer toolkit.
- [Cron Helper](https://coderpulse.io/cron) - The inspiration for our Cron Builder widget.

## Tech Stack

- **Framework**: [Lit](https://lit.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Testing**: [Vitest](https://vitest.dev/)

## Project Structure

- `src/components/`: Core Lit components.
- `src/embed.ts`: Entry point for the single-file embed bundle (WordPress/Embed).
- `src/index.ts`: Entry point for the NPM package.
- `dist/`: Build output.
  - `index.js`: ESM bundle for NPM.
  - `coderpulse-widgets-embed.umd.js`: Self-contained bundle for script tags.

## Components

### Cron Builder

A visual cron expression generator and explainer.

**Features:**

- Visual editor for Minute, Hour, Day, Month, and Week.
- Real-time human-readable explanation (e.g., "At 04:05").
- Next scheduled specific run times.
- "Copy to Clipboard" functionality.
- Mobile responsive.

**Usage:**

```html
<script type="module">
  import 'coderpulse-widgets';
</script>

<cp-cron-builder></cp-cron-builder>
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Testing

```bash
npm run test
```

### Linting

```bash
npm run lint
```
