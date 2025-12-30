# CoderPulse Widgets - Code Standards

## Lit & Web Components
- Use `LitElement` for all components.
- Use `@customElement` decorator with `cp-` prefix.
- Use `@property` for reactive properties and `@state` for internal state.
- Keep components small and focused on a single responsibility.
- Encapsulate styles within `static styles`.
- Use CSS variables for theming (prefixed with `--cp-`).