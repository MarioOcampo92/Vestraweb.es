const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Title
html = html.replace('<title>Diseño web Tarragona | Webs rápidas y optimizadas para SEO | Vestraweb</title>', '<title>Diseño web Tarragona | Webs rápidas y optimizadas para SEO</title>');
html = html.replace('<title>Diseo web Tarragona | Webs ropidas y optimizadas para SEO | Vestraweb</title>', '<title>Diseño web Tarragona | Webs rápidas y optimizadas para SEO</title>');

// Dark mode toggle removal
html = html.replace(/<button class="dark-mode-icon-btn".*?<\/button>/g, '');

// Copyright
html = html.replace(/2025 Â© Derechos reservados/g, '&copy; 2026 VestraWeb. Todos los derechos reservados.');
html = html.replace(/2025.*Derechos reservados/g, '&copy; 2026 VestraWeb. Todos los derechos reservados.');

// Headings restructuring
// 1. H2 -> H3 for EMPRESAS QUE HAN TRABAJADO CON NOSOTROS
html = html.replace(/<h2>EMPRESAS QUE HAN TRABAJADO CON NOSOTROS<\/h2>/gi, '<h3>EMPRESAS QUE HAN TRABAJADO CON NOSOTROS</h3>');

// 2. Fundadores -> div
html = html.replace(/<h2[^>]*>Fundadores<\/h2>/gi, '<div class="h2">Fundadores</div>');
// Mario Ocampo, John Gonzalez -> H3
html = html.replace(/<h4[^>]*>Mario Ocampo<\/h4>/gi, '<h3>Mario Ocampo</h3>');
html = html.replace(/<h4[^>]*>John González<\/h4>/gi, '<h3>John González</h3>');
html = html.replace(/<h4[^>]*>John Gonzlez<\/h4>/gi, '<h3>John González</h3>');

// 3. Nuestro Proceso -> div, Concepto/Plantilla/Implementacion/Soporte -> div
html = html.replace(/<h2[^>]*>Nuestro Proceso<\/h2>/gi, '<div class="h2">Nuestro Proceso</div>');
html = html.replace(/<h3[^>]*>1\. Concepto<\/h3>/gi, '<div class="h3">1. Concepto</div>');
html = html.replace(/<h3[^>]*>2\. Plantilla o Diseño Personalizado<\/h3>/gi, '<div class="h3">2. Plantilla o Diseño Personalizado</div>');
html = html.replace(/<h3[^>]*>2\. Plantilla o Diseo Personalizado<\/h3>/gi, '<div class="h3">2. Plantilla o Diseño Personalizado</div>');
html = html.replace(/<h3[^>]*>3\. Implementación<\/h3>/gi, '<div class="h3">3. Implementación</div>');
html = html.replace(/<h3[^>]*>3\. Implementacin<\/h3>/gi, '<div class="h3">3. Implementación</div>');
html = html.replace(/<h3[^>]*>4\. Soporte<\/h3>/gi, '<div class="h3">4. Soporte</div>');

// 4. Nuestros Proyectos -> H3
html = html.replace(/<h2[^>]*>Nuestros Proyectos Web en Tarragona<\/h2>/gi, '<h3 class="h2">Nuestros Proyectos Web en Tarragona</h3>');
// And the projects to H4 (already H3 in code probably? Let's check what they are)
html = html.replace(/<h3[^>]*>Mellows<\/h3>/gi, '<h4>Mellows</h4>');
html = html.replace(/<h3[^>]*>Compassionate Christmas<\/h3>/gi, '<h4>Compassionate Christmas</h4>');
html = html.replace(/<h3[^>]*>Selva de Sabores<\/h3>/gi, '<h4>Selva de Sabores</h4>');
html = html.replace(/<h3[^>]*>AU Arquitectos<\/h3>/gi, '<h4>AU Arquitectos</h4>');
html = html.replace(/<h3[^>]*>Jordina Arnau<\/h3>/gi, '<h4>Jordina Arnau</h4>');
html = html.replace(/<h3[^>]*>Ball de Lletres<\/h3>/gi, '<h4>Ball de Lletres</h4>');

// 5. Contáctanos -> div
html = html.replace(/<h2[^>]*>Contáctanos<\/h2>/gi, '<div class="h2">Contáctanos</div>');
html = html.replace(/<h2[^>]*>Contctanos<\/h2>/gi, '<div class="h2">Contáctanos</div>');

// 6. Experto en diseño -> H2 (Already H2 probably? Let's assume it is)
// Velocidad, Sitios, SEO, Cumplimiento -> H3
html = html.replace(/<h4[^>]*>Velocidad de carga extrema<\/h4>/gi, '<h3>Velocidad de carga extrema</h3>');
html = html.replace(/<h4[^>]*>Sitios webs editables<\/h4>/gi, '<h3>Sitios webs editables</h3>');
html = html.replace(/<h4[^>]*>Todos mis sitios web incluyen SEO<\/h4>/gi, '<h3>Todos mis sitios web incluyen SEO</h3>');
html = html.replace(/<h4[^>]*>Cumplimiento RGPD y Normativas<\/h4>/gi, '<h3>Cumplimiento RGPD y Normativas</h3>');

// 7. Más de 7 Años -> div
html = html.replace(/<h2[^>]*>Más de 7 Años en la Industria<\/h2>/gi, '<div class="h2">Más de 7 Años en la Industria</div>');
html = html.replace(/<h2[^>]*>Ms de 7 Aos en la Industria<\/h2>/gi, '<div class="h2">Más de 7 Años en la Industria</div>');

// 8. Tienes una idea -> div
html = html.replace(/<h2[^>]*>¿Tienes una idea\? ¡Construyámosla!<\/h2>/gi, '<div class="h2">¿Tienes una idea? ¡Construyámosla!</div>');
html = html.replace(/<h2[^>]*>Tienes una idea\? Construymosla!<\/h2>/gi, '<div class="h2">¿Tienes una idea? ¡Construyámosla!</div>');

fs.writeFileSync('index.html', html, 'utf8');


