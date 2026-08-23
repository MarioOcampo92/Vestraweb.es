const fs = require('fs');
const path = require('path');

// 1. Build the new HTML page
let html = fs.readFileSync('index.html', 'utf8');

// Replace includes
html = html.replace(/components\/index-hero\.html/g, 'components/barcelona-hero.html');
html = html.replace(/components\/index-portfolio\.html/g, 'components/barcelona-portfolio.html');
html = html.replace(/components\/index-services\.html/g, 'components/barcelona-services.html');

// Replace head
const customHead = `
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Diseño Web WordPress en Barcelona | Sitios Rápidos y SEO | VestraWeb</title>
    <meta name="description" content="Especialistas en diseño web WordPress en Barcelona. Creamos páginas web a medida, rápidas y optimizadas para SEO local que te ayudarán a conseguir más clientes en Barcelona.">
    <meta name="keywords" content="diseño web wordpress barcelona, desarrollo web barcelona, agencia wordpress barcelona, experto wordpress barcelona, posicionamiento seo barcelona">
    
    <!-- Meta Theme Color -->
    <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)">
    <meta name="theme-color" content="#0a0a0a" media="(prefers-color-scheme: dark)">
    
    <!-- Favicon -->
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    
    <!-- Open Graph (Social Media) -->
    <meta property="og:title" content="Diseño Web WordPress en Barcelona | VestraWeb">
    <meta property="og:description" content="Impulsa tu negocio con diseño web WordPress a medida en Barcelona y SEO local estratégico.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://vestraweb.es/diseno-web-wordpress-barcelona">
    <meta property="og:image" content="https://vestraweb.es/assets/vestra-logo-gradient.svg">
    
    <!-- Geo Meta Tags for Local SEO -->
    <meta name="geo.region" content="ES-CT">
    <meta name="geo.placename" content="Barcelona">
    <meta name="geo.position" content="41.3851;2.1734">
    <meta name="ICBM" content="41.3851, 2.1734">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,600;1,600&display=swap" rel="stylesheet">
    
    <!-- GSAP (Solo cargar donde se necesite) -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" defer></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" defer></script>

    <!-- Base Styles -->
    <link rel="stylesheet" href="/style.css">
`;
html = html.replace('<include src="components/head.html"></include>', customHead);

// Fix SEO Tags
html = html.replace('<link rel="canonical" href="https://vestraweb.es/">', '<link rel="canonical" href="https://vestraweb.es/diseno-web-wordpress-barcelona">');
if (!html.includes('name="author"')) {
    html = html.replace('</head>', '    <meta name="author" content="VestraWeb">\n    <meta name="publisher" content="VestraWeb">\n</head>');
}

// Rewrites for Barcelona SEO
html = html.replace(/Tarragona/g, 'Barcelona');
html = html.replace(/tarragona/g, 'barcelona');
html = html.replace(/Diseño web Barcelona/gi, 'Diseño web WordPress en Barcelona');
html = html.replace(/Desarrollo y diseño web a tu medida en Barcelona/gi, 'Desarrollo y diseño web WordPress a medida en Barcelona');
html = html.replace(/Diseño web con tarifas a medida en Barcelona/gi, 'Diseño web WordPress con tarifas a medida en Barcelona');
html = html.replace(/crear páginas que no solo se ven bien/gi, 'desarrollar webs en WordPress totalmente administrables que atraen clientes');

fs.writeFileSync('diseno-web-wordpress-barcelona.html', html, 'utf8');

// 2. Build the components
const components = ['hero', 'portfolio', 'services'];
for (const comp of components) {
    let compHtml = fs.readFileSync(`components/index-${comp}.html`, 'utf8');
    
    compHtml = compHtml.replace(/Tarragona/g, 'Barcelona');
    compHtml = compHtml.replace(/tarragona/g, 'barcelona');
    
    if (comp === 'hero') {
        compHtml = compHtml.replace(/Diseño Web en Barcelona/gi, 'Diseño Web WordPress en Barcelona');
    }
    if (comp === 'services') {
        compHtml = compHtml.replace(/Desarrollo Web a Medida/gi, 'Desarrollo WordPress a Medida');
        compHtml = compHtml.replace(/Diseño Web Premium/gi, 'Diseño WordPress Premium');
    }
    
    fs.writeFileSync(`components/barcelona-${comp}.html`, compHtml, 'utf8');
}

// 3. Duplicate local SEO assets
const assetsDir = path.join(__dirname, 'public', 'assets');
const files = fs.readdirSync(assetsDir);
let count = 0;
for (const file of files) {
    if (file.includes('tarragona')) {
        const destFile = file.replace(/tarragona/g, 'barcelona');
        const destPath = path.join(assetsDir, destFile);
        if (!fs.existsSync(destPath)) {
            fs.copyFileSync(path.join(assetsDir, file), destPath);
            count++;
        }
    }
}
console.log(`Copied ${count} local SEO assets for Barcelona`);

// 4. Update Navigation globally
const oldDropdown = `<div class="nav-dropdown-content">
                    <a href="/">Tarragona</a>
                    <a href="/diseno-web-castellon">Castellón</a>
                </div>`;
const newDropdown = `<div class="nav-dropdown-content">
                    <a href="/">Tarragona</a>
                    <a href="/diseno-web-castellon">Castellón</a>
                    <a href="/diseno-web-wordpress-barcelona">Barcelona</a>
                </div>`;

function processHtmlFiles(dir) {
    const filesList = fs.readdirSync(dir);
    for (const file of filesList) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory() && !['dist', 'node_modules', '.git', 'components'].includes(file)) {
            processHtmlFiles(fullPath);
        } else if (fullPath.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            if (content.includes(oldDropdown)) {
                content = content.replace(oldDropdown, newDropdown);
                fs.writeFileSync(fullPath, content, 'utf8');
            }
        }
    }
}
processHtmlFiles(__dirname);

// Update vite.config.js
let viteConfig = fs.readFileSync('vite.config.js', 'utf8');
if (!viteConfig.includes('disenoWebWordpressBarcelona:')) {
    viteConfig = viteConfig.replace('disenoWebCastellon: resolve(__dirname, \'diseno-web-castellon.html\'),', 
                                  'disenoWebCastellon: resolve(__dirname, \'diseno-web-castellon.html\'),\n        disenoWebWordpressBarcelona: resolve(__dirname, \'diseno-web-wordpress-barcelona.html\'),');
    fs.writeFileSync('vite.config.js', viteConfig, 'utf8');
}

// Update sitemap
let sitemap = fs.readFileSync('public/sitemap.xml', 'utf8');
if (!sitemap.includes('diseno-web-wordpress-barcelona')) {
    sitemap = sitemap.replace('</urlset>', `  <url>
    <loc>https://vestraweb.es/diseno-web-wordpress-barcelona</loc>
    <lastmod>2026-08-24</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`);
    fs.writeFileSync('public/sitemap.xml', sitemap, 'utf8');
}

console.log("Barcelona WordPress page built successfully!");
