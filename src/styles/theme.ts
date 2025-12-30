import { css } from 'lit';

export const baseStyles = css`
  :host {
    --cp-primary-color: #0069ff; /* DigitalOcean Blue */
    --cp-primary-hover: #0056d6;
    --cp-text-color: #031b4e;
    --cp-secondary-text-color: #4c5e87;
    --cp-border-color: #e5e8ed;
    --cp-bg-color: #ffffff;
    --cp-card-bg: #ffffff;
    --cp-card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --cp-font-family: 'Inter', system-ui, -apple-system, sans-serif;
    --cp-border-radius: 6px; /* Slightly tighter than 8px */
    --cp-spacing-small: 8px;
    --cp-spacing-medium: 16px;
    --cp-spacing-large: 24px;
    
    font-family: var(--cp-font-family);
    color: var(--cp-text-color);
    background-color: var(--cp-bg-color);
  }

  .cp-card {
    background: var(--cp-card-bg);
    border: 1px solid var(--cp-border-color);
    border-radius: var(--cp-border-radius);
    padding: var(--cp-spacing-large);
    box-shadow: var(--cp-card-shadow);
  }

  .cp-footer {
    margin-top: var(--cp-spacing-medium);
    font-size: 10px;
    opacity: 0.6;
    color: var(--cp-secondary-text-color);
  }

  .cp-footer a {
    color: var(--cp-primary-color);
    text-decoration: none;
  }

  .cp-footer a:hover {
    text-decoration: underline;
  }
`;
