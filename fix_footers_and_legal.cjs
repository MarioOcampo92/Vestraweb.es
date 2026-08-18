const fs = require('fs');
const path = require('path');

// 1. Create the unified footer component
const footerComponentHtml = `
    <!-- 16. Footer -->
    <footer class="footer">
        <div class="footer-inner">
            <div class="h2">¿Tienes una idea? ¡Construyámosla!</div>
            <div class="footer-email">
                <a href="mailto:info@vestraweb.es">info@vestraweb.es</a>
            </div>
            <div class="footer-links">
                <a href="/aviso-legal">Aviso Legal</a>
                <a href="/privacidad">Privacidad</a>
                <a href="/cookies">Cookies</a>
                <a href="/accesibilidad">Accesibilidad</a>
            </div>
            <div class="footer-copy">&copy; 2026 VestraWeb. Todos los derechos reservados.</div>
        </div>
    </footer>
`;
fs.writeFileSync('components/footer.html', footerComponentHtml, 'utf8');

// 2. Unify all HTML files to use the footer component
function replaceFooterInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace <footer class="footer">...</footer> with <include src="components/footer.html"></include>
    const footerRegex = /<footer[^>]*>[\s\S]*?<\/footer>/i;
    if (footerRegex.test(content)) {
        content = content.replace(footerRegex, '<include src="components/footer.html"></include>');
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Replaced hardcoded footer in', filePath);
    }
}

const allFiles = fs.readdirSync(__dirname);
for (const file of allFiles) {
    if (file.endsWith('.html')) {
        replaceFooterInFile(file);
    }
}

// 3. Generate standard legal pages
const generateLegalPage = (filename, title, contentBody) => {
    const html = `<!DOCTYPE html>
<html lang="es">
<head>
    <include src="components/head.html"></include>
    <meta name="robots" content="noindex">
    <title>${title} | VestraWeb</title>
</head>
<body>
    <header class="header">
        <div class="logo">
            <a href="/" style="display: flex; align-items: center; text-decoration: none;">
                <img src="/assets/vestra-logo-gradient.svg" alt="VestraWeb" style="height: 32px;" fetchpriority="high">
            </a>
        </div>
        <nav class="nav-links">
            <a href="/">Inicio</a>
            <a href="/portafolio">Portafolio</a>
            <a href="/contactar">Contactar</a>
        </nav>
    </header>

    <main style="padding: 120px 20px 60px; max-width: 800px; margin: 0 auto; color: var(--color-text);">
        <h1 style="font-size: 2.5rem; margin-bottom: 2rem; color: var(--color-primary);">${title}</h1>
        <div style="font-size: 1.1rem; line-height: 1.8;">
            ${contentBody}
        </div>
    </main>

    <include src="components/footer.html"></include>
    <include src="components/whatsapp.html"></include>
    <script type="module" src="/main.js"></script>
</body>
</html>`;
    fs.writeFileSync(filename, html, 'utf8');
};

generateLegalPage('aviso-legal.html', 'Aviso Legal', `
<p>En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), VestraWeb informa que es titular del sitio web vestraweb.es. De acuerdo con la exigencia del artículo 10 de la citada Ley, VestraWeb informa de los siguientes datos:</p>
<p>El titular de esta página web es VestraWeb, agencia de diseño web en Tarragona. Para comunicarse con nosotros, ponemos a su disposición el correo electrónico de contacto: info@vestraweb.es.</p>
<h2>Usuario y régimen de responsabilidades</h2>
<p>La navegación, acceso y uso por el sitio web de VestraWeb confiere la condición de usuario, por la que se aceptan, desde la navegación por el sitio web de VestraWeb, todas las condiciones de uso aquí establecidas sin perjuicio de la aplicación de la correspondiente normativa de obligado cumplimiento legal según el caso.</p>
`);

generateLegalPage('privacidad.html', 'Política de Privacidad', `
<p>De conformidad con lo establecido en el Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo (RGPD) y en la Ley Orgánica 3/2018 de Protección de Datos Personales y garantía de los derechos digitales, le informamos de que los datos personales que nos facilite a través de los formularios de contacto serán tratados por VestraWeb con la finalidad de gestionar su solicitud y enviarle la información requerida.</p>
<h2>Derechos de los usuarios</h2>
<p>Podrá ejercer sus derechos de acceso, rectificación, limitación de tratamiento, supresión, portabilidad y oposición al tratamiento de sus datos de carácter personal, dirigiendo su petición al correo electrónico info@vestraweb.es.</p>
`);

generateLegalPage('cookies.html', 'Política de Cookies', `
<p>Una cookie es un fichero que se descarga en su ordenador al acceder a determinadas páginas web. Las cookies permiten a una página web, entre otras cosas, almacenar y recuperar información sobre los hábitos de navegación de un usuario o de su equipo y, dependiendo de la información que contengan y de la forma en que utilice su equipo, pueden utilizarse para reconocer al usuario.</p>
<h2>¿Qué tipos de cookies utiliza esta página web?</h2>
<ul>
    <li>Cookies técnicas: Permiten al usuario la navegación a través de la página web.</li>
    <li>Cookies de análisis: Permiten cuantificar el número de usuarios y así realizar la medición y análisis estadístico.</li>
</ul>
<p>Puede usted permitir, bloquear o eliminar las cookies instaladas en su equipo mediante la configuración de las opciones del navegador instalado en su ordenador.</p>
`);

generateLegalPage('accesibilidad.html', 'Declaración de Accesibilidad', `
<p>VestraWeb se ha comprometido a hacer accesible su sitio web, de conformidad con la normativa actual sobre accesibilidad web y diseño universal.</p>
<h2>Situación de cumplimiento</h2>
<p>Este sitio web está parcialmente conforme debido a las posibles excepciones y a la falta de conformidad de algunos aspectos técnicos menores. Trabajamos continuamente para revisar y mejorar la accesibilidad de nuestro portal web, asegurando la navegación para todos los usuarios independientemente de sus capacidades.</p>
<p>Si encuentra alguna dificultad para acceder a la información de esta web, por favor, póngase en contacto con nosotros en info@vestraweb.es.</p>
`);

// 4. Update vite.config.js to compile the new pages
let viteConfig = fs.readFileSync('vite.config.js', 'utf8');
if (!viteConfig.includes('aviso-legal.html')) {
    viteConfig = viteConfig.replace(/(input: \{)/, '$1\n        "aviso-legal": resolve(__dirname, "aviso-legal.html"),\n        "privacidad": resolve(__dirname, "privacidad.html"),\n        "cookies": resolve(__dirname, "cookies.html"),\n        "accesibilidad": resolve(__dirname, "accesibilidad.html"),');
    fs.writeFileSync('vite.config.js', viteConfig, 'utf8');
}

console.log('Unified footers and created legal pages.');
