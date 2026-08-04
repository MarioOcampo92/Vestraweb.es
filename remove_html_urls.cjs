const fs = require('fs');

function fixHtmlFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove .html from links
    content = content.replace(/href="\/blog\.html"/g, 'href="/blog"');
    content = content.replace(/href="\/contactar\.html"/g, 'href="/contactar"');
    content = content.replace(/href="\/proyectos\.html"/g, 'href="/proyectos"');
    
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
        content = content.replace(new RegExp(`href="/${proj}\\.html"`, 'g'), `href="/${proj}"`);
        content = content.replace(new RegExp(`href="/proyectos/${proj}\\.html"`, 'g'), `href="/${proj}"`);
    }

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
console.log('Removed .html from links in all HTML files!');
