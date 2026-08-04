import fs from 'fs';

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const replacements = [
  { from: /diseï¿½o/g, to: 'diseño' },
  { from: /rï¿½pidos/g, to: 'rápidos' },
  { from: /â€“/g, to: '–' },
  { from: /DESAFÁ OS/g, to: 'DESAFÍOS' },
  { from: /sltimas/g, to: 'Últimas' },
  { from: /Ášltimas/g, to: 'Últimas' },
  { from: /ï¿½/g, to: 'ñ' } // fallback for other ñ
];

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  
  replacements.forEach(r => {
    if (content.match(r.from)) {
      content = content.replace(r.from, r.to);
      changed = true;
    }
  });
  
  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed encoding in: ' + file);
  }
});
