import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, 'src/embed.ts'),
      name: 'CoderPulseWidgetsEmbed',
      formats: ['umd'],
      fileName: () => 'coderpulse-widgets-embed.umd.js',
    },
    rollupOptions: {
      // Embed bundle should be self-contained
      external: [],
    },
  },
});
