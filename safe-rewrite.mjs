import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove background-attachment fixed
html = html.replace(/background-attachment:\s*fixed;?\s*/g, '');

// 2. Preload
if (!html.includes('rel="preload" as="image" href="/assets/vestra-logo-gradient.svg"')) {
    html = html.replace(/<head>/i, '<head>\n    <link rel="preload" as="image" href="/assets/vestra-logo-gradient.svg" type="image/svg+xml">');
}

// 3. Fix process steps markup specifically
html = html.replace(/<div class="h2">Nuestro Proceso<\/div>/, '<h2>Diseño web sostenible</h2>\n            <h3 class="h2" style="font-size:1.5rem; color:var(--color-primary);">¿Como es el proceso de creación web?</h3>');
html = html.replace(/<h3>Consultoría y Estrategia<\/h3>/, '<h4 style="font-size: 1.2rem;">¡Hora de diseñar! ¡Vamos a poner en marcha la maquina creativa!</h4>');
html = html.replace(/<h3>Wireframing y UX\/UI<\/h3>/, '<h3 style="font-size: 1.2rem; font-weight: 800;">¿Qué necesito para crear tu página web?</h3>');
html = html.replace(/<h3>Desarrollo y Lanzamiento<\/h3>/, '<h3 style="font-size: 1.2rem; font-weight: 800;">¿Que necesito para crear una tienda online?</h3>\n                </div>\n                <div class="process-step">\n                    <span>04</span>\n                    <h3 style="font-size: 1.2rem; font-weight: 800;">¿Que necesito para crear tu marca?</h3>');

// 4. Update FAQ/Pricing section
html = html.replace(/<h2>Diseño web con tarifas a medida en Tarragona<\/h2>\s*<p style="text-align: center; margin-bottom: 2rem; color: var\(--color-text-light\);">Tarifas adaptadas a cualquier proyecto<\/p>/, 
`<h2>Diseño web con tarifas a medida en Tarragona</h2>
            <h2 style="text-align: center; margin-bottom: 2rem; color: var(--color-text-light); font-size: 1.2rem; font-weight: 400;">Tarifas adaptadas a cualquier proyecto</h2>`);

const addFaqH2 = `            </div>
            
            <h2 style="text-align: center; margin-top: 3rem; font-size: 1.5rem;">Diseño web en Tarragona desarrollo de webs a tu medida</h2>
            <h2 style="text-align: center; margin-top: 1rem; color: var(--color-primary); font-size: 1.2rem; margin-bottom: 2rem;">¿Todavía no sabes que plan te conviene?</h2>
            <div style="text-align: center;">
                <a href="#contacto" class="btn-primary" style="display: inline-block;">Contactar con un experto</a>
            </div>
        </div>
    </section>`;
html = html.replace(/\s*<\/div>\s*<\/div>\s*<\/section>\s*<!-- 14\. Parallax Banner -->/, addFaqH2 + '\n\n    <!-- 14. Parallax Banner -->');


