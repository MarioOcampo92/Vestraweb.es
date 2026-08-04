const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const headEndIdx = html.indexOf('</head>');
const styleLinkIdx = html.indexOf('<link rel="stylesheet" href="/style.css">');

const before = html.substring(0, styleLinkIdx + 41);
const after = html.substring(headEndIdx);

const newSchemas = 
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "VestraWeb",
      "image": "/assets/vestra-logo-gradient.svg",
      "@id": "https://vestraweb.es",
      "url": "https://vestraweb.es",
      "telephone": "+34687180231",
      "priceRange": "400€ - 2500€",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Tarragona",
        "addressRegion": "Tarragona",
        "addressCountry": "ES"
      },
      "description": "Agencia de diseño web y posicionamiento SEO en Tarragona. Creamos páginas web a medida, rápidas y optimizadas para captar clientes."
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "¿Cuánto cuesta un diseño web?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "400€ - 2500€ dependiendo del proyecto."
          }
        },
        {
          "@type": "Question",
          "name": "¿Cuánto tiempo tarda?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Entre 2-7 semanas."
          }
        },
        {
          "@type": "Question",
          "name": "¿Cómo mejora mi posicionamiento en Google?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Con técnicas probadas de optimización y estrategia de palabras clave locales."
          }
        },
        {
          "@type": "Question",
          "name": "¿Puedo gestionar mi web yo mismo?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sí, desarrollamos con gestores de contenido intuitivos para facilitar tu gestión."
          }
        }
      ]
    }
    </script>
;

fs.writeFileSync('index.html', before + '\n' + newSchemas + after, 'utf8');
console.log('Schemas restored');
