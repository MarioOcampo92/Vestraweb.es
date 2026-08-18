const fs = require('fs');

const file = 'components/head.html';
let content = fs.readFileSync(file, 'utf8');

// Remove opening and closing head tags
content = content.replace(/<head>/i, '');
content = content.replace(/<\/head>/i, '');

fs.writeFileSync(file, content, 'utf8');
console.log('Removed nested head tags from components/head.html');
