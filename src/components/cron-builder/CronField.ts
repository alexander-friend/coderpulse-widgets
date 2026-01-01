import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { variables, baseStyles } from '../../styles/theme';

@customElement('cp-cron-field')
export class CpCronField extends LitElement {
  static styles = [
    variables,
    baseStyles,
    css`
      :host {
        display: block;
        background: transparent !important;
      }

      .field-container {
        display: flex;
        flex-direction: column;
        gap: var(--cp-spacing-medium);
        background: transparent;
      }

      .radio-group {
        display: flex;
        flex-direction: column;
        gap: var(--cp-spacing-small);
      }

      .radio-item {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
        cursor: pointer;
        color: var(--cp-text-primary);
      }

      input[type='radio'] {
        margin: 0;
        cursor: pointer;
        accent-color: var(--cp-primary-color);
      }

      input[type='number'] {
        width: 60px;
        padding: 4px 8px;
        border: 1px solid var(--cp-border-color);
        border-radius: 4px;
        font-size: 13px;
        color: var(--cp-text-primary);
        background: var(--cp-surface-1);
        transition: border-color 0.2s;
      }

      input[type='number']:focus {
        outline: none;
        border-color: var(--cp-primary-color);
      }

      input[type='number']:disabled {
        background-color: var(--cp-surface-2);
        color: var(--cp-text-muted);
        cursor: not-allowed;
      }

      .selection-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
        gap: 8px;
        padding-top: var(--cp-spacing-medium);
        border-top: 1px solid var(--cp-border-color);
        transition: opacity 0.2s;
      }

      .selection-grid.disabled {
        opacity: 0.4;
        pointer-events: none;
      }

      .grid-item {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 13px;
        padding: 6px;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s, color 0.2s;
        color: var(--cp-text-secondary);
      }

      .grid-item:hover {
        background-color: var(--cp-surface-3);
        color: var(--cp-text-primary);
      }

      .grid-item input {
        margin: 0;
        cursor: pointer;
        accent-color: var(--cp-primary-color);
      }
    `
  ];

  @property({ type: String, reflect: true }) theme: 'light' | 'dark' | 'auto' = 'auto';
  @property({ type: String }) field = '';
  @property({ type: String }) value = '*';
  @property({ type: Object }) range = { min: 0, max: 0 };
  @property({ type: String }) label = '';
  @property({ type: Array }) names?: string[];

  private _getMode(val: string): string {
    if (val === '*') return 'every';
    if (val.includes('/')) return 'step';
    return 'specific';
  }

  private _handleModeChange(newMode: string) {
    let newValue = '*';
    if (newMode === 'every') newValue = '*';
    if (newMode === 'step') newValue = '*/5';
    if (newMode === 'specific') newValue = `${this.range.min}`;

    this._dispatchChange(newValue);
  }

  private _handleSpecificToggle(num: number) {
    const mode = this._getMode(this.value);
    if (mode !== 'specific') {
      this._dispatchChange(num.toString());
      return;
    }

    const current = this.value.split(',').map(Number);
    let newValues: number[];
    if (current.includes(num)) {
      newValues = current.filter((n) => n !== num);
    } else {
      newValues = [...current, num].sort((a, b) => a - b);
    }

    if (newValues.length === 0) return;
    this._dispatchChange(newValues.join(','));
  }

  private _handleStepChange(e: Event) {
    const val = (e.target as HTMLInputElement).value;
    if (val === '') {
      this._dispatchChange('*/');
      return;
    }
    const numVal = parseInt(val, 10);
    if (!isNaN(numVal) && numVal >= 1) {
      const maxStep = this.field === 'minute' ? 30 : Math.floor(this.range.max / 2);
      if (numVal <= maxStep) {
        this._dispatchChange(`*/${numVal}`);
      }
    }
  }

  private _dispatchChange(newValue: string) {
    this.dispatchEvent(
      new CustomEvent('field-change', {
        detail: { field: this.field, value: newValue },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    const mode = this._getMode(this.value);
    const stepValue = mode === 'step' ? this.value.split('/')[1] || '' : '';

    return html`
      <div class="field-container">
        <div class="radio-group">
          <label class="radio-item">
            <input
              type="radio"
              name="mode"
              value="every"
              ?checked=${mode === 'every'}
              @change=${() => this._handleModeChange('every')}
            />
            Every ${this.label.toLowerCase().slice(0, -1)} (*)
          </label>

          <label class="radio-item">
            <input
              type="radio"
              name="mode"
              value="step"
              ?checked=${mode === 'step'}
              @change=${() => this._handleModeChange('step')}
            />
            Every
            <input
              type="number"
              .value=${stepValue}
              ?disabled=${mode !== 'step'}
              @input=${this._handleStepChange}
              min="1"
              max=${this.field === 'minute' ? '30' : Math.floor(this.range.max / 2)}
            />
            ${this.label.toLowerCase()}
          </label>

          <label class="radio-item">
            <input
              type="radio"
              name="mode"
              value="specific"
              ?checked=${mode === 'specific'}
              @change=${() => this._handleModeChange('specific')}
            />
            Specific ${this.label.toLowerCase()}
          </label>
        </div>

        <div class="selection-grid ${mode !== 'specific' ? 'disabled' : ''}">
          ${this._renderGrid()}
        </div>
      </div>
    `;
  }

  private _renderGrid() {
    const items = [];
    const mode = this._getMode(this.value);
    const selected = mode === 'specific' ? this.value.split(',').map(Number) : [];

    for (let i = this.range.min; i <= this.range.max; i++) {
      const isSelected = selected.includes(i);
      items.push(html`
        <div class="grid-item" @click=${() => this._handleSpecificToggle(i)}>
          <input type="checkbox" ?checked=${isSelected} readonly />
          <span>${this.names ? this.names[i - this.range.min] : i.toString().padStart(2, '0')}</span>
        </div>
      `);
    }
    return items;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cp-cron-field': CpCronField;
  }
}
