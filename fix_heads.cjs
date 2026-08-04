const fs = require('fs');
const files = ['auarquitectos.html','jordina-arnau.html','ball-de-lletres.html','selva-de-sabores.html','compassionate-christmas.html','proyectos.html','portafolio.html'];
const badHead = '<head>\\n    <include src="components/head.html"></include>\\n</head>';
const goodHead = '<head>\n    <include src="components/head.html"></include>\n</head>';
for (const f of files) {
    if (fs.existsSync(f)) {
        let c = fs.readFileSync(f, 'utf8');
        if (c.includes(badHead)) {
            c = c.split(badHead).join(goodHead);
            fs.writeFileSync(f, c, 'utf8');
            console.log('Fixed head in ' + f);
        } else {
            console.log('No fix needed in ' + f);
        }
    }
}
