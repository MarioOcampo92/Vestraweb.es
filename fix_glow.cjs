const fs = require('fs');
let html = fs.readFileSync('disenador-grafico-barcelona.html', 'utf8');

// FIX 1: Replace the hero h1 CSS to make it CYBERPUNK with glow
// The current CSS makes h1 transparent with thin stroke - WRONG
// We need: solid white text, massive glow, cyberpunk feel

const oldH1CSS = `.hero h1 {
            font-family: var(--font-heading);
            font-size: clamp(2.5rem, 5vw, 6rem);
            line-height: 1.1; text-transform: uppercase;
            font-weight: 700; color: transparent;
            -webkit-text-stroke: 1px rgba(255,255,255,0.5);
            margin-bottom: 1rem;
            position: relative;
        }`;

const newH1CSS = `.hero h1 {
            font-family: var(--font-heading);
            font-size: clamp(3rem, 7.5vw, 6rem);
            line-height: 0.95; text-transform: uppercase;
            font-weight: 900; color: #fff;
            -webkit-text-stroke: 0;
            text-shadow: 0 0 10px rgba(255,255,255,0.3), 0 0 40px rgba(247, 72, 75, 0.4), 0 0 80px rgba(247, 72, 75, 0.2);
            margin-bottom: 1rem;
            position: relative;
            letter-spacing: -2px;
        }`;

html = html.replace(oldH1CSS, newH1CSS);

// FIX 2: Fix the .filled span/h1 CSS - make it work for both span and h1
const oldFilledCSS = `.hero h1 span.filled {
            color: var(--color-primary);
            -webkit-text-stroke: 0;
            text-shadow: 0 0 20px rgba(247, 72, 75, 0.5);
        }`;

const newFilledCSS = `.hero h1.filled, .hero h1 span.filled {
            color: #fff !important;
            -webkit-text-stroke: 0;
            text-shadow: 0 0 10px rgba(255,255,255,0.3), 0 0 40px rgba(247, 72, 75, 0.5), 0 0 80px rgba(247, 72, 75, 0.3);
        }`;

html = html.replace(oldFilledCSS, newFilledCSS);

// FIX 3: Make glitch layers more visible - increase opacity and remove mix-blend-mode restriction
html = html.replace(
    'opacity: 0.8;\r\n            mix-blend-mode: screen;',
    'opacity: 0.9;'
);

// Verify changes
console.log('H1 CSS fixed:', html.includes('font-weight: 900; color: #fff;'));
console.log('Filled CSS fixed:', html.includes('.hero h1.filled'));
console.log('Glitch opacity fixed:', html.includes('opacity: 0.9;'));

fs.writeFileSync('disenador-grafico-barcelona.html', html, 'utf8');
console.log('Cyberpunk text effect restored!');
