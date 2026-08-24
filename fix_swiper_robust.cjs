const fs = require('fs');
let html = fs.readFileSync('disenador-grafico-barcelona.html', 'utf8');

const swiperStart = html.indexOf('<div class="swiper mySwiper">');
const swiperEndToken = '<div class="swiper-pagination"></div>\n        </div>';
const swiperEnd = html.indexOf(swiperEndToken, swiperStart) + swiperEndToken.length;

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
    console.log("Successfully replaced swiper HTML.");
} else {
    console.error("Could not find swiper block bounds!", swiperStart, swiperEnd);
}

fs.writeFileSync('disenador-grafico-barcelona.html', html, 'utf8');
