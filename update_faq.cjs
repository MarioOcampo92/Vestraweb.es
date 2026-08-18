const fs = require('fs');

const faqHtml = `            <div class="accordion">
                <div class="accordion-item">
                    <div class="accordion-header">¿Cuánto cuesta el diseño de una página web en Tarragona?</div>
                    <div class="accordion-body"><p>El precio de un diseño web a medida en Tarragona oscila generalmente entre 400€ para proyectos básicos (como páginas presenciales para autónomos o pymes) y 2500€ para tiendas online o plataformas corporativas más complejas. Cada desarrollo web es único, por lo que adaptamos nuestra estrategia y presupuesto para maximizar el retorno de tu inversión, asegurando siempre una estructura preparada para el posicionamiento web.</p></div>
                </div>
                <div class="accordion-item">
                    <div class="accordion-header">¿Cuánto tiempo tarda el desarrollo web y posicionamiento SEO?</div>
                    <div class="accordion-body"><p>Para crear una web profesional y optimizada desde cero, los plazos habituales son de 2 a 7 semanas. Este tiempo incluye la consultoría inicial, el diseño UX/UI, la programación de la web, y la implementación de la estructura base de SEO en Tarragona. Entendemos que tu negocio necesita estar online lo antes posible, por lo que garantizamos un flujo de trabajo ágil y reportes constantes de progreso.</p></div>
                </div>
                <div class="accordion-item">
                    <div class="accordion-header">¿Cómo mejora mi posicionamiento SEO en Tarragona y Google?</div>
                    <div class="accordion-body"><p>El éxito de una página web no solo depende de que sea bonita, sino de que atraiga clientes. Aplicamos técnicas avanzadas de SEO local y auditorías de posicionamiento web en Tarragona para que tu negocio domine los primeros resultados de Google. Optimizamos la velocidad de carga, la estructura de etiquetas, el contenido y el rendimiento en dispositivos móviles (Responsive Design), factores clave para el algoritmo actual.</p></div>
                </div>
                <div class="accordion-item">
                    <div class="accordion-header">¿Podré gestionar mi página web yo mismo?</div>
                    <div class="accordion-body"><p>¡Por supuesto! Como creador de páginas web y especialista en desarrollo, integro gestores de contenido (CMS) muy intuitivos. Una vez finalizado el diseño de tu web en Tarragona, recibirás una capacitación para que puedas modificar textos, subir nuevos servicios, publicar artículos en el blog o gestionar pedidos si es una tienda online, todo ello de forma autónoma y sin tocar una línea de código.</p></div>
                </div>
            </div>`;

let indexHtml = fs.readFileSync('index.html', 'utf8');
indexHtml = indexHtml.replace(/<div class="accordion">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/, faqHtml + '\n        </div>\n    </section>');
fs.writeFileSync('index.html', indexHtml, 'utf8');

const schemaJson = `{
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "¿Cuánto cuesta el diseño de una página web en Tarragona?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "El precio de un diseño web a medida en Tarragona oscila generalmente entre 400€ para proyectos básicos (como páginas presenciales para autónomos o pymes) y 2500€ para tiendas online o plataformas corporativas más complejas. Cada desarrollo web es único, por lo que adaptamos nuestra estrategia y presupuesto para maximizar el retorno de tu inversión, asegurando siempre una estructura preparada para el posicionamiento web."
          }
        },
        {
          "@type": "Question",
          "name": "¿Cuánto tiempo tarda el desarrollo web y posicionamiento SEO?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Para crear una web profesional y optimizada desde cero, los plazos habituales son de 2 a 7 semanas. Este tiempo incluye la consultoría inicial, el diseño UX/UI, la programación de la web, y la implementación de la estructura base de SEO en Tarragona. Entendemos que tu negocio necesita estar online lo antes posible, por lo que garantizamos un flujo de trabajo ágil y reportes constantes de progreso."
          }
        },
        {
          "@type": "Question",
          "name": "¿Cómo mejora mi posicionamiento SEO en Tarragona y Google?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "El éxito de una página web no solo depende de que sea bonita, sino de que atraiga clientes. Aplicamos técnicas avanzadas de SEO local y auditorías de posicionamiento web en Tarragona para que tu negocio domine los primeros resultados de Google. Optimizamos la velocidad de carga, la estructura de etiquetas, el contenido y el rendimiento en dispositivos móviles (Responsive Design), factores clave para el algoritmo actual."
          }
        },
        {
          "@type": "Question",
          "name": "¿Podré gestionar mi página web yo mismo?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "¡Por supuesto! Como creador de páginas web y especialista en desarrollo, integro gestores de contenido (CMS) muy intuitivos. Una vez finalizado el diseño de tu web en Tarragona, recibirás una capacitación para que puedas modificar textos, subir nuevos servicios, publicar artículos en el blog o gestionar pedidos si es una tienda online, todo ello de forma autónoma y sin tocar una línea de código."
          }
        }
      ]
    }`;

let headHtml = fs.readFileSync('components/head.html', 'utf8');
headHtml = headHtml.replace(/{\s*"@context": "https:\/\/schema\.org",\s*"@type": "FAQPage",[\s\S]*?\]\s*}/, schemaJson);
fs.writeFileSync('components/head.html', headHtml, 'utf8');

console.log('FAQ HTML and Schema updated successfully.');
