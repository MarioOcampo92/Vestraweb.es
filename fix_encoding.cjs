const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The replacement characters (U+FFFD) are present.
// We can just match the surrounding text and replace.
html = html.replace(/<div class="h2">Cont\uFFFDctanos<\/div>/g, '<div class="h2">Contáctanos</div>');
html = html.replace(/<div class="h2">M\uFFFDs de 7 A\uFFFDos en la Industria<\/div>/g, '<div class="h2">Más de 7 Años en la Industria</div>');
html = html.replace(/<div class="h2">\uFFFDTienes una idea\? \uFFFDConstruy\uFFFDmosla!<\/div>/g, '<div class="h2">¿Tienes una idea? ¡Construyámosla!</div>');

fs.writeFileSync('index.html', html, 'utf8');

