const fs = require('fs');
let html = fs.readFileSync('disenador-grafico-barcelona.html', 'utf8');

const heroStart = html.indexOf('<div class="hero-title glitch-wrapper">');
if (heroStart > -1) {
    const heroEnd = html.indexOf('</div>\n    </header>', heroStart);
    if (heroEnd > -1) {
        // Find the exact string to replace
        const toReplace = html.substring(heroStart, heroEnd + '</div>'.length);
        const newHtml = '<div class="hero-content" style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 2rem;">\n        ' + toReplace + '\n        </div>';
        
        html = html.substring(0, heroStart) + newHtml + html.substring(heroEnd + '</div>'.length);
        fs.writeFileSync('disenador-grafico-barcelona.html', html, 'utf8');
        console.log('Hero content wrapped in flex column!');
    }
}
