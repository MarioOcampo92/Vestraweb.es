import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

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

function moveAssetsToHead() {
  return {
    name: 'move-assets-to-head',
    enforce: 'post',
    transformIndexHtml(html) {
      // Extract all <link rel="stylesheet"> and <script type="module"> tags for assets
      const cssLinks = [];
      const jsScripts = [];
      
      let cleanHtml = html.replace(/<link[^>]+rel="stylesheet"[^>]+href="\/assets\/[^>]+>/g, (match) => {
        cssLinks.push(match);
        return '';
      });
      
      cleanHtml = cleanHtml.replace(/<script[^>]+type="module"[^>]+src="\/assets\/[^>]+><\/script>/g, (match) => {
        jsScripts.push(match);
        return '';
      });
      
      // Inject them into the head
      const headInjection = [...cssLinks, ...jsScripts].join('\n    ');
      return cleanHtml.replace(/<\/head>/i, '    ' + headInjection + '\n</head>');
    }
  };
}

export default defineConfig({
  plugins: [htmlPartials(), moveAssetsToHead()],
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
