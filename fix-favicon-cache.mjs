import fs from 'fs';

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
htmlFiles.forEach(file => {
  let c = fs.readFileSync(file, 'utf8');
  c = c.replace(/href="\/favicon\.png"/g, 'href="/favicon.png?v=5"');
  fs.writeFileSync(file, c, 'utf8');
});
console.log('Fixed favicon cache buster');
