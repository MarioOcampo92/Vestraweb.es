const fs = require('fs');

const htmlPath = 'disenador-grafico-barcelona.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Fix the Header Gap (Unstyled Header) by injecting style.css link
if (!html.includes('<link rel="stylesheet" href="style.css">') && !html.includes('<link rel="stylesheet" href="/style.css">')) {
    html = html.replace('</head>', '    <link rel="stylesheet" href="/style.css">\n</head>');
}

// 2. Fix the H1 SEO duplication (Adding aria-hidden="true")
html = html.replace('<div class="glitch-layer glitch-cyan">DISEÑADOR<br>GRÁFICO EN<br>BARCELONA</div>', '<div class="glitch-layer glitch-cyan" aria-hidden="true">DISEÑADOR<br>GRÁFICO EN<br>BARCELONA</div>');
html = html.replace('<div class="glitch-layer glitch-magenta">DISEÑADOR<br>GRÁFICO EN<br>BARCELONA</div>', '<div class="glitch-layer glitch-magenta" aria-hidden="true">DISEÑADOR<br>GRÁFICO EN<br>BARCELONA</div>');

// 3. Create a BRUTAL Three.js Timeline
// First, we replace the timeline HTML with a 3D timeline layout
const oldTimelineRegex = /<div class="cyber-timeline">[\s\S]*?<\/section>/;

const newTimelineHTML = `
    <!-- BRUTAL 3D TIMELINE -->
    <section class="section" id="timeline-section" style="position: relative; overflow: hidden; padding: 12rem 5%;">
        <!-- Localized ThreeJS Canvas for Timeline Background -->
        <div id="timeline-canvas-container" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; opacity: 0.7;"></div>
        
        <div style="position: relative; z-index: 2; max-width: 1200px; margin: 0 auto;">
            <h2 class="section-title" style="text-align: center; margin-bottom: 6rem; text-shadow: 0 0 20px rgba(247,72,75,0.5);">El Camino <br><span style="color:#fff; font-size:0.6em;">(Experiencia Operativa)</span></h2>
            
            <div class="timeline-3d-container">
                
                <div class="t3d-node">
                    <div class="t3d-glass-card">
                        <div class="t3d-glow"></div>
                        <div class="t3d-date">2023 - PRESENT</div>
                        <h3>Lead Front-End & Automation Architect</h3>
                        <h4>Vestra Solutions / VestraWeb</h4>
                        <p>Dirección técnica de plataformas de alto rendimiento. Desarrollo de arquitecturas headless, integraciones B2B complejas (APIs, Webhooks, CRMs) y sistemas de automatización con IA. Optimización milimétrica de LCP/CLS y escalabilidad de servidores.</p>
                    </div>
                </div>

                <div class="t3d-node">
                    <div class="t3d-glass-card">
                        <div class="t3d-glow"></div>
                        <div class="t3d-date">SISTEMAS B2B CORE</div>
                        <h3>Multi-Tenant Email Processor</h3>
                        <h4>Desarrollo Interno Corporativo</h4>
                        <p>Diseño y despliegue de un procesador de emails en Python con webhooks para analizar flujos masivos de correos B2B (proveedores de vehículos). Extracción de datos en tiempo real mediante LLMs y sincronización directa con bases de datos MySQL, ahorrando cientos de horas mensuales.</p>
                    </div>
                </div>

                <div class="t3d-node">
                    <div class="t3d-glass-card">
                        <div class="t3d-glow"></div>
                        <div class="t3d-date">FINTECH SECTOR</div>
                        <h3>Ingeniero UI/UX - Gelt Dashboard</h3>
                        <h4>Dashboard de Conciliación Financiera</h4>
                        <p>Diseñé y desarrollé un Dashboard robusto (React/Vite) que captura la información transaccional y automatiza el cotejo cruzado contra entidades (Addi, Brilla, Superintendencia). Conciliación inmediata y 100% libre de errores humanos.</p>
                    </div>
                </div>

                <div class="t3d-node">
                    <div class="t3d-glass-card">
                        <div class="t3d-glow"></div>
                        <div class="t3d-date">SECTOR COMERCIAL VENTA</div>
                        <h3>CRM & AI Autonomous Agent</h3>
                        <h4>Camacho Phones Corp</h4>
                        <p>Desarrollé un CRM a medida con Dashboard administrativo e integré un agente de Inteligencia Artificial (LLM) que atiende WhatsApp de forma totalmente autónoma. Perfila clientes, responde consultas y cierra ventas reales.</p>
                    </div>
                </div>
                
            </div>
        </div>
    </section>
`;

html = html.replace(oldTimelineRegex, newTimelineHTML);

