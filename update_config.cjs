const fs = require('fs');

// Update vite.config.js
let viteConfig = fs.readFileSync('vite.config.js', 'utf8');
if (!viteConfig.includes('disenadorGraficoBarcelona:')) {
    viteConfig = viteConfig.replace(
        'disenoWebWordpressBarcelona: resolve(__dirname, \'diseno-web-wordpress-barcelona.html\'),', 
        'disenoWebWordpressBarcelona: resolve(__dirname, \'diseno-web-wordpress-barcelona.html\'),\n        disenadorGraficoBarcelona: resolve(__dirname, \'disenador-grafico-barcelona.html\'),'
    );
    fs.writeFileSync('vite.config.js', viteConfig, 'utf8');
}

// Update sitemap.xml
let sitemap = fs.readFileSync('public/sitemap.xml', 'utf8');
if (!sitemap.includes('disenador-grafico-barcelona')) {
    sitemap = sitemap.replace('</urlset>', `  <url>
    <loc>https://vestraweb.es/disenador-grafico-barcelona</loc>
    <lastmod>2026-08-24</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`);
    fs.writeFileSync('public/sitemap.xml', sitemap, 'utf8');
}
