const fs = require('fs');
let js = fs.readFileSync('main.js', 'utf8');

js = js.replace(/Mensaje enviado con ?xito!/g, '\u00A1Mensaje enviado con \u00E9xito!');

// Premium success icon (a beautiful gradient checkmark or similar instead of basic stroke)
const newSuccessSVG = <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"64\" height=\"64\" viewBox=\"0 0 64 64\" style=\"margin: 0 auto 1rem; display:block;\"><defs><linearGradient id=\"grad1\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\"><stop offset=\"0%\" stop-color=\"#10b981\"/><stop offset=\"100%\" stop-color=\"#059669\"/></linearGradient><filter id=\"glow\" x=\"-20%\" y=\"-20%\" width=\"140%\" height=\"140%\"><feGaussianBlur stdDeviation=\"4\" result=\"blur\"/><feComposite in=\"SourceGraphic\" in2=\"blur\" operator=\"over\"/></filter></defs><circle cx=\"32\" cy=\"32\" r=\"30\" fill=\"url(#grad1)\" filter=\"url(#glow)\" opacity=\"0.2\"/><circle cx=\"32\" cy=\"32\" r=\"24\" fill=\"url(#grad1)\"/><path d=\"M20 32 L28 40 L44 24\" fill=\"none\" stroke=\"white\" stroke-width=\"4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>;

// The existing svg inside form.innerHTML:
js = js.replace(/<svg xmlns=[^>]+viewBox=[^>]+>.*?<\/svg>/, newSuccessSVG);

fs.writeFileSync('main.js', js, 'utf8');

