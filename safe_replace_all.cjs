const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Add aria label safely
    content = content.replace(
        /<a href="https:\/\/api\.whatsapp\.com\/send\?phone=34687180231" class="whatsapp-float"[^>]*>/g,
        '<a href="https://api.whatsapp.com/send?phone=34687180231" class="whatsapp-float" target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp">'
    );
    
    // Add fetchpriority to logo safely
    content = content.replace(
        /<img[^>]+src="\/assets\/vestra-logo-gradient\.svg"[^>]*>/g,
        '<img src="/assets/vestra-logo-gradient.svg" alt="VestraWeb - Agencia de Diseño Web y SEO en Tarragona" style="height: 32px;" fetchpriority="high">'
    );

    // Remove old manual link tags that cause duplicate CSS injections
    content = content.replace(/<link rel="stylesheet" href="\/style\.css">\s*/g, '');

    fs.writeFileSync(file, content, 'utf8');
}
console.log('Fixed tags properly with explicit UTF-8');
