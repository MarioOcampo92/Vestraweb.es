const fs = require('fs');

const HTML_FILE = 'disenador-grafico-barcelona.html';
let htmlContent = fs.readFileSync(HTML_FILE, 'utf8');

// 1. ADD CSS FOR GLITCH FRAME AND BRUTALIST GRID
const brutalistCss = `
        /* GLITCH HERO */
        .glitch-wrapper {
            position: relative;
            display: inline-block;
        }
        .glitch-layer {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            opacity: 0.8;
            mix-blend-mode: screen;
        }
        .glitch-cyan {
            color: #00f0ff;
            transform: translate(-3px, 1px);
            clip-path: polygon(0 10%, 100% 10%, 100% 20%, 0 20%);
            animation: glitch-anim-1 2s infinite linear alternate-reverse;
        }
        .glitch-magenta {
            color: #ff2bd6;
            transform: translate(3px, -1px);
            clip-path: polygon(0 60%, 100% 60%, 100% 70%, 0 70%);
            animation: glitch-anim-2 2.5s infinite linear alternate-reverse;
        }
        @keyframes glitch-anim-1 {
            0% { clip-path: polygon(0 10%, 100% 10%, 100% 20%, 0 20%); transform: translate(-3px, 1px); }
            20% { clip-path: polygon(0 40%, 100% 40%, 100% 50%, 0 50%); transform: translate(3px, -2px); }
            40% { clip-path: polygon(0 80%, 100% 80%, 100% 90%, 0 90%); transform: translate(-3px, 3px); }
            60% { clip-path: polygon(0 20%, 100% 20%, 100% 30%, 0 30%); transform: translate(4px, -1px); }
            80% { clip-path: polygon(0 60%, 100% 60%, 100% 70%, 0 70%); transform: translate(-2px, 2px); }
            100% { clip-path: polygon(0 5%, 100% 5%, 100% 15%, 0 15%); transform: translate(2px, -3px); }
        }
        @keyframes glitch-anim-2 {
            0% { clip-path: polygon(0 60%, 100% 60%, 100% 70%, 0 70%); transform: translate(3px, -1px); }
            20% { clip-path: polygon(0 15%, 100% 15%, 100% 25%, 0 25%); transform: translate(-2px, 3px); }
            40% { clip-path: polygon(0 50%, 100% 50%, 100% 60%, 0 60%); transform: translate(4px, -2px); }
            60% { clip-path: polygon(0 85%, 100% 85%, 100% 95%, 0 95%); transform: translate(-3px, 2px); }
            80% { clip-path: polygon(0 30%, 100% 30%, 100% 40%, 0 40%); transform: translate(2px, -1px); }
            100% { clip-path: polygon(0 75%, 100% 75%, 100% 85%, 0 85%); transform: translate(-4px, 1px); }
        }
        .hero-top-data {
            font-family: monospace;
            font-size: 12px;
            color: #fff;
            opacity: 0.6;
            margin-bottom: 2rem;
            letter-spacing: 2px;
        }
        .ascii-noise {
            position: absolute;
            font-family: monospace;
            color: var(--color-primary);
            opacity: 0.3;
            font-size: 10px;
            pointer-events: none;
        }

        /* BRUTALIST TELEMETRY UI */
        .brutalist-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1px;
            background-color: #222; /* grid lines */
            border: 1px solid #222;
            margin-top: 4rem;
        }
        @media (max-width: 768px) {
            .brutalist-grid { grid-template-columns: 1fr; }
        }
        .b-cell {
            background-color: #050505;
            padding: 3rem;
            position: relative;
        }
        .b-title {
            font-family: monospace;
            color: #EAEAEA;
            font-size: 0.85rem;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            margin-bottom: 1.5rem;
            display: flex;
            justify-content: space-between;
        }
        .b-title span { color: var(--color-primary); }
        .b-content {
            font-family: var(--font-heading);
            font-size: 2rem;
            color: #fff;
            text-transform: uppercase;
            line-height: 1.1;
        }
        .b-data {
            font-family: monospace;
            color: #9ca3af;
            font-size: 0.9rem;
            margin-top: 1rem;
        }
        .crosshair {
            position: absolute;
            width: 10px; height: 10px;
            border-top: 1px solid var(--color-primary);
            border-left: 1px solid var(--color-primary);
            top: -1px; left: -1px;
        }
`;

