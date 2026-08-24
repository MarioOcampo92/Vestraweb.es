const fs = require('fs');
let html = fs.readFileSync('disenador-grafico-barcelona.html', 'utf8');

const brutalistCSS = `
        /* BRUTALIST ARSENAL GRID */
        .brutalist-arsenal {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1px;
            background-color: #222;
            border: 1px solid #222;
            margin: 2rem auto;
            width: 100%;
        }
        .b-card {
            background-color: #050505;
            padding: 3rem;
            position: relative;
            transition: background-color 0.3s;
        }
        .b-card:hover {
            background-color: #0a0a0a;
        }
        .b-card-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 2rem;
            border-bottom: 1px solid #222;
            padding-bottom: 1rem;
        }
        .b-card-id {
            font-family: monospace;
            color: var(--color-primary);
            font-size: 0.85rem;
            letter-spacing: 2px;
        }
        .b-card-icon {
            font-family: var(--font-heading);
            font-size: 2rem;
            color: #333;
            line-height: 1;
        }
        .b-card h3 {
            font-family: var(--font-heading);
            font-size: 1.25rem;
            color: #EAEAEA;
            text-transform: uppercase;
            margin-bottom: 1rem;
            line-height: 1.2;
        }
        .b-card p {
            font-family: monospace;
            color: #9ca3af;
            font-size: 0.9rem;
            line-height: 1.5;
        }
        .b-cross {
            position: absolute;
            width: 8px; height: 8px;
            border-top: 1px solid var(--color-primary);
            border-left: 1px solid var(--color-primary);
        }
        .b-cross.tl { top: -1px; left: -1px; }
        .b-cross.tr { top: -1px; right: -1px; transform: rotate(90deg); }
        .b-cross.bl { bottom: -1px; left: -1px; transform: rotate(-90deg); }
        .b-cross.br { bottom: -1px; right: -1px; transform: rotate(180deg); }
`;

if (!html.includes('.brutalist-arsenal')) {
    html = html.replace('</style>', brutalistCSS + '\n</style>');
}

const start = html.indexOf('<!-- ARSENAL TÉCNICO -->');
const end = html.indexOf('<!-- El CAMINO -->');

const replacementHtml = `<!-- ARSENAL TÉCNICO -->
    <section class="section">
        <div style="font-family: monospace; color: var(--color-primary); letter-spacing: 4px; margin-bottom: 1rem;">[ SYS.MODULE.02 ]</div>
        <h2 class="section-title" style="margin-bottom: 4rem; text-align: left; font-size: clamp(2rem, 4vw, 4rem); max-width: 800px;">ARSENAL TÉCNICO: HERRAMIENTAS DE UN DISEÑADOR GRÁFICO EN BARCELONA</h2>
        
        <div class="brutalist-arsenal">
            <!-- CARD 1 -->
            <div class="b-card t3d-node">
                <div class="b-cross tl"></div><div class="b-cross tr"></div><div class="b-cross bl"></div><div class="b-cross br"></div>
                <div class="b-card-header">
                    <div class="b-card-id">SEC.01 // UI_UX</div>
                    <div class="b-card-icon">01</div>
                </div>
                <h3>Frontend & Diseño Gráfico UI/UX</h3>
                <p>Diseño de interfaces deslumbrantes y escalables. Dominio absoluto de React.js, Next.js, HTML5, CSS3, Tailwind CSS y animaciones fluidas. Prototipado en alta fidelidad y UX centrada en la máxima conversión.</p>
            </div>
            
            <!-- CARD 2 -->
            <div class="b-card t3d-node">
                <div class="b-cross tl"></div><div class="b-cross tr"></div><div class="b-cross bl"></div><div class="b-cross br"></div>
                <div class="b-card-header">
                    <div class="b-card-id">SEC.02 // BACKEND</div>
                    <div class="b-card-icon">02</div>
                </div>
                <h3>Arquitectura Web y Diseño SEO</h3>
                <p>Infraestructuras sólidas como roca. Node.js, Python, PHP, SQL, Prisma. Despliegue seguro y ultrarrápido con Docker, Git y Caddy para asegurar tiempos de respuesta en milisegundos en cada interacción.</p>
            </div>
            
            <!-- CARD 3 -->
            <div class="b-card t3d-node">
                <div class="b-cross tl"></div><div class="b-cross tr"></div><div class="b-cross bl"></div><div class="b-cross br"></div>
                <div class="b-card-header">
                    <div class="b-card-id">SEC.03 // AI_ML</div>
                    <div class="b-card-icon">03</div>
                </div>
                <h3>IA y Diseño Web Barcelona</h3>
                <p>Automatizaciones que rompen el mercado: Agentes de voz telefónicos mediante IA (Vapi), LLMs conversacionales, WhatsApp API, n8n, y procesadores en Python mediante JSON Webhooks para procesos B2B.</p>
            </div>
            
            <!-- CARD 4 -->
            <div class="b-card t3d-node">
                <div class="b-cross tl"></div><div class="b-cross tr"></div><div class="b-cross bl"></div><div class="b-cross br"></div>
                <div class="b-card-header">
                    <div class="b-card-id">SEC.04 // E-COM</div>
                    <div class="b-card-icon">04</div>
                </div>
                <h3>Diseño para Tiendas Online</h3>
                <p>El núcleo de mi trabajo: Shopify Plus, WooCommerce Headless, VestraWeb Custom CMS. Arquitectura de servidores de alto tráfico y bases de datos NoSQL optimizadas para escalabilidad masiva.</p>
            </div>
        </div>
    </section>

    `;

html = html.substring(0, start) + replacementHtml + html.substring(end);
fs.writeFileSync('disenador-grafico-barcelona.html', html, 'utf8');
console.log('Replaced Arsenal Técnico with Brutalist Grid successfully.');
