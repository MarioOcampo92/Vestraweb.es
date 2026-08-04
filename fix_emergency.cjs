const fs = require('fs');

// 1. Fix style.css fonts
let css = fs.readFileSync('style.css', 'utf8');
css = css.replace(/\.h2,\s*\.h3,\s*\.h4\s*\{\s*font-family:\s*'Playfair Display',\s*serif;\s*font-weight:\s*600;\s*line-height:\s*1\.2;\s*margin-bottom:\s*1rem;\s*color:\s*var\(--text-color\);\s*\}\s*/g, '');
fs.writeFileSync('style.css', css, 'utf8');

// 2. Fix main.js GSAP animations
let js = fs.readFileSync('main.js', 'utf8');
// If I commented it out with a large comment, let's just restore it by fetching the original from somewhere?
// Wait, I replaced it using: js = js.replace(/\/\/ ===== DARK MODE LOGIC =====[\s\S]*?\/\/ ===== GSAP ANIMATIONS =====/, '// ===== GSAP ANIMATIONS =====');
// This actually removed dark mode, but didn't remove GSAP!
// Wait, then why are GSAP animations not running? Let's check main.js for gsap.

