const fs = require('fs');
let html = fs.readFileSync('disenador-grafico-barcelona.html', 'utf8');

// 1. Fix H1 Glitch SEO Issue
const h1Search = `<h1 class="hero-title glitch-wrapper">
            <span class="filled" style="color: #fff;">DISEÑADOR</span><br>
            <span class="filled" style="color: #fff;">GRÁFICO EN</span><br>
            <span class="filled" style="color: #fff;">BARCELONA</span>
            <div class="glitch-layer glitch-cyan" aria-hidden="true">DISEÑADOR<br>GRÁFICO EN<br>BARCELONA</div>
            <div class="glitch-layer glitch-magenta" aria-hidden="true">DISEÑADOR<br>GRÁFICO EN<br>BARCELONA</div>
        </h1>`;
const h1Replace = `<div class="hero-title glitch-wrapper">
            <h1 class="filled" style="color: #fff; margin:0; padding:0; font-size: inherit; font-weight: inherit; line-height: inherit;">DISEÑADOR<br>GRÁFICO EN<br>BARCELONA</h1>
            <div class="glitch-layer glitch-cyan" aria-hidden="true">DISEÑADOR<br>GRÁFICO EN<br>BARCELONA</div>
            <div class="glitch-layer glitch-magenta" aria-hidden="true">DISEÑADOR<br>GRÁFICO EN<br>BARCELONA</div>
        </div>`;
html = html.replace(h1Search, h1Replace);

// 2. Fix all H3/H4 tags to divs
html = html.replaceAll('<h3>Formación Tecnológica</h3>', '<div style="font-family: var(--font-heading); font-size: 1.5rem; margin-bottom: 1.5rem; color: #fff; font-weight:bold;">Formación Tecnológica</div>');
html = html.replaceAll('<h3>Idiomas & Comunicación</h3>', '<div style="font-family: var(--font-heading); font-size: 1.5rem; margin-bottom: 1.5rem; color: #fff; font-weight:bold;">Idiomas & Comunicación</div>');
html = html.replaceAll('<h3>Frontend & UI/UX Design</h3>', '<div style="color: #fff; font-size: 1.5rem; margin-bottom: 1rem; font-family: var(--font-heading); text-transform: uppercase; font-weight:bold;">Frontend & UI/UX Design</div>');
html = html.replaceAll('<h3>Backend & Arquitectura</h3>', '<div style="color: #fff; font-size: 1.5rem; margin-bottom: 1rem; font-family: var(--font-heading); text-transform: uppercase; font-weight:bold;">Backend & Arquitectura</div>');
html = html.replaceAll('<h3>Inteligencia Artificial</h3>', '<div style="color: #fff; font-size: 1.5rem; margin-bottom: 1rem; font-family: var(--font-heading); text-transform: uppercase; font-weight:bold;">Inteligencia Artificial</div>');
html = html.replaceAll('<h3>Plataformas E-Commerce</h3>', '<div style="color: #fff; font-size: 1.5rem; margin-bottom: 1rem; font-family: var(--font-heading); text-transform: uppercase; font-weight:bold;">Plataformas E-Commerce</div>');

html = html.replace('<h2 class="section-title">El Camino (Experiencia Operativa)</h2>', ''); // Just the first one which is static

html = html.replaceAll('<h3>Lead Front-End & Automation Architect</h3>', '<div style="font-family: var(--font-heading); font-size: 2rem; color: #fff; margin-bottom: 0.5rem; line-height: 1.1; text-transform: uppercase; font-weight:bold;">Lead Front-End & Automation Architect</div>');
html = html.replaceAll('<h4>Vestra Solutions / VestraWeb</h4>', '<div style="font-family: var(--font-body); color: #a1a1aa; font-weight: 500; font-size: 1.1rem; margin-bottom: 1.5rem;">Vestra Solutions / VestraWeb</div>');

html = html.replaceAll('<h3>Multi-Tenant Email Processor</h3>', '<div style="font-family: var(--font-heading); font-size: 2rem; color: #fff; margin-bottom: 0.5rem; line-height: 1.1; text-transform: uppercase; font-weight:bold;">Multi-Tenant Email Processor</div>');
html = html.replaceAll('<h4>Desarrollo Interno Corporativo</h4>', '<div style="font-family: var(--font-body); color: #a1a1aa; font-weight: 500; font-size: 1.1rem; margin-bottom: 1.5rem;">Desarrollo Interno Corporativo</div>');

html = html.replaceAll('<h3>Ingeniero UI/UX - Gelt Dashboard</h3>', '<div style="font-family: var(--font-heading); font-size: 2rem; color: #fff; margin-bottom: 0.5rem; line-height: 1.1; text-transform: uppercase; font-weight:bold;">Ingeniero UI/UX - Gelt Dashboard</div>');
html = html.replaceAll('<h4>Dashboard de Conciliación Financiera</h4>', '<div style="font-family: var(--font-body); color: #a1a1aa; font-weight: 500; font-size: 1.1rem; margin-bottom: 1.5rem;">Dashboard de Conciliación Financiera</div>');

