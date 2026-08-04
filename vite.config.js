import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

import fs from 'fs';

function htmlPartials() {
  return {
    name: 'html-partials',
    transformIndexHtml(html) {
      // Replace <include src="path/to/file.html"></include>
      return html.replace(/<include\s+src="([^"]+)"\s*><\/include>/g, (match, src) => {
        const filePath = resolve(__dirname, src);
        if (fs.existsSync(filePath)) {
          return fs.readFileSync(filePath, 'utf-8');
        }
        return match;
      });
    }
  };
}

export default defineConfig({
  plugins: [htmlPartials()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        portafolio: resolve(__dirname, 'portafolio.html'),
        proyectos: resolve(__dirname, 'proyectos.html'),
        blog: resolve(__dirname, 'blog.html'),
        contactar: resolve(__dirname, 'contactar.html'),
        jordinaArnau: resolve(__dirname, 'jordina-arnau.html'),
        mellows: resolve(__dirname, 'mellows.html'),
        selvaDeSabores: resolve(__dirname, 'selva-de-sabores.html'),
        auarquitectos: resolve(__dirname, 'auarquitectos.html'),
        ballDeLletres: resolve(__dirname, 'ball-de-lletres.html'),
        compassionateChristmas: resolve(__dirname, 'compassionate-christmas.html')
      }
    }
  }
});
