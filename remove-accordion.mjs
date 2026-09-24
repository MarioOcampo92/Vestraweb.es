import fs from 'fs';
let c = fs.readFileSync('components/index-services.html', 'utf8');
c = c.split('<div class="services-accordion-section"')[0] + '</section>';
fs.writeFileSync('components/index-services.html', c);
