const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The file currently has a completely broken schema section or missing one.
// Let's just find the closing </head> and replace everything from <script type="application/ld+json"> up to the second <script type="application/ld+json">

html = html.replace(/<link rel="stylesheet" href="\/style.css">\s*@type": "FAQPage",/m, \<link rel="stylesheet" href="/style.css">
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
      "@type": "FAQPage",\);

fs.writeFileSync('index.html', html, 'utf8');
