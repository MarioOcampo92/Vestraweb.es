const fs = require('fs');
let html = fs.readFileSync('disenador-grafico-barcelona.html', 'utf8');

html = html.replaceAll(
    '<div style="color: #fff; font-size: 1.5rem; margin-bottom: 1rem; font-family: var(--font-heading); text-transform: uppercase; font-weight:bold;">Frontend & UI/UX Design</div>',
    '<h3 style="color: #fff; font-size: 1.5rem; margin-bottom: 1rem; font-family: var(--font-heading); text-transform: uppercase; font-weight:bold;">Frontend & Diseño Gráfico UI/UX</h3>'
);

html = html.replaceAll(
    '<div style="color: #fff; font-size: 1.5rem; margin-bottom: 1rem; font-family: var(--font-heading); text-transform: uppercase; font-weight:bold;">Backend & Arquitectura</div>',
    '<h3 style="color: #fff; font-size: 1.5rem; margin-bottom: 1rem; font-family: var(--font-heading); text-transform: uppercase; font-weight:bold;">Arquitectura Web y Diseño SEO</h3>'
);

html = html.replaceAll(
    '<div style="color: #fff; font-size: 1.5rem; margin-bottom: 1rem; font-family: var(--font-heading); text-transform: uppercase; font-weight:bold;">Inteligencia Artificial</div>',
    '<h3 style="color: #fff; font-size: 1.5rem; margin-bottom: 1rem; font-family: var(--font-heading); text-transform: uppercase; font-weight:bold;">IA y Diseño Web Barcelona</h3>'
);

html = html.replaceAll(
    '<div style="color: #fff; font-size: 1.5rem; margin-bottom: 1rem; font-family: var(--font-heading); text-transform: uppercase; font-weight:bold;">Plataformas E-Commerce</div>',
    '<h3 style="color: #fff; font-size: 1.5rem; margin-bottom: 1rem; font-family: var(--font-heading); text-transform: uppercase; font-weight:bold;">Diseño para Tiendas Online</h3>'
);

fs.writeFileSync('disenador-grafico-barcelona.html', html, 'utf8');
console.log('Swiper Headers Enriched with SEO Best Practices!');
