const fs = require('fs');

const currentHtml = fs.readFileSync('disenador-grafico-barcelona.html', 'utf8');
const oldHtml = fs.readFileSync('old_cv_utf8.html', 'utf8');

// 1. Extract the old hero
const oldHeroStart = oldHtml.indexOf('<header class="hero"');
const oldHeroEnd = oldHtml.indexOf('</header>', oldHeroStart) + '</header>'.length;
let restoredHero = oldHtml.substring(oldHeroStart, oldHeroEnd);

// 2. Remove the parts the user explicitly hated from the restored hero
restoredHero = restoredHero.replace('<div class="hero-top-data">>> SIGNAL_LOST · SYS-04 · 14:32:08</div>', '');
restoredHero = restoredHero.replace('[ ▤ IDENTIDAD VERIFICADA ]<br>', '');

// 3. Fix the SEO of the restored hero title (Make it an H1, but keep the exact CSS structure so it looks identical to Screenshot 4)
// Wait! If I just use the old hero, it's an H1 with 3 spans. The SEO issue was that the text was duplicated in the glitch layers.
// I will wrap the glitch layers in aria-hidden="true" (which they already were? No, in old HTML they weren't).
restoredHero = restoredHero.replace('<div class="glitch-layer glitch-cyan">', '<div class="glitch-layer glitch-cyan" aria-hidden="true">');
restoredHero = restoredHero.replace('<div class="glitch-layer glitch-magenta">', '<div class="glitch-layer glitch-magenta" aria-hidden="true">');
// And make sure the H1 contains the correct keyword: "DISEÑADOR GRÁFICO EN BARCELONA" instead of "DISEÑO WEB WORDPRESS BARCELONA"
restoredHero = restoredHero.replace(/DISEÑO WEB<br>WORDPRESS<br>BARCELONA/g, 'DISEÑADOR<br>GRÁFICO EN<br>BARCELONA');

// 4. In the CURRENT html, find the current hero and replace it with restoredHero
const currentHeroStart = currentHtml.indexOf('<header class="hero"');
const currentHeroEnd = currentHtml.indexOf('</header>', currentHeroStart) + '</header>'.length;

let newHtml = currentHtml.substring(0, currentHeroStart) + restoredHero + currentHtml.substring(currentHeroEnd);

// 5. Ensure webgl-container is correctly placed directly after <body>
// First, remove any existing webgl-container
newHtml = newHtml.replace(/<div id="webgl-container"[^>]*><\/div>/g, '');
// Then inject it right after body
const webglDiv = '\n    <div id="webgl-container" style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: -1; pointer-events: none;"></div>\n';
newHtml = newHtml.replace('<body>', '<body>' + webglDiv);

// 6. Ensure .hero has background: transparent !important so the fixed webgl container is visible!
// Also ensure the old glitch CSS is present.
const glitchCssStart = oldHtml.indexOf('/* GLITCH HERO */');
const glitchCssEnd = oldHtml.indexOf('</style>', glitchCssStart);
const glitchCss = oldHtml.substring(glitchCssStart, glitchCssEnd);

// If newHtml already has '/* GLITCH HERO */', replace it. Otherwise inject it before </style>
if (newHtml.includes('/* GLITCH HERO & TITLE FIX */')) {
    const start = newHtml.indexOf('/* GLITCH HERO & TITLE FIX */');
    const end = newHtml.indexOf('</style>', start);
    newHtml = newHtml.substring(0, start) + glitchCss + '\n        .hero { background: transparent !important; }\n    ' + newHtml.substring(end);
} else if (newHtml.includes('/* GLITCH HERO */')) {
    const start = newHtml.indexOf('/* GLITCH HERO */');
    const end = newHtml.indexOf('</style>', start);
    newHtml = newHtml.substring(0, start) + glitchCss + '\n        .hero { background: transparent !important; }\n    ' + newHtml.substring(end);
} else {
    newHtml = newHtml.replace('</style>', glitchCss + '\n        .hero { background: transparent !important; }\n    </style>');
}

fs.writeFileSync('disenador-grafico-barcelona.html', newHtml, 'utf8');
console.log('Hero Restored Perfectly!');
