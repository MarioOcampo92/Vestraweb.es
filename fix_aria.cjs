const fs = require('fs'); 
const files = fs.readdirSync('.').filter(f => f.endsWith('.html')); 
for (const file of files) { 
    let content = fs.readFileSync(file, 'utf8'); 
    content = content.replace(/<a href="https:\/\/api\.whatsapp\.com\/send\?phone=34687180231" class="whatsapp-float" target="_blank" rel="noopener noreferrer">/g, '<a href="https://api.whatsapp.com/send?phone=34687180231" class="whatsapp-float" target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp">'); 
    fs.writeFileSync(file, content, 'utf8'); 
} 
console.log('Replaced');
