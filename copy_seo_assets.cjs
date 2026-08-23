const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'public', 'assets');
const files = fs.readdirSync(assetsDir);

let count = 0;
for (const file of files) {
    if (file.includes('tarragona')) {
        const destFile = file.replace(/tarragona/g, 'castellon');
        const destPath = path.join(assetsDir, destFile);
        
        if (!fs.existsSync(destPath)) {
            fs.copyFileSync(path.join(assetsDir, file), destPath);
            count++;
        }
    }
}
console.log(`Copied ${count} local SEO assets for Castellón`);
