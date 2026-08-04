const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
const schemas = fs.readFileSync('schemas.txt', 'utf8');

const styleLink = '<link rel="stylesheet" href="/style.css">';
const styleIdx = html.indexOf(styleLink);
const headerIdx = html.indexOf('<header class="header">');

const before = html.substring(0, styleIdx + styleLink.length);
const after = html.substring(headerIdx);

fs.writeFileSync('index.html', before + '\n' + schemas + '\n' + '            ' + after, 'utf8');
