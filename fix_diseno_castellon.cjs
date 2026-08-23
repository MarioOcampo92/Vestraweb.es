const fs = require('fs');
const path = require('path');

// 1. Rename the main file
if (fs.existsSync('desarrollo-web-castellon.html')) {
    fs.renameSync('desarrollo-web-castellon.html', 'diseno-web-castellon.html');
}

// 2. Replace text in the main file
let mainHtml = fs.readFileSync('diseno-web-castellon.html', 'utf8');
mainHtml = mainHtml.replace(/Desarrollo Web en Castellón/gi, 'Diseño Web en Castellón');
mainHtml = mainHtml.replace(/desarrollo web castellon/gi, 'diseño web castellon');
mainHtml = mainHtml.replace(/desarrollo web a medida/gi, 'diseño web a medida');
mainHtml = mainHtml.replace(/Desarrollo web en Castellón/gi, 'Diseño web en Castellón');
fs.writeFileSync('diseno-web-castellon.html', mainHtml, 'utf8');

// 3. Replace in components
const components = ['castellon-hero.html', 'castellon-portfolio.html', 'castellon-services.html'];
for (const comp of components) {
    const compPath = path.join('components', comp);
    if (fs.existsSync(compPath)) {
        let content = fs.readFileSync(compPath, 'utf8');
        content = content.replace(/Desarrollo Web en Castellón/gi, 'Diseño Web en Castellón');
        content = content.replace(/Desarrollo web en Castellón/gi, 'Diseño web en Castellón');
        content = content.replace(/Desarrollo web/gi, 'Diseño web');
        content = content.replace(/Desarrollo y diseño web/gi, 'Diseño web profesional');
        fs.writeFileSync(compPath, content, 'utf8');
    }
}

// 4. Update Header Links (across all HTML files)
function updateLinks(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory() && file !== 'dist' && file !== 'node_modules' && file !== '.git') {
            updateLinks(fullPath);
        } else if (fullPath.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let changed = false;
            
            // Fix header/footer links
            if (content.includes('desarrollo-web-castellon')) {
                content = content.replace(/desarrollo-web-castellon/g, 'diseno-web-castellon');
                changed = true;
            }
            if (content.includes('>Desarrollo web Castellón<')) {
                content = content.replace(/>Desarrollo web Castellón</g, '>Diseño web Castellón<');
                changed = true;
            }

            if (changed) {
                fs.writeFileSync(fullPath, content, 'utf8');
            }
        }
    }
}
updateLinks(__dirname);

// 5. Update vite.config.js
let viteConfig = fs.readFileSync('vite.config.js', 'utf8');
viteConfig = viteConfig.replace(/desarrollo-web-castellon/g, 'diseno-web-castellon');
viteConfig = viteConfig.replace(/desarrolloWebCastellon:/g, 'disenoWebCastellon:');
fs.writeFileSync('vite.config.js', viteConfig, 'utf8');

// 6. Update sitemap.xml
let sitemap = fs.readFileSync('public/sitemap.xml', 'utf8');
sitemap = sitemap.replace(/desarrollo-web-castellon/g, 'diseno-web-castellon');
fs.writeFileSync('public/sitemap.xml', sitemap, 'utf8');

console.log("Renamed development to design globally.");
