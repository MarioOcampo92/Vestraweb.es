const fs = require('fs');

const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Diseño Web WordPress Barcelona</title>
    <meta name="description" content="Diseño Web WordPress Barcelona a medida. Arquitectura Front-End, UI/UX y sitios web optimizados para SEO local.">
    <link rel="canonical" href="https://vestraweb.es/disenador-grafico-barcelona">
    <meta name="robots" content="index, follow">
    
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

        /* Navigation */
        .cv-nav {
            position: fixed; top: 0; left: 0; width: 100%;
            padding: 1.5rem 3rem; display: flex; justify-content: space-between;
            z-index: 1000; mix-blend-mode: difference;
            font-family: var(--font-heading);
            font-size: 0.9rem; text-transform: uppercase; letter-spacing: 2px;
        }
        .cv-nav a { color: #fff; text-decoration: none; transition: color 0.3s; }
        .cv-nav a:hover { color: var(--color-primary); }

        /* HERO SECTION */
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

        /* SECTIONS */
        .section { padding: 8rem 10%; position: relative; background: var(--color-bg); }
        .section-darker { background: var(--color-surface); border-top: 1px solid #111; border-bottom: 1px solid #111; }
        
        .section-title {
            font-family: var(--font-heading);
            font-size: clamp(2rem, 4vw, 3.5rem);
            color: var(--color-primary);
            margin-bottom: 4rem;
            text-transform: uppercase;
        }

        /* MANIFESTO */
        .manifesto-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
        .manifesto-text p { font-size: 1.25rem; margin-bottom: 2rem; color: #9ca3af; }

        /* SKILLS GRID (RESTORED) */
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

        /* NEW COOL SECTION: SCROLLING MARQUEE */
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

        /* TIMELINE EXPERIENCIA (RESTORED) */
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

        /* PORTFOLIO PRO */
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
            width: 100%;
            height: 400px;
            transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .pro-card:hover .pro-card-inner {
            transform: scale(1.02) translateY(-10px);
        }

        .pro-image {
            width: 100%; height: 100%; object-fit: cover;
            filter: grayscale(100%) contrast(1.2);
            transition: filter 0.5s;
        }
        
        .pro-card:hover .pro-image {
            filter: grayscale(0%) contrast(1);
        }

        .pro-overlay {
            position: absolute; bottom: 0; left: 0; width: 100%;
            padding: 2rem; background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
            transform: translateY(20px); opacity: 0;
            transition: all 0.4s;
        }

        .pro-card:hover .pro-overlay {
            transform: translateY(0); opacity: 1;
        }

        .pro-overlay h3 { font-family: var(--font-heading); font-size: 1.5rem; color: #fff; }
        .pro-overlay p { color: var(--color-primary); font-weight: 700; margin-top: 0.5rem; text-transform: uppercase; letter-spacing: 1px;}

        /* FOOTER */
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
            <p>Especialista en <strong>Diseño Web WordPress Barcelona</strong>. Creando experiencias visuales brutales con rendimiento extremo (Core Web Vitals) y automatización IA.</p>
        </div>
    </header>

    <section class="section section-darker">
        <h2 class="section-title">El Manifiesto</h2>
        <div class="manifesto-grid">
            <div class="manifesto-text">
                <p>El diseño gráfico moderno no vive en un lienzo estático. Vive en el DOM, en el servidor y en la interacción. Como experto en <strong>Diseño Web WordPress en Barcelona</strong>, fusiono la arquitectura técnica (React, Node.js, Custom Themes) con una estética implacable.</p>
                <p>Desde la conceptualización de marcas hasta el despliegue de e-commerce en WordPress y la automatización de ventas con Agentes de Voz (IA). <strong>El píxel perfecto es solo el principio; el código limpio es la base.</strong></p>
            </div>
            <div style="text-align: right;">
                <img src="/assets/agencia-diseno-web-wordpress-barcelona-equipo.svg" alt="Equipo de Diseño Web WordPress en Barcelona" style="width: 100%; max-width: 400px; filter: drop-shadow(0 0 20px rgba(247,72,75,0.2));" loading="lazy">
            </div>
        </div>
    </section>

    <!-- RESTORED: SKILLS SECTION -->
    <section class="section">
        <h2 class="section-title">Arsenal Técnico</h2>
        <div class="skills-grid">
            <div class="skill-card">
                <div class="skill-icon">UI</div>
                <h3>Frontend & UI/UX</h3>
                <p>Diseño de interfaces deslumbrantes y escalables. Dominio de React.js, Next.js, HTML5, CSS3, Tailwind CSS y animaciones avanzadas (GSAP, Three.js).</p>
            </div>
            <div class="skill-card">
                <div class="skill-icon">DB</div>
                <h3>Backend & Arquitectura</h3>
                <p>Infraestructuras sólidas como roca. Node.js, Python, PHP, SQL, Prisma. Despliegue con Docker y Caddy para tiempos de respuesta milisegundos.</p>
            </div>
            <div class="skill-card">
                <div class="skill-icon">AI</div>
                <h3>Inteligencia Artificial</h3>
                <p>Automatizaciones disruptivas: Agentes de voz IA (Vapi), LLMs conversacionales, WhatsApp API, n8n y Webhooks para revolucionar ventas.</p>
            </div>
            <div class="skill-card">
                <div class="skill-icon">WP</div>
                <h3>CMS & E-Commerce</h3>
                <p>Desarrollo profundo de temas y plugins personalizados en WordPress y WooCommerce. Diseño de vitrinas optimizadas para conversión.</p>
            </div>
        </div>
    </section>

    <!-- NEW BRUTAL SECTION: SCROLLING MARQUEE -->
    <div class="marquee-container">
        <div class="marquee-content">
            <!-- Repeated twice for seamless loop -->
            <span>UI/UX DESIGN</span> <span>•</span> <span>WORDPRESS DEVELOPMENT</span> <span>•</span> <span>REACT.JS</span> <span>•</span> <span>3D ANIMATION</span> <span>•</span> <span>SEO CORE WEB VITALS</span> <span>•</span> <span>AI VOICE AGENTS</span> <span>•</span>
            <span>UI/UX DESIGN</span> <span>•</span> <span>WORDPRESS DEVELOPMENT</span> <span>•</span> <span>REACT.JS</span> <span>•</span> <span>3D ANIMATION</span> <span>•</span> <span>SEO CORE WEB VITALS</span> <span>•</span> <span>AI VOICE AGENTS</span> <span>•</span>
        </div>
    </div>

    <!-- RESTORED: TIMELINE SECTION -->
    <section class="section section-darker">
        <h2 class="section-title">El Camino (Experiencia)</h2>
        <div class="cyber-timeline">
            <div class="timeline-node">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <div class="timeline-date">2022 - PRESENTE</div>
                    <h3>Lead Front-End & Automation</h3>
                    <h4>Vestra Solutions / VestraWeb</h4>
                    <p>Lidero el diseño visual y la arquitectura de plataformas B2B. Implemento Inteligencia artificial conversacional para call centers e integro flujos masivos de datos. Desarrollé la arquitectura ultraligera del portfolio de VestraWeb.</p>
                </div>
            </div>

            <div class="timeline-node">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <div class="timeline-date">SECTOR FINANCIERO</div>
                    <h3>UI Engineer - Gelt Dashboard</h3>
                    <h4>Proyecto Destacado</h4>
                    <p>Diseño y desarrollo de un Dashboard robusto en React/Vite para conciliación bancaria. UI funcional que automatiza el cruce de transacciones con entidades como Addi y Brilla, eliminando el 100% de errores manuales.</p>
                </div>
            </div>

            <div class="timeline-node">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <div class="timeline-date">E-COMMERCE USA</div>
                    <h3>Diseño UX & Full-Stack</h3>
                    <h4>Nonesuch Precision</h4>
                    <p>Construí un e-commerce de armamento de alta seguridad a medida en WordPress. Sincronicé dinámicamente un complejo catálogo con redes sociales asegurando consistencia de marca y ventas automatizadas.</p>
                </div>
            </div>

            <div class="timeline-node">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <div class="timeline-date">2020 - 2022</div>
                    <h3>Front-End Developer & UI Engineer</h3>
                    <h4>Raccoon Technologies / Deuslink</h4>
                    <p>Resolución de problemas críticos de rendimiento y UX en apps de alta demanda. Refactorización ágil de código legado y optimización estricta de SEO y LCP, mejorando la velocidad de carga en más de un 40%.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- PORTFOLIO SECTION -->
    <section class="section">
        <h2 class="section-title">Obras Maestras (Portfolio)</h2>
        <div class="pro-gallery">
            <div class="pro-card">
                <div class="pro-card-inner">
                    <img src="/assets/diseno-web-barcelona-ecommerce-mellows-1.jpg" alt="Diseño Web WordPress Barcelona para Mellows Ecommerce" class="pro-image" loading="lazy">
                    <div class="pro-overlay">
                        <h3>Mellows</h3>
                        <p>E-commerce WordPress UX/UI</p>
                    </div>
                </div>
            </div>
            <div class="pro-card">
                <div class="pro-card-inner">
                    <img src="/assets/diseno-web-barcelona-estudio-arquitectura-au-1.jpg" alt="Agencia de Diseño Web WordPress Barcelona AU Arquitectos" class="pro-image" loading="lazy">
                    <div class="pro-overlay">
                        <h3>AU Arquitectos</h3>
                        <p>Diseño Corporativo Brutalista</p>
                    </div>
                </div>
            </div>
            <div class="pro-card">
                <div class="pro-card-inner">
                    <img src="/assets/diseno-web-barcelona-restaurante-selva-1.png" alt="Desarrollo y Diseño Web WordPress Barcelona Selva Sabores" class="pro-image" loading="lazy">
                    <div class="pro-overlay">
                        <h3>Selva de Sabores</h3>
                        <p>Plataforma Gastronómica Interactiva</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <footer class="cyber-footer">
        <h2 style="font-family: var(--font-heading); color: #fff; font-size: 3rem; margin-bottom: 2rem;">¿DESPLEGAMOS TU WEB?</h2>
        <a href="mailto:hello@vestraweb.es" class="cyber-btn">INICIAR SECUENCIA</a>
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
console.log('V3 Cyberpunk CV: Restored missing Bio sections, added Marquee section, kept H1 keyword');
