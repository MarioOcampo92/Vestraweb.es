const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Structural Fix
// The accordion was accidentally moved inside the contact section.
// It starts with <div class="accordion-body"> after the contact form ends.
// Let's extract it carefully.

const formEnd = html.indexOf('</form>');
const faqStart = html.indexOf('<section class="faq">');

if (formEnd !== -1 && faqStart !== -1) {
    const contactStartStr = '<section class="contact" id="contacto">';
    const contactStart = html.indexOf(contactStartStr);
    
    // Everything up to </form>
    let newHtml = html.substring(0, formEnd + 7);
    
    // Add the missing </section> for contact
    newHtml += '\n      </section>\n\n';
    
    // Then add the FAQ and everything after
    newHtml += '      ' + html.substring(faqStart);
    
    // Now extract the accordion block
    // The accordion block starts right after </form> and ends right before <section class="faq">
    let accordionBlock = html.substring(formEnd + 7, faqStart).trim();
    
    // Let's just reconstruct the whole services accordion cleanly so we don't rely on mangled HTML!
    const cleanAccordion = `
          <div class="services-accordion-section" style="margin-top: 4rem;">
              <div class="accordion">
                  <!-- Accordion Item 1 -->
                  <div class="accordion-item">
                      <div class="accordion-header">
                          <h3>Velocidad de carga extrema</h3>
                          <span class="accordion-icon">+</span>
                      </div>
                      <div class="accordion-body">
                          <p>Nuestras webs están desarrolladas con tecnologías modernas (Vite, JS Vainilla) prescindiendo de plantillas pesadas, logrando tiempos de carga inferiores a 1 segundo para el mejor SEO y UX.</p>
                      </div>
                  </div>
                  <!-- Accordion Item 2 -->
                  <div class="accordion-item">
                      <div class="accordion-header">
                          <h3>Sitios webs editables</h3>
                          <span class="accordion-icon">+</span>
                      </div>
                      <div class="accordion-body">
                          <p>Ofrecemos integraciones con gestores de contenido (CMS) intuitivos para que puedas modificar textos, imágenes y proyectos sin necesidad de saber código.</p>
                      </div>
                  </div>
                  <!-- Accordion Item 3 -->
                  <div class="accordion-item">
                      <div class="accordion-header">
                          <h3>Todos mis sitios web incluyen SEO</h3>
                          <span class="accordion-icon">+</span>
                      </div>
                      <div class="accordion-body">
                          <p>Desde la estructura semántica HTML5 hasta la optimización de meta-etiquetas y tiempos de respuesta, construimos bases perfectas para que Google posicione tu web rápidamente.</p>
                      </div>
                  </div>
                  <!-- Accordion Item 4 -->
                  <div class="accordion-item">
                      <div class="accordion-header">
                          <h3>Cumplimiento RGPD y Normativas</h3>
                          <span class="accordion-icon">+</span>
                      </div>
                      <div class="accordion-body">
                          <p>Nos aseguramos de que tu página web cumpla con todas las normativas europeas de protección de datos (RGPD), instalando avisos de cookies y políticas de privacidad correctamente.</p>
                      </div>
                  </div>
              </div>
          </div>`;
    
    // Insert cleanAccordion at the end of services section
    const servicesEndStr = '</div>\n    </section>';
    const servicesEnd = newHtml.indexOf(servicesEndStr, newHtml.indexOf('<section class="services">'));
    
    newHtml = newHtml.substring(0, servicesEnd) + cleanAccordion + '\n    ' + newHtml.substring(servicesEnd);
    
    html = newHtml;
}

// 2. Fix the replacement characters \uFFFD
const R = '\uFFFD';
const replacements = {
    ['Dise' + R + 'o']: 'Diseño',
    ['dise' + R + 'o']: 'diseño',
    ['p' + R + 'ginas']: 'páginas',
    ['r' + R + 'pidas']: 'rápidas',
    ['m' + R + 's']: 'más',
    ['Cu' + R + 'nto']: '¿Cuánto',
    ['C' + R + 'mo']: '¿Cómo',
    ['t' + R + 'cnicas']: 'técnicas',
    ['optimizaci' + R + 'n']: 'optimización',
    ['Puedo']: '¿Puedo',
    ['S' + R + ',']: 'Sí,',
    ['gesti' + R + 'n']: 'gestión',
    ['magn' + R + 'tico']: 'magnético',
    ['a' + R + 'os']: 'años',
    ['Gonz' + R + 'lez']: 'González',
    ['l' + R + 'deres']: 'líderes',
    ['Estrat' + R + 'gico']: 'Estratégico',
    ['nica']: 'única',
    ['nico']: 'único',
    ['est' + R + 'n']: 'están',
    ['tecnolog' + R + 'as']: 'tecnologías',
    ['im' + R + 'genes']: 'imágenes',
    ['c' + R + 'digo']: 'código',
    ['sem' + R + 'ntica']: 'semántica',
    ['pol' + R + 'ticas']: 'políticas',
    ['protecci' + R + 'n']: 'protección',
    ['Qu' + R + '']: '¿Qué',
    ['Tu']: '¿Tu',
    ['Tienes']: '¿Tienes',
    ['Construy' + R + 'mosla']: '¡Construyámosla',
    ['Cont' + R + 'ctanos']: 'Contáctanos',
    ['400' + R]: '400€',
    ['2500' + R]: '2500€',
    ['\u01FD']: 'á',
    ['\u01ED']: 'í',
    ['\u01F8']: 'é',
    ['\u01E7']: 'ú',
    ['\uFFFD']: '?' // Catch all other weird characters
};

for (const [bad, good] of Object.entries(replacements)) {
    html = html.split(bad).join(good);
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed index.html successfully!');
