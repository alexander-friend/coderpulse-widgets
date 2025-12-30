import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './CronBuilder';
import { CpCronBuilder } from './CronBuilder';

describe('CpCronBuilder', () => {
  let element: CpCronBuilder;

  beforeEach(() => {
    element = document.createElement('cp-cron-builder') as CpCronBuilder;
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('renders correctly', async () => {
    // Wait for Lit to render
    await element.updateComplete;
    
    expect(element).toBeTruthy();
    expect(element.shadowRoot).toBeTruthy();
    
    const header = element.shadowRoot?.querySelector('.expression-label');
    expect(header).toBeTruthy();
    expect(header?.textContent).toContain('Cron Expression');
  });
});
