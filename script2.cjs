const fs = require('fs');
const files = ['index.html', 'proyectos.html', 'contactar.html', 'blog.html', 'auarquitectos.html', 'ball-de-lletres.html', 'compassionate-christmas.html', 'jordina-arnau.html', 'mellows.html', 'selva-de-sabores.html'];
for (let file of files) {
  let p = file;
  if (!fs.existsSync(p)) continue;
  let c = fs.readFileSync(p, 'utf8');
  c = c.replace(/<link rel="icon" type="image\/png" href="\/favicon\.png[^>]*>/g, '<link rel="icon" type="image/svg+xml" href="/favicon.svg">');
  c = c.replace(/<link rel="shortcut icon" href="\/favicon\.png[^>]*>/g, '<link rel="shortcut icon" href="/favicon.svg">');
  fs.writeFileSync(p, c, 'utf8');
}
console.log('done');
