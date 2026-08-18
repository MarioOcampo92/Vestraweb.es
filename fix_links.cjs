const fs = require('fs');
const path = require('path');

function replaceInFolder(folder) {
    const files = fs.readdirSync(folder);
    for (const file of files) {
        const fullPath = path.join(folder, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== 'dist') {
                replaceInFolder(fullPath);
            }
        } else if (file.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            if (content.includes('href="/proyectos"')) {
                content = content.replace(/href="\/proyectos"/g, 'href="/portafolio"');
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log('Fixed links in', fullPath);
            }
        }
    }
}

replaceInFolder(__dirname);
