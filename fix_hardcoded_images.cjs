const fs = require('fs');
const path = require('path');

const imageMap = {
    'boletarium_logo.svg': 'boletarium.svg',
    'd3a0a3a1-3c73-41ab-83e0-9a60fd4460cc.png': 'selva-de-sabores.png',
    'LOGO-JORDINA-ARNAU_HORITZONTAL_72x.webp': 'jordina-arnau.webp',
    'image.svg': 'cri.svg',
    '40b696d0-fa25-44f0-a040-d770ecc4f803.png': 'jmj.png',
    'JO-BRAND-logo-100x60-1.png': 'jo-brand.png',
    'Logo1.png': 'siete-mandarinas.png',
    'logos-web-rita-01-400x120-1.png': 'la-rita.png',
    'Group-7.svg': 'equipo.svg'
};

const cities = [
    { file: 'index.html', keyword: 'tarragona', prefix: 'diseno-web-tarragona' },
    { file: 'diseno-web-castellon.html', keyword: 'castellon', prefix: 'diseno-web-castellon' },
    { file: 'diseno-web-wordpress-barcelona.html', keyword: 'barcelona', prefix: 'diseno-web-wordpress-barcelona' }
];

const assetsDir = path.join(__dirname, 'public', 'assets');

for (const city of cities) {
    let htmlPath = path.join(__dirname, city.file);
    if (!fs.existsSync(htmlPath)) continue;
    
    let html = fs.readFileSync(htmlPath, 'utf8');
    
    for (const [oldName, cleanName] of Object.entries(imageMap)) {
        // Create new filename for this city
        let newName = '';
        if (oldName === 'Group-7.svg') {
            newName = `agencia-${city.prefix}-${cleanName}`;
        } else {
            newName = `cliente-${city.prefix}-${cleanName}`;
        }
        
        // Copy physical file
        const oldPath = path.join(assetsDir, oldName);
        const newPath = path.join(assetsDir, newName);
        if (fs.existsSync(oldPath) && !fs.existsSync(newPath)) {
            fs.copyFileSync(oldPath, newPath);
        }
        
        // Replace in HTML
        const regex = new RegExp(`/assets/${oldName.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}`, 'g');
        html = html.replace(regex, `/assets/${newName}`);
    }
    
    // Update ALTs dynamically in the file if they are generic
    html = html.replace(/alt="Boletarium"/g, `alt="Cliente de ${city.prefix.replace(/-/g, ' ')}: Boletarium"`);
    html = html.replace(/alt="Selva de Sabores"/g, `alt="Proyecto de ${city.prefix.replace(/-/g, ' ')} para Selva de Sabores"`);
    html = html.replace(/alt="Jordina Arnau"/g, `alt="Cliente de ${city.prefix.replace(/-/g, ' ')}: Jordina Arnau"`);
    html = html.replace(/alt="CRI"/g, `alt="Desarrollo web en ${city.keyword} para CRI"`);
    html = html.replace(/alt="JMJ"/g, `alt="Diseño de página web en ${city.keyword} para JMJ"`);
    html = html.replace(/alt="JO BRAND"/g, `alt="Cliente de ${city.prefix.replace(/-/g, ' ')}: JO BRAND"`);
    html = html.replace(/alt="Siete Mandarinas"/g, `alt="Proyecto web en ${city.keyword} para Siete Mandarinas"`);
    html = html.replace(/alt="La Rita"/g, `alt="Cliente de ${city.prefix.replace(/-/g, ' ')}: La Rita"`);
    html = html.replace(/alt="Sobre Nosotros"/g, `alt="Equipo de VestraWeb trabajando en ${city.prefix.replace(/-/g, ' ')}"`);
    
    fs.writeFileSync(htmlPath, html, 'utf8');
    console.log(`Updated images and ALTs for ${city.keyword}`);
}
