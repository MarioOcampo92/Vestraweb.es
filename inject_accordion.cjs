const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// 1. Remove inline padding
content = content.replace(/<section class="intro-section"[^>]*>/, '<section class="intro-section">');

// 2. Inject Accordion properly
const accordionHTML = `
        <div class="services-accordion-section" style="margin-top: 4rem;">
            <div class="container">
              <div class="accordion">
                  <!-- Accordion Item 1 -->
                  <div class="accordion-item">
                      <div class="accordion-header">
                          <span class="accordion-title">Velocidad de carga extrema</span>
                          <span class="accordion-icon">+</span>
                      </div>
                      <div class="accordion-body">
                          <p>Nuestras webs están desarrolladas con tecnologías modernas (Vite, JS Vainilla) prescindiendo de plantillas pesadas, logrando tiempos de carga inferiores a 1 segundo para el mejor SEO y UX.</p>
                      </div>
                  </div>
                  <!-- Accordion Item 2 -->
                  <div class="accordion-item">
                      <div class="accordion-header">
                          <span class="accordion-title">Sitios webs editables</span>
                          <span class="accordion-icon">+</span>
                      </div>
                      <div class="accordion-body">
                          <p>Ofrecemos integraciones con gestores de contenido (CMS) intuitivos para que puedas modificar textos, imágenes y proyectos sin necesidad de saber código.</p>
                      </div>
                  </div>
                  <!-- Accordion Item 3 -->
                  <div class="accordion-item">
                      <div class="accordion-header">
                          <span class="accordion-title">Todos mis sitios web incluyen SEO</span>
                          <span class="accordion-icon">+</span>
                      </div>
                      <div class="accordion-body">
                          <p>Desde la estructura semántica HTML5 hasta la optimización de meta-etiquetas y tiempos de respuesta, construimos bases perfectas para que Google posicione tu web rápidamente.</p>
                      </div>
                  </div>
                  <!-- Accordion Item 4 -->
                  <div class="accordion-item">
                      <div class="accordion-header">
                          <span class="accordion-title">Cumplimiento RGPD y Normativas</span>
                          <span class="accordion-icon">+</span>
                      </div>
                      <div class="accordion-body">
                          <p>Nos aseguramos de que tu página web cumpla con todas las normativas europeas de protección de datos (RGPD), instalando avisos de cookies y políticas de privacidad correctamente.</p>
                      </div>
                  </div>
              </div>
            </div>
          </div>
`;

// Find where services ends
const targetSearch = `                        <h4>SEO y Posicionamiento</h4>
                        <p>Auditoría SEO, optimización on-page y estrategias para dominar Google a nivel local.</p>
                        <a href="#contacto" class="service-link">Saber más &rarr;</a>
                    </div>
                </div>
            </div>
        </div>
    </section>`;

if (content.includes(targetSearch) && !content.includes('class="services-accordion-section"')) {
    const splitContent = content.split(targetSearch);
    if (splitContent.length === 2) {
        content = splitContent[0] + targetSearch.replace('</section>', accordionHTML + '</section>') + splitContent[1];
    }
}

fs.writeFileSync('index.html', content, 'utf8');
console.log('Fixed index.html padding and injected accordion!');
