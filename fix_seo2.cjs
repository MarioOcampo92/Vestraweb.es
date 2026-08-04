const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(/<h2[^>]*>Experto en diseño de páginas web<\/h2>/gi, '<h2>Experto en diseño de páginas web</h2>');
html = html.replace(/<h2[^>]*>Experto en dise.* de p.*ginas web<\/h2>/gi, '<h2>Experto en diseño de páginas web</h2>');

html = html.replace(/<h2[^>]*>Diseño web con tarifas a medida en Tarragona<\/h2>/gi, '<h2>Diseño web con tarifas a medida en Tarragona</h2>');
html = html.replace(/<h2[^>]*>Dise.* web con tarifas a medida en Tarragona<\/h2>/gi, '<h2>Diseño web con tarifas a medida en Tarragona</h2>');

html = html.replace(/<h2[^>]*>¿Tienes una idea\? ¡Construyámosla!<\/h2>/gi, '<div class="h2">¿Tienes una idea? ¡Construyámosla!</div>');
html = html.replace(/<h2[^>]*>.*Tienes una idea.*Construy.*mosla.*<\/h2>/gi, '<div class="h2">¿Tienes una idea? ¡Construyámosla!</div>');

html = html.replace(/<h2[^>]*>Contáctanos<\/h2>/gi, '<div class="h2">Contáctanos</div>');
html = html.replace(/<h2[^>]*>Cont.ctanos<\/h2>/gi, '<div class="h2">Contáctanos</div>');

html = html.replace(/<h2[^>]*>Más de 7 Años en la Industria<\/h2>/gi, '<div class="h2">Más de 7 Años en la Industria</div>');
html = html.replace(/<h2[^>]*>M.s de 7 A.os en la Industria<\/h2>/gi, '<div class="h2">Más de 7 Años en la Industria</div>');

fs.writeFileSync('index.html', html, 'utf8');

