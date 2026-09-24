import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

// 1. Fix capitalization in Expert section
// I will capitalize the first letter of each accordion item and make the rest lowercase.
const expertMatches = html.match(/<div class="accordion-header"><h3>([^<]+)<\/h3><\/div>/g);
if (expertMatches) {
    expertMatches.forEach(match => {
        const textMatch = match.match(/<h3>([^<]+)<\/h3>/);
        if (textMatch) {
            let text = textMatch[1].toLowerCase();
            text = text.charAt(0).toUpperCase() + text.slice(1);
            // Replace in HTML
            html = html.replace(match, `<div class="accordion-header"><h3 style="text-transform: none;">${text}</h3></div>`);
        }
    });
}
// Capitalize the main Expert H2
html = html.replace('<h2>experto en diseño de páginas web</h2>', '<h2 style="text-align: center; margin-bottom: 3rem; text-transform: uppercase;">Experto en diseño de páginas web</h2>');


// 2. Add contact button under "Todavía no sabes que plan te conviene"
html = html.replace(/<h2 style="text-align: center; margin-top: 1rem; color: var\(--color-primary\); font-size: 1.2rem;">¿Todavía no sabes que plan te conviene\?<\/h2>/, 
`<h2 style="text-align: center; margin-top: 1rem; color: var(--color-primary); font-size: 1.2rem; margin-bottom: 2rem;">¿Todavía no sabes que plan te conviene?</h2>
            <div style="text-align: center;">
                <a href="#contacto" class="btn-primary" style="display: inline-block;">Contactar con un experto</a>
            </div>`);

// 3. Fix the Parallax banner (Herramientas Premium)
const oldParallax = `<h2>herramientas premium que utilizo</h2>
<h3 style="font-size: 1.2rem; margin-top: 0.5rem; text-align: center; display: block;">herramientas premium</h3>`;
const newParallax = `<h2 style="text-transform: uppercase; font-size: 2.5rem; margin-bottom: 1rem; color: white;">Herramientas premium que utilizo</h2>
        <h3 style="font-size: 1.2rem; margin-top: 0.5rem; text-align: center; display: block; color: rgba(255,255,255,0.8); margin-bottom: 2rem;">Tecnologías de vanguardia para un rendimiento óptimo</h3>
        <h4 style="font-size: 1.1rem; color: white; display: flex; flex-wrap: wrap; justify-content: center; gap: 1.5rem; font-weight: 500;">
            <span>React & Vite</span>
            <span>•</span>
            <span>WordPress Pro</span>
            <span>•</span>
            <span>GSAP Animations</span>
            <span>•</span>
            <span>Node.js</span>
            <span>•</span>
            <span>Three.js</span>
        </h4>`;
html = html.replace(oldParallax, newParallax);

// Make sure Expert H2 is properly formatted, the replace above might have failed if it had existing styles
html = html.replace('<h2 style="text-align: center; margin-bottom: 3rem;">experto en diseño de páginas web</h2>', '<h2 style="text-align: center; margin-bottom: 3rem; text-transform: uppercase;">Experto en Diseño de Páginas Web</h2>');

fs.writeFileSync('index.html', html);