// 5. Orb section CTA
html = html.replace(/<h2 class="orb-title[^>]*>Experiencias Digitales<\/h2>/, '<h2 class="orb-title gs-reveal" style="font-size: 3rem; margin-bottom: 1rem;">tu agencia de marketing en tarragona</h2>\n<h3 class="orb-subtitle gs-reveal" style="font-size: 1.5rem;">¿Te resulta familiar?</h3>');

// 6. Contact section
html = html.replace(/<div class="h2">Contáctanos<\/div>/, '<h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 0.5rem;">Contacta con nuestra agencia de diseño web</h2>\n        <h3 class="h2" style="font-size:1.5rem; color:var(--color-primary);">contacto</h3>');


// 7. Middle CTA & Testimonials & Expert Section injections
// We will insert these precisely before specific sections.
const expertHtml = `
    <!-- Expert Section -->
    <section class="expert-section" style="padding: 4rem 0; background-color: var(--color-bg-alt);">
        <div class="container">
            <h2 style="text-align: center; margin-bottom: 3rem; text-transform: uppercase;">Experto en Diseño de Páginas Web</h2>
            <div class="accordion">
                <div class="accordion-item"><div class="accordion-header"><h3 style="text-transform: none; font-size: 1.1rem;">Sitios webs editables</h3></div><div class="accordion-body"><p>Ofrecemos integraciones con gestores de contenido (CMS) intuitivos para que puedas modificar textos, imágenes y proyectos sin necesidad de saber código.</p></div></div>
                <div class="accordion-item"><div class="accordion-header"><h3 style="text-transform: none; font-size: 1.1rem;">Velocidad de carga</h3></div><div class="accordion-body"><p>Nuestras webs están desarrolladas con tecnologías modernas, logrando tiempos de carga inferiores a 1 segundo para el mejor SEO y UX.</p></div></div>
                <div class="accordion-item"><div class="accordion-header"><h3 style="text-transform: none; font-size: 1.1rem;">Compromiso contigo</h3></div><div class="accordion-body"><p>Trabajamos mano a mano en cada fase del proyecto para asegurar resultados excepcionales.</p></div></div>
                <div class="accordion-item"><div class="accordion-header"><h3 style="text-transform: none; font-size: 1.1rem;">Todos mis sitios web incluyen SEO</h3></div><div class="accordion-body"><p>Desde la estructura semántica HTML5 hasta la optimización de meta-etiquetas y tiempos de respuesta.</p></div></div>
                <div class="accordion-item"><div class="accordion-header"><h3 style="text-transform: none; font-size: 1.1rem;">¿Cómo trabajo el UX en los proyectos web?</h3></div><div class="accordion-body"><p>Realizamos estudios de usabilidad y tests A/B para garantizar la máxima conversión.</p></div></div>
                <div class="accordion-item"><div class="accordion-header"><h3 style="text-transform: none; font-size: 1.1rem;">Ofrecemos la gama de opciones que necesitas</h3></div><div class="accordion-body"><p>Desde landing pages hasta complejos e-commerce, nos adaptamos a ti.</p></div></div>
                <div class="accordion-item"><div class="accordion-header"><h3 style="text-transform: none; font-size: 1.1rem;">RGPD</h3></div><div class="accordion-body"><p>Nos aseguramos de que tu página web cumpla con todas las normativas europeas de protección de datos.</p></div></div>
                <div class="accordion-item"><div class="accordion-header"><h3 style="text-transform: none; font-size: 1.1rem;">Facturación</h3></div><div class="accordion-body"><p>Transparencia total y facilidades de pago en todas las etapas del proyecto.</p></div></div>
            </div>
        </div>
    </section>
`;

const testimonialHtml = `
    <!-- Testimonials -->
    <section class="testimonials" style="padding: 4rem 0; text-align: center;">
        <div class="container">
            <h2 style="font-size: 2.5rem; margin-bottom: 2rem;">La opinión de nuestros clientes</h2>
            <div style="max-width: 800px; margin: 0 auto; padding: 2rem; border-left: 4px solid var(--color-primary); background: var(--color-bg-alt);">
                <p style="font-style: italic; font-size: 1.2rem; color: var(--color-text-light);">"El mejor servicio de diseño web con el que hemos trabajado. Profesionales, rápidos y con un sentido del diseño increíble."</p>
                <p style="margin-top: 1rem; font-weight: bold;">- Cliente VestraWeb</p>
            </div>
        </div>
    </section>
`;

const ctaHtml = `
    <!-- Mid CTA -->
    <section class="cta-mid" style="padding: 5rem 0; text-align: center; background-color: var(--color-primary); color: white;">
        <div class="container">
            <h2 style="color: white; font-size: 2.5rem; margin-bottom: 1rem;">Pide tu nueva página web a medida</h2>
            <h3 style="color: rgba(255,255,255,0.9); margin-bottom: 2rem; font-size: 1.5rem;">¡Ya es hora de un cambio!</h3>
            <a href="#contacto" class="btn-primary" style="background-color: white; color: black; font-weight: bold;">Empezar ahora</a>
        </div>
    </section>
`;

html = html.replace('<!-- 9. Portfolio Carousel -->', ctaHtml + '\n    <!-- 9. Portfolio Carousel -->');
html = html.replace('<!-- 10. Contact Form (Home) -->', testimonialHtml + '\n    <!-- 10. Contact Form (Home) -->');
html = html.replace('<!-- 13. FAQ Section -->', expertHtml + '\n    <!-- 13. FAQ Section -->');

// 8. Parallax Banner Fix
const oldParallax = `<div class="h2">Más de 7 Años en la Industria</div>`;
const newParallax = `<h2 style="text-transform: uppercase; font-size: 2.5rem; margin-bottom: 1rem; color: white; text-align: center;">Herramientas premium que utilizo</h2>
        <h3 style="font-size: 1.2rem; margin-top: 0.5rem; text-align: center; display: block; color: rgba(255,255,255,0.8); margin-bottom: 2rem;">Tecnologías de vanguardia para un rendimiento óptimo</h3>
        <h4 style="font-size: 1.1rem; color: white; display: flex; flex-wrap: wrap; justify-content: center; gap: 1.5rem; font-weight: 500;">
            <span>React & Vite</span>
            <span>•</span>
            <span>WordPress Pro</span>
            <span>•</span>
            <span>GSAP Animations</span>
            <span>•</span>
            <span>Node.js</span>
            <span>•</span>
            <span>Three.js</span>
        </h4>`;
html = html.replace(oldParallax, newParallax);

fs.writeFileSync('index.html', html);
