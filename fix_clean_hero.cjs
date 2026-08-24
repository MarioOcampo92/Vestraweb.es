const fs = require('fs');
let html = fs.readFileSync('disenador-grafico-barcelona.html', 'utf8');

const badHeroStart = html.indexOf('<header class="hero"');
const badHeroEnd = html.indexOf('</header>', badHeroStart) + '</header>'.length;

const cleanHeroHtml = `    <header class="hero" style="background-image: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.2) 2px, rgba(0,0,0,0.2) 4px);">
        <h1 class="hero-title glitch-wrapper">
            <span class="filled" style="color: #fff;">DISEÑADOR</span><br>
            <span class="filled" style="color: #fff;">GRÁFICO EN</span><br>
            <span class="filled" style="color: #fff;">BARCELONA</span>
            <div class="glitch-layer glitch-cyan" aria-hidden="true">DISEÑADOR<br>GRÁFICO EN<br>BARCELONA</div>
            <div class="glitch-layer glitch-magenta" aria-hidden="true">DISEÑADOR<br>GRÁFICO EN<br>BARCELONA</div>
        </h1>
        <div class="hero-subtitle">
            <p style="font-family: monospace; font-size: 1rem;">Especialista en <strong>Diseñador Gráfico en Barcelona</strong>. Arquitectura Front-End y Diseñador Gráfico enfocado en rendimiento extremo (Core Web Vitals).</p>
        </div>
    </header>`;

html = html.substring(0, badHeroStart) + cleanHeroHtml + html.substring(badHeroEnd);

fs.writeFileSync('disenador-grafico-barcelona.html', html, 'utf8');
console.log('Fixed broken encoding and injected clean hero.');
