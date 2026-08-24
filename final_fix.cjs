const fs = require('fs');
let lines = fs.readFileSync('disenador-grafico-barcelona.html', 'utf8').split(/\r?\n/);
console.log('Original lines:', lines.length);

// STEP 1: Remove the entire duplicate HTML block (lines 849-1585, 0-indexed: 848-1584)
lines.splice(848, 1584 - 848 + 1);
console.log('After removing duplicate HTML block:', lines.length);

// Rejoin
let html = lines.join('\n');

// STEP 2: Fix the hero h1 CSS - replace transparent/stroke with solid white + glow
html = html.replace(
    `font-weight: 700; color: transparent;
            -webkit-text-stroke: 1px rgba(255,255,255,0.5);`,
    `font-weight: 900; color: #fff;
            text-shadow: 0 0 10px rgba(255,255,255,0.3), 0 0 40px rgba(247, 72, 75, 0.4), 0 0 80px rgba(247, 72, 75, 0.2);`
);

// STEP 3: Fix .hero h1 span.filled to also target h1.filled
html = html.replace(
    `.hero h1 span.filled {
            color: var(--color-primary);
            -webkit-text-stroke: 0;
            text-shadow: 0 0 20px rgba(247, 72, 75, 0.5);
        }`,
    `.hero h1.filled, .hero h1 span.filled {
            color: #fff !important;
            -webkit-text-stroke: 0;
            text-shadow: 0 0 10px rgba(255,255,255,0.4), 0 0 40px rgba(247, 72, 75, 0.5), 0 0 80px rgba(247, 72, 75, 0.3);
        }`
);

// STEP 4: Add VestraWeb header back (after <body> and webgl-container, before cv-nav)
const vestraHeader = `
    <header class="header">
        <div class="logo">
            <a href="/" style="display: flex; align-items: center; text-decoration: none;">
                <img src="/assets/vestra-logo-gradient.svg" alt="VestraWeb - Agencia de Diseño Web y SEO en Tarragona" style="height: 32px;" fetchpriority="high">
            </a>
        </div>
        <nav class="nav-links">
            <a href="/">Inicio</a>
            <a href="/portafolio">Portafolio</a>
            <div class="nav-dropdown">
                <a href="#" style="display:flex; align-items:center; gap: 4px; cursor: pointer; text-decoration: none;">Ubicaciones <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></a>
                <div class="nav-dropdown-content">
                    <a href="/">Tarragona</a>
                    <a href="/diseno-web-castellon">Castellón</a>
                    <a href="/diseno-web-wordpress-barcelona">Barcelona</a>
                    <a href="/disenador-grafico-barcelona" title="Bio Diseñador Gráfico en Barcelona">Bio: Diseñador Gráfico Barcelona</a>
                </div>
            </div>
            <a href="/contactar">Contactar</a>
        </nav>
        <div class="header-actions">
            <button class="hamburger-icon-btn" aria-label="Menu" style="display: none; background: none; border: none; color: inherit; cursor: pointer;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="burger-icon"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
        </div>
    </header>`;

html = html.replace(
    '    <!-- BRUTALIST CV-NAV -->',
    vestraHeader + '\n\n    <!-- BRUTALIST CV-NAV -->'
);

// STEP 5: Fix Arsenal grid - ensure min width is smaller to prevent overflow
html = html.replace(
    'grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));',
    'grid-template-columns: repeat(2, 1fr);'
);

// Also add responsive media query for Arsenal
html = html.replace(
    '.b-cross.br { bottom: -1px; right: -1px; transform: rotate(180deg); }',
    `.b-cross.br { bottom: -1px; right: -1px; transform: rotate(180deg); }
        @media (max-width: 768px) { .brutalist-arsenal { grid-template-columns: 1fr; } }`
);

// Verify
console.log('H1 glow fix applied:', html.includes('font-weight: 900; color: #fff;'));
console.log('Filled fix applied:', html.includes('.hero h1.filled'));
console.log('Header added:', html.includes('class="header"'));
console.log('Grid fix applied:', html.includes('repeat(2, 1fr)'));

// Check structure
const htmlTags = (html.match(/<html/g) || []).length;
const bodyTags = (html.match(/<body/g) || []).length;
const heroTags = (html.match(/class="hero"/g) || []).length;
console.log('\nStructure: html tags:', htmlTags, 'body tags:', bodyTags, 'heroes:', heroTags);

fs.writeFileSync('disenador-grafico-barcelona.html', html, 'utf8');
console.log('\nAll fixes applied successfully!');
