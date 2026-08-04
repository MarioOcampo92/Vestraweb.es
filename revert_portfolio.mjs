import fs from 'fs';
import path from 'path';

const dir = './';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

// 1. Remove .html from all hrefs in all HTML files
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    // Replace href="something.html" with href="something"
    content = content.replace(/href="([^"]+)\.html(#?[^"]*)"/g, 'href="$1$2"');
    fs.writeFileSync(file, content);
});
console.log('Cleaned .html extensions from hrefs in all files');

// 2. Revert portafolio.html to a beautiful Bento Grid
let portafolioHtml = fs.readFileSync('portafolio.html', 'utf-8');
const newMain = `<main style="background-color: #fafafa;">
        <section class="portfolio-hero" style="padding: 120px 0 60px; text-align: center; background: linear-gradient(135deg, #fdfdfd 0%, #f3f4f6 100%);">
            <div class="container">
                <h1 style="font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 800; color: #111; margin-bottom: 1rem;">Nuestros Proyectos</h1>
                <p style="font-size: 1.1rem; color: #666; max-width: 600px; margin: 0 auto;">Diseño web a medida, branding corporativo y tiendas online optimizadas para vender.</p>
                
                <div class="filters" style="margin-top: 3rem; display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
                    <button class="filter-btn active" data-filter="all" style="padding: 0.5rem 1.5rem; border-radius: 50px; border: none; background: #111; color: #fff; font-weight: 600; cursor: pointer;">Todos</button>
                    <button class="filter-btn" data-filter="branding" style="padding: 0.5rem 1.5rem; border-radius: 50px; border: 1px solid #ddd; background: #fff; color: #333; font-weight: 600; cursor: pointer;">Branding</button>
                    <button class="filter-btn" data-filter="corporativa" style="padding: 0.5rem 1.5rem; border-radius: 50px; border: 1px solid #ddd; background: #fff; color: #333; font-weight: 600; cursor: pointer;">Corporativa</button>
                    <button class="filter-btn" data-filter="diseno-web" style="padding: 0.5rem 1.5rem; border-radius: 50px; border: 1px solid #ddd; background: #fff; color: #333; font-weight: 600; cursor: pointer;">Diseño Web</button>
                </div>
            </div>
        </section>

        <section class="portfolio-content" style="padding: 60px 0 100px;">
            <div class="container">
                <div class="portfolio-grid bento-grid">
                    <a href="/mellows" class="portfolio-item bento-item" data-category="branding diseno-web ecommerce">
                        <div class="bento-img-wrapper">
                            <img src="/assets/diseno-web-tarragona-ecommerce-mellows-1.jpg" alt="Mellows" loading="lazy">
                        </div>
                        <div class="bento-info">
                            <h3>Mellows</h3>
                            <p>Ecommerce & Branding</p>
                        </div>
                    </a>
                    
                    <a href="/auarquitectos" class="portfolio-item bento-item" data-category="branding corporativa diseno-web">
                        <div class="bento-img-wrapper">
                            <img src="/assets/diseno-web-tarragona-estudio-arquitectura-au-1.jpg" alt="AU Arquitectos" loading="lazy">
                        </div>
                        <div class="bento-info">
                            <h3>AU Arquitectos</h3>
                            <p>Web Corporativa</p>
                        </div>
                    </a>

                    <a href="/jordina-arnau" class="portfolio-item bento-item" data-category="branding diseno-web ecommerce">
                        <div class="bento-img-wrapper">
                            <img src="/assets/diseno-web-tarragona-marca-personal-jordina-1.jpg" alt="Jordina Arnau" loading="lazy">
                        </div>
                        <div class="bento-info">
                            <h3>Jordina Arnau</h3>
                            <p>Marca Personal</p>
                        </div>
                    </a>

                    <a href="/compassionate-christmas" class="portfolio-item bento-item" data-category="branding diseno-web ecommerce">
                        <div class="bento-img-wrapper">
                            <img src="/assets/diseno-web-tarragona-ong-donaciones-1.jpg" alt="Compassionate Christmas" loading="lazy">
                        </div>
                        <div class="bento-info">
                            <h3>Compassionate</h3>
                            <p>Donaciones ONG</p>
                        </div>
                    </a>

                    <a href="/selva-de-sabores" class="portfolio-item bento-item" data-category="branding diseno-web ecommerce">
                        <div class="bento-img-wrapper">
                            <img src="/assets/diseno-web-tarragona-restaurante-selva-1.png" alt="Selva de Sabores" loading="lazy">
                        </div>
                        <div class="bento-info">
                            <h3>Selva Sabores</h3>
                            <p>Restaurante & Ecommerce</p>
                        </div>
                    </a>

                    <a href="/ball-de-lletres" class="portfolio-item bento-item" data-category="branding diseno-web ecommerce">
                        <div class="bento-img-wrapper">
                            <img src="/assets/diseno-web-tarragona-asociacion-cultural-1.jpg" alt="Ball de Lletres" loading="lazy">
                        </div>
                        <div class="bento-info">
                            <h3>Ball de Lletres</h3>
                            <p>Asociación Cultural</p>
                        </div>
                    </a>
                </div>
            </div>
        </section>
    </main>`;

portafolioHtml = portafolioHtml.replace(/<main[^>]*>[\s\S]*?<\/main>/, newMain);
fs.writeFileSync('portafolio.html', portafolioHtml);
console.log('Reverted portafolio.html to beautiful grid');

// 3. Update style.css with Bento styles and clean up the awwwards mess
let css = fs.readFileSync('style.css', 'utf-8');
const bentoCss = `
/* ===== BENTO GRID PORTFOLIO ===== */
.bento-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 350px), 1fr));
    gap: 2rem;
}

.bento-item {
    background: #fff;
    border-radius: 1.5rem;
    overflow: hidden;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    position: relative;
    border: 1px solid rgba(0,0,0,0.05);
}

.bento-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0,0,0,0.1);
}

.bento-img-wrapper {
    width: 100%;
    aspect-ratio: 4/3;
    overflow: hidden;
}

.bento-img-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
}

.bento-item:hover .bento-img-wrapper img {
    transform: scale(1.05);
}

.bento-info {
    padding: 1.5rem;
    background: #fff;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.bento-info h3 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 700;
    color: #111;
}

.bento-info p {
    margin: 0;
    font-size: 0.9rem;
    color: #666;
    font-weight: 500;
}

/* Fix navbar links active state color if needed */
.nav-links a { color: var(--color-text); }
`;
css = css + '\n' + bentoCss;
fs.writeFileSync('style.css', css);
console.log('Added Bento CSS');
