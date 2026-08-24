const fs = require('fs');
let html = fs.readFileSync('disenador-grafico-barcelona.html', 'utf8');

// 1. Fix Accessibility Colors in Timeline
html = html.replace('.timeline-content h4 {\n            color: #9ca3af; margin-bottom: 1.5rem; font-weight: 500; font-size: 1.1rem;\n        }', '.timeline-content h4 {\n            color: #f8fafc; margin-bottom: 1.5rem; font-weight: 600; font-size: 1.15rem;\n        }');
html = html.replace('.timeline-content p { color: #d1d5db; }', '.timeline-content p { color: #ffffff; font-weight: 400; }');

// 2. Fix Swiper HTML and duplicate for loop
const swiperStart = html.indexOf('<div class="swiper mySwiper">');
const swiperEnd = html.indexOf('</div>\n    </section>\n\n\n    <!-- BRUTALIST');

const cleanSwiperHtml = `<div class="swiper mySwiper">
            <div class="swiper-wrapper">
                <!-- SLIDE 1 -->
                <div class="swiper-slide">
                    <div class="swiper-icon">UI/UX</div>
                    <h3 style="color: #fff; font-size: 1.5rem; margin-bottom: 1rem; font-family: var(--font-heading); text-transform: uppercase; font-weight:bold;">Frontend & Diseño Gráfico UI/UX</h3>
                    <p style="color: #fff;">Diseño de interfaces deslumbrantes y escalables. Dominio absoluto de React.js, Next.js, HTML5, CSS3, Tailwind CSS y animaciones fluidas. Prototipado en alta fidelidad y UX centrada en la máxima conversión.</p>
                </div>
                <!-- SLIDE 2 -->
                <div class="swiper-slide">
                    <div class="swiper-icon">BACK</div>
                    <h3 style="color: #fff; font-size: 1.5rem; margin-bottom: 1rem; font-family: var(--font-heading); text-transform: uppercase; font-weight:bold;">Arquitectura Web y Diseño SEO</h3>
                    <p style="color: #fff;">Infraestructuras sólidas como roca. Node.js, Python, PHP, SQL, Prisma. Despliegue seguro y ultrarrápido con Docker, Git y Caddy para asegurar tiempos de respuesta en milisegundos en cada interacción.</p>
                </div>
                <!-- SLIDE 3 -->
                <div class="swiper-slide">
                    <div class="swiper-icon">AI</div>
                    <h3 style="color: #fff; font-size: 1.5rem; margin-bottom: 1rem; font-family: var(--font-heading); text-transform: uppercase; font-weight:bold;">IA y Diseño Web Barcelona</h3>
                    <p style="color: #fff;">Automatizaciones que rompen el mercado: Agentes de voz telefónicos mediante IA (Vapi), LLMs conversacionales, WhatsApp API, n8n, y procesadores en Python mediante JSON Webhooks para procesos B2B.</p>
                </div>
                <!-- SLIDE 4 -->
                <div class="swiper-slide">
                    <div class="swiper-icon">CMS</div>
                    <h3 style="color: #fff; font-size: 1.5rem; margin-bottom: 1rem; font-family: var(--font-heading); text-transform: uppercase; font-weight:bold;">Diseño para Tiendas Online</h3>
                    <p style="color: #fff;">El núcleo de mi trabajo como Diseñador Gráfico en Barcelona. Desarrollo profundo de temas y plugins personalizados en WordPress, integración impecable con WooCommerce y arquitecturas Headless.</p>
                </div>
                <!-- DUPLICATES FOR INFINITE LOOP ON ULTRAWIDE SCREENS -->
                <!-- SLIDE 1 COPY -->
                <div class="swiper-slide">
                    <div class="swiper-icon">UI/UX</div>
                    <h3 style="color: #fff; font-size: 1.5rem; margin-bottom: 1rem; font-family: var(--font-heading); text-transform: uppercase; font-weight:bold;">Frontend & Diseño Gráfico UI/UX</h3>
                    <p style="color: #fff;">Diseño de interfaces deslumbrantes y escalables. Dominio absoluto de React.js, Next.js, HTML5, CSS3, Tailwind CSS y animaciones fluidas. Prototipado en alta fidelidad y UX centrada en la máxima conversión.</p>
                </div>
                <!-- SLIDE 2 COPY -->
                <div class="swiper-slide">
                    <div class="swiper-icon">BACK</div>
                    <h3 style="color: #fff; font-size: 1.5rem; margin-bottom: 1rem; font-family: var(--font-heading); text-transform: uppercase; font-weight:bold;">Arquitectura Web y Diseño SEO</h3>
                    <p style="color: #fff;">Infraestructuras sólidas como roca. Node.js, Python, PHP, SQL, Prisma. Despliegue seguro y ultrarrápido con Docker, Git y Caddy para asegurar tiempos de respuesta en milisegundos en cada interacción.</p>
                </div>
                <!-- SLIDE 3 COPY -->
                <div class="swiper-slide">
                    <div class="swiper-icon">AI</div>
                    <h3 style="color: #fff; font-size: 1.5rem; margin-bottom: 1rem; font-family: var(--font-heading); text-transform: uppercase; font-weight:bold;">IA y Diseño Web Barcelona</h3>
                    <p style="color: #fff;">Automatizaciones que rompen el mercado: Agentes de voz telefónicos mediante IA (Vapi), LLMs conversacionales, WhatsApp API, n8n, y procesadores en Python mediante JSON Webhooks para procesos B2B.</p>
                </div>
                <!-- SLIDE 4 COPY -->
                <div class="swiper-slide">
                    <div class="swiper-icon">CMS</div>
                    <h3 style="color: #fff; font-size: 1.5rem; margin-bottom: 1rem; font-family: var(--font-heading); text-transform: uppercase; font-weight:bold;">Diseño para Tiendas Online</h3>
                    <p style="color: #fff;">El núcleo de mi trabajo como Diseñador Gráfico en Barcelona. Desarrollo profundo de temas y plugins personalizados en WordPress, integración impecable con WooCommerce y arquitecturas Headless.</p>
                </div>
            </div>
            <div class="swiper-pagination"></div>
        </div>`;

if (swiperStart !== -1 && swiperEnd !== -1) {
    html = html.substring(0, swiperStart) + cleanSwiperHtml + html.substring(swiperEnd);
} else {
    console.error("Could not find swiper block bounds!");
}

fs.writeFileSync('disenador-grafico-barcelona.html', html, 'utf8');
console.log('Fixed Swiper HTML and Accessibility Colors');
