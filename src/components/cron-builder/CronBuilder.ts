import { LitElement, html, css } from 'lit';
import { customElement, state, property } from 'lit/decorators.js';
import { variables, baseStyles } from '../../styles/theme';
import cronstrue from 'cronstrue';
import { CronExpressionParser } from 'cron-parser';
import './CronField';

export type CronState = {
  minute: string;
  hour: string;
  dayOfMonth: string;
  month: string;
  dayOfWeek: string;
};

export const DEFAULT_CRON: CronState = {
  minute: '*',
  hour: '*',
  dayOfMonth: '*',
  month: '*',
  dayOfWeek: '*',
};

@customElement('cp-cron-builder')
export class CpCronBuilder extends LitElement {
  static styles = [
    variables,
    baseStyles,
    css`
      :host {
        display: block;
        width: 100%; /* Force expansion even inside flex/center parents */
      }

      .builder-wrapper {
        display: flex;
        flex-direction: column;
        gap: var(--cp-spacing-large);
      }

      .expression-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: var(--cp-spacing-medium);
        border-bottom: 1px solid var(--cp-border-color);
        padding-bottom: var(--cp-spacing-medium);
        margin-bottom: var(--cp-spacing-medium);
      }

      .expression-container {
        flex: 1;
        min-width: 250px;
      }

      .expression-label {
        font-size: 11px;
        font-weight: 700;
        color: var(--cp-text-muted);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-bottom: 4px;
      }

      .expression-text {
        font-size: 32px;
        font-weight: 600;
        color: var(--cp-primary-color);
        font-family: 'JetBrains Mono', 'Fira Code', monospace;
        word-break: break-all;
      }

      .actions {
        display: flex;
        gap: var(--cp-spacing-small);
      }

      .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 8px 16px;
        border-radius: var(--cp-border-radius);
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
        border: 1px solid transparent;
      }

      .btn-primary {
        background: var(--cp-primary-color);
        color: white;
      }

      .btn-primary:hover {
        background: var(--cp-primary-hover);
      }

      .btn-soft {
        background: var(--cp-surface-3);
        color: var(--cp-text-secondary);
        border-color: var(--cp-border-color);
      }

      .btn-soft:hover {
        background: var(--cp-border-hover);
      }

      .results-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--cp-spacing-large);
      }

      @media (max-width: 600px) {
        .results-grid {
          grid-template-columns: 1fr;
        }
      }

      .result-section {
        display: flex;
        flex-direction: column;
        gap: var(--cp-spacing-small);
      }

      .result-label {
        font-size: 11px;
        font-weight: 700;
        color: var(--cp-text-muted);
        text-transform: uppercase;
      }

      .human-readable {
        font-size: 16px;
        line-height: 1.5;
        color: var(--cp-text-primary);
      }

      .human-readable.error {
        color: var(--cp-error-color);
      }

      .next-runs {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .run-time {
        font-size: 13px;
        color: var(--cp-text-secondary);
        font-family: monospace;
      }

      /* Tabs */
      .tabs {
        display: flex;
        border-bottom: 1px solid var(--cp-border-color);
        margin-bottom: var(--cp-spacing-medium);
        overflow-x: auto;
      }

      .tab {
        padding: 12px 20px;
        font-size: 14px;
        font-weight: 600;
        color: var(--cp-text-secondary);
        cursor: pointer;
        border-bottom: 2px solid transparent;
        white-space: nowrap;
      }

      .tab[active] {
        color: var(--cp-primary-color);
        border-bottom-color: var(--cp-primary-color);
      }

      .tab:hover:not([active]) {
        color: var(--cp-text-primary);
      }

      .field-editor {
        padding: var(--cp-spacing-small);
        background: inherit;
      }
    `
  ];

  @property({ type: String, reflect: true })
  theme: 'light' | 'dark' | 'auto' = 'auto';

