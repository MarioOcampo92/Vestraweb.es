import fs from 'fs';
import path from 'path';

const renameMap = {
  // Mellows
  '2-4.jpg': 'diseno-web-tarragona-ecommerce-mellows-1.jpg',
  '6-1.jpg': 'diseno-web-tarragona-ecommerce-mellows-2.jpg',
  '4-4.jpg': 'diseno-web-tarragona-ecommerce-mellows-3.jpg',
  '5-3.jpg': 'diseno-web-tarragona-ecommerce-mellows-4.jpg',
  '3-4.jpg': 'diseno-web-tarragona-ecommerce-mellows-5.jpg',
  '1-4.jpg': 'diseno-web-tarragona-ecommerce-mellows-6.jpg',
  'mellows.gif': 'diseno-web-tarragona-ecommerce-mellows-animacion.gif',

  // AU Arquitectos
  '2-3.jpg': 'diseno-web-tarragona-estudio-arquitectura-au-1.jpg',
  '3-3.jpg': 'diseno-web-tarragona-estudio-arquitectura-au-2.jpg',
  '4-3.jpg': 'diseno-web-tarragona-estudio-arquitectura-au-3.jpg',
  '5-2.jpg': 'diseno-web-tarragona-estudio-arquitectura-au-4.jpg',
  '1-3.jpg': 'diseno-web-tarragona-estudio-arquitectura-au-5.jpg',
  'auarquitectos-home.gif': 'diseno-web-tarragona-estudio-arquitectura-animacion.gif',

  // Jordina Arnau
  '2-2.jpg': 'diseno-web-tarragona-marca-personal-jordina-1.jpg',
  'jordina-arnau-home.jpg': 'diseno-web-tarragona-marca-personal-jordina-2.jpg',
  '4-2.jpg': 'diseno-web-tarragona-marca-personal-jordina-3.jpg',
  '5-1.jpg': 'diseno-web-tarragona-marca-personal-jordina-4.jpg',
  'jordina-arnau-homepage.jpg': 'diseno-web-tarragona-marca-personal-jordina-5.jpg',
  'jordina-arnau-1.gif': 'diseno-web-tarragona-marca-personal-jordina-animacion.gif',

  // Selva de Sabores
  'featured-image.png': 'diseno-web-tarragona-restaurante-selva-1.png',
  '3-1.png': 'diseno-web-tarragona-restaurante-selva-2.png',
  '4-1.png': 'diseno-web-tarragona-restaurante-selva-3.png',
  '5-1.png': 'diseno-web-tarragona-restaurante-selva-4.png',
  '1-1.png': 'diseno-web-tarragona-restaurante-selva-5.png',
  '6.png': 'diseno-web-tarragona-restaurante-selva-6.png',
  'selva-de-sabores.gif': 'diseno-web-tarragona-restaurante-selva-animacion.gif',

  // Ball de Lletres
  '2-1.jpg': 'diseno-web-tarragona-asociacion-cultural-1.jpg',
  'ball-de-lletres-2.jpg': 'diseno-web-tarragona-asociacion-cultural-2.jpg',
  '4-1.jpg': 'diseno-web-tarragona-asociacion-cultural-3.jpg',
  'ball-de-.jpg': 'diseno-web-tarragona-asociacion-cultural-4.jpg',
  '1-1.jpg': 'diseno-web-tarragona-asociacion-cultural-5.jpg',
  '6.jpg': 'diseno-web-tarragona-asociacion-cultural-6.jpg',
  'ball-de-letres.gif': 'diseno-web-tarragona-asociacion-cultural-animacion.gif',

  // Compassionate Christmas
  'Copia-de-Boletarium.jpg': 'diseno-web-tarragona-ong-donaciones-1.jpg',
  '2.jpg': 'diseno-web-tarragona-ong-donaciones-2.jpg',
  '3.jpg': 'diseno-web-tarragona-ong-donaciones-3.jpg',
  '4.jpg': 'diseno-web-tarragona-ong-donaciones-4.jpg',
  'Copia-de-Boletarium-1-1.gif': 'diseno-web-tarragona-ong-donaciones-animacion.gif',
};

const altTagsMap = {
  'mellows': 'Diseño web a medida y ecommerce en Tarragona para marca de moda Mellows',
  'auarquitectos': 'Desarrollo web corporativo en Tarragona para el estudio de arquitectura AU Arquitectos',
  'jordina': 'Diseño de página web y marca personal en Tarragona para Jordina Arnau',
  'selva': 'Diseño web premium en Tarragona para restaurante y tienda de alimentación Selva de Sabores',
  'asociacion': 'Página web corporativa en Tarragona para la asociación cultural Ball de Lletres',
  'ong': 'Desarrollo web en Tarragona para donaciones y ONG Compassionate Christmas'
};

function getAltText(newFilename) {
  for (const [key, altText] of Object.entries(altTagsMap)) {
    if (newFilename.includes(key)) {
      return altText;
    }
  }
  return 'Diseño web y SEO en Tarragona por VestraWeb';
}

const assetsDir = path.join(process.cwd(), 'public', 'assets');
const htmlFiles = fs.readdirSync(process.cwd()).filter(f => f.endsWith('.html'));

// 1. Rename files
for (const [oldName, newName] of Object.entries(renameMap)) {
  const oldPath = path.join(assetsDir, oldName);
  const newPath = path.join(assetsDir, newName);
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(`Renamed: ${oldName} -> ${newName}`);
  }
}

// 2. Update HTML
for (const file of htmlFiles) {
  const filePath = path.join(process.cwd(), file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Replace src paths and alt attributes
  for (const [oldName, newName] of Object.entries(renameMap)) {
    // Escape string for regex if needed, though they are mostly safe
    const searchString = `src="/assets/${oldName}"`;
    const replaceString = `src="/assets/${newName}"`;
    
    // We want to replace the src and ALSO update the alt tag and add loading="lazy" if it's not a hero image.
    // Instead of complex regex, we can replace the filename first.
    content = content.split(searchString).join(replaceString);
  }

  // Now, update ALT tags for ANY img with "diseno-web-tarragona" in its src, and add loading="lazy" if missing.
  // We use regex to parse img tags
  const imgRegex = /<img([^>]+)>/gi;
  content = content.replace(imgRegex, (match, attrs) => {
    // Skip if it's the logo or hero elements
    if (attrs.includes('vestra-logo') || attrs.includes('hero') || attrs.includes('Header')) {
      return match; 
    }
    
    // Extract src to determine what alt text to use
    const srcMatch = attrs.match(/src="([^"]+)"/);
    if (srcMatch) {
      const src = srcMatch[1];
      if (src.includes('diseno-web-tarragona')) {
        const altText = getAltText(src);
        
        // Remove old alt attribute if exists
        attrs = attrs.replace(/\balt="[^"]*"/, '');
        // Add new alt attribute
        attrs += ` alt="${altText}"`;
      }
    }
    
    // Add loading="lazy" if not present
    if (!attrs.includes('loading="lazy"') && !attrs.includes('hero') && !attrs.includes('logo')) {
      attrs += ` loading="lazy"`;
    }

    return `<img${attrs}>`;
  });

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Updated HTML: ${file}`);
}

console.log('Image optimization complete!');
