const fs = require('fs');

const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mario Ocampo | Diseñador Gráfico en Barcelona & Lead Front-End Architect</title>
    <meta name="description" content="Portfolio de Mario Ocampo. Diseñador gráfico en Barcelona, arquitecto Front-End y experto en automatización con IA. Diseño brutalista y cyberpunk.">
    <link rel="canonical" href="https://vestraweb.es/disenador-grafico-barcelona">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&family=Rajdhani:wght@300;500;700&display=swap" rel="stylesheet">
    
    <!-- Three.js & GSAP -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>

    <style>
        :root {
            --color-primary: #f7484b; /* VestraWeb Red */
            --color-bg: #0a0a0a;
            --color-surface: #111111;
            --color-text: #f3f4f6;
            --color-muted: #6b7280;
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

        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 10px; }
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
        
        .glitch-wrapper { position: relative; display: inline-block; }
        
        .hero h1 {
            font-family: var(--font-heading);
            font-size: clamp(3rem, 8vw, 8rem);
            line-height: 1; text-transform: uppercase;
            font-weight: 700; color: transparent;
            -webkit-text-stroke: 2px var(--color-text);
            margin-bottom: 1rem;
        }
        
        .hero h1 span.filled {
            color: var(--color-primary);
            -webkit-text-stroke: 0;
            display: block;
        }

        .hero-subtitle {
            font-size: 1.5rem; max-width: 600px;
            border-left: 4px solid var(--color-primary);
            padding-left: 1.5rem; margin-top: 2rem;
            color: #d1d5db; font-weight: 500;
        }
        
        .hero-scroll {
            position: absolute; bottom: 3rem; left: 10%;
            font-family: var(--font-heading); font-size: 0.8rem;
            letter-spacing: 3px; text-transform: uppercase;
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0% { opacity: 0.5; }
            50% { opacity: 1; color: var(--color-primary); }
            100% { opacity: 0.5; }
        }

        /* MANIFESTO SECTION */
        .section { padding: 8rem 10%; position: relative; background: var(--color-bg); }
        .section-darker { background: var(--color-surface); }
        
        .section-title {
            font-family: var(--font-heading);
            font-size: clamp(2rem, 5vw, 4rem);
            color: var(--color-primary);
            margin-bottom: 4rem;
            text-transform: uppercase;
            border-bottom: 1px solid rgba(247, 72, 75, 0.3);
            padding-bottom: 1rem;
        }

        .manifesto-grid {
            display: grid; grid-template-columns: 1fr 1fr; gap: 4rem;
            align-items: center;
        }
        
        .manifesto-text p {
            font-size: 1.25rem; margin-bottom: 2rem;
            color: #9ca3af;
        }
        .manifesto-text p strong { color: var(--color-text); }
        
        .manifesto-stats {
            display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;
        }
        .stat-box {
            border: 1px solid rgba(255,255,255,0.1);
            padding: 2rem; background: rgba(0,0,0,0.5);
            backdrop-filter: blur(10px);
            border-left: 4px solid var(--color-primary);
        }
        .stat-num {
            font-family: var(--font-heading); font-size: 3rem;
            color: var(--color-primary); margin-bottom: 0.5rem;
        }
        .stat-label { font-size: 1.1rem; text-transform: uppercase; letter-spacing: 1px; }

        /* SKILLS GRID */
        .skills-grid {
            display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }
        .skill-card {
            background: #151515; border: 1px solid #222;
            padding: 3rem 2rem; position: relative;
            transition: all 0.3s ease;
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

        /* TIMELINE EXPERIENCIA */
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
            width: 45%; background: #151515; padding: 2.5rem;
            border: 1px solid #333; position: relative;
        }
        .timeline-node:nth-child(odd) .timeline-content { text-align: right; }
        
        .timeline-date {
            font-family: var(--font-heading); color: var(--color-primary);
            font-size: 0.9rem; margin-bottom: 1rem; letter-spacing: 2px;
        }
        .timeline-content h3 {
            font-family: var(--font-heading); font-size: 1.5rem; margin-bottom: 0.5rem;
        }
        .timeline-content h4 {
            color: #9ca3af; margin-bottom: 1.5rem; font-weight: 500; font-size: 1.1rem;
        }
        .timeline-content p { color: #d1d5db; }

        /* FOOTER CTA */
        .cyber-footer {
            padding: 10rem 10%; text-align: center;
            background: linear-gradient(0deg, #050505 0%, var(--color-surface) 100%);
            border-top: 1px solid #222;
        }
        .cyber-footer h2 {
            font-family: var(--font-heading); font-size: clamp(3rem, 6vw, 5rem);
            margin-bottom: 2rem; color: #fff; text-transform: uppercase;
        }
        .cyber-btn {
            display: inline-block; padding: 1.5rem 4rem;
            background: transparent; color: var(--color-primary);
            border: 2px solid var(--color-primary);
            font-family: var(--font-heading); font-size: 1.2rem;
            text-transform: uppercase; text-decoration: none;
            letter-spacing: 2px; transition: all 0.3s;
            position: relative; overflow: hidden;
        }
        .cyber-btn::before {
            content: ''; position: absolute; top: 0; left: 0;
            width: 100%; height: 100%; background: var(--color-primary);
            transform: scaleX(0); transform-origin: right;
            transition: transform 0.3s; z-index: -1;
        }
        .cyber-btn:hover { color: #000; box-shadow: 0 0 30px rgba(247, 72, 75, 0.4); }
        .cyber-btn:hover::before { transform: scaleX(1); transform-origin: left; }

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

    <!-- WebGL Background -->
    <div id="webgl-container"></div>

    <nav class="cv-nav">
        <a href="/">[ Volver a VestraWeb ]</a>
        <a href="mailto:hello@vestraweb.es">[ SYS.CONTACT ]</a>
    </nav>

    <header class="hero">
        <h1 class="hero-title">
            <span class="glitch" data-text="DISEÑADOR">DISEÑADOR</span><br>
            <span class="filled">GRÁFICO</span><br>
            <span class="glitch" data-text="EN BARCELONA">EN BARCELONA</span>
        </h1>
        <div class="hero-subtitle">
            <p><strong>MARIO OCAMPO // LEAD FRONT-END ARCHITECT</strong></p>
            <p>Diseño visual de impacto brutalista fusionado con ingeniería de software, IA y automatización. No hago webs, construyo máquinas de conversión.</p>
        </div>
        <div class="hero-scroll">SCROLL DOWN ↓</div>
    </header>

    <section class="section section-darker" id="manifesto">
        <h2 class="section-title">El Manifiesto</h2>
        <div class="manifesto-grid">
            <div class="manifesto-text">
                <p>Como <strong>diseñador gráfico en Barcelona</strong>, he visto demasiados sitios web que son hermosos pero inútiles, o sistemas potentes pero estéticamente muertos.</p>
                <p>Mi misión es erradicar esa brecha. Con 7 años de experiencia como <strong>Arquitecto Front-End</strong>, concibo el diseño no solo como una capa visual, sino como una estructura interactiva diseñada para guiar, convertir y deslumbrar.</p>
                <p>Desde la conceptualización de marcas (Branding) hasta el despliegue de e-commerce en React o WordPress y la automatización de ventas con Agentes de Voz (IA). <strong>El píxel perfecto es solo el principio; el código limpio es la base.</strong></p>
            </div>
            <div class="manifesto-stats">
                <div class="stat-box">
                    <div class="stat-num">07</div>
                    <div class="stat-label">Años de Experiencia</div>
                </div>
                <div class="stat-box">
                    <div class="stat-num">100%</div>
                    <div class="stat-label">Código a Medida</div>
                </div>
                <div class="stat-box">
                    <div class="stat-num">B2B</div>
                    <div class="stat-label">Enfoque Corporativo</div>
                </div>
                <div class="stat-box">
                    <div class="stat-num">IA</div>
                    <div class="stat-label">Automatización</div>
                </div>
            </div>
        </div>
    </section>

    <section class="section">
        <h2 class="section-title">Arsenal Técnico</h2>
        <div class="skills-grid">
            <div class="skill-card">
                <div class="skill-icon">UI</div>
                <h3>Frontend & UI/UX</h3>
                <p>Diseño de interfaces deslumbrantes y escalables. Dominio de React.js, Next.js, HTML5, CSS3, Tailwind CSS y animaciones avanzadas (GSAP, Three.js) para experiencias inmersivas.</p>
            </div>
            <div class="skill-card">
                <div class="skill-icon">DB</div>
                <h3>Backend & Arquitectura</h3>
                <p>Infraestructuras sólidas como roca. Node.js, Python, PHP, SQL, Prisma. Despliegue con Docker y Caddy para asegurar tiempos de respuesta milisegundos.</p>
            </div>
            <div class="skill-card">
                <div class="skill-icon">AI</div>
                <h3>Inteligencia Artificial</h3>
                <p>Automatizaciones disruptivas: Agentes de voz IA (Vapi), LLMs conversacionales, WhatsApp API, n8n y Webhooks para revolucionar procesos de ventas.</p>
            </div>
            <div class="skill-card">
                <div class="skill-icon">WP</div>
                <h3>CMS & E-Commerce</h3>
                <p>Desarrollo profundo de temas y plugins personalizados en WordPress y WooCommerce. Diseño de vitrinas digitales optimizadas para conversión.</p>
            </div>
        </div>
    </section>

    <section class="section section-darker">
        <h2 class="section-title">El Camino (Experiencia)</h2>
        <div class="cyber-timeline">
            
            <div class="timeline-node">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <div class="timeline-date">2022 - PRESENTE</div>
                    <h3>Lead Front-End & Automation</h3>
                    <h4>Vestra Solutions / VestraWeb</h4>
                    <p>Lidero el diseño visual y la arquitectura de plataformas B2B. Implemento Inteligencia artificial conversacional para call centers e integro flujos de datos masivos. Diseñé la vitrina web de VestraWeb superando auditorías extremas de Core Web Vitals.</p>
                </div>
            </div>

            <div class="timeline-node">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <div class="timeline-date">SECTOR FINANCIERO</div>
                    <h3>UI Engineer - Gelt Dashboard</h3>
                    <h4>Proyecto Destacado</h4>
                    <p>Diseño y desarrollo de un Dashboard robusto en React/Vite para conciliación bancaria. UI limpia y funcional que automatiza el cruce de datos financieros (Addi, Brilla), logrando un 100% de fiabilidad visual y técnica.</p>
                </div>
            </div>

            <div class="timeline-node">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <div class="timeline-date">E-COMMERCE USA</div>
                    <h3>Diseño UX & Full-Stack</h3>
                    <h4>Nonesuch Precision</h4>
                    <p>Fabricante de armamento requería un e-commerce inquebrantable. Construí el diseño a medida en WordPress y sincronicé dinámicamente su complejo catálogo. Seguridad militar con diseño premium.</p>
                </div>
            </div>

            <div class="timeline-node">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <div class="timeline-date">2020 - 2022</div>
                    <h3>Front-End & UI Developer</h3>
                    <h4>Raccoon Technologies / Deuslink</h4>
                    <p>Resolución de problemas críticos de rendimiento y UX en apps de alta demanda. Refactorización de código y optimización estricta de SEO y LCP, mejorando métricas en más del 40%.</p>
                </div>
            </div>

        </div>
    </section>

    <footer class="cyber-footer">
        <h2>¿INICIAMOS LA SECUENCIA?</h2>
        <p style="color: #9ca3af; font-size: 1.5rem; margin-bottom: 4rem;">Tú pones la visión. Yo diseño y construyo la máquina.</p>
        <a href="mailto:hello@vestraweb.es" class="cyber-btn">CONTACTAR A MARIO</a>
    </footer>

    <!-- Three.js Cyberpunk Grid Animation -->
    <script>
        const container = document.getElementById('webgl-container');
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x0a0a0a, 0.0015);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Cyber Grid Floor
        const planeGeometry = new THREE.PlaneGeometry(200, 200, 40, 40);
        
        // Manipulate vertices for a rugged terrain look
        const positions = planeGeometry.attributes.position.array;
        for(let i = 0; i < positions.length; i += 3) {
            positions[i+2] = Math.random() * 2; // Z-axis displacement
        }

        const planeMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xf7484b, 
            wireframe: true,
            transparent: true,
            opacity: 0.15
        });
        
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = -Math.PI / 2;
        plane.position.y = -5;
        scene.add(plane);

        // Floating Particles (Data bits)
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 700;
        const posArray = new Float32Array(particlesCount * 3);
        
        for(let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 100;
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.1,
            color: 0xffffff,
            transparent: true,
            opacity: 0.5
        });
        
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        camera.position.z = 15;
        camera.position.y = 2;

        // Mouse interaction
        let mouseX = 0;
        let mouseY = 0;
        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth) - 0.5;
            mouseY = (e.clientY / window.innerHeight) - 0.5;
        });

        // Animation Loop
        const clock = new THREE.Clock();
        function animate() {
            requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();

            // Move grid forward to simulate movement
            plane.position.z = (elapsedTime * 2) % 5;
            
            // Rotate particles slowly
            particlesMesh.rotation.y = elapsedTime * 0.05;
            
            // Camera follow mouse slightly
            camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
            camera.position.y += (-mouseY * 5 - camera.position.y) * 0.05 + 0.01; // Keep it above ground
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        }
        animate();

        // Handle Resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // GSAP Animations
        gsap.registerPlugin(ScrollTrigger);
        
        gsap.from(".hero-title span", {
            y: 50, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out"
        });
        
        gsap.from(".hero-subtitle", {
            y: 30, opacity: 0, duration: 1, delay: 0.8, ease: "power3.out"
        });

        const sections = document.querySelectorAll('.section-title');
        sections.forEach(sec => {
            gsap.from(sec, {
                scrollTrigger: { trigger: sec, start: "top 80%" },
                x: -50, opacity: 0, duration: 0.8
            });
        });

        const skills = document.querySelectorAll('.skill-card');
        skills.forEach((skill, i) => {
            gsap.from(skill, {
                scrollTrigger: { trigger: ".skills-grid", start: "top 80%" },
                y: 50, opacity: 0, duration: 0.6, delay: i * 0.1
            });
        });

        const timelines = document.querySelectorAll('.timeline-node');
        timelines.forEach(node => {
            gsap.from(node, {
                scrollTrigger: { trigger: node, start: "top 85%" },
                y: 50, opacity: 0, duration: 0.8
            });
        });
    </script>
</body>
</html>`;

fs.writeFileSync('disenador-grafico-barcelona.html', htmlContent, 'utf8');
console.log('Fixed the HTML and generated the new Cyberpunk Three.js CV page');
