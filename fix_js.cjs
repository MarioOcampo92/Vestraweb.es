const fs = require('fs');
let js = fs.readFileSync('main.js', 'utf8');

// Remove dark mode
js = js.replace(/\/\/ ===== DARK MODE LOGIC =====[\s\S]*?\/\/ ===== GSAP ANIMATIONS =====/, '// ===== GSAP ANIMATIONS =====');

fs.writeFileSync('main.js', js, 'utf8');

