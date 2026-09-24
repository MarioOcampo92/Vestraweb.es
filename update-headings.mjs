import fs from 'fs';

// 1. Update index-portfolio.html
let portfolio = fs.readFileSync('components/index-portfolio.html', 'utf8');
portfolio = portfolio.replace(/<div class="h2">Portafolio<\/div>/, '<h2>ejemplos diseño web wordpress en Tarragona</h2>\n<h3 class="h2" style="font-size:1.5rem; color:var(--color-primary);">Portafolio</h3>\n<h4 style="text-align:center; color:var(--color-text-light);">Profesionales en diseño web</h4>');
fs.writeFileSync('components/index-portfolio.html', portfolio);

// 2. Update index.html process & sections
let indexHtml = fs.readFileSync('index.html', 'utf8');

// Process section
indexHtml = indexHtml.replace(/<div class="h2">Nuestro Proceso<\/div>/, '<h2>Diseño web sostenible</h2>\n<h3 class="h2" style="font-size:1.5rem; color:var(--color-primary);">¿Como es el proceso de creación web?</h3>');
indexHtml = indexHtml.replace(/<h3>Consultoría y Estrategia<\/h3>/, '<h4>¡Hora de diseñar! ¡Vamos a poner en marcha la maquina creativa!</h4>');
indexHtml = indexHtml.replace(/<h3>Wireframing y UX\/UI<\/h3>/, '<h3>¿Qué necesito para crear tu página web?</h3>');
indexHtml = indexHtml.replace(/<h3>Desarrollo y Lanzamiento<\/h3>/, '<h3>¿Que necesito para crear una tienda online?</h3>\n<div class="process-step" style="margin-top:2rem;"><span>04</span><h3>¿Que necesito para crear tu marca?</h3></div>');

// Orb section CTA -> "tu agencia de marketing en tarragona"
indexHtml = indexHtml.replace(/<h2 class="orb-title[^>]*>Experiencias Digitales<\/h2>/, '<h2 class="orb-title gs-reveal" style="font-size: 3rem; margin-bottom: 1rem;">tu agencia de marketing en tarragona</h2>\n<h3 class="orb-subtitle gs-reveal" style="font-size: 1.5rem;">¿Te resulta familiar?</h3>');

// Contact section
indexHtml = indexHtml.replace(/<div class="h2">Contáctanos<\/div>/, '<h2>contacta con nuestra agencia de diseño web</h2>\n<h3 class="h2" style="font-size:1.5rem; color:var(--color-primary);">contacto</h3>');

// Expert section
const expertHtml = `
    <!-- Expert Section -->
    <section class="expert-section" style="padding: 4rem 0; background-color: var(--bg-darker);">
        <div class="container">
            <h2 style="text-align: center; margin-bottom: 3rem;">experto en diseño de páginas web</h2>
            <div class="accordion">
                <div class="accordion-item"><div class="accordion-header"><h3>sitios webs editables</h3></div><div class="accordion-body"><p>...</p></div></div>
                <div class="accordion-item"><div class="accordion-header"><h3>velocidad de carga</h3></div><div class="accordion-body"><p>...</p></div></div>
                <div class="accordion-item"><div class="accordion-header"><h3>COMPROMISO CONTIGO</h3></div><div class="accordion-body"><p>...</p></div></div>
                <div class="accordion-item"><div class="accordion-header"><h3>TODOS MIS SITIOS WEB INCLUYEN SEO</h3></div><div class="accordion-body"><p>...</p></div></div>
                <div class="accordion-item"><div class="accordion-header"><h3>¿Cómo trabajo el UX en los proyectos web?</h3></div><div class="accordion-body"><p>...</p></div></div>
                <div class="accordion-item"><div class="accordion-header"><h3>Ofrecemos la gama de opciones que necesitas</h3></div><div class="accordion-body"><p>...</p></div></div>
                <div class="accordion-item"><div class="accordion-header"><h3>RGPD</h3></div><div class="accordion-body"><p>...</p></div></div>
                <div class="accordion-item"><div class="accordion-header"><h3>facturación</h3></div><div class="accordion-body"><p>...</p></div></div>
            </div>
        </div>
    </section>
`;
indexHtml = indexHtml.replace('<!-- 13. FAQ Section -->', expertHtml + '\n    <!-- 13. FAQ Section -->');

// Testimonial
const testimonialHtml = `
    <section class="testimonials" style="padding: 4rem 0; text-align: center;">
        <div class="container">
            <h2>la opinión de nuestros clientes</h2>
            <p style="margin-top: 1rem; font-style: italic;">"El mejor servicio de diseño web..."</p>
        </div>
    </section>
`;
indexHtml = indexHtml.replace('<!-- 10. Contact Form (Home) -->', testimonialHtml + '\n    <!-- 10. Contact Form (Home) -->');

// Middle CTA
const ctaHtml = `
    <section class="cta-mid" style="padding: 4rem 0; text-align: center; background-color: var(--color-primary); color: white;">
        <div class="container">
            <h2>Pide tu nueva página web a medida</h2>
            <h3 style="margin-bottom: 2rem;">¡Ya es hora de un cambio!</h3>
            <a href="#contacto" class="btn-primary" style="background-color: white; color: black;">Empezar ahora</a>
        </div>
    </section>
`;
indexHtml = indexHtml.replace('<!-- 9. Portfolio Carousel -->', ctaHtml + '\n    <!-- 9. Portfolio Carousel -->');

// Tools banner
indexHtml = indexHtml.replace(/<div class="h2">Más de 7 Años en la Industria<\/div>/, '<h2>herramientas premium que utilizo</h2>\n<h3 style="font-size: 1.2rem; margin-top: 0.5rem; text-align: center; display: block;">herramientas premium</h3>');

fs.writeFileSync('index.html', indexHtml);
