import fs from 'fs';

const dir = '.';

function fixEncoding(file) {
    if (!file.endsWith('.html')) return;
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace mangled UTF-8 bytes back to correct characters
    content = content.replace(/Ã±/g, 'ñ');
    content = content.replace(/Ã³/g, 'ó');
    content = content.replace(/Ã­/g, 'í');
    content = content.replace(/Ã¡/g, 'á');
    content = content.replace(/Ã©/g, 'é');
    content = content.replace(/Ãº/g, 'ú');
    content = content.replace(/Ã‘/g, 'Ñ');
    content = content.replace(/Ã“/g, 'Ó');
    content = content.replace(/Ã /g, 'Í'); // Actually Ã is Í when followed by something, wait...
    content = content.replace(/DESAFÃ OS/g, 'DESAFÍOS');
    content = content.replace(/DiseÃ±o/g, 'Diseño');
    content = content.replace(/diseÃ±o/g, 'diseño');
    content = content.replace(/tÃ©cnicos/g, 'técnicos');
    content = content.replace(/estrategÃ­a/g, 'estrategia');
    content = content.replace(/EstratÃ©gico/g, 'Estratégico');
    content = content.replace(/estratÃ©gicos/g, 'estratégicos');
    content = content.replace(/AsociaciÃ³n/g, 'Asociación');
    
    fs.writeFileSync(file, content, 'utf8');
}

fs.readdirSync(dir).forEach(file => fixEncoding(file));
