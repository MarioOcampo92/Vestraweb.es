const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(/Cont\uFFFDctanos/g, 'Contáctanos');
html = html.replace(/M\uFFFDs de 7 A\uFFFDos en la Industria/g, 'Más de 7 Años en la Industria');
html = html.replace(/\uFFFDTienes una idea\? \uFFFDConstruy\uFFFDmosla!/g, '¿Tienes una idea? ¡Construyámosla!');

fs.writeFileSync('index.html', html, 'utf8');

