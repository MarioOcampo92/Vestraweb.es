const fs = require('fs');

// 1. Read index.html
let html = fs.readFileSync('index.html', 'utf8');

// 2. We need to detach it from the global head to give it unique SEO tags.
// Let's replace the include with a modified head.
const headContent = fs.readFileSync('components/head.html', 'utf8');
const newHead = headContent
    .replace('<title>Diseño web Tarragona | Webs rápidas y optimizadas para SEO</title>', '<title>Desarrollo Web en Castellón | Sitios web rápidos y SEO | VestraWeb</title>')
    .replace('content="Atrae más clientes y aumenta tus ventas con diseño web profesional y posicionamiento SEO en Tarragona. VestraWeb crea sitios optimizados y de alto rendimiento."', 'content="Impulsa tu negocio en Castellón con desarrollo web a medida y estrategias de posicionamiento SEO. Creamos páginas web enfocadas en conversión y ventas."')
    .replace('content="diseño web tarragona, diseño web reus, desarrollo web tarragona, posicionamiento web tarragona, seo tarragona, agencia seo tarragona, diseño de paginas web, creador de paginas web"', 'content="desarrollo web castellon, diseño web castellon, posicionamiento seo castellon, agencia web castellon, crear pagina web castellon"')
    // Update local business schema coordinates for Castellón (Lat: 39.9864, Lon: -0.0513)
    .replace('"latitude": "41.1189"', '"latitude": "39.9864"')
    .replace('"longitude": "1.2445"', '"longitude": "-0.0513"')
    .replace('"addressLocality": "Tarragona"', '"addressLocality": "Castellón de la Plana"')
    .replace('"postalCode": "43001"', '"postalCode": "12001"');

html = html.replace('<include src="components/head.html"></include>', newHead);

// 3. Semantic Re-writes to avoid Duplicate Content Penalty
// Re-write Hero
html = html.replace('<div class="h1">Diseño Web en Tarragona</div>', '<div class="h1">Desarrollo Web en Castellón</div>');

// Re-write Intro
html = html.replace('Atrae más clientes y aumenta tus ventas con diseño web profesional y posicionamiento SEO en Tarragona', 'Escala tu negocio y consigue más contactos gracias a un diseño web estratégico y SEO local en Castellón');

// Re-write Orb text
html = html.replace('¿Tu web no genera los clientes que esperas? En VestraWeb creamos sitios que combinan diseño atractivo con resultados reales: más visitas, más contactos, más ventas.', '¿Cansado de tener una página que nadie visita? En VestraWeb desarrollamos plataformas digitales que unen estética visual con un rendimiento brutal: atraemos tráfico, generamos oportunidades y cerramos ventas en la provincia.');
html = html.replace('Con más de 7 años especializados en diseño web Tarragona, Reus y provincia, desarrollamos páginas web rápidas, optimizadas para SEO local y preparadas para que tu negocio destaque en Google.', 'Con una extensa trayectoria creando proyectos digitales de alto impacto, diseñamos páginas web ultrarrápidas, enfocadas al SEO local en Castellón de la Plana y diseñadas para que tu empresa lidere las búsquedas en Google.');
html = html.replace('Cada web que creamos está optimizada (para Google y buscadores IA) y convertir visitantes en clientes reales, no solo en visitas.', 'Nuestros desarrollos están 100% pensados para los algoritmos actuales (Google y nuevas IA), con el objetivo claro de transformar usuarios curiosos en compradores fidelizados, yendo mucho más allá del simple tráfico.');

// Re-write About
html = html.replace('<div class="h2">Diseño web en Tarragona para que tu negocio hable por ti</div>', '<div class="h2">Desarrollo web en Castellón creado para que tu empresa domine su sector</div>');

// Re-write Services
html = html.replace('<div class="h2">Desarrollo y diseño web a tu medida en Tarragona</div>', '<div class="h2">Soluciones digitales a medida para empresas en Castellón</div>');
html = html.replace('<div class="h3">Diseño web Tarragona</div>', '<div class="h3">Desarrollo web Castellón</div>');
html = html.replace('<div class="h3">Diseño de marca / Premium</div>', '<div class="h3">Identidad Corporativa Premium</div>');
html = html.replace('<div class="h3">SEO y Posicionamiento</div>', '<div class="h3">Auditoría y Posicionamiento SEO</div>');

html = html.replace('<div class="h2">Desarrollo web profesional, prestamos servicio a tu medida</div>', '<div class="h2">Especialistas en desarrollo, ofrecemos un servicio integral adaptado a ti</div>');
html = html.replace('<div class="h2">Nuestros Proyectos Web en Tarragona</div>', '<div class="h2">Proyectos destacados de Diseño y Desarrollo Web</div>');

// Re-write FAQ Titles
html = html.replace('<div class="h2">Servicios Web Tarragona</div>', '<div class="h2">Nuestros Servicios Web en Castellón</div>');
html = html.replace('<div class="h2">Preguntas frecuentes sobre diseño web y SEO en Tarragona</div>', '<div class="h2">Preguntas habituales sobre desarrollo web y posicionamiento SEO en Castellón</div>');

// Re-write FAQ Answers (anti-cannibalization)
html = html.replace('El precio de un diseño web en Tarragona', 'La inversión para desarrollar una web profesional en Castellón');
html = html.replace('Como agencia de diseño web y SEO en Tarragona', 'Como estudio especializado en desarrollo web en la provincia');
html = html.replace('Si tienes un negocio en Tarragona, el posicionamiento SEO local es fundamental.', 'Para cualquier negocio en Castellón, dominar el SEO local marca la diferencia frente a la competencia.');
html = html.replace('¿Puedo gestionar mi web yo mismo?', '¿Es posible administrar mi página de forma autónoma?');
html = html.replace('Sí, todas las páginas web que diseñamos', 'Por supuesto, todos los portales digitales que desarrollamos');

// Write the Castellon page
fs.writeFileSync('desarrollo-web-castellon.html', html, 'utf8');

// Update vite.config.js to build the new page
let viteConfig = fs.readFileSync('vite.config.js', 'utf8');
if (!viteConfig.includes('desarrolloWebCastellon')) {
    viteConfig = viteConfig.replace("main: resolve(__dirname, 'index.html'),", "desarrolloWebCastellon: resolve(__dirname, 'desarrollo-web-castellon.html'),\n        main: resolve(__dirname, 'index.html'),");
    fs.writeFileSync('vite.config.js', viteConfig, 'utf8');
}

// Update Footer globally to add Castellon to "Zonas de Servicio" (optional but good for crawling)
let footer = fs.readFileSync('components/footer.html', 'utf8');
if (!footer.includes('Zonas de Servicio')) {
    const zonasHtml = `
            <div class="footer-links" style="gap: 1rem;">
                <h4 style="color: #fff; margin-bottom: 0.5rem; font-size: 1rem;">Zonas de Servicio</h4>
                <a href="/">Diseño web Tarragona</a>
                <a href="/desarrollo-web-castellon">Desarrollo web Castellón</a>
            </div>
    `;
    footer = footer.replace('<div class="footer-links">', zonasHtml + '        <div class="footer-links">');
    fs.writeFileSync('components/footer.html', footer, 'utf8');
}

console.log("Castellón page generated successfully with unique semantic copy!");
