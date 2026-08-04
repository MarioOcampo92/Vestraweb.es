const fs = require('fs');

if (!fs.existsSync('styles')) {
    fs.mkdirSync('styles');
}

let css = fs.readFileSync('style.css', 'utf8');

// Define sections to extract based on CSS comments
const sections = [
    { name: 'variables', searchStr: ':root {' },
    { name: 'base', searchStr: '*, *::before, *::after {' },
    { name: 'header', searchStr: '/* ====== HEADER ====== */' },
    { name: 'hero', searchStr: '/* ====== HERO ====== */' },
    { name: 'intro', searchStr: '/* ====== INTRO / SEO SECTION ====== */' },
    { name: 'empresas', searchStr: '/* ====== EMPRESAS ====== */' },
    { name: 'about', searchStr: '/* ====== ABOUT / SOBRE NOSOTROS ====== */' },
    { name: 'process', searchStr: '/* ====== PROCESS STEPS ====== */' },
    { name: 'services', searchStr: '/* ====== SERVICES / DESARROLLO WEB ====== */' },
    { name: 'portfolio', searchStr: '/* ====== UNIFIED PROJECTS CAROUSEL ====== */' },
    { name: 'faq', searchStr: '/* ====== FAQ & ACCORDION ====== */' },
    { name: 'ticker', searchStr: '/* ====== TICKER / MARQUEE ====== */' },
    { name: 'contact', searchStr: '/* ====== CONTACT FORM ====== */' },
    { name: 'footer', searchStr: '/* ====== FOOTER ====== */' },
    { name: 'portfolio_page', searchStr: '/* ====== PORTFOLIO PAGE ====== */' },
    { name: 'case_study', searchStr: '/* ====== CASE STUDY / PROJECT PAGE ====== */' },
    { name: 'blog', searchStr: '/* ====== BLOG PAGE ====== */' },
    { name: 'whatsapp', searchStr: '/* ====== WHATSAPP FLOAT ====== */' },
    { name: 'responsive', searchStr: '/* ====== RESPONSIVE ====== */' }
];

let imports = '';

for (let i = 0; i < sections.length; i++) {
    const current = sections[i];
    const next = sections[i + 1];
    
    const startIdx = css.indexOf(current.searchStr);
    if (startIdx === -1) continue;
    
    let endIdx = css.length;
    if (next) {
        const nextIdx = css.indexOf(next.searchStr);
        if (nextIdx !== -1) {
            endIdx = nextIdx;
        }
    }
    
    const block = css.substring(startIdx, endIdx);
    fs.writeFileSync(`styles/${current.name}.css`, block.trim() + '\\n', 'utf8');
    imports += `@import './styles/${current.name}.css';\\n`;
}

// Rewrite style.css
fs.writeFileSync('style.css', imports, 'utf8');
console.log('CSS modularization complete!');
