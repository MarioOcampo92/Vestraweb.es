import fs from 'fs';

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
  let c = fs.readFileSync(file, 'utf8');
  
  // Fix double characters or bad encodings
  c = c.replace(/ÚÚltimas/g, 'Últimas');
  c = c.replace(/diseñoño/g, 'diseño');
  c = c.replace(/diseñoñ/g, 'diseño');
  c = c.replace(/diseñoo/g, 'diseño');
  c = c.replace(/â€“/g, '–');
  
  fs.writeFileSync(file, c, 'utf8');
});

console.log('Cleaned up text');
