import { css } from 'lit';

export const variables = css`
  :host {
    /* Colors - Light Theme (Default) */
    --cp-primary-color: #0069ff;
    --cp-primary-hover: #0056d6;
    --cp-primary-soft: #e6f0ff;
    
    --cp-bg-color: #ffffff;
    --cp-surface-1: #ffffff;
    --cp-surface-2: #f8f9fa;
    --cp-surface-3: #f0f2f5;
    
    --cp-text-primary: #031b4e;
    --cp-text-secondary: #4c5e87;
    --cp-text-muted: #707d9d;
    
    --cp-border-color: #e5e8ed;
    --cp-border-hover: #d1d5db;
    
    --cp-error-color: #d93025;
    --cp-success-color: #188038;

    --cp-card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    
    /* Layout Tokens */
    --cp-font-family: 'Inter', system-ui, -apple-system, sans-serif;
    --cp-border-radius: 6px;
    --cp-spacing-small: 8px;
    --cp-spacing-medium: 16px;
    --cp-spacing-large: 24px;
    
    font-family: var(--cp-font-family);
    color: var(--cp-text-primary);
    background-color: var(--cp-bg-color);
  }

  /* Dark Theme Overrides */
  @media (prefers-color-scheme: dark) {
    :host(:not([theme="light"])) {
      --cp-bg-color: #1a1b1e;
      --cp-surface-1: #25262b;
      --cp-surface-2: #1a1b1e;
      --cp-surface-3: #2c2e33;
      
      --cp-text-primary: #ced4da;
      --cp-text-secondary: #909296;
      --cp-text-muted: #5c5f66;
      
      --cp-border-color: #373a40;
      --cp-border-hover: #5c5f66;
      
      --cp-primary-soft: #1f2937;
      --cp-card-shadow: 0 1px 3px rgba(0,0,0,0.5);
    }
  }

  :host([theme="dark"]) {
    --cp-bg-color: #1a1b1e;
    --cp-surface-1: #25262b;
    --cp-surface-2: #1a1b1e;
    --cp-surface-3: #2c2e33;
    
    --cp-text-primary: #ced4da;
    --cp-text-secondary: #909296;
    --cp-text-muted: #5c5f66;
    
    --cp-border-color: #373a40;
    --cp-border-hover: #5c5f66;
    
    --cp-primary-soft: #1f2937;
    --cp-card-shadow: 0 1px 3px rgba(0,0,0,0.5);
  }
`;

export const baseStyles = css`
  .cp-card {
    background: var(--cp-surface-1);
    border: 1px solid var(--cp-border-color);
    border-radius: var(--cp-border-radius);
    padding: var(--cp-spacing-large);
    box-shadow: var(--cp-card-shadow);
    color: var(--cp-text-primary);
  }

  .cp-footer {
    margin-top: var(--cp-spacing-medium);
    font-size: 10px;
    opacity: 0.6;
    color: var(--cp-text-secondary);
  }

  .cp-footer a {
    color: var(--cp-primary-color);
    text-decoration: none;
  }

  .cp-footer a:hover {
    text-decoration: underline;
  }
`;
