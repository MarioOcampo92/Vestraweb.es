const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
for (const file of files) {
  let html = fs.readFileSync(file, 'utf8');
  // Remove dark mode button
  html = html.replace(/<button class="dark-mode-icon-btn"[\s\S]*?<\/button>/g, '');
  // Fix copyright
  html = html.replace(/2025 © Derechos reservados/g, '&copy; 2026 VestraWeb. Todos los derechos reservados.');
  html = html.replace(/2025.*Derechos reservados/g, '&copy; 2026 VestraWeb. Todos los derechos reservados.');
  fs.writeFileSync(file, html, 'utf8');
}

