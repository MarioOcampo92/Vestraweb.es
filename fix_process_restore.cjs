const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const processSection = \
    <!-- 7. Process -->
    <section class=\"process\">
        <div class=\"container\">
            <h2>Nuestro Proceso</h2>
            <div class=\"process-steps\">
                <div class=\"process-step\">
                    <span>01</span>
                    <h3>Consultor\u00EDa y Estrategia</h3>
                </div>
                <div class=\"process-step\">
                    <span>02</span>
                    <h3>Wireframing y UX/UI</h3>
                </div>
                <div class=\"process-step\">
                    <span>03</span>
                    <h3>Desarrollo y Lanzamiento</h3>
                </div>
            </div>
        </div>
    </section>
\;

// Insert it right before <!-- 8. Services
html = html.replace(/<!-- 8\. Services/i, processSection + '\n    <!-- 8. Services');
fs.writeFileSync('index.html', html, 'utf8');

