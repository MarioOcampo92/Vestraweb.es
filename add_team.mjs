import fs from 'fs';

// 1. UPDATE index.html
let html = fs.readFileSync('index.html', 'utf-8');
const teamHTML = `
    <!-- 6.5 Team -->
    <section class="team-section" style="padding: 2rem 0 6rem; background: var(--color-bg-alt);">
        <div class="container">
            <h2 style="text-align: center; margin-bottom: 3rem; font-size: clamp(2rem, 5vw, 3rem); font-weight: 800;">Fundadores</h2>
            <div class="team-grid">
                <div class="team-card">
                    <div class="team-img-wrapper">
                        <img src="/assets/diseno-web-tarragona-ceo-mario-ocampo.jpg" alt="Mario Ocampo - CEO de VestraWeb Agencia SEO en Tarragona" loading="lazy">
                    </div>
                    <h3>Mario Ocampo</h3>
                    <p>CEO & Estratega Digital</p>
                </div>
                <div class="team-card">
                    <div class="team-img-wrapper">
                        <img src="/assets/diseno-web-tarragona-cto-john-gonzalez.jpg" alt="John Gonzalez - CTO de VestraWeb Desarrollo Web en Tarragona" loading="lazy">
                    </div>
                    <h3>John González</h3>
                    <p>CTO & Desarrollador Lead</p>
                </div>
            </div>
        </div>
    </section>
`;

if (!html.includes('team-section')) {
    html = html.replace('</section>\r\n\r\n    <!-- 7. Process -->', '</section>\r\n' + teamHTML + '\r\n    <!-- 7. Process -->');
    // fallback if crlf is different
    html = html.replace('</section>\n\n    <!-- 7. Process -->', '</section>\n' + teamHTML + '\n    <!-- 7. Process -->');
    fs.writeFileSync('index.html', html);
    console.log('Added Team section to index.html');
}

// 2. UPDATE style.css
let css = fs.readFileSync('style.css', 'utf-8');

// Replace mobile lottie width
css = css.replace('.lottie-orb { width: 220px; height: 220px; }', '.lottie-orb { width: 100%; height: auto; max-width: 320px; margin: 0 auto; }');

// Replace parallax bug fix from all mobile to iOS only
css = css.replace('@media (max-width: 768px) { .parallax-banner { background-attachment: scroll !important; background-position: center center !important; } }', '@supports (-webkit-touch-callout: none) { .parallax-banner { background-attachment: scroll !important; } }');

// Append Team CSS
const teamCSS = `
/* ====== TEAM ====== */
.team-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 3rem;
    max-width: 800px;
    margin: 0 auto;
    padding: 0 2rem;
}
.team-card {
    text-align: center;
}
.team-img-wrapper {
    width: 100%;
    border-radius: 1.5rem;
    overflow: hidden;
    margin-bottom: 1.5rem;
    position: relative;
    aspect-ratio: 3/4;
}
.team-img-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(100%) contrast(1.1) brightness(0.95);
    transition: filter 0.4s ease, transform 0.4s ease;
}
.team-img-wrapper:hover img {
    filter: grayscale(0%) contrast(1.05) brightness(1);
    transform: scale(1.05);
}
.team-card h3 {
    font-size: 1.5rem;
    font-weight: 800;
    margin-bottom: 0.3rem;
    color: var(--color-text);
}
.team-card p {
    font-size: 1rem;
    color: var(--color-primary);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
}
`;
if (!css.includes('.team-grid')) {
    css += teamCSS;
    fs.writeFileSync('style.css', css);
    console.log('Added Team CSS to style.css');
}
