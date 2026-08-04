const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
for (const file of files) {
  let html = fs.readFileSync(file, 'utf8');
  html = html.replace(/<script defer src="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/gsap\//g, '<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/');
  html = html.replace(/<script defer src="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/three\.js\//g, '<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/');
  html = html.replace(/<script defer src="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/vanilla-tilt\//g, '<script src="https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/');
  fs.writeFileSync(file, html, 'utf8');
}

