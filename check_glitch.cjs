const fs = require('fs');
const html = fs.readFileSync('disenador-grafico-barcelona.html', 'utf8');

// Check hero HTML
const heroIdx = html.indexOf('class="hero"');
const heroEnd = html.indexOf('</header>', heroIdx);
console.log('=== HERO HTML ===');
console.log(html.substring(heroIdx - 10, heroEnd + 12));

console.log('\n=== GLITCH CSS ===');
const glitchIdx = html.indexOf('.glitch-wrapper');
const glitchEnd = html.indexOf('}', html.indexOf('glitch-anim-2', glitchIdx));
if (glitchIdx !== -1) {
    // Find the full glitch CSS block
    const blockEnd = html.indexOf('@keyframes glitch-anim-2');
    const blockEnd2 = html.indexOf('}', html.indexOf('}', blockEnd) + 1) + 1;
    console.log(html.substring(glitchIdx, blockEnd2));
}

// Check hero h1 styles
console.log('\n=== HERO H1 CSS ===');
const h1Idx = html.indexOf('.hero h1 {');
if (h1Idx !== -1) {
    const h1End = html.indexOf('}', h1Idx) + 1;
    console.log(html.substring(h1Idx, h1End));
}

const filledIdx = html.indexOf('.hero h1 span.filled');
if (filledIdx !== -1) {
    const filledEnd = html.indexOf('}', filledIdx) + 1;
    console.log(html.substring(filledIdx, filledEnd));
}