  @property({ type: String, attribute: 'primary-color' })
  primaryColor?: string;

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('primaryColor') && this.primaryColor) {
      this.style.setProperty('--cp-primary-color', this.primaryColor);
      // Simple logic to generate a slightly darker hover color if not provided
      if (!this.style.getPropertyValue('--cp-primary-hover')) {
        // This is a naive implementation, but works for most hex colors
        // For a more robust version, we'd use a color library
        this.style.setProperty('--cp-primary-hover', this.primaryColor + 'ee');
      }
    }
  }

  @state()
  private _cronState: CronState = { ...DEFAULT_CRON };

  @state()
  private _activeTab: keyof CronState = 'minute';

  @state()
  private _copied = false;

  private get _expression(): string {
    return `${this._cronState.minute} ${this._cronState.hour} ${this._cronState.dayOfMonth} ${this._cronState.month} ${this._cronState.dayOfWeek}`;
  }

  private _handleFieldChange(e: CustomEvent) {
    const { field, value } = e.detail;
    this._cronState = { ...this._cronState, [field]: value };
  }

  private async _copyToClipboard() {
    try {
      await navigator.clipboard.writeText(this._expression);
      this._copied = true;
      setTimeout(() => (this._copied = false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }

  private _reset() {
    this._cronState = { ...DEFAULT_CRON };
  }

  private _renderResults() {
    let description = '';
    let nextRuns: string[] = [];
    let error = null;

    try {
      description = cronstrue.toString(this._expression);
      const interval = CronExpressionParser.parse(this._expression);
      for (let i = 0; i < 5; i++) {
        const nextDate = interval.next();
        nextRuns.push(
          new Date(nextDate.toString()).toLocaleString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: 'UTC',
          }) + ' UTC'
        );
      }
    } catch {
      description = 'Invalid cron expression';
      error = true;
    }

    return html`
      <div class="results-grid">
        <div class="result-section">
          <div class="result-label">Human Readable</div>
          <div class="human-readable ${error ? 'error' : ''}">
            ${description}
          </div>
        </div>
        <div class="result-section">
          <div class="result-label">Next Scheduled Runs</div>
          <div class="next-runs">
            ${nextRuns.length > 0
              ? nextRuns.map((run) => html`<div class="run-time">${run}</div>`)
              : html`<div class="run-time">-</div>`}
          </div>
        </div>
      </div>
    `;
  }

  render() {
    return html`
      <div class="builder-wrapper">
        <div class="cp-card" style="padding: var(--cp-card-padding, var(--cp-spacing-large));">
          <div class="expression-header">
            <div class="expression-container">
              <div class="expression-label">Cron Expression</div>
              <div class="expression-text">${this._expression}</div>
            </div>
            <div class="actions">
              <button class="btn btn-soft" @click=${this._reset}>Reset</button>
              <button class="btn btn-primary" @click=${this._copyToClipboard}>
                ${this._copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
          ${this._renderResults()}
        </div>

        <div class="cp-card" style="padding: var(--cp-card-padding, var(--cp-spacing-large));">
          <div class="tabs">
            <div
              class="tab"
              ?active=${this._activeTab === 'minute'}
              @click=${() => (this._activeTab = 'minute')}
            >
              Minute
            </div>
            <div
              class="tab"
              ?active=${this._activeTab === 'hour'}
              @click=${() => (this._activeTab = 'hour')}
            >
              Hour
            </div>
            <div
              class="tab"
              ?active=${this._activeTab === 'dayOfMonth'}
              @click=${() => (this._activeTab = 'dayOfMonth')}
            >
              Day
            </div>
            <div
              class="tab"
              ?active=${this._activeTab === 'month'}
              @click=${() => (this._activeTab = 'month')}
            >
              Month
            </div>
            <div
              class="tab"
              ?active=${this._activeTab === 'dayOfWeek'}
              @click=${() => (this._activeTab = 'dayOfWeek')}
            >
              Week
            </div>
          </div>

          <div class="field-editor">
            ${this._renderActiveField()}
          </div>
        </div>

        <div class="cp-footer">
          Powered by <a href="https://coderpulse.io" target="_blank">CoderPulse</a>
        </div>
      </div>
    `;
  }

  private _renderActiveField() {
    interface FieldConfig {
      range: { min: number; max: number };
      label: string;
      names?: string[];
    }

    const configs: Record<keyof CronState, FieldConfig> = {
      minute: { range: { min: 0, max: 59 }, label: 'Minutes' },
      hour: { range: { min: 0, max: 23 }, label: 'Hours' },
      dayOfMonth: { range: { min: 1, max: 31 }, label: 'Day of Month' },
      month: {
        range: { min: 1, max: 12 },
        label: 'Months',
        names: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
      },
      dayOfWeek: {
        range: { min: 0, max: 6 },
        label: 'Day of Week',
        names: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      },
    };

    const config = configs[this._activeTab];

    return html`
      <cp-cron-field
        .field=${this._activeTab}
        .value=${this._cronState[this._activeTab]}
        .range=${config.range}
        .label=${config.label}
        .names=${config.names}
        .theme=${this.theme}
        @field-change=${this._handleFieldChange}
      ></cp-cron-field>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cp-cron-builder': CpCronBuilder;
  }
}
