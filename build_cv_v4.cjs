const fs = require('fs');

const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Diseño Web WordPress Barcelona</title>
    <meta name="description" content="Diseño Web WordPress Barcelona a medida. Arquitectura Front-End, UI/UX y sitios web optimizados para SEO local por Mario Ocampo.">
    <link rel="canonical" href="https://vestraweb.es/disenador-grafico-barcelona">
    <meta name="robots" content="index, follow">
    
    <!-- Schema.org JSON-LD for Geo-Localization and Person Profile -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ProfessionalService",
          "@id": "https://vestraweb.es/disenador-grafico-barcelona#service",
          "name": "Diseño Web WordPress Barcelona - Mario Ocampo",
          "description": "Arquitecto Front-End y Diseñador Gráfico en Barcelona especializado en Diseño Web WordPress, e-commerce, y automatizaciones con Inteligencia Artificial.",
          "url": "https://vestraweb.es/disenador-grafico-barcelona",
          "telephone": "+34687180231",
          "email": "hello@vestraweb.es",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Barcelona",
            "addressRegion": "Cataluña",
            "addressCountry": "ES"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "41.3851",
            "longitude": "2.1734"
          },
          "priceRange": "$$",
          "areaServed": {
            "@type": "City",
            "name": "Barcelona"
          },
          "knowsAbout": ["Diseño Web", "WordPress", "React", "Frontend", "UI/UX", "SEO"]
        },
        {
          "@type": "Person",
          "@id": "https://vestraweb.es/disenador-grafico-barcelona#person",
          "name": "Mario Ocampo",
          "jobTitle": "Lead Front-End Architect & Diseñador Gráfico",
          "url": "https://vestraweb.es/disenador-grafico-barcelona",
          "sameAs": [
            "https://linkedin.com/in/mario-fernando-ocampo",
            "https://github.com/MarioOcampo92"
          ],
          "knowsLanguage": [
            {
              "@type": "Language",
              "name": "Spanish",
              "alternateName": "es"
            },
            {
              "@type": "Language",
              "name": "English",
              "alternateName": "en"
            }
          ],
          "alumniOf": [
            {
              "@type": "EducationalOrganization",
              "name": "Universidad del Valle"
            },
            {
              "@type": "EducationalOrganization",
              "name": "SENA"
            },
            {
              "@type": "EducationalOrganization",
              "name": "Platzi"
            }
          ]
        }
      ]
    }
    </script>
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&family=Rajdhani:wght@300;500;700&display=swap" rel="stylesheet">
    
    <style>
        :root {
            --color-primary: #f7484b; 
            --color-bg: #050505;
            --color-surface: #0a0a0a;
            --color-text: #f3f4f6;
            --font-heading: 'Syncopate', sans-serif;
            --font-body: 'Rajdhani', sans-serif;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            background-color: var(--color-bg);
            color: var(--color-text);
            font-family: var(--font-body);
            overflow-x: hidden;
            font-size: 18px;
            line-height: 1.6;
        }

        ::selection { background: var(--color-primary); color: #000; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: var(--color-bg); }
        ::-webkit-scrollbar-thumb { background: var(--color-primary); }

        .cv-nav {
            position: fixed; top: 0; left: 0; width: 100%;
            padding: 1.5rem 3rem; display: flex; justify-content: space-between;
            z-index: 1000; mix-blend-mode: difference;
            font-family: var(--font-heading);
            font-size: 0.9rem; text-transform: uppercase; letter-spacing: 2px;
        }
        .cv-nav a { color: #fff; text-decoration: none; transition: color 0.3s; }
        .cv-nav a:hover { color: var(--color-primary); }

        #webgl-container {
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            z-index: -1; pointer-events: none;
        }
        
        .hero {
            height: 100vh; display: flex; flex-direction: column;
            justify-content: center; padding: 0 10%; position: relative;
        }
        
        .hero h1 {
            font-family: var(--font-heading);
            font-size: clamp(2.5rem, 5vw, 6rem);
            line-height: 1.1; text-transform: uppercase;
            font-weight: 700; color: transparent;
            -webkit-text-stroke: 1px rgba(255,255,255,0.5);
            margin-bottom: 1rem;
            position: relative;
        }
        
        .hero h1 span.filled {
            color: var(--color-primary);
            -webkit-text-stroke: 0;
            text-shadow: 0 0 20px rgba(247, 72, 75, 0.5);
        }

        .hero-subtitle {
            font-size: 1.5rem; max-width: 600px;
            border-left: 2px solid var(--color-primary);
            padding-left: 1.5rem; margin-top: 2rem;
            color: #d1d5db; font-weight: 500;
        }

        .section { padding: 8rem 10%; position: relative; background: var(--color-bg); }
        .section-darker { background: var(--color-surface); border-top: 1px solid #111; border-bottom: 1px solid #111; }
        
        .section-title {
            font-family: var(--font-heading);
            font-size: clamp(2rem, 4vw, 3.5rem);
            color: var(--color-primary);
            margin-bottom: 4rem;
            text-transform: uppercase;
        }

        .manifesto-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: flex-start; }
        .manifesto-text p { font-size: 1.25rem; margin-bottom: 2rem; color: #9ca3af; }

        .skills-grid {
            display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }
        .skill-card {
            background: rgba(255,255,255,0.02); border: 1px solid #222;
            padding: 3rem 2rem; position: relative;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
        }
        .skill-card:hover {
            border-color: var(--color-primary);
            transform: translateY(-10px);
            box-shadow: 0 10px 30px rgba(247, 72, 75, 0.1);
        }
        .skill-icon {
            font-family: var(--font-heading); font-size: 4rem;
            color: rgba(247, 72, 75, 0.2); position: absolute;
            top: 1rem; right: 1rem; line-height: 1;
        }
        .skill-card h3 {
            font-family: var(--font-heading); font-size: 1.5rem;
            margin-bottom: 1.5rem; color: #fff;
        }
        .skill-card p { color: #9ca3af; font-size: 1.1rem; }

        .marquee-container {
            background: var(--color-primary);
            padding: 2rem 0;
            overflow: hidden;
            white-space: nowrap;
            position: relative;
            transform: skewY(-2deg);
            margin: 4rem 0;
            z-index: 10;
        }
        .marquee-content {
            display: inline-block;
            animation: marquee 20s linear infinite;
            font-family: var(--font-heading);
            font-size: 2.5rem;
            font-weight: 700;
            color: #000;
            text-transform: uppercase;
        }
        .marquee-content span { margin: 0 2rem; }
        
        @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }

        .cyber-timeline {
            position: relative; max-width: 1000px; margin: 0 auto;
        }
        .cyber-timeline::before {
            content: ''; position: absolute; left: 50%; top: 0;
            width: 2px; height: 100%; background: #222;
            transform: translateX(-50%);
        }
        .timeline-node {
            display: flex; justify-content: space-between; align-items: center;
            width: 100%; margin-bottom: 6rem; position: relative;
        }
        .timeline-node:nth-child(even) { flex-direction: row-reverse; }
        
        .timeline-dot {
            position: absolute; left: 50%; top: 0;
            width: 20px; height: 20px; border-radius: 50%;
            background: var(--color-primary);
            transform: translateX(-50%);
            box-shadow: 0 0 15px var(--color-primary);
        }
        
        .timeline-content {
            width: 45%; background: rgba(255,255,255,0.02); padding: 2.5rem;
            border: 1px solid #222; position: relative; backdrop-filter: blur(5px);
        }
        .timeline-node:nth-child(odd) .timeline-content { text-align: right; }
        
        .timeline-date {
            font-family: var(--font-heading); color: var(--color-primary);
            font-size: 0.9rem; margin-bottom: 1rem; letter-spacing: 2px;
        }
        .timeline-content h3 {
            font-family: var(--font-heading); font-size: 1.5rem; margin-bottom: 0.5rem; color: #fff;
        }
        .timeline-content h4 {
            color: #9ca3af; margin-bottom: 1.5rem; font-weight: 500; font-size: 1.1rem;
        }
        .timeline-content p { color: #d1d5db; }

        .pro-gallery {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 3rem;
        }
        
        .pro-card {
            position: relative;
            border-radius: 8px;
            overflow: hidden;
            cursor: pointer;
            border: 1px solid rgba(255,255,255,0.05);
            transform-style: preserve-3d;
            perspective: 1000px;
        }
        .pro-card-inner {
            position: relative;
            width: 100%; height: 400px;
            transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .pro-card:hover .pro-card-inner { transform: scale(1.02) translateY(-10px); }
        .pro-image {
            width: 100%; height: 100%; object-fit: cover;
            filter: grayscale(100%) contrast(1.2);
            transition: filter 0.5s;
        }
        .pro-card:hover .pro-image { filter: grayscale(0%) contrast(1); }
        .pro-overlay {
            position: absolute; bottom: 0; left: 0; width: 100%;
            padding: 2rem; background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
            transform: translateY(20px); opacity: 0; transition: all 0.4s;
        }
        .pro-card:hover .pro-overlay { transform: translateY(0); opacity: 1; }
        .pro-overlay h3 { font-family: var(--font-heading); font-size: 1.5rem; color: #fff; }
        .pro-overlay p { color: var(--color-primary); font-weight: 700; margin-top: 0.5rem; text-transform: uppercase; letter-spacing: 1px;}

        /* Education & Languages */
        .edu-flex { display: flex; flex-wrap: wrap; gap: 2rem; margin-top: 4rem; }
        .edu-col { flex: 1; min-width: 300px; background: #111; padding: 2.5rem; border-left: 3px solid var(--color-primary); }
        .edu-col h3 { font-family: var(--font-heading); font-size: 1.5rem; margin-bottom: 1.5rem; color: #fff; }
        .edu-list { list-style: none; }
        .edu-list li { margin-bottom: 1rem; color: #a1a1aa; display: flex; align-items: flex-start; }
        .edu-list li::before { content: '▹'; color: var(--color-primary); margin-right: 0.5rem; font-size: 1.2rem; }
        .edu-list strong { color: #fff; display: block; }

        .cyber-footer {
            padding: 8rem 10%; text-align: center;
            background: linear-gradient(0deg, #020202 0%, var(--color-surface) 100%);
            border-top: 1px solid #111;
        }
        .cyber-btn {
            display: inline-block; padding: 1.5rem 4rem;
            border: 1px solid var(--color-primary);
            color: var(--color-primary);
            font-family: var(--font-heading); text-transform: uppercase;
            text-decoration: none; letter-spacing: 2px;
            transition: all 0.3s;
        }
        .cyber-btn:hover { background: var(--color-primary); color: #000; box-shadow: 0 0 30px rgba(247, 72, 75, 0.4); }

        @media (max-width: 768px) {
            .manifesto-grid { grid-template-columns: 1fr; }
            .cyber-timeline::before { left: 0; }
            .timeline-dot { left: 0; transform: translateX(-10px); }
            .timeline-content { width: 100%; padding-left: 2rem; text-align: left !important; margin-left: 20px; }
            .timeline-node { flex-direction: column !important; }
        }
    </style>
</head>
<body>

    <div id="webgl-container"></div>

    <nav class="cv-nav">
        <a href="/">[ VOLVER ]</a>
        <a href="mailto:hello@vestraweb.es">[ SYS.CONTACT ]</a>
    </nav>

    <header class="hero">
        <h1 class="hero-title">
            <span class="glitch">DISEÑO WEB</span><br>
            <span class="filled">WORDPRESS</span><br>
            <span class="glitch">BARCELONA</span>
        </h1>
        <div class="hero-subtitle">
            <p>Especialista en <strong>Diseño Web WordPress Barcelona</strong>. Arquitecto Front-End y Diseñador Gráfico enfocado en la conversión, rendimiento técnico (Core Web Vitals) y automatización avanzada con Inteligencia Artificial.</p>
        </div>
    </header>

    <section class="section section-darker">
        <h2 class="section-title">El Manifiesto y Filosofía</h2>
        <div class="manifesto-grid">
            <div class="manifesto-text">
                <p>El diseño gráfico moderno no vive en un lienzo estático. Vive en el DOM, en el servidor y en la interacción del usuario final. Con 7 años de trayectoria en el mundo tecnológico, comprendí que una web bonita es inútil si no tiene tráfico, y un sistema potente es invisible si no resulta atractivo.</p>
                <p>Como arquitecto experto en <strong>Diseño Web WordPress en Barcelona</strong>, fusiono lo mejor de dos mundos: la arquitectura técnica pura (React, Vite, Node.js, y desarrollo de Custom Themes en PHP) con una estética implacable basada en los principios del diseño gráfico avanzado, la tipografía y el branding estratégico.</p>
                <p>Mi enfoque integral va mucho más allá de las plantillas prefabricadas. Desarrollo sistemas de e-commerce robustos desde cero, arquitecturas monorepo para gestión de leads masivos y las integraciones más disruptivas del momento: Inteligencia Artificial. Desde <strong>Agentes de Voz telefónicos</strong> capaces de interactuar en tiempo real hasta dashboards de conciliación financiera automatizados.</p>
                <p>No se trata solo de escribir código o dibujar interfaces. Se trata de analizar problemas operativos complejos (como procesos manuales, integraciones fragmentadas o falta de escalabilidad en ventas) y resolverlos de forma definitiva. <strong>El píxel perfecto es la entrada; el código limpio y veloz es la verdadera máquina de conversión.</strong></p>
                <p>Elegir un experto en <strong>Diseño Web WordPress Barcelona</strong> significa apostar por un ecosistema digital que no solo representa fielmente la identidad de tu negocio en Cataluña y España, sino que está preparado para dominar los motores de búsqueda mediante auditorías técnicas exigentes y un SEO Local de impacto innegable.</p>
            </div>
            <div style="text-align: right; display: flex; flex-direction: column; gap: 2rem;">
                <img src="/assets/agencia-diseno-web-wordpress-barcelona-equipo.svg" alt="Equipo de Diseño Web WordPress en Barcelona" title="Expertos en Diseño Web WordPress Barcelona - VestraWeb Team" style="width: 100%; max-width: 400px; filter: drop-shadow(0 0 20px rgba(247,72,75,0.2)); align-self: flex-end;" loading="lazy">
                
                <div class="edu-flex">
                    <div class="edu-col" style="text-align: left;">
                        <h3>Formación Tecnológica</h3>
                        <ul class="edu-list">
                            <li><div><strong>Universidad del Valle</strong><br>Educación Superior</div></li>
                            <li><div><strong>SENA</strong><br>Formación Tecnológica Especializada</div></li>
                            <li><div><strong>Platzi</strong><br>Ingeniería de Software y Desarrollo Web</div></li>
                        </ul>
                    </div>
                    <div class="edu-col" style="text-align: left;">
                        <h3>Idiomas & Comunicación</h3>
                        <ul class="edu-list">
                            <li><div><strong>Español</strong><br>Nativo - Fluidez absoluta B2B</div></li>
                            <li><div><strong>Inglés (C1)</strong><br>Avanzado Profesional (Lectura, Escritura y Habla Técnica)</div></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ARSENAL TÉCNICO -->
    <section class="section">
        <h2 class="section-title">Arsenal Técnico Integral</h2>
        <div class="skills-grid">
            <div class="skill-card">
                <div class="skill-icon">UI</div>
                <h3>Frontend & UI/UX Design</h3>
                <p>Diseño de interfaces deslumbrantes y escalables. Dominio absoluto de React.js, Next.js, HTML5, CSS3, Tailwind CSS y animaciones avanzadas (GSAP, Three.js). Prototipado en alta fidelidad y UX centrada en la máxima conversión.</p>
            </div>
            <div class="skill-card">
                <div class="skill-icon">DB</div>
                <h3>Backend & Arquitectura de Software</h3>
                <p>Infraestructuras sólidas como roca. Node.js, Python, PHP, SQL, Prisma. Despliegue seguro y ultrarrápido con Docker, Git, VS Code, Ubuntu, y Caddy para asegurar tiempos de respuesta en milisegundos en cada interacción de servidor.</p>
            </div>
            <div class="skill-card">
                <div class="skill-icon">AI</div>
                <h3>Inteligencia Artificial & Automatización</h3>
                <p>Automatizaciones que rompen el mercado: Agentes de voz telefónicos mediante IA (Vapi), Modelos de Lenguaje (LLMs) conversacionales, WhatsApp API, herramientas n8n, y procesadores en Python mediante JSON Webhooks para revolucionar procesos de ventas.</p>
            </div>
            <div class="skill-card">
                <div class="skill-icon">WP</div>
                <h3>CMS & Plataformas E-Commerce</h3>
                <p>El núcleo de mi trabajo en Diseño Web WordPress Barcelona. Desarrollo profundo de temas y plugins personalizados en WordPress, integración impecable con WooCommerce y Shopify. Diseño de vitrinas optimizadas y administrables.</p>
            </div>
        </div>
    </section>

    <!-- SCROLLING MARQUEE -->
    <div class="marquee-container">
        <div class="marquee-content">
            <!-- Repeated twice for seamless loop -->
            <span>UI/UX DESIGN</span> <span>•</span> <span>WORDPRESS DEVELOPMENT</span> <span>•</span> <span>REACT.JS B2B APPS</span> <span>•</span> <span>3D DATA ANIMATION</span> <span>•</span> <span>SEO LOCAL CORE WEB VITALS</span> <span>•</span> <span>AI VOICE TELEPHONE AGENTS</span> <span>•</span>
            <span>UI/UX DESIGN</span> <span>•</span> <span>WORDPRESS DEVELOPMENT</span> <span>•</span> <span>REACT.JS B2B APPS</span> <span>•</span> <span>3D DATA ANIMATION</span> <span>•</span> <span>SEO LOCAL CORE WEB VITALS</span> <span>•</span> <span>AI VOICE TELEPHONE AGENTS</span> <span>•</span>
        </div>
    </div>

    <!-- EL CAMINO (TIMELINE) EXPANDIDO -->
    <section class="section section-darker">
        <h2 class="section-title">El Camino (Experiencia Operativa)</h2>
        <div class="cyber-timeline">
            
            <div class="timeline-node">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <div class="timeline-date">2022 - PRESENTE</div>
                    <h3>Lead Front-End & Automation Architect</h3>
                    <h4>Vestra Solutions / VestraWeb</h4>
                    <p>Lidero el diseño visual y la arquitectura técnica integral de plataformas web B2B de alto rendimiento. Además de implementar flujos de automatización de datos e Inteligencia Artificial (con n8n y Vapi), diagnostico y elimino deuda técnica mediante arquitecturas modernas. Creé el escaparate técnico personal (vestraweb.es/portafolio) garantizando navegación sin latencia, limpieza de DOM extrema y dominio absoluto en las auditorías de Core Web Vitals.</p>
                </div>
            </div>
            
            <div class="timeline-node">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <div class="timeline-date">B2B INTERNAL TOOLS</div>
                    <h3>Multi-Tenant Email Processor</h3>
                    <h4>Desarrollo Interno Corporativo</h4>
                    <p>Solucioné un cuello de botella grave donde tres empresas diferentes compartían proveedores, causando pérdida constante de facturas. Desarrollé un script centralizado en Python orquestado mediante flujos locales de n8n que intercepta, lee y procesa automáticamente los correos de las 3 empresas, extrayendo la información vital en tiempo real.</p>
                </div>
            </div>

            <div class="timeline-node">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <div class="timeline-date">SECTOR FINANCIERO</div>
                    <h3>Ingeniero UI/UX - Gelt Dashboard</h3>
                    <h4>Dashboard de Conciliación Financiera</h4>
                    <p>Las transacciones reportadas caóticamente vía grupos de WhatsApp exigían validación manual, siendo susceptibles a errores graves. Diseñé y desarrollé un Dashboard robusto (React/Vite) que captura la información transaccional y automatiza el cotejo cruzado contra entidades (Addi, Brilla, Superintendencia Financiera). Conciliación inmediata y 100% libre de errores humanos.</p>
                </div>
            </div>
            
            <div class="timeline-node">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <div class="timeline-date">SECTOR COMERCIAL VENTA</div>
                    <h3>CRM & AI Autonomous Agent</h3>
                    <h4>Camacho Phones Corp</h4>
                    <p>El equipo de soporte sufría cuellos de botella severos. Desarrollé un CRM a medida con Dashboard administrativo e integré un agente de Inteligencia Artificial (LLM) que atiende WhatsApp de forma totalmente autónoma. Perfila clientes, responde consultas, cierra ventas reales y sincroniza los datos directamente en el CRM operativo.</p>
                </div>
            </div>

            <div class="timeline-node">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <div class="timeline-date">E-COMMERCE INTERNACIONAL USA</div>
                    <h3>Arquitectura Front-End E-commerce</h3>
                    <h4>Nonesuch Precision (Website de Armas)</h4>
                    <p>Fabricante y distribuidor norteamericano requería una plataforma altamente segura. Construí su e-commerce desde cero mediante un tema de WordPress 100% personalizado. Implementé robustas automatizaciones nativas para publicar e integrar dinámicamente un catálogo de armamento muy complejo con redes sociales, sin desajustes.</p>
                </div>
            </div>

            <div class="timeline-node">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <div class="timeline-date">2020 - 2022</div>
                    <h3>Front-End Developer & UI Engineer</h3>
                    <h4>Raccoon Technologies / Deuslink</h4>
                    <p>Resolución de problemas críticos de rendimiento web y experiencia de usuario (UX) en aplicaciones de altísima demanda. Lideré la refactorización de código legado implementando componentes interactivos dinámicos y ejecuté una optimización estricta de métricas SEO y Core Web Vitals, reduciendo los tiempos de carga inicial (LCP) en más de un 40%.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- PORTFOLIO SECTION CON TITLES -->
    <section class="section">
        <h2 class="section-title">Obras Maestras (Portfolio Web)</h2>
        <div class="pro-gallery">
            <div class="pro-card">
                <div class="pro-card-inner">
                    <img src="/assets/diseno-web-barcelona-ecommerce-mellows-1.jpg" alt="Diseño Web WordPress Barcelona para Mellows Ecommerce" title="Proyecto E-Commerce Mellows - Diseño Web WordPress Barcelona" class="pro-image" loading="lazy">
                    <div class="pro-overlay">
                        <h3>Mellows</h3>
                        <p>E-commerce WordPress UX/UI a Medida</p>
                    </div>
                </div>
            </div>
            <div class="pro-card">
                <div class="pro-card-inner">
                    <img src="/assets/diseno-web-barcelona-estudio-arquitectura-au-1.jpg" alt="Agencia de Diseño Web WordPress Barcelona AU Arquitectos" title="Corporativo AU Arquitectos - Diseño Web WordPress Barcelona" class="pro-image" loading="lazy">
                    <div class="pro-overlay">
                        <h3>AU Arquitectos</h3>
                        <p>Diseño Corporativo Brutalista y SEO</p>
                    </div>
                </div>
            </div>
            <div class="pro-card">
                <div class="pro-card-inner">
                    <img src="/assets/diseno-web-barcelona-restaurante-selva-1.png" alt="Desarrollo y Diseño Web WordPress Barcelona Selva Sabores" title="Plataforma Selva Sabores - Diseño Web WordPress Barcelona" class="pro-image" loading="lazy">
                    <div class="pro-overlay">
                        <h3>Selva de Sabores</h3>
                        <p>Plataforma Gastronómica Interactiva Total</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <footer class="cyber-footer">
        <h2 style="font-family: var(--font-heading); color: #fff; font-size: clamp(2rem, 5vw, 4rem); margin-bottom: 2rem;">¿DESPLEGAMOS TU PLATAFORMA?</h2>
        <a href="mailto:hello@vestraweb.es" class="cyber-btn" title="Contactar con Mario Ocampo Diseño Web WordPress Barcelona">INICIAR SECUENCIA</a>
    </footer>

    <!-- Scripts at the end for performance -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" defer></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" defer></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" defer></script>

    <script>
        window.addEventListener('load', () => {
            initThreeJS();
            initGSAP();
        });

        function initThreeJS() {
            if (typeof THREE === 'undefined') return;
            const container = document.getElementById('webgl-container');
            const scene = new THREE.Scene();
            scene.fog = new THREE.FogExp2(0x050505, 0.002);

            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
            
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            container.appendChild(renderer.domElement);

            const geometry = new THREE.BufferGeometry();
            const count = 3000;
            const positions = new Float32Array(count * 3);
            const colors = new Float32Array(count * 3);
            const color = new THREE.Color(0xf7484b);

            for(let i = 0; i < count; i++) {
                positions[i*3] = (Math.random() - 0.5) * 100;
                positions[i*3+1] = 0; 
                positions[i*3+2] = (Math.random() - 0.5) * 100;

                colors[i*3] = color.r;
                colors[i*3+1] = color.g;
                colors[i*3+2] = color.b;
            }

            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

            const material = new THREE.PointsMaterial({
                size: 0.15,
                vertexColors: true,
                transparent: true,
                opacity: 0.8,
                blending: THREE.AdditiveBlending
            });

            const particles = new THREE.Points(geometry, material);
            particles.position.y = -5;
            scene.add(particles);

            camera.position.z = 10;
            camera.position.y = 2;
            camera.rotation.x = -0.2;

            let mouseX = 0; let mouseY = 0;
            document.addEventListener('mousemove', (e) => {
                mouseX = (e.clientX / window.innerWidth) - 0.5;
                mouseY = (e.clientY / window.innerHeight) - 0.5;
            });

            let time = 0;
            function animate() {
                requestAnimationFrame(animate);
                time += 0.01;

                const positions = particles.geometry.attributes.position.array;
                for(let i = 0; i < count; i++) {
                    const x = positions[i*3];
                    const z = positions[i*3+2];
                    positions[i*3+1] = Math.sin(x * 0.1 + time) * 2 + Math.cos(z * 0.1 + time) * 2;
                }
                particles.geometry.attributes.position.needsUpdate = true;
                
                camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
                camera.position.y += (-mouseY * 3 - (camera.position.y - 2)) * 0.05;
                camera.lookAt(0, -2, -10);

                renderer.render(scene, camera);
            }
            animate();

            window.addEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });
        }

        function initGSAP() {
            if (typeof gsap === 'undefined') return;
            gsap.registerPlugin(ScrollTrigger);
            
            gsap.from(".hero-title span", { y: 100, opacity: 0, duration: 1.2, stagger: 0.15, ease: "power4.out" });
            gsap.from(".hero-subtitle", { x: -50, opacity: 0, duration: 1, delay: 0.8, ease: "power3.out" });

            const sections = document.querySelectorAll('.section-title');
            sections.forEach(sec => {
                gsap.from(sec, { scrollTrigger: { trigger: sec, start: "top 85%" }, y: 30, opacity: 0, duration: 1, ease: "power3.out" });
            });

            const cards = document.querySelectorAll('.pro-card');
            cards.forEach((card, i) => {
                gsap.from(card, { scrollTrigger: { trigger: ".pro-gallery", start: "top 80%" }, y: 100, opacity: 0, duration: 0.8, delay: i * 0.2, ease: "power3.out" });
            });
            
            const skills = document.querySelectorAll('.skill-card');
            skills.forEach((skill, i) => {
                gsap.from(skill, { scrollTrigger: { trigger: ".skills-grid", start: "top 80%" }, y: 50, opacity: 0, duration: 0.6, delay: i * 0.1 });
            });

            const timelines = document.querySelectorAll('.timeline-node');
            timelines.forEach(node => {
                gsap.from(node, { scrollTrigger: { trigger: node, start: "top 85%" }, y: 50, opacity: 0, duration: 0.8 });
            });
        }
    </script>
</body>
</html>`;

fs.writeFileSync('disenador-grafico-barcelona.html', htmlContent, 'utf8');
console.log('V4 CV: 800+ words, Schema.org geo-localizado, title tags in assets, complete CV dump');