htmlContent = htmlContent.replace('</style>', brutalistCss + '\n    </style>');

// 2. UPGRADE HERO WITH GLITCH FRAME SKILL
const newHero = `
    <header class="hero" style="background-image: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.2) 2px, rgba(0,0,0,0.2) 4px);">
        <div class="ascii-noise" style="top: 20%; left: 5%;">█▓▒░ CH-04</div>
        <div class="ascii-noise" style="bottom: 20%; right: 5%;">[SYS_ERR] ░▒▓█</div>
        <div class="hero-top-data">>> SIGNAL_LOST · SYS-04 · 14:32:08</div>
        <h1 class="hero-title glitch-wrapper">
            <span class="filled" style="color: #fff;">DISEÑO WEB</span><br>
            <span class="filled" style="color: #fff;">WORDPRESS</span><br>
            <span class="filled" style="color: #fff;">BARCELONA</span>
            <div class="glitch-layer glitch-cyan">DISEÑO WEB<br>WORDPRESS<br>BARCELONA</div>
            <div class="glitch-layer glitch-magenta">DISEÑO WEB<br>WORDPRESS<br>BARCELONA</div>
        </h1>
        <div class="hero-subtitle">
            <p style="font-family: monospace; font-size: 1rem;">[ ̶▒̶ IDENTIDAD VERIFICADA ]<br>Especialista en <strong>Diseño Web WordPress Barcelona</strong>. Arquitectura Front-End y Diseñador Gráfico enfocado en rendimiento extremo (Core Web Vitals).</p>
        </div>
    </header>
`;
htmlContent = htmlContent.replace(/<header class="hero">[\s\S]*?<\/header>/, newHero);

// 3. ADD BRUTALIST TELEMETRY SECTION
const brutalistSection = `
    <!-- BRUTALIST TACTICAL TELEMETRY SECTION -->
    <section class="section">
        <div class="h2" style="font-family: var(--font-heading); color: #fff; font-size: clamp(2rem, 4vw, 3rem);"><span style="color: var(--color-primary);">></span> TELEMETRÍA Y PROCESOS</div>
        <div class="brutalist-grid">
            <div class="b-cell">
                <div class="crosshair"></div>
                <div class="b-title">[ FASE_01 ] <span>// AUDITORÍA</span></div>
                <div class="b-content">Análisis<br>Estructural</div>
                <div class="b-data">Desmontaje del DOM actual. Detección de cuellos de botella en LCP y FCP. Trazado de arquitectura de datos.</div>
            </div>
            <div class="b-cell">
                <div class="crosshair"></div>
                <div class="b-title">[ FASE_02 ] <span>// PROTOTIPADO</span></div>
                <div class="b-content">Diseño<br>Mecánico</div>
                <div class="b-data">Sistemas de diseño rígidos. Tipografía suiza funcional. UI de alta conversión sin grasa visual innecesaria.</div>
            </div>
            <div class="b-cell">
                <div class="crosshair"></div>
                <div class="b-title">[ FASE_03 ] <span>// ENSAMBLAJE</span></div>
                <div class="b-content">Código<br>Implacable</div>
                <div class="b-data">Desarrollo Custom Theme en WordPress. React B2B apps. Inyección de microdatos JSON-LD para SEO Local.</div>
            </div>
            <div class="b-cell">
                <div class="crosshair"></div>
                <div class="b-title">[ FASE_04 ] <span>// DESPLIEGUE</span></div>
                <div class="b-content">Lanzamiento<br>Aeroespacial</div>
                <div class="b-data">Testing A/B de velocidad. Configuración de CDN. Monitoreo constante de tráfico y latencia.</div>
            </div>
        </div>
    </section>
`;
// Insert Brutalist section right after "Arsenal Técnico"
htmlContent = htmlContent.replace('</section>\n\n    <!-- SCROLLING MARQUEE -->', '</section>\n' + brutalistSection + '\n    <!-- SCROLLING MARQUEE -->');

fs.writeFileSync(HTML_FILE, htmlContent, 'utf8');
console.log('Successfully injected Glitch Hero and Brutalist Telemetry sections');