html = html.replaceAll('<h3>CRM & AI Autonomous Agent</h3>', '<div style="font-family: var(--font-heading); font-size: 2rem; color: #fff; margin-bottom: 0.5rem; line-height: 1.1; text-transform: uppercase; font-weight:bold;">CRM & AI Autonomous Agent</div>');
html = html.replaceAll('<h4>Camacho Phones Corp</h4>', '<div style="font-family: var(--font-body); color: #a1a1aa; font-weight: 500; font-size: 1.1rem; margin-bottom: 1.5rem;">Camacho Phones Corp</div>');

html = html.replaceAll('<h3>Arquitectura Front-End E-commerce</h3>', '<div style="font-family: var(--font-heading); font-size: 2rem; color: #fff; margin-bottom: 0.5rem; line-height: 1.1; text-transform: uppercase; font-weight:bold;">Arquitectura Front-End E-commerce</div>');
html = html.replaceAll('<h4>Nonesuch Precision (Website de Armas)</h4>', '<div style="font-family: var(--font-body); color: #a1a1aa; font-weight: 500; font-size: 1.1rem; margin-bottom: 1.5rem;">Nonesuch Precision (Website de Armas)</div>');

html = html.replaceAll('<h3>Front-End Developer & UI Engineer</h3>', '<div style="font-family: var(--font-heading); font-size: 2rem; color: #fff; margin-bottom: 0.5rem; line-height: 1.1; text-transform: uppercase; font-weight:bold;">Front-End Developer & UI Engineer</div>');
html = html.replaceAll('<h4>Raccoon Technologies / Deuslink</h4>', '<div style="font-family: var(--font-body); color: #a1a1aa; font-weight: 500; font-size: 1.1rem; margin-bottom: 1.5rem;">Raccoon Technologies / Deuslink</div>');

html = html.replaceAll('<h3>Mellows</h3>', '<div style="font-family: var(--font-heading); font-size: 1.5rem; color: #fff; font-weight:bold;">Mellows</div>');
html = html.replaceAll('<h3>AU Arquitectos</h3>', '<div style="font-family: var(--font-heading); font-size: 1.5rem; color: #fff; font-weight:bold;">AU Arquitectos</div>');
html = html.replaceAll('<h3>Jordina Arnau</h3>', '<div style="font-family: var(--font-heading); font-size: 1.5rem; color: #fff; font-weight:bold;">Jordina Arnau</div>');
html = html.replaceAll('<h3>Compassionate Christmas</h3>', '<div style="font-family: var(--font-heading); font-size: 1.5rem; color: #fff; font-weight:bold;">Compassionate Christmas</div>');
html = html.replaceAll('<h3>Selva de Sabores</h3>', '<div style="font-family: var(--font-heading); font-size: 1.5rem; color: #fff; font-weight:bold;">Selva de Sabores</div>');
html = html.replaceAll('<h3>Ball de Lletres</h3>', '<div style="font-family: var(--font-heading); font-size: 1.5rem; color: #fff; font-weight:bold;">Ball de Lletres</div>');

html = html.replaceAll('<h4 style="color: #fff; margin-bottom: 0.5rem; font-size: 1.1rem;">Zonas de Servicio</h4>', '<div style="color: #fff; margin-bottom: 0.5rem; font-size: 1.1rem; font-weight:bold;">Zonas de Servicio</div>');
html = html.replaceAll('<h4 style="color: #fff; margin-bottom: 0.5rem; font-size: 1rem;">Zonas de Servicio</h4>', '<div style="color: #fff; margin-bottom: 0.5rem; font-size: 1rem; font-weight:bold;">Zonas de Servicio</div>');

// Remove the old leftover timeline!
const tlStart = html.indexOf('<div class="cyber-timeline">');
if (tlStart > -1) {
    const sectionStart = html.lastIndexOf('<section', tlStart);
    const sectionEnd = html.indexOf('</section>', tlStart) + 10;
    if (sectionStart > -1 && sectionEnd > -1) {
        html = html.substring(0, sectionStart) + html.substring(sectionEnd);
    }
}

// Remove the old leftover duplicate portfolio!
const ctaMarker = '<!-- CTA FINAL -->';
const ctaIndex = html.indexOf(ctaMarker);
if(ctaIndex > -1) {
    const dupStart = html.indexOf('<section class="section section-darker">', ctaIndex);
    const parallaxStart = html.indexOf('<!-- NEW PREMIUM COMPONENT: PARALLAX BANNER -->');
    if(dupStart > -1 && parallaxStart > -1 && dupStart < parallaxStart) {
        html = html.substring(0, dupStart) + '\n\n' + html.substring(parallaxStart);
    }
}


fs.writeFileSync('disenador-grafico-barcelona.html', html, 'utf8');
console.log('Done!');
