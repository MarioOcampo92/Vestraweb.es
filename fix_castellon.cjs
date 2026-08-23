const fs = require('fs');

let html = fs.readFileSync('desarrollo-web-castellon.html', 'utf8');

// The main issue was exact string matching failing. Let's use regex to be resilient to whitespaces.
// Replace H1
html = html.replace(/<div class="h1">[\s\S]*?Diseño Web en Tarragona[\s\S]*?<\/div>/i, '<div class="h1">Desarrollo Web en Castellón</div>');

// Replace specific words "Tarragona" globally with "Castellón", but carefully inside textual paragraphs
// However, there are image alt attributes too. Let's do a smart regex replacement:
html = html.replace(/Tarragona/g, 'Castellón');
html = html.replace(/tarragona/g, 'castellon');

// Re-write to avoid exact duplication
html = html.replace(/Atrae más clientes y aumenta tus ventas con diseño web profesional y posicionamiento SEO en Castellón/g, 'Escala tu negocio y consigue más contactos gracias a un diseño web estratégico y SEO local en Castellón');
html = html.replace(/¿Tu web no genera los clientes que esperas\? En VestraWeb creamos sitios que combinan diseño atractivo con resultados reales: más visitas, más contactos, más ventas\./g, '¿Cansado de tener una página que nadie visita? En VestraWeb desarrollamos plataformas digitales que unen estética visual con un rendimiento brutal: atraemos tráfico, generamos oportunidades y cerramos ventas en la provincia.');
html = html.replace(/Con más de 7 años especializados en diseño web Castellón, Reus y provincia, desarrollamos páginas web rápidas, optimizadas para SEO local y preparadas para que tu negocio destaque en Google\./g, 'Con una extensa trayectoria creando proyectos digitales de alto impacto, diseñamos páginas web ultrarrápidas, enfocadas al SEO local en Castellón de la Plana y preparadas para liderar las búsquedas.');
html = html.replace(/Cada web que creamos está optimizada \(para Google y buscadores IA\) y convertir visitantes en clientes reales, no solo en visitas\./g, 'Nuestros desarrollos están 100% pensados para los algoritmos actuales, con el objetivo claro de transformar usuarios curiosos en compradores fidelizados.');

// H2 replacements
html = html.replace(/Diseño web en Castellón para que tu negocio hable por ti/g, 'Desarrollo web en Castellón creado para que tu empresa domine su sector');
html = html.replace(/Desarrollo y diseño web a tu medida en Castellón/g, 'Soluciones digitales a medida para empresas en Castellón');
html = html.replace(/Diseño web con tarifas a medida en Castellón/g, 'Desarrollo web con tarifas adaptadas en Castellón');

// FAQ updates (we already swapped Tarragona for Castellón, now let's re-write the sentences)
html = html.replace(/El precio de un diseño web a medida en Castellón oscila/g, 'La inversión para desarrollar una web profesional en Castellón varía');
html = html.replace(/Para crear una web profesional y optimizada desde cero, los plazos habituales son/g, 'Para programar y lanzar un portal web de alto rendimiento, el tiempo estimado suele ser');
html = html.replace(/El éxito de una página web no solo depende de que sea bonita, sino de que atraiga clientes/g, 'Una página hermosa no sirve de nada si nadie la visita. Nuestra obsesión es la rentabilidad');
html = html.replace(/Como creador de páginas web y especialista en desarrollo, integro/g, 'Al encargarnos de tu proyecto digital en Castellón, configuramos');

fs.writeFileSync('desarrollo-web-castellon.html', html, 'utf8');

console.log("Re-written Castellón correctly.");
