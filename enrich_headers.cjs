const fs = require('fs');
let html = fs.readFileSync('disenador-grafico-barcelona.html', 'utf8');

// 1. Enrich H2s
html = html.replace(
    '<h2 class="section-title">El Manifiesto y Filosofía</h2>',
    '<h2 class="section-title">Manifiesto y Filosofía del Diseñador Gráfico en Barcelona</h2>'
);

html = html.replace(
    '<h2 class="section-title" style="margin-bottom: 1rem; text-align: center;">Arsenal Técnico Integral</h2>',
    '<h2 class="section-title" style="margin-bottom: 1rem; text-align: center;">Arsenal Técnico: Herramientas de un Diseñador Gráfico en Barcelona</h2>'
);

html = html.replace(
    '<h2 class="section-title" style="text-align: center; margin-bottom: 6rem; text-shadow: 0 0 20px rgba(247,72,75,0.5);">El Camino <br><span style="color:#fff; font-size:0.6em;">(Experiencia Operativa)</span></h2>',
    '<h2 class="section-title" style="text-align: center; margin-bottom: 6rem; text-shadow: 0 0 20px rgba(247,72,75,0.5);">Trayectoria y Experiencia <br><span style="color:#fff; font-size:0.6em;">como Diseñador Gráfico en Barcelona</span></h2>'
);

html = html.replace(
    '<h2 class="section-title">Obras Maestras (Portfolio Web)</h2>',
    '<h2 class="section-title">Portfolio: Proyectos de Diseño Gráfico en Barcelona</h2>'
);

// 2. Enrich H3s in the Skills Swiper
html = html.replace(
    '<div style="font-family: var(--font-heading); font-size: 1.5rem; margin-bottom: 1.5rem; color: #fff; font-weight:bold;">Frontend & UI/UX Design</div>',
    '<h3 style="font-family: var(--font-heading); font-size: 1.5rem; margin-bottom: 1.5rem; color: #fff; font-weight:bold;">Frontend & Diseño Gráfico UI/UX</h3>'
);
html = html.replace(
    '<div style="font-family: var(--font-heading); font-size: 1.5rem; margin-bottom: 1.5rem; color: #fff; font-weight:bold;">Backend & Arquitectura</div>',
    '<h3 style="font-family: var(--font-heading); font-size: 1.5rem; margin-bottom: 1.5rem; color: #fff; font-weight:bold;">Arquitectura Web y Diseño Orientado a SEO</h3>'
);
html = html.replace(
    '<div style="font-family: var(--font-heading); font-size: 1.5rem; margin-bottom: 1.5rem; color: #fff; font-weight:bold;">Inteligencia Artificial</div>',
    '<h3 style="font-family: var(--font-heading); font-size: 1.5rem; margin-bottom: 1.5rem; color: #fff; font-weight:bold;">Automatización IA para Diseño Web en Barcelona</h3>'
);
html = html.replace(
    '<div style="font-family: var(--font-heading); font-size: 1.5rem; margin-bottom: 1.5rem; color: #fff; font-weight:bold;">Plataformas E-Commerce</div>',
    '<h3 style="font-family: var(--font-heading); font-size: 1.5rem; margin-bottom: 1.5rem; color: #fff; font-weight:bold;">Diseño Gráfico para Tiendas Online en Barcelona</h3>'
);


// 3. Enrich H3s in the Timeline
html = html.replace(
    '<div style="font-family: var(--font-heading); font-size: 2rem; color: #fff; margin-bottom: 0.5rem; line-height: 1.1; text-transform: uppercase; font-weight:bold;">Lead Front-End & Automation Architect</div>',
    '<h3 style="font-family: var(--font-heading); font-size: 2rem; color: #fff; margin-bottom: 0.5rem; line-height: 1.1; text-transform: uppercase; font-weight:bold;">Diseñador Gráfico & Lead Front-End Architect</h3>'
);
html = html.replace(
    '<div style="font-family: var(--font-heading); font-size: 2rem; color: #fff; margin-bottom: 0.5rem; line-height: 1.1; text-transform: uppercase; font-weight:bold;">Multi-Tenant Email Processor</div>',
    '<h3 style="font-family: var(--font-heading); font-size: 2rem; color: #fff; margin-bottom: 0.5rem; line-height: 1.1; text-transform: uppercase; font-weight:bold;">UI Design para Sistema Multi-Tenant</h3>'
);
html = html.replace(
    '<div style="font-family: var(--font-heading); font-size: 2rem; color: #fff; margin-bottom: 0.5rem; line-height: 1.1; text-transform: uppercase; font-weight:bold;">Ingeniero UI/UX - Gelt Dashboard</div>',
    '<h3 style="font-family: var(--font-heading); font-size: 2rem; color: #fff; margin-bottom: 0.5rem; line-height: 1.1; text-transform: uppercase; font-weight:bold;">Diseñador Gráfico UI/UX - Gelt Dashboard</h3>'
);
html = html.replace(
    '<div style="font-family: var(--font-heading); font-size: 2rem; color: #fff; margin-bottom: 0.5rem; line-height: 1.1; text-transform: uppercase; font-weight:bold;">CRM & AI Autonomous Agent</div>',
    '<h3 style="font-family: var(--font-heading); font-size: 2rem; color: #fff; margin-bottom: 0.5rem; line-height: 1.1; text-transform: uppercase; font-weight:bold;">Diseño Gráfico de CRM con IA Autónoma</h3>'
);


// 4. Enrich H3s in the Portfolio
html = html.replace(
    '<div style="font-family: var(--font-heading); font-size: 1.5rem; color: #fff; font-weight:bold;">Mellows</div>',
    '<h3 style="font-family: var(--font-heading); font-size: 1.5rem; color: #fff; font-weight:bold;">Diseño E-commerce Mellows</h3>'
);
html = html.replace(
    '<div style="font-family: var(--font-heading); font-size: 1.5rem; color: #fff; font-weight:bold;">AU Arquitectos</div>',
    '<h3 style="font-family: var(--font-heading); font-size: 1.5rem; color: #fff; font-weight:bold;">Branding AU Arquitectos Barcelona</h3>'
);
html = html.replace(
    '<div style="font-family: var(--font-heading); font-size: 1.5rem; color: #fff; font-weight:bold;">Jordina Arnau</div>',
    '<h3 style="font-family: var(--font-heading); font-size: 1.5rem; color: #fff; font-weight:bold;">Diseño Web Personal Jordina Arnau</h3>'
);
html = html.replace(
    '<div style="font-family: var(--font-heading); font-size: 1.5rem; color: #fff; font-weight:bold;">Compassionate Christmas</div>',
    '<h3 style="font-family: var(--font-heading); font-size: 1.5rem; color: #fff; font-weight:bold;">UI/UX ONG Compassionate Christmas</h3>'
);
html = html.replace(
    '<div style="font-family: var(--font-heading); font-size: 1.5rem; color: #fff; font-weight:bold;">Selva de Sabores</div>',
    '<h3 style="font-family: var(--font-heading); font-size: 1.5rem; color: #fff; font-weight:bold;">Diseño Gráfico Web Selva de Sabores</h3>'
);
html = html.replace(
    '<div style="font-family: var(--font-heading); font-size: 1.5rem; color: #fff; font-weight:bold;">Ball de Lletres</div>',
    '<h3 style="font-family: var(--font-heading); font-size: 1.5rem; color: #fff; font-weight:bold;">Diseño Visual Ball de Lletres</h3>'
);

fs.writeFileSync('disenador-grafico-barcelona.html', html, 'utf8');
console.log('Headers Enriched with SEO Best Practices!');
