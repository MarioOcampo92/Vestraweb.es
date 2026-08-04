const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(/<div class="h2">Fundadores<\/div>/g, '<h2>Fundadores</h2>');
html = html.replace(/<div class="h2">Nuestro Proceso<\/div>/g, '<h2>Nuestro Proceso</h2>');
html = html.replace(/<h3 class="h2">Nuestros Proyectos Web en Tarragona<\/h3>/g, '<h2>Nuestros Proyectos Web en Tarragona</h2>');
html = html.replace(/<div class="h2">Cont\u00E1ctanos<\/div>/g, '<h2>Cont\u00E1ctanos</h2>');
html = html.replace(/<div class="h2">M\u00E1s de 7 A\u00F1os en la Industria<\/div>/g, '<h2>M\u00E1s de 7 A\u00F1os en la Industria</h2>');
html = html.replace(/<div class="h2">\u00BFTienes una idea\? \u00A1Construy\u00E1mosla!<\/div>/g, '<h2>\u00BFTienes una idea? \u00A1Construy\u00E1mosla!</h2>');

fs.writeFileSync('index.html', html, 'utf8');

