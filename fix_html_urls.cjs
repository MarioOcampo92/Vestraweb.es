const fs = require('fs');

function fixHtmlFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Fix extensionless URLs
    content = content.replace(/href="\/blog"/g, 'href="/blog.html"');
    content = content.replace(/href="\/contactar"/g, 'href="/contactar.html"');
    
    // Project URLs
    const projects = [
        'mellows', 
        'compassionate-christmas', 
        'selva-de-sabores', 
        'auarquitectos', 
        'jordina-arnau', 
        'ball-de-lletres'
    ];
    for (const proj of projects) {
        content = content.replace(new RegExp(`href="/${proj}"`, 'g'), `href="/proyectos/${proj}.html"`);
    }

    // 2. Fix Accordion Typography
    // Change back <h3> to raw text or <h4> if needed, but actually the simplest is just <div> to inherit font-size.
    // Wait, the accordion CSS uses `.accordion-header h3` now, but it's causing issues.
    // Let's replace `<h3>` with `<span class="accordion-title">` inside accordion headers!
    content = content.replace(/<div class="accordion-header">\s*<h3>(.*?)<\/h3>/g, '<div class="accordion-header">\n                          <span class="accordion-title">$1</span>');

    // 3. Fix the remaining ǭ encoding artifacts
    content = content.replace(/ǭ/g, 'á');
    content = content.replace(/Ǹ/g, 'é');
    content = content.replace(/ǧ/g, 'ú');
    
    fs.writeFileSync(filePath, content, 'utf8');
}

// Fix all HTML files in root
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
for (const file of files) {
    fixHtmlFile(file);
}

// Fix all HTML files in /proyectos/
if (fs.existsSync('proyectos')) {
    const projFiles = fs.readdirSync('proyectos').filter(f => f.endsWith('.html'));
    for (const file of projFiles) {
        fixHtmlFile('proyectos/' + file);
    }
}
console.log('All HTML files fixed!');
