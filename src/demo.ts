/// <reference types="vite/client" />
import './docs.scss';
import './index';
import { marked } from 'marked';
import hljs from 'highlight.js';

// Automatically import all component READMEs
const readmeModules = import.meta.glob('/src/components/*/README.md', { query: '?raw', eager: true }) as Record<string, { default: string }>;

document.addEventListener('DOMContentLoaded', async () => {
  const componentsNav = document.getElementById('components-nav');
  const mainContent = document.getElementById('dynamic-components');

  /**
   * Helper: Parse README into sections
   */
  const parseReadme = (content: string) => {
    const sections: Record<string, string> = { overview: '', api: '', usage: '' };
    const parts = content.split(/\n## /);
    
    sections.overview = parts[0]; // Title and intro
    
    parts.slice(1).forEach(part => {
      const title = part.split('\n')[0].toLowerCase();
      const body = part.split('\n').slice(1).join('\n');
      
      if (title.includes('api')) sections.api = body;
      else if (title.includes('usage') || title.includes('examples')) sections.usage = body;
      else sections.overview += `\n## ${part}`;
    });
    
    return sections;
  };

  /**
   * 1. Render Components
   */
  Object.entries(readmeModules).forEach(([path, module]) => {
    const componentName = path.split('/')[3]; // e.g., 'cron-builder'
    const tagName = `cp-${componentName}`;
    const displayName = componentName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const readmeSections = parseReadme(module.default);

    // Sidebar Link
    if (componentsNav) {
      const link = document.createElement('a');
      link.href = `#${componentName}`;
      link.textContent = displayName;
      componentsNav.appendChild(link);
    }

    // Main Section
    if (mainContent) {
      const section = document.createElement('section');
      section.id = componentName;
      section.innerHTML = `
        <h2>${displayName}</h2>
        <div class="component-showcase">
          <div class="showcase-tabs">
            <button class="showcase-tab-btn active" data-target="preview-${componentName}">Preview</button>
            <button class="showcase-tab-btn" data-target="api-${componentName}">API Reference</button>
            <button class="showcase-tab-btn" data-target="usage-${componentName}">Usage Guidelines</button>
          </div>

          <!-- Preview Tab -->
          <div id="preview-${componentName}" class="showcase-content active">
            <div class="playground-stacked">
              <div class="config-bar">
                <h3>Configuration</h3>
                <div class="config-field">
                  <label>Theme</label>
                  <select class="theme-select" data-widget="${componentName}">
                    <option value="light">Light</option>
                    <option value="dark" selected>Dark</option>
                  </select>
                </div>
                <div class="config-field">
                  <label>Primary Color</label>
                  <input type="color" class="color-input" data-widget="${componentName}" value="#0069ff" />
                </div>
              </div>

              <div class="implementation-container" style="margin-top: 0; border-top: 1px solid var(--border-color);">
                <div class="impl-tabs" style="padding: 0 2.5rem; background: #0d0d0f;">
                  <button class="impl-tab-btn active" data-target="live-${componentName}" data-widget="${componentName}">Live Widget</button>
                  <button class="impl-tab-btn" data-target="cdn-${componentName}" data-widget="${componentName}">WordPress / CDN</button>
                  <button class="impl-tab-btn" data-target="npm-${componentName}" data-widget="${componentName}">NPM / React</button>
                </div>
                
                <div id="live-${componentName}" class="impl-content active">
                  <div class="preview-slot">
                    <${tagName} id="widget-${componentName}" theme="dark"></${tagName}>
                  </div>
                </div>

                <div id="cdn-${componentName}" class="impl-content">
                  <div class="code-window" style="border: none; border-radius: 0;">
                    <button class="copy-btn">Copy</button>
                    <pre><code class="language-xml" id="code-cdn-${componentName}"></code></pre>
                  </div>
                </div>

                <div id="npm-${componentName}" class="impl-content">
                  <div class="code-window" style="border: none; border-radius: 0;">
                    <button class="copy-btn">Copy</button>
                    <pre><code class="language-typescript" id="code-npm-${componentName}"></code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- API Tab -->
          <div id="api-${componentName}" class="showcase-content markdown-body">
            ${marked.parse(readmeSections.api || 'No API documentation found.')}
          </div>

          <!-- Usage Tab -->
          <div id="usage-${componentName}" class="showcase-content markdown-body">
            ${marked.parse(readmeSections.usage || 'No usage guidelines found.')}
          </div>
        </div>
      `;
      mainContent.appendChild(section);
      
      // Initialize highlighting for newly injected markdown
      section.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block as HTMLElement);
      });
    }
  });

  /**
   * 2. Interaction Logic
   */
  const updateCodeSnippet = (compName: string) => {
    const themeSelect = document.querySelector(`.theme-select[data-widget="${compName}"]`) as HTMLSelectElement;
    const colorInput = document.querySelector(`.color-input[data-widget="${compName}"]`) as HTMLInputElement;
    const cdnCodeBlock = document.getElementById(`code-cdn-${compName}`) as HTMLElement;
    const npmCodeBlock = document.getElementById(`code-npm-${compName}`) as HTMLElement;
    
    if (!themeSelect || !colorInput || !cdnCodeBlock || !npmCodeBlock) return;

    const theme = themeSelect.value;
    const color = colorInput.value;

    const cdnSnippet = `<!-- CDN Script -->\n<script src="https://unpkg.com/coderpulse-widgets/dist/coderpulse-widgets-embed.umd.js"></script>\n\n<!-- Widget -->\n<cp-${compName}\n  theme="${theme}"\n  primary-color="${color}"\n></cp-${compName}>`;

    const npmSnippet = `// Install: npm install coderpulse-widgets\nimport 'coderpulse-widgets';\n\n// Usage in React / Next.js / HTML:\n<cp-${compName} \n  theme="${theme}" \n  primary-color="${color}" \n/>`;

    cdnCodeBlock.innerHTML = hljs.highlight(cdnSnippet, { language: 'xml' }).value;
    npmCodeBlock.innerHTML = hljs.highlight(npmSnippet, { language: 'typescript' }).value;
  };

  // Event Delegation for Tabs
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;

    // Showcase Tabs (Preview/API/Usage)
    if (target.classList.contains('showcase-tab-btn')) {
      const container = target.closest('.component-showcase');
      const targetId = target.dataset.target;
      if (!container || !targetId) return;

      container.querySelectorAll('.showcase-tab-btn').forEach(b => b.classList.remove('active'));
      target.classList.add('active');

      container.querySelectorAll('.showcase-content').forEach(c => c.classList.remove('active'));
      const content = document.getElementById(targetId);
      if (content) content.classList.add('active');
    }

    // Nested Implementation Tabs (Live/CDN/NPM)
    if (target.classList.contains('impl-tab-btn')) {
      const container = target.closest('.implementation-container');
      const targetId = target.dataset.target;
      if (!container || !targetId) return;

      container.querySelectorAll('.impl-tab-btn').forEach(b => b.classList.remove('active'));
      target.classList.add('active');

      container.querySelectorAll('.impl-content').forEach(c => c.classList.remove('active'));
      const content = document.getElementById(targetId);
      if (content) content.classList.add('active');
    }

    // Copy Button
    if (target.classList.contains('copy-btn')) {
      const code = target.nextElementSibling?.querySelector('code')?.textContent;
      if (code) {
        navigator.clipboard.writeText(code);
        const originalText = target.textContent;
        target.textContent = 'Copied!';
        setTimeout(() => target.textContent = originalText, 2000);
      }
    }
  });

  // Event Delegation for Config
  document.addEventListener('change', (e) => {
    const target = e.target as HTMLSelectElement;
    if (target.classList.contains('theme-select')) {
      const compName = target.dataset.widget;
      if (compName) {
        const widget = document.getElementById(`widget-${compName}`);
        widget?.setAttribute('theme', target.value);
        updateCodeSnippet(compName);
      }
    }
  });

  document.addEventListener('input', (e) => {
    const target = e.target as HTMLInputElement;
    if (target.classList.contains('color-input')) {
      const compName = target.dataset.widget;
      if (compName) {
        const widget = document.getElementById(`widget-${compName}`);
        widget?.setAttribute('primary-color', target.value);
        updateCodeSnippet(compName);
      }
    }
  });

  /**
   * 3. Sidebar Highlighting
   */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        document.querySelectorAll('.sidebar nav a').forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });

  document.querySelectorAll('section').forEach(s => observer.observe(s));

  // Initial snippets
  Object.keys(readmeModules).forEach(path => {
    const name = path.split('/')[3];
    updateCodeSnippet(name);
  });
});
