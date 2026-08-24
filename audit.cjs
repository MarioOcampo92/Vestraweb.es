const fs = require('fs');
let html = fs.readFileSync('disenador-grafico-barcelona.html', 'utf8');

// === FULL AUDIT ===
// Count all section markers
const sections = [
    'class="header"',
    'class="hero"',
    'cv-nav',
    'IDENTIDAD VERIFICADA',
    'SIGNAL_LOST',
    'SYS.CONTACT',
    'VOLVER',
    'section-darker',
    'Manifiesto',
    'ARSENAL TÉCNICO',
    'Arsenal Técnico',
    'brutalist-arsenal',
    'El CAMINO',
    'El Camino',
    'swiper mySwiper',
    'Obras Maestras',
    'parallax-banner',
    'webgl-container',
    'three.min.js',
    'initThreeJS',
    'THREE.Scene',
    'ascii-noise',
];

sections.forEach(s => {
    const regex = new RegExp(s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    const matches = [...html.matchAll(regex)];
    console.log(`"${s}" => ${matches.length} occurrence(s)`);
});

// Find all <section and <header tags
const sectionTags = [...html.matchAll(/<section[^>]*>/gi)];
console.log('\n=== ALL <section> tags ===');
sectionTags.forEach((m, i) => {
    console.log(`  ${i+1}. Line ~${html.substring(0, m.index).split('\n').length}: ${m[0].substring(0, 80)}`);
});

const headerTags = [...html.matchAll(/<header[^>]*>/gi)];
console.log('\n=== ALL <header> tags ===');
headerTags.forEach((m, i) => {
    console.log(`  ${i+1}. Line ~${html.substring(0, m.index).split('\n').length}: ${m[0].substring(0, 80)}`);
});

// Check for ThreeJS script
const threeIdx = html.indexOf('three.min.js');
console.log('\n=== ThreeJS ===');
if (threeIdx !== -1) {
    console.log('Found three.min.js at index:', threeIdx);
    console.log('Context:', html.substring(threeIdx - 100, threeIdx + 100));
} else {
    console.log('three.min.js NOT FOUND in HTML!');
}

// Check for ThreeJS init code (the particle animation)
const sceneIdx = html.indexOf('THREE.Scene');
console.log('\nTHREE.Scene found at indices:', [...html.matchAll(/THREE\.Scene/g)].map(m => m.index));
