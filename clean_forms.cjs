const fs = require('fs');

function cleanFormLegal(filename) {
    let content = fs.readFileSync(filename, 'utf8');
    const match = content.match(/<p style="margin-bottom: 0\.5rem;"><strong>Responsable:<\/strong> VestraWeb.*?<\/p>/s);
    if (match) {
        content = content.replace(match[0], '');
        fs.writeFileSync(filename, content, 'utf8');
        console.log('Cleaned legal text from', filename);
    } else {
        console.log('Legal text not found or already cleaned in', filename);
    }
}

cleanFormLegal('index.html');
cleanFormLegal('contactar.html');
