import fs from 'fs';

// Fix ALL html files: update nav links and favicon
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
  let c = fs.readFileSync(file, 'utf8');
  
  // Fix nav portafolio link - use .html extension (works 100% bypassing CDN cache)
  // The proyectos.html page will use JS to clean URL to /proyectos
  c = c.replace(/href="\/proyectos"/g, 'href="/proyectos.html"');
  
  // Fix favicon - remove ?v=2 query string that confuses some browsers, add shortcut icon
  c = c.replace(
    /<link rel="icon" href="\/favicon\.png[^"]*" type="image\/png">/g,
    '<link rel="icon" type="image/png" href="/favicon.png">\n    <link rel="shortcut icon" href="/favicon.png">'
  );
  
  fs.writeFileSync(file, c, 'utf8');
  console.log('Updated: ' + file);
});
