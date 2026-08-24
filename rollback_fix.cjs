const fs = require('fs');
const FILE = 'disenador-grafico-barcelona.html';
let html = fs.readFileSync(FILE, 'utf8');

// 1. REMOVE FIXED OVERLAPPING NAV
html = html.replace(/<nav class="cv-nav">[\s\S]*?<\/nav>/, '');

// 2. REMOVE NOISE FROM GLITCH HERO BUT KEEP THE GLITCH TEXT
html = html.replace(/<div class="ascii-noise"[^>]*>.*?<\/div>/g, '');
html = html.replace(/<div class="hero-top-data">.*?<\/div>/g, '');
html = html.replace(/\[ ̶▒̶ IDENTIDAD VERIFICADA \]<br>/g, '');

// 3. ADD SWIPER CSS TO HEAD
const swiperCss = `
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
    <style>
        .swiper { width: 100%; padding-top: 50px; padding-bottom: 50px; }
        .swiper-slide {
            background-position: center;
            background-size: cover;
            width: 320px;
            background-color: #0d0d0d;
            border: 1px solid #333;
            padding: 2.5rem;
            border-radius: 12px;
            transition: border-color 0.3s ease;
        }
        @media (min-width: 768px) { .swiper-slide { width: 400px; padding: 3rem; } }
        .swiper-slide-active { border-color: var(--color-primary); }
        .swiper-slide h3 { color: #fff; font-size: 1.5rem; margin-bottom: 1rem; font-family: var(--font-heading); text-transform: uppercase; }
        .swiper-slide p { color: #a1a1aa; font-size: 0.95rem; line-height: 1.6; }
        .swiper-icon { font-size: 2.5rem; color: var(--color-primary); margin-bottom: 1rem; font-family: monospace; font-weight: bold; }
        .swiper-pagination-bullet { background: #555; }
        .swiper-pagination-bullet-active { background: var(--color-primary); }
        
        /* LIGHTWEIGHT CSS ANIMATION FOR TIMELINE */
        .timeline-node {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .timeline-node.in-view {
            opacity: 1;
            transform: translateY(0);
        }
    </style>
`;
html = html.replace('</head>', swiperCss + '\n</head>');

// 4. REPLACE BENTO GRID WITH SWIPER CAROUSEL
const oldSkillsRegex = /<div class="skills-grid">[\s\S]*?<\/section>/;
const newCarousel = `
        <div class="swiper mySwiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div class="swiper-icon">UI/UX</div>
                    <h3>Frontend & UI/UX Design</h3>
                    <p>Diseño de interfaces deslumbrantes y escalables. Dominio absoluto de React.js, Next.js, HTML5, CSS3, Tailwind CSS y animaciones fluidas. Prototipado en alta fidelidad y UX centrada en la máxima conversión.</p>
                </div>
                <div class="swiper-slide">
                    <div class="swiper-icon">BACK</div>
                    <h3>Backend & Arquitectura</h3>
                    <p>Infraestructuras sólidas como roca. Node.js, Python, PHP, SQL, Prisma. Despliegue seguro y ultrarrápido con Docker, Git y Caddy para asegurar tiempos de respuesta en milisegundos en cada interacción.</p>
                </div>
                <div class="swiper-slide">
                    <div class="swiper-icon">AI</div>
                    <h3>Inteligencia Artificial</h3>
                    <p>Automatizaciones que rompen el mercado: Agentes de voz telefónicos mediante IA (Vapi), LLMs conversacionales, WhatsApp API, n8n, y procesadores en Python mediante JSON Webhooks para procesos B2B.</p>
                </div>
                <div class="swiper-slide">
                    <div class="swiper-icon">CMS</div>
                    <h3>Plataformas E-Commerce</h3>
                    <p>El núcleo de mi trabajo como Diseñador Gráfico en Barcelona. Desarrollo profundo de temas y plugins personalizados en WordPress, integración impecable con WooCommerce y arquitecturas Headless.</p>
                </div>
            </div>
            <div class="swiper-pagination"></div>
        </div>
    </section>
`;
html = html.replace(oldSkillsRegex, newCarousel);

// 5. INJECT JS FOR SWIPER AND LIGHTWEIGHT INTERSECTION OBSERVER
const jsCode = `
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
<script>
    document.addEventListener("DOMContentLoaded", () => {
        // Init Swiper Carousel
        if (typeof Swiper !== 'undefined') {
            new Swiper(".mySwiper", {
                effect: "coverflow",
                grabCursor: true,
                centeredSlides: true,
                slidesPerView: "auto",
                coverflowEffect: {
                    rotate: 15,
                    stretch: 0,
                    depth: 150,
                    modifier: 1,
                    slideShadows: true,
                },
                loop: true,
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true
                },
            });
        }

        // Lightweight Performance-Friendly Scroll Animation for Timeline
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target); // Run once per node
                }
            });
        }, observerOptions);

        document.querySelectorAll('.timeline-node').forEach(node => {
            observer.observe(node);
        });
    });
</script>
</body>`;
html = html.replace('</body>', jsCode);

fs.writeFileSync(FILE, html, 'utf8');
console.log("Successfully restored Hero glitch without noise, removed overlapping nav, added swiper carousel, and lightweight scroll animations.");
