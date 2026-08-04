const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

css = css.replace(/([a-zA-Z0-9_-]+)\s+h2/g, '\ h2, \ .h2');
css = css.replace(/([a-zA-Z0-9_-]+)\s+h3/g, '\ h3, \ .h3');
css = css.replace(/([a-zA-Z0-9_-]+)\s+h4/g, '\ h4, \ .h4');

fs.writeFileSync('style.css', css, 'utf8');

