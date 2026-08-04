import fs from 'fs';

// 1. UPDATE portafolio.html
const htmlPath = 'portafolio.html';
let html = fs.readFileSync(htmlPath, 'utf-8');

const newMain = `<main style="background-color: var(--color-bg); overflow-x: hidden; position: relative;">
        <!-- Cursor follower element for the image -->
        <div class="hover-image-follower" id="hover-image-follower">
            <img src="" alt="Project Preview">
        </div>

        <section class="awwwards-hero" style="padding-top: 150px; padding-bottom: 50px;">
            <div class="container">
                <h1 style="font-size: clamp(3.5rem, 10vw, 8rem); font-weight: 900; line-height: 1; text-transform: uppercase; letter-spacing: -2px; color: var(--color-primary);">Casos<br>De Éxito.</h1>
                <p style="font-size: 1.2rem; color: var(--color-text); opacity: 0.8; max-width: 500px; margin-top: 2rem;">Diseñamos experiencias digitales memorables que conectan con tu audiencia y generan resultados en Tarragona.</p>
            </div>
        </section>

        <section class="awwwards-list-section" style="padding-bottom: 150px;">
            <div class="container">
                <ul class="awwwards-list">
                    <li class="awwwards-list-item" data-image="/assets/diseno-web-tarragona-ecommerce-mellows-1.jpg">
                        <a href="/mellows.html">
                            <span class="awwwards-item-title">Mellows</span>
                            <span class="awwwards-item-category">Ecommerce & Branding</span>
                        </a>
                        <img class="mobile-project-img" src="/assets/diseno-web-tarragona-ecommerce-mellows-1.jpg" alt="Mellows" loading="lazy">
                    </li>
                    <li class="awwwards-list-item" data-image="/assets/diseno-web-tarragona-estudio-arquitectura-au-1.jpg">
                        <a href="/auarquitectos.html">
                            <span class="awwwards-item-title">AU Arquitectos</span>
                            <span class="awwwards-item-category">Corporativa</span>
                        </a>
                        <img class="mobile-project-img" src="/assets/diseno-web-tarragona-estudio-arquitectura-au-1.jpg" alt="AU Arquitectos" loading="lazy">
                    </li>
                    <li class="awwwards-list-item" data-image="/assets/diseno-web-tarragona-marca-personal-jordina-1.jpg">
                        <a href="/jordina-arnau.html">
                            <span class="awwwards-item-title">Jordina Arnau</span>
                            <span class="awwwards-item-category">Marca Personal</span>
                        </a>
                        <img class="mobile-project-img" src="/assets/diseno-web-tarragona-marca-personal-jordina-1.jpg" alt="Jordina Arnau" loading="lazy">
                    </li>
                    <li class="awwwards-list-item" data-image="/assets/diseno-web-tarragona-ong-donaciones-1.jpg">
                        <a href="/compassionate-christmas.html">
                            <span class="awwwards-item-title">Compassionate</span>
                            <span class="awwwards-item-category">Donaciones</span>
                        </a>
                        <img class="mobile-project-img" src="/assets/diseno-web-tarragona-ong-donaciones-1.jpg" alt="Compassionate Christmas" loading="lazy">
                    </li>
                    <li class="awwwards-list-item" data-image="/assets/diseno-web-tarragona-restaurante-selva-1.png">
                        <a href="/selva-de-sabores.html">
                            <span class="awwwards-item-title">Selva Sabores</span>
                            <span class="awwwards-item-category">Restaurante</span>
                        </a>
                        <img class="mobile-project-img" src="/assets/diseno-web-tarragona-restaurante-selva-1.png" alt="Selva Sabores" loading="lazy">
                    </li>
                    <li class="awwwards-list-item" data-image="/assets/diseno-web-tarragona-asociacion-cultural-1.jpg">
                        <a href="/ball-de-lletres.html">
                            <span class="awwwards-item-title">Ball Lletres</span>
                            <span class="awwwards-item-category">Asociación</span>
                        </a>
                        <img class="mobile-project-img" src="/assets/diseno-web-tarragona-asociacion-cultural-1.jpg" alt="Ball de Lletres" loading="lazy">
                    </li>
                </ul>
            </div>
        </section>
    </main>`;

// Find the content between <main> and </main> using a regex
html = html.replace(/<main>[\s\S]*?<\/main>/, newMain);
fs.writeFileSync(htmlPath, html);
console.log('Updated portafolio.html');

// 2. UPDATE style.css
const cssPath = 'style.css';
let css = fs.readFileSync(cssPath, 'utf-8');

