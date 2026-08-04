const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The file currently has NO </head> or <body> because replace_file_content deleted it!
// Let's find <link rel="stylesheet" href="/style.css">
const styleLink = '<link rel="stylesheet" href="/style.css">';
const styleIdx = html.indexOf(styleLink);

// Find the header section to know where the body starts
const headerIdx = html.indexOf('<header class="header">');

const before = html.substring(0, styleIdx + styleLink.length);
const after = html.substring(headerIdx);

const missingMiddle = \

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
</head>
<body>
    <!-- 1. Header -->
\;

fs.writeFileSync('index.html', before + missingMiddle + '            ' + after, 'utf8');
console.log('Restored correctly');
