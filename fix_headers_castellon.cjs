const fs = require('fs');
const glob = require('glob'); // Not available by default, let's use standard fs recursion

function updateHeaderNav(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('<nav class="nav-links">')) {
        // Only add it if it's not already there
        if (!content.includes('<a href="/desarrollo-web-castellon">Castellón</a>')) {
            content = content.replace(
                '<a href="/contactar">Contactar</a>', 
                '<a href="/contactar">Contactar</a>\n            <a href="/desarrollo-web-castellon">Castellón</a>'
            );
            fs.writeFileSync(filePath, content, 'utf8');
            console.log('Updated header in', filePath);
        }
    }
}

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = dir + '/' + file;
        if (fs.statSync(fullPath).isDirectory() && file !== 'dist' && file !== 'node_modules' && file !== '.git') {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.html')) {
            updateHeaderNav(fullPath);
        }
    }
}

// 1. First run the fix for castellon HTML
require('./fix_castellon.cjs');

// 2. Then update all headers
processDirectory(__dirname);
console.log("All headers updated.");
