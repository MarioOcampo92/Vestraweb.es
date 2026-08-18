const fs = require('fs');

function updateLegalText(filename) {
    let content = fs.readFileSync(filename, 'utf8');
    
    // Check if legal-consent block exists
    if (content.includes('class="legal-consent"')) {
        // Replace name
        content = content.replace(/<strong>Responsable:<\/strong> MARIO FERNANDO OCAMPO QUINTERO/g, '<strong>Responsable:</strong> VestraWeb');
        // Make font much smaller
        content = content.replace(/font-size: 0\.85rem;/g, 'font-size: 0.65rem;');
        
        fs.writeFileSync(filename, content, 'utf8');
        console.log('Updated legal text in', filename);
    }
}

updateLegalText('index.html');
updateLegalText('contactar.html');
