const fs = require('fs');
let html = fs.readFileSync('disenador-grafico-barcelona.html', 'utf8');

// 1. Move webgl-container to the body (outside hero)
html = html.replace('<div id="webgl-container" style="position: absolute; top:0; left:0; width:100%; height:100%; z-index:0; pointer-events: none;"></div>\n        ', '');

const bodyTag = '<body>\n';
if (html.includes(bodyTag)) {
    html = html.replace(bodyTag, bodyTag + '    <div id="webgl-container" style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: -1; pointer-events: none;"></div>\n');
} else {
    // Fallback if body tag is different
    html = html.replace('<body>', '<body>\n    <div id="webgl-container" style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: -1; pointer-events: none;"></div>\n');
}

// 2. Make .hero transparent so the fixed background can be seen through it!
const heroFixCSS = `
        /* FIX BACKGROUND VISIBILITY */
        .hero {
            background: transparent !important;
        }
        #webgl-container {
            background: #050505;
        }
`;
html = html.replace('/* GLITCH HERO & TITLE FIX */', heroFixCSS + '        /* GLITCH HERO & TITLE FIX */');

fs.writeFileSync('disenador-grafico-barcelona.html', html, 'utf8');
console.log('Background visibility fixed!');
