const fs = require('fs');

// 1. Read the global header from index.html
const indexHtml = fs.readFileSync('index.html', 'utf8');
const headerStart = indexHtml.indexOf('<header class="header">');
const headerEnd = indexHtml.indexOf('</header>') + 9;
const globalHeader = indexHtml.substring(headerStart, headerEnd);

// 2. Read the global footer from components/footer.html
let globalFooter = '';
if (fs.existsSync('components/footer.html')) {
    globalFooter = fs.readFileSync('components/footer.html', 'utf8');
} else {
    // fallback if it's inline in index.html
    const footerStart = indexHtml.indexOf('<footer class="footer">');
    if(footerStart !== -1) {
        const footerEnd = indexHtml.indexOf('</footer>', footerStart) + 9;
        globalFooter = indexHtml.substring(footerStart, footerEnd);
    } else {
        // Just use the include tag which works with Vite
        globalFooter = '<include src="components/footer.html"></include>';
    }
}

// 3. Inject into disenador-grafico-barcelona.html
let cvPath = 'disenador-grafico-barcelona.html';
let cvHtml = fs.readFileSync(cvPath, 'utf8');

// Inject Header right after <div id="webgl-container"></div>
if (!cvHtml.includes('<header class="header">')) {
    cvHtml = cvHtml.replace('<div id="webgl-container"></div>', '<div id="webgl-container"></div>\n\n    ' + globalHeader);
}

// Inject Footer right before <!-- Scripts at the end
if (!cvHtml.includes('<footer class="footer">') && !cvHtml.includes('components/footer.html')) {
    cvHtml = cvHtml.replace('<!-- Scripts at the end', globalFooter + '\n\n    <!-- Scripts at the end');
}

fs.writeFileSync(cvPath, cvHtml, 'utf8');
console.log("Global header and footer successfully injected into CV page.");
