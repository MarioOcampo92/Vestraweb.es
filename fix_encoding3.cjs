const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(/Cont\uFFFDctanos/g, 'Cont\u00E1ctanos');
html = html.replace(/M\uFFFDs de 7 A\uFFFDos en la Industria/g, 'M\u00E1s de 7 A\u00F1os en la Industria');
html = html.replace(/\uFFFDTienes una idea\? \uFFFDConstruy\uFFFDmosla!/g, '\u00BFTienes una idea? \u00A1Construy\u00E1mosla!');

fs.writeFileSync('index.html', html, 'utf8');

