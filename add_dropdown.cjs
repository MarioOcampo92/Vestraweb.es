const fs = require('fs');
const path = require('path');

// 1. Append CSS
const cssPath = 'styles/header.css';
let css = fs.readFileSync(cssPath, 'utf8');
if (!css.includes('.nav-dropdown')) {
    css += `

/* Dropdown Navigation */
.nav-dropdown {
  position: relative;
  display: inline-block;
}
.nav-dropdown-content {
  display: none;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-header-bg);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  min-width: 160px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  border: 1px solid var(--color-header-border);
  border-radius: 12px;
  z-index: 1001;
  padding: 0.5rem 0;
  margin-top: 1rem;
}
.nav-dropdown-content a {
  display: block;
  padding: 0.75rem 1.5rem;
  color: var(--color-text);
  font-weight: 500;
  transition: background 0.2s, color 0.2s;
  text-decoration: none;
}
.nav-dropdown-content a:hover {
  background: rgba(128, 128, 128, 0.1);
  color: var(--color-primary);
}
.nav-dropdown:hover .nav-dropdown-content {
  display: block;
}
/* Invisible bridge */
.nav-dropdown::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: 1rem;
}
`;
    fs.writeFileSync(cssPath, css, 'utf8');
}

// 2. Replace HTML across all files
const oldNav = `<nav class="nav-links">
            <a href="/">Inicio</a>
            <a href="/portafolio">Portafolio</a>
            <a href="/contactar">Contactar</a>
            <a href="/diseno-web-castellon">Castellón</a>
        </nav>`;

const newNav = `<nav class="nav-links">
            <a href="/">Inicio</a>
            <a href="/portafolio">Portafolio</a>
            <div class="nav-dropdown">
                <a href="#" style="display:flex; align-items:center; gap: 4px; cursor: pointer; text-decoration: none;">Ubicaciones <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></a>
                <div class="nav-dropdown-content">
                    <a href="/">Tarragona</a>
                    <a href="/diseno-web-castellon">Castellón</a>
                </div>
            </div>
            <a href="/contactar">Contactar</a>
        </nav>`;

function processHtmlFiles(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory() && !['dist', 'node_modules', '.git'].includes(file)) {
            processHtmlFiles(fullPath);
        } else if (fullPath.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            // Try matching with regex to ignore whitespace variations
            const navRegex = /<nav class="nav-links">[\s\S]*?<a href="\/">Inicio<\/a>[\s\S]*?<a href="\/portafolio">Portafolio<\/a>[\s\S]*?<a href="\/contactar">Contactar<\/a>[\s\S]*?<a href="\/diseno-web-castellon">Castellón<\/a>[\s\S]*?<\/nav>/;
            
            if (navRegex.test(content)) {
                content = content.replace(navRegex, newNav);
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log('Updated nav in', fullPath);
            } else {
                // Check if it has the older format without Castellón
                const oldNavRegex = /<nav class="nav-links">[\s\S]*?<a href="\/">Inicio<\/a>[\s\S]*?<a href="\/portafolio">Portafolio<\/a>[\s\S]*?<a href="\/contactar">Contactar<\/a>[\s\S]*?<\/nav>/;
                if (!content.includes('Ubicaciones') && oldNavRegex.test(content)) {
                     content = content.replace(oldNavRegex, newNav);
                     fs.writeFileSync(fullPath, content, 'utf8');
                     console.log('Updated nav in', fullPath);
                }
            }
        }
    }
}

processHtmlFiles(__dirname);
