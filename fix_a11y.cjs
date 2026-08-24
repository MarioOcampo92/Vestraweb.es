const fs = require('fs');
let html = fs.readFileSync('disenador-grafico-barcelona.html', 'utf8');

// Fix paragraph color in CSS
html = html.replace('.t3d-glass-card p {\n            color: #888;', '.t3d-glass-card p {\n            color: #e2e8f0;');

// Fix inline styles for the company names (previously h4)
html = html.replaceAll('color: #a1a1aa;', 'color: #f8fafc;'); // make it almost white

fs.writeFileSync('disenador-grafico-barcelona.html', html, 'utf8');
console.log('Accessibility colors fixed!');
