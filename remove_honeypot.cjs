const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(/<input type="text" name="website" style="display:none !important" tabindex="-1" autocomplete="off">\n?\s*/, '');

fs.writeFileSync('index.html', html, 'utf8');

