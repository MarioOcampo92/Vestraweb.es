const fs = require('fs');
const path = require('path');

function replaceEmailInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('info@vestraweb.es')) {
        content = content.replace(/info@vestraweb\.es/g, 'hello@vestraweb.es');
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Replaced in', filePath);
    }
}

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory() && file !== 'dist' && file !== 'node_modules' && file !== '.git') {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.html')) {
            replaceEmailInFile(fullPath);
        }
    }
}

processDirectory(__dirname);