// 4. Add the CSS for the new 3D timeline
const cssRegex = /<\/style>/;
const newTimelineCSS = `
        .timeline-3d-container {
            display: flex;
            flex-direction: column;
            gap: 6rem;
            perspective: 1500px;
        }
        .t3d-node {
            display: flex;
            justify-content: flex-end;
            width: 100%;
            opacity: 0;
            transform: translateY(100px) rotateX(20deg) scale(0.9);
            transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .t3d-node:nth-child(even) {
            justify-content: flex-start;
        }
        .t3d-node.in-view {
            opacity: 1;
            transform: translateY(0) rotateX(0deg) scale(1);
        }
        .t3d-glass-card {
            background: rgba(10, 10, 10, 0.6);
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            border: 1px solid rgba(255, 255, 255, 0.05);
            padding: 3rem;
            width: 100%;
            max-width: 600px;
            border-radius: 16px;
            position: relative;
            overflow: hidden;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
        }
        .t3d-glass-card::before {
            content: ''; position: absolute; top: 0; left: -100%; width: 50%; height: 100%;
            background: linear-gradient(90deg, transparent, rgba(247, 72, 75, 0.1), transparent);
            transform: skewX(-20deg); transition: 0.5s;
        }
        .t3d-node:hover .t3d-glass-card::before { left: 200%; transition: 1s ease-in-out; }
        
        .t3d-date {
            font-family: monospace; color: var(--color-primary);
            font-size: 0.9rem; letter-spacing: 2px; margin-bottom: 1rem;
            display: inline-block; padding: 0.3rem 1rem;
            background: rgba(247,72,75,0.1); border-radius: 20px;
        }
        .t3d-glass-card h3 {
            font-family: var(--font-heading); font-size: 2rem; color: #fff; margin-bottom: 0.5rem; line-height: 1.1; text-transform: uppercase;
        }
        .t3d-glass-card h4 {
            font-family: var(--font-body); color: #a1a1aa; font-weight: 500; font-size: 1.1rem; margin-bottom: 1.5rem;
        }
        .t3d-glass-card p {
            color: #888; font-size: 1rem; line-height: 1.7;
        }
        .t3d-node:nth-child(even) .t3d-glass-card {
            border-right: 3px solid var(--color-primary);
            border-left: 1px solid rgba(255, 255, 255, 0.05);
        }
        .t3d-node:nth-child(odd) .t3d-glass-card {
            border-left: 3px solid var(--color-primary);
            border-right: 1px solid rgba(255, 255, 255, 0.05);
        }
        @media (max-width: 768px) {
            .t3d-node { justify-content: center !important; }
            .t3d-node:nth-child(even) .t3d-glass-card, .t3d-node:nth-child(odd) .t3d-glass-card {
                border-left: 3px solid var(--color-primary); border-right: none;
            }
        }
</style>`;
html = html.replace(cssRegex, newTimelineCSS);

// 5. Add the ThreeJS logic for the Timeline Background Vortex
const scriptInjectRegex = /<\/script>\s*<\/body>/;
const newScript = `
        // TIMELINE SCROLL ANIMATION
        const timelineNodes = document.querySelectorAll('.t3d-node');
        const tlObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, { threshold: 0.1 });
        timelineNodes.forEach(node => tlObserver.observe(node));

        // TIMELINE THREE.JS VORTEX EFFECT
        function initTimelineThreeJS() {
            if (typeof THREE === 'undefined') return;
            const container = document.getElementById('timeline-canvas-container');
            if(!container) return;
            
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            
            renderer.setSize(container.clientWidth, container.clientHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            container.appendChild(renderer.domElement);

            // Create a 3D DNA/Vortex shape
            const geometry = new THREE.BufferGeometry();
            const count = 1500;
            const positions = new Float32Array(count * 3);
            const colors = new Float32Array(count * 3);
            const color1 = new THREE.Color(0xf7484b); // Primary Red
            const color2 = new THREE.Color(0x333333); // Dark

            for(let i = 0; i < count; i++) {
                const t = i / count * Math.PI * 20; // 10 turns
                const radius = 2 + Math.random() * 0.5;
                
                positions[i*3] = Math.cos(t) * radius; // x
                positions[i*3+1] = (i / count - 0.5) * 30; // y (spread vertically)
                positions[i*3+2] = Math.sin(t) * radius; // z

                const mixedColor = color1.clone().lerp(color2, Math.random());
                colors[i*3] = mixedColor.r;
                colors[i*3+1] = mixedColor.g;
                colors[i*3+2] = mixedColor.b;
            }

            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

            const material = new THREE.PointsMaterial({
                size: 0.1,
                vertexColors: true,
                transparent: true,
                opacity: 0.6,
                blending: THREE.AdditiveBlending
            });

            const pointCloud = new THREE.Points(geometry, material);
            scene.add(pointCloud);

            camera.position.z = 8;
            camera.position.y = 0;

            let scrollY = 0;
            window.addEventListener('scroll', () => {
                scrollY = window.scrollY;
            });

            let time = 0;
            function animate() {
                requestAnimationFrame(animate);
                time += 0.005;

                // Rotate the vortex based on time and scroll
                pointCloud.rotation.y = time + (scrollY * 0.001);
                pointCloud.rotation.x = scrollY * 0.0005;
                
                // Camera smoothly follows the vertical spread slightly
                camera.position.y = Math.sin(time) * 2;

                renderer.render(scene, camera);
            }
            animate();

            window.addEventListener('resize', () => {
                if(!container) return;
                camera.aspect = container.clientWidth / container.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(container.clientWidth, container.clientHeight);
            });
        }
        
        // Initialize the new ThreeJS scene for the timeline
        window.addEventListener('load', () => {
            initTimelineThreeJS();
        });
</script>
</body>`;

html = html.replace(scriptInjectRegex, newScript);

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Fixes applied successfully!');
