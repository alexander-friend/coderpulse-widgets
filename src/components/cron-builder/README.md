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

To use the Cron Builder in WordPress, you can use the **Custom HTML** block and include the CDN script along with the widget tag:

```html
<!-- Include the script (ideally in your theme's header or footer) -->
<script src="https://cdn.jsdelivr.net/npm/coderpulse-widgets@latest/dist/coderpulse-widgets-embed.umd.js"></script>

<!-- Add the widget in a Custom HTML block -->
<cp-cron-builder></cp-cron-builder>
```

## API

### Properties

| Property       | Attribute       | Type                          | Default     | Description                                                                             |
| -------------- | --------------- | ----------------------------- | ----------- | --------------------------------------------------------------------------------------- |
| `theme`        | `theme`         | `'light' \| 'dark' \| 'auto'` | `'auto'`    | Theme mode for the component. Auto will respect system preferences.                     |
| `primaryColor` | `primary-color` | `string`                      | `undefined` | Custom primary color (hex, rgb, or named CSS color). Overrides the default theme color. |

### CSS Variables

The component uses CSS variables for advanced theming. These can be customized by setting them on `:root` or directly on the component:

| Variable              | Default         | Description                                                       |
| --------------------- | --------------- | ----------------------------------------------------------------- |
| `--cp-primary-color`  | `#0088cc`       | Primary accent color used for highlights and interactive elements |
| `--cp-primary-hover`  | Computed        | Hover state for primary color                                     |
| `--cp-text-color`     | Theme-dependent | Main text color                                                   |
| `--cp-text-secondary` | Theme-dependent | Secondary text color                                              |
| `--cp-text-muted`     | Theme-dependent | Muted text for labels                                             |
| `--cp-border-color`   | Theme-dependent | Border and divider color                                          |
| `--cp-border-radius`  | `8px`           | Border radius for cards and buttons                               |
| `--cp-spacing-small`  | `8px`           | Small spacing unit                                                |
| `--cp-spacing-medium` | `16px`          | Medium spacing unit                                               |
| `--cp-spacing-large`  | `24px`          | Large spacing unit                                                |

**Example:**

```css
cp-cron-builder {
  --cp-primary-color: #ff6b35;
  --cp-border-radius: 12px;
}
```

### Events

This component does not currently emit any custom events. The cron expression is managed internally and can be copied via the built-in "Copy" button.

### Methods

This component does not expose any public methods. All interactions are handled through the visual interface.
