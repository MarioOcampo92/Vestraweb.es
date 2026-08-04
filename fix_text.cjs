const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const R = '\uFFFD';

const replacements = {
    ['Dise' + R + 'o']: 'Diseño',
    ['dise' + R + 'o']: 'diseño',
    ['p' + R + 'ginas']: 'páginas',
    ['r' + R + 'pidas']: 'rápidas',
    ['m' + R + 's']: 'más',
    ['Cu' + R + 'nto']: '¿Cuánto',
    ['C' + R + 'mo']: '¿Cómo',
    ['t' + R + 'cnicas']: 'técnicas',
    ['optimizaci' + R + 'n']: 'optimización',
    ['Puedo']: '¿Puedo',
    ['S' + R + ',']: 'Sí,',
    ['gesti' + R + 'n']: 'gestión',
    ['magn' + R + 'tico']: 'magnético',
    ['a' + R + 'os']: 'años',
    ['Gonz' + R + 'lez']: 'González',
    ['l' + R + 'deres']: 'líderes',
    ['Estrat' + R + 'gico']: 'Estratégico',
    ['nica']: 'única',
    ['nico']: 'único',
    ['est' + R + 'n']: 'están',
    ['tecnolog' + R + 'as']: 'tecnologías',
    ['im' + R + 'genes']: 'imágenes',
    ['c' + R + 'digo']: 'código',
    ['sem' + R + 'ntica']: 'semántica',
    ['pol' + R + 'ticas']: 'políticas',
    ['protecci' + R + 'n']: 'protección',
    ['Qu' + R + '']: '¿Qué',
    ['Tu']: '¿Tu',
    ['Tienes']: '¿Tienes',
    ['Construy' + R + 'mosla']: '¡Construyámosla',
    ['Cont' + R + 'ctanos']: 'Contáctanos',
    ['400' + R]: '400€',
    ['2500' + R]: '2500€',
    ['?']: 'á',
    ['o']: 'á',
    ['?']: 'é',
    ['g']: 'ú',
    ['']: '?'
};

for (const [bad, good] of Object.entries(replacements)) {
    html = html.split(bad).join(good);
}

fs.writeFileSync('index_fixed_text.html', html, 'utf8');
