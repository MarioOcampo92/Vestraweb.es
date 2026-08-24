const fs = require('fs');
const FILE = 'disenador-grafico-barcelona.html';
let html = fs.readFileSync(FILE, 'utf8');

// 1. CLEAN UP THE HERO
const oldHeroRegex = /<header class="hero"[^>]*>[\s\S]*?<\/header>/;
const newHero = `
    <header class="hero" style="background: transparent; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; position: relative; z-index: 2;">
        <h1 class="hero-title" style="font-size: clamp(3rem, 8vw, 7rem); font-family: var(--font-heading); font-weight: 900; line-height: 1; letter-spacing: -0.02em; text-transform: uppercase;">
            <span style="color: #fff; opacity: 0; transform: translateY(30px);" class="gsap-hero-text">DISEÑADOR</span><br>
            <span style="color: #fff; opacity: 0; transform: translateY(30px);" class="gsap-hero-text">GRÁFICO EN</span><br>
            <span style="color: var(--color-primary); opacity: 0; transform: translateY(30px);" class="gsap-hero-text">BARCELONA</span>
        </h1>
        <div class="hero-subtitle" style="margin-top: 2rem; max-width: 600px; opacity: 0;" id="gsap-hero-sub">
            <p style="font-size: 1.1rem; color: #a1a1aa; line-height: 1.6;">Especialista técnico. Arquitectura Front-End y Diseñador Gráfico enfocado en rendimiento extremo, Core Web Vitals y conversión de alto impacto.</p>
        </div>
    </header>
`;
html = html.replace(oldHeroRegex, newHero);

// 2. REMOVE THE ANNOYING FIXED NAV
html = html.replace(/<nav class="cv-nav">[\s\S]*?<\/nav>/, '');

// 3. CONVERT ARSENAL TÉCNICO INTO A SWIPER CAROUSEL
const swiperCss = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
<style>
    .swiper { width: 100%; padding-top: 50px; padding-bottom: 50px; }
    .swiper-slide {
        background-position: center;
        background-size: cover;
        width: 400px;
        background-color: #0d0d0d;
        border: 1px solid #333;
        padding: 3rem;
        border-radius: 12px;
        transition: border-color 0.3s ease;
    }
    .swiper-slide-active { border-color: var(--color-primary); }
    .swiper-slide h3 { color: #fff; font-size: 1.5rem; margin-bottom: 1rem; font-family: var(--font-heading); }
    .swiper-slide p { color: #a1a1aa; font-size: 0.95rem; line-height: 1.6; }
    .swiper-icon { font-size: 3rem; color: var(--color-primary); margin-bottom: 1.5rem; font-family: monospace; font-weight: bold; }
</style>
`;
html = html.replace('</head>', swiperCss + '\n</head>');

const oldSkillsRegex = /<div class="skills-grid">[\s\S]*?<\/section>/;
const newCarousel = `
        <div class="swiper mySwiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div class="swiper-icon">UI/UX</div>
                    <h3>Frontend & UI/UX Design</h3>
                    <p>Diseño de interfaces deslumbrantes y escalables. Dominio absoluto de React.js, Next.js, HTML5, CSS3, Tailwind CSS y animaciones avanzadas (GSAP, Three.js). Prototipado en alta fidelidad y UX centrada en la máxima conversión.</p>
                </div>
                <div class="swiper-slide">
                    <div class="swiper-icon">BACK</div>
                    <h3>Backend & Arquitectura</h3>
                    <p>Infraestructuras sólidas como roca. Node.js, Python, PHP, SQL, Prisma. Despliegue seguro y ultrarrápido con Docker, Git, VS Code, Ubuntu, y Caddy para asegurar tiempos de respuesta en milisegundos en cada interacción.</p>
                </div>
                <div class="swiper-slide">
                    <div class="swiper-icon">AI</div>
                    <h3>Inteligencia Artificial</h3>
                    <p>Automatizaciones que rompen el mercado: Agentes de voz telefónicos mediante IA (Vapi), LLMs conversacionales, WhatsApp API, n8n, y procesadores en Python mediante JSON Webhooks.</p>
                </div>
                <div class="swiper-slide">
                    <div class="swiper-icon">CMS</div>
                    <h3>Plataformas E-Commerce</h3>
                    <p>El núcleo de mi trabajo como Diseñador Gráfico en Barcelona. Desarrollo profundo de temas y plugins personalizados en WordPress, integración impecable con WooCommerce y Shopify.</p>
                </div>
            </div>
            <div class="swiper-pagination"></div>
        </div>
    </section>
`;
html = html.replace(oldSkillsRegex, newCarousel);

// 4. ADD GSAP SCROLLTRIGGER TO EL CAMINO & SWIPER INIT
const scriptAdditions = `
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
<script>
    document.addEventListener("DOMContentLoaded", () => {
        // Init Swiper
        var swiper = new Swiper(".mySwiper", {
            effect: "coverflow",
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: "auto",
            coverflowEffect: {
                rotate: 20,
                stretch: 0,
                depth: 200,
                modifier: 1,
                slideShadows: true,
            },
            loop: true,
            pagination: {
                el: ".swiper-pagination",
            },
        });

        // Hero Animation
        gsap.to(".gsap-hero-text", {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.2,
            ease: "power4.out",
            delay: 0.5
        });
        gsap.to("#gsap-hero-sub", {
            opacity: 1,
            duration: 1.5,
            delay: 1.2
        });

        // El Camino ScrollTrigger Animation
        gsap.registerPlugin(ScrollTrigger);
        
        const nodes = gsap.utils.toArray('.timeline-node');
        nodes.forEach((node, i) => {
            // Determine direction based on odd/even (if timeline is centered)
            // Or just a dramatic fade up and scale
            gsap.fromTo(node, 
                { opacity: 0, y: 100, scale: 0.9 },
                { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    duration: 1, 
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: node,
                        start: "top 85%", // when top of node hits 85% of viewport
                        end: "top 50%",
                        scrub: 1, // smooth scrubbing
                    }
                }
            );
        });
    });
</script>
</body>`;
html = html.replace('</body>', scriptAdditions);

fs.writeFileSync(FILE, html, 'utf8');
console.log("V6 upgrades applied successfully.");
