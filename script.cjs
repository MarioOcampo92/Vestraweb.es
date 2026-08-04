const fs = require('fs');
let c = fs.readFileSync('main.js', 'utf8');

const spinnerSVG = '<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"display:inline-block; vertical-align:middle; animation: spin 1s linear infinite; margin-right:8px;\"><path d=\"M21 12a9 9 0 1 1-6.219-8.56\"/></svg>';
const successSVG = '<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"64\" height=\"64\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#10b981\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"margin: 0 auto 1rem; display:block;\"><path d=\"M22 11.08V12a10 10 0 1 1-5.93-9.14\"/><polyline points=\"22 4 12 14.01 9 11.01\"/></svg>';
const errorSVG = '<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"display:inline-block; vertical-align:middle; margin-right:8px;\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><line x1=\"15\" y1=\"9\" x2=\"9\" y2=\"15\"/><line x1=\"9\" y1=\"9\" x2=\"15\" y2=\"15\"/></svg>';

c = c.replace(/<span style=\"display:inline-block; animation: spin 1s linear infinite;\">[^<]*<\/span> Enviando\.\.\./g, spinnerSVG + 'Enviando...');
c = c.replace(/<div style=\"font-size:3rem; margin-bottom:1rem; color:#10b981;\">.*?<\/div>/g, successSVG);
c = c.replace(/[^<]* Error al enviar/g, errorSVG + 'Error al enviar');

fs.writeFileSync('main.js', c, 'utf8');
