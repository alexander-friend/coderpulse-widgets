# Cron Builder Component

A powerful, visual cron expression builder for web applications.
Based on the popular [CoderPulse Cron Helper](https://coderpulse.io/cron).

## Features

- **Visual Interface**: Intuitive tabs for Minute, Hour, Day, Month, and Week.
- **Real-time Parsing**: Converts cron expressions to human-readable strings instantly.
- **Next Runs**: Calculates and displays the next 5 execution times.
- **Responsive**: Mobile-friendly design that adapts to container width.
- **Zero Dependencies**: Lightweight (bundled with Lit).

## Usage

### Direct Import (NPM)

```typescript
import 'coderpulse-widgets';

// content
html`<cp-cron-builder></cp-cron-builder>`;
```

### Script Tag (Universal Embed)

Perfect for static sites or simple HTML pages. This file is served automatically via CDN once the package is published to NPM.

```html
<script src="https://cdn.jsdelivr.net/npm/coderpulse-widgets@latest/dist/coderpulse-widgets-embed.umd.js"></script>

<cp-cron-builder></cp-cron-builder>
```

### WordPress

For WordPress sites, we recommend using our **official plugin** (located in the `wordpress/` directory of this repo) for the best experience, including Gutenberg support.

## API

| Property | Attribute | Type | Default | Description                                                                            |
| -------- | --------- | ---- | ------- | -------------------------------------------------------------------------------------- |
| -        | -         | -    | -       | This component is currently state-internal and effectively stateless from the outside. |

## Theming

Uses CSS variables for customization:

```css
:root {
  --cp-primary-color: #0088cc;
  --cp-text-color: #333;
  --cp-border-radius: 8px;
}
```
