const fs = require('fs'); let css = fs.readFileSync('style.css', 'utf8'); css = css.replace(/\.\s+h3,\s+\.h3\s+{/g, 'h3, .h3 {'); fs.writeFileSync('style.css', css, 'utf8');
