const fs = require('fs');
let html = fs.readFileSync('disenador-grafico-barcelona.html', 'utf8');

// 1. REMOVE the VestraWeb corporate header entirely
const headerStart = html.indexOf('<header class="header">');
const headerEnd = html.indexOf('</header>', headerStart) + '</header>'.length;
if (headerStart !== -1) {
    html = html.substring(0, headerStart) + html.substring(headerEnd);
    console.log('1. Removed VestraWeb corporate header');
}

// 2. REPLACE the current hero with the EXACT original brutalist hero from Screenshot 2
const heroStart = html.indexOf('<header class="hero"');
const heroEnd = html.indexOf('</header>', heroStart) + '</header>'.length;

const brutalistHero = `<!-- BRUTALIST CV-NAV -->
    <nav class="cv-nav">
        <a href="/" title="Volver a VestraWeb">[ VOLVER ]</a>
        <a href="/contactar" title="Contactar Diseñador Gráfico Barcelona">[ SYS.CONTACT ]</a>
    </nav>

    <header class="hero" style="background-image: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.2) 2px, rgba(0,0,0,0.2) 4px);">
        <div class="hero-top-data">>> SIGNAL_LOST · SYS-04 · <span id="hero-clock">14:32:08</span></div>
        
        <div class="hero-content" style="position: relative; z-index: 10; display: flex; flex-direction: column; align-items: flex-start; justify-content: center; width: 100%; text-align: left; padding-left: 5%;">
            <div class="hero-title glitch-wrapper" style="margin-bottom: 2rem;">
                <h1 class="filled" style="color: #fff; margin:0; padding:0; font-size: clamp(3rem, 7.5vw, 6rem); font-weight: 900; line-height: 0.95; letter-spacing: -2px;">DISEÑADOR<br>GRÁFICO EN<br>BARCELONA</h1>
                <div class="glitch-layer glitch-cyan" aria-hidden="true">DISEÑADOR<br>GRÁFICO EN<br>BARCELONA</div>
                <div class="glitch-layer glitch-magenta" aria-hidden="true">DISEÑADOR<br>GRÁFICO EN<br>BARCELONA</div>
            </div>
            <div class="hero-subtitle">
                <div style="font-family: monospace; font-size: 0.85rem; color: var(--color-primary); letter-spacing: 2px; margin-bottom: 0.5rem;">[ ▓▓ IDENTIDAD VERIFICADA ]</div>
                <p style="font-family: monospace; font-size: 1rem;">Especialista en <strong>Diseñador Gráfico en Barcelona</strong>. Arquitectura Front-End y Diseñador Gráfico enfocado en rendimiento extremo (Core Web Vitals).</p>
            </div>
        </div>

        <!-- Scattered red ASCII noise markers -->
        <div class="ascii-noise" style="top: 15%; right: 5%; font-size: 12px;">SYS_ERR</div>
        <div class="ascii-noise" style="bottom: 20%; right: 8%;">01_04</div>
    </header>`;

if (heroStart !== -1) {
    html = html.substring(0, heroStart) + brutalistHero + html.substring(heroEnd);
    console.log('2. Restored brutalist hero with telemetry');
}

// 3. Add a live clock script to the hero
const clockScript = `
    <script>
        // Live clock for hero telemetry
        function updateHeroClock() {
            const el = document.getElementById('hero-clock');
            if (el) {
                const now = new Date();
                el.textContent = now.toTimeString().split(' ')[0];
            }
        }
        setInterval(updateHeroClock, 1000);
        updateHeroClock();
    </script>`;

// Insert before the last </script> tag
const lastScript = html.lastIndexOf('</script>');
if (lastScript !== -1) {
    html = html.substring(0, lastScript + '</script>'.length) + clockScript + html.substring(lastScript + '</script>'.length);
    console.log('3. Added live clock script');
}

fs.writeFileSync('disenador-grafico-barcelona.html', html, 'utf8');
console.log('DONE: Hero restored to brutalist design from Screenshot 2');
