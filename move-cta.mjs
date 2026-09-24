import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

// The CTA block to extract
const ctaRegex = /<h2 style="text-align: center; margin-top: 3rem; font-size: 1\.5rem;">Diseño web en Tarragona desarrollo de webs a tu medida<\/h2>\s*<h2 style="text-align: center; margin-top: 1rem; color: var\(--color-primary\); font-size: 1\.2rem; margin-bottom: 2rem;">¿Todavía no sabes que plan te conviene\?<\/h2>\s*<div style="text-align: center;">\s*<a href="#contacto" class="btn-primary" style="display: inline-block;">Contactar con un experto<\/a>\s*<\/div>/;

const match = html.match(ctaRegex);

if (match) {
    // Remove it from the FAQ section
    html = html.replace(match[0], '');

    // Wrap it in a new section
    const newSection = `
    <!-- Final CTA -->
    <section class="final-cta" style="padding: 6rem 0; background-color: var(--color-bg);">
        <div class="container">
            ${match[0].replace('margin-top: 3rem;', 'margin-top: 0;')}
        </div>
    </section>
`;

    // Insert it before the Footer
    html = html.replace('<!-- 16. Footer -->', newSection + '\n    <!-- 16. Footer -->');
    
    fs.writeFileSync('index.html', html);
    console.log("Successfully moved CTA section.");
} else {
    console.log("Could not find the CTA block.");
}
