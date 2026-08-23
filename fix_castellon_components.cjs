const fs = require('fs');
const path = require('path');

const componentsToClone = ['index-hero.html', 'index-portfolio.html', 'index-services.html'];

for (const comp of componentsToClone) {
    const srcPath = path.join('components', comp);
    const destPath = path.join('components', comp.replace('index-', 'castellon-'));
    
    let content = fs.readFileSync(srcPath, 'utf8');
    
    // Replace H1 in Hero
    content = content.replace(/Diseño Web en Tarragona/gi, 'Desarrollo Web en Castellón');
    
    // Replace general references
    content = content.replace(/Tarragona/g, 'Castellón');
    content = content.replace(/tarragona/g, 'castellon');
    
    // Semantic re-writes for Hero/Intro components if any
    content = content.replace(/Atrae más clientes y aumenta tus ventas con diseño web profesional y posicionamiento SEO en Castellón/g, 'Escala tu negocio y consigue más contactos gracias a un diseño web estratégico y SEO local en Castellón');
    
    // Specific re-writes for the hero text below the H1
    content = content.replace(/Diseño web en Castellón para que tu negocio hable por ti/gi, 'Desarrollo web en Castellón creado para que tu empresa destaque');

    fs.writeFileSync(destPath, content, 'utf8');
    console.log('Cloned and updated:', destPath);
}

// Now update desarrollo-web-castellon.html to point to these new components
let html = fs.readFileSync('desarrollo-web-castellon.html', 'utf8');
html = html.replace(/components\/index-hero\.html/g, 'components/castellon-hero.html');
html = html.replace(/components\/index-portfolio\.html/g, 'components/castellon-portfolio.html');
html = html.replace(/components\/index-services\.html/g, 'components/castellon-services.html');
fs.writeFileSync('desarrollo-web-castellon.html', html, 'utf8');
console.log('Updated includes in desarrollo-web-castellon.html');
