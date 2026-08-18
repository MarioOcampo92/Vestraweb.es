const fs = require('fs');
const path = require('path');

const desiredHeaders = [
    "Diseño Web en Tarragona",
    "Diseño web en Tarragona para que tu negocio hable por ti",
    "Desarrollo y diseño web a tu medida en Tarragona",
    "Diseño web Tarragona",
    "Consultoría y Estrategia",
    "Wireframing y UX/UI",
    "Desarrollo y Lanzamiento",
    "Desarrollo web profesional, prestamos servicio a tu medida",
    "Diseño de marca / Premium",
    "SEO y Posicionamiento",
    "Nuestros Proyectos Web en Tarragona",
    "Diseño web con tarifas a medida en Tarragona"
];

function normalize(text) {
    return text.replace(/<[^>]*>?/gm, '').trim().toLowerCase();
}
const desiredNormalized = desiredHeaders.map(normalize);

function fixHeadersInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // First, upgrade the two specific headers from h4 to h3 as requested
    content = content.replace(/<h4([^>]*)>(\s*Diseño de marca \/ Premium\s*)<\/h4>/ig, '<h3$1>$2</h3>');
    content = content.replace(/<h4([^>]*)>(\s*SEO y Posicionamiento\s*)<\/h4>/ig, '<h3$1>$2</h3>');
    
    // Regex to match any h2, h3, h4, h5, h6 tag
    // <h2 class="foo">Text</h2> -> tag="h2", attrs=" class=\"foo\"", text="Text"
    const regex = /<(h[2-6])([^>]*)>([\s\S]*?)<\/\1>/ig;
    
    content = content.replace(regex, (match, tag, attrs, innerText) => {
        const textNorm = normalize(innerText);
        
        if (desiredNormalized.includes(textNorm)) {
            // Keep it as a header
            return match;
        } else {
            // Convert to div
            let newAttrs = attrs;
            if (!newAttrs.includes('class=')) {
                newAttrs += ` class="${tag.toLowerCase()}"`;
            } else {
                newAttrs = newAttrs.replace(/class="([^"]*)"/i, `class="$1 ${tag.toLowerCase()}"`);
            }
            return `<div${newAttrs}>${innerText}</div>`;
        }
    });

    fs.writeFileSync(filePath, content, 'utf8');
}

function processFolder(folder) {
    const files = fs.readdirSync(folder);
    for (const file of files) {
        const fullPath = path.join(folder, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== 'dist') {
                processFolder(fullPath);
            }
        } else if (file.endsWith('.html')) {
            fixHeadersInFile(fullPath);
            console.log('Processed', fullPath);
        }
    }
}

processFolder(__dirname);
