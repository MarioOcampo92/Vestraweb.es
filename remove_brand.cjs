const fs = require('fs');

function removeBrand(file) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        // Remove from <title>
        content = content.replace(/ \| VestraWeb<\/title>/g, '</title>');
        // Remove from og:title
        content = content.replace(/ \| VestraWeb">/g, '">');
        
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Cleaned brand name from ${file}`);
    }
}

removeBrand('diseno-web-castellon.html');
removeBrand('diseno-web-wordpress-barcelona.html');
