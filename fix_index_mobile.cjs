const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// Remove inline padding from intro-section
content = content.replace(/<section class="intro-section"[^>]*>/, '<section class="intro-section">');

// Wrap accordion in container
if (!content.includes('<div class="container">\\n              <div class="accordion">') && !content.includes('<div class="container">\\n<div class="accordion">')) {
    content = content.replace(/<div class="services-accordion-section"[^>]*>\s*<div class="accordion">/g, 
        '<div class="services-accordion-section" style="margin-top: 4rem;">\n            <div class="container">\n              <div class="accordion">');
    
    const regex = /<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/;
    content = content.replace(regex, '</div>\n              </div>\n            </div>\n          </div>\n    </section>');
}

fs.writeFileSync('index.html', content, 'utf8');
console.log('Fixed index.html layout.');