const newCss = `
/* ===== AWWWARDS PORTFOLIO ===== */
.awwwards-list {
    list-style: none;
    padding: 0;
    margin: 0;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.awwwards-list-item {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    position: relative;
}

.awwwards-list-item a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 3.5rem 0;
    text-decoration: none;
    color: var(--color-text);
    transition: padding 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s;
}

.awwwards-item-title {
    font-size: clamp(2.5rem, 6vw, 6.5rem);
    font-weight: 900;
    text-transform: uppercase;
    line-height: 1;
    letter-spacing: -1px;
    -webkit-text-stroke: 1px transparent;
    transition: color 0.4s, -webkit-text-stroke 0.4s, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    transform-origin: left;
    margin: 0;
    z-index: 2;
}

.awwwards-item-category {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--color-primary);
    opacity: 0;
    transform: translateX(-20px);
    transition: opacity 0.4s, transform 0.4s;
    background: rgba(0,0,0,0.5);
    padding: 0.5rem 1rem;
    border-radius: 20px;
}

/* Hover effects */
@media (min-width: 992px) {
    .awwwards-list:hover .awwwards-list-item a {
        opacity: 0.2;
    }
    .awwwards-list .awwwards-list-item a:hover {
        opacity: 1;
        padding-left: 3rem;
        padding-right: 3rem;
    }
    
    .awwwards-list-item a:hover .awwwards-item-title {
        color: transparent;
        -webkit-text-stroke: 1.5px var(--color-text);
        transform: scale(1.05);
    }
    
    .awwwards-list-item a:hover .awwwards-item-category {
        opacity: 1;
        transform: translateX(0);
    }

    .mobile-project-img {
        display: none;
    }
}

/* Floating Image */
.hover-image-follower {
    position: fixed;
    top: 0;
    left: 0;
    width: 450px;
    height: 600px;
    pointer-events: none;
    opacity: 0;
    z-index: 10;
    transform: translate(-50%, -50%) scale(0.8);
    transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    overflow: hidden;
    border-radius: 2rem;
    will-change: transform, left, top;
    box-shadow: 0 30px 60px rgba(0,0,0,0.5);
}

.hover-image-follower.active {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
}

.hover-image-follower img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* Mobile Fallback */
@media (max-width: 991px) {
    .hover-image-follower {
        display: none !important;
    }
    
    .awwwards-list-item a {
        flex-direction: column;
        align-items: flex-start;
        padding: 1.5rem 0 1rem;
    }
    
    .awwwards-item-category {
        opacity: 1;
        transform: none;
        margin-top: 1rem;
        font-size: 1rem;
        background: var(--color-primary);
        color: #fff;
    }
    
    .mobile-project-img {
        display: block;
        width: 100%;
        height: 400px;
        object-fit: cover;
        border-radius: 1.5rem;
        margin-bottom: 3rem;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    }
    
    .awwwards-list-item {
        border-bottom: none;
        margin-bottom: 2rem;
    }
}
`;

if (!css.includes('awwwards-list')) {
    fs.appendFileSync(cssPath, '\n' + newCss);
    console.log('Updated style.css');
}

// 3. UPDATE main.js
const jsPath = 'main.js';
let js = fs.readFileSync(jsPath, 'utf-8');

const jsCode = `
  // ===== AWWWARDS PORTFOLIO HOVER REVEAL =====
  const follower = document.getElementById('hover-image-follower');
  const portfolioItems = document.querySelectorAll('.awwwards-list-item');

  if (follower && portfolioItems.length > 0) {
      const xTo = gsap.quickTo(follower, "left", {duration: 0.6, ease: "power3"});
      const yTo = gsap.quickTo(follower, "top", {duration: 0.6, ease: "power3"});
      
      const imgEl = follower.querySelector('img');

      // Update position on mousemove over the whole list area
      const listSection = document.querySelector('.awwwards-list-section');
      if (listSection) {
          listSection.addEventListener('mousemove', (e) => {
              xTo(e.clientX);
              yTo(e.clientY);
          });
      }

      portfolioItems.forEach(item => {
          item.addEventListener('mouseenter', () => {
              if(window.innerWidth >= 992) {
                  const imgUrl = item.getAttribute('data-image');
                  if (imgUrl && imgEl.src !== imgUrl) {
                      imgEl.src = imgUrl;
                  }
                  follower.classList.add('active');
              }
          });
          item.addEventListener('mouseleave', () => {
              follower.classList.remove('active');
          });
      });
  }
`;

if (!js.includes('hover-image-follower')) {
    // insert at the end of DOMContentLoaded
    js = js.replace('}); // END DOMContentLoaded', jsCode + '\n}); // END DOMContentLoaded');
    fs.writeFileSync(jsPath, js);
    console.log('Updated main.js');
}
