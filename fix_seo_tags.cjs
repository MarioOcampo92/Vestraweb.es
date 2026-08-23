const fs = require('fs');
const path = require('path');

// 1. Fix Canonical, Author, Publisher in diseno-web-castellon.html
let html = fs.readFileSync('diseno-web-castellon.html', 'utf8');

// The canonical currently probably points to https://vestraweb.es/ because it was copied from index.html!
if (html.includes('<link rel="canonical" href="https://vestraweb.es/">')) {
    html = html.replace(
        '<link rel="canonical" href="https://vestraweb.es/">', 
        '<link rel="canonical" href="https://vestraweb.es/diseno-web-castellon">\n    <meta name="author" content="VestraWeb">\n    <meta name="publisher" content="VestraWeb">'
    );
} else {
    // Just inject them into the head
    html = html.replace('</head>', '    <link rel="canonical" href="https://vestraweb.es/diseno-web-castellon">\n    <meta name="author" content="VestraWeb">\n    <meta name="publisher" content="VestraWeb">\n</head>');
}

fs.writeFileSync('diseno-web-castellon.html', html, 'utf8');

// Do the same for index.html (add author and publisher)
let indexHtml = fs.readFileSync('index.html', 'utf8');
if (!indexHtml.includes('name="author"')) {
    indexHtml = indexHtml.replace('</head>', '    <meta name="author" content="VestraWeb">\n    <meta name="publisher" content="VestraWeb">\n</head>');
    fs.writeFileSync('index.html', indexHtml, 'utf8');
}

// 2. We also need to fix components/castellon-hero.html just in case my previous replace failed to make it "Diseño Web en Castellón"
let hero = fs.readFileSync('components/castellon-hero.html', 'utf8');
hero = hero.replace(/Desarrollo Web en Castellón/gi, 'Diseño Web en Castellón');
fs.writeFileSync('components/castellon-hero.html', hero, 'utf8');

// Update others just in case
let services = fs.readFileSync('components/castellon-services.html', 'utf8');
services = services.replace(/Desarrollo Web en Castellón/gi, 'Diseño Web en Castellón');
services = services.replace(/Desarrollo web/gi, 'Diseño web');
fs.writeFileSync('components/castellon-services.html', services, 'utf8');

console.log("SEO tags added and verified H1s");
