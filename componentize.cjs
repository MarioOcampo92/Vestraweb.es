const fs = require('fs');
const html = fs.readFileSync('disenador-grafico-barcelona.html', 'utf8');
const lines = html.split('\n');

function extract(start, end, name) {
    const chunk = lines.slice(start - 1, end).join('\n');
    fs.writeFileSync(`components/${name}.html`, chunk);
    console.log(`Created components/${name}.html`);
}

extract(790, 822, 'disenador-grafico-barcelona-manifesto');
extract(826, 884, 'disenador-grafico-barcelona-arsenal');
extract(886, 943, 'disenador-grafico-barcelona-timeline');
extract(945, 1005, 'disenador-grafico-barcelona-portfolio');
extract(1007, 1021, 'disenador-grafico-barcelona-parallax');

// Now, replace those lines with includes
let newLines = [];
let i = 0;
while (i < lines.length) {
    if (i === 789) { // Line 790 is index 789
        newLines.push('    <include src="components/disenador-grafico-barcelona-manifesto.html"></include>');
        i += (822 - 790) + 1;
    } else if (i === 825) {
        newLines.push('    <include src="components/disenador-grafico-barcelona-arsenal.html"></include>');
        i += (884 - 826) + 1;
    } else if (i === 885) {
        newLines.push('    <include src="components/disenador-grafico-barcelona-timeline.html"></include>');
        i += (943 - 886) + 1;
    } else if (i === 944) {
        newLines.push('    <include src="components/disenador-grafico-barcelona-portfolio.html"></include>');
        i += (1005 - 945) + 1;
    } else if (i === 1006) {
        newLines.push('    <include src="components/disenador-grafico-barcelona-parallax.html"></include>');
        i += (1021 - 1007) + 1;
    } else {
        newLines.push(lines[i]);
        i++;
    }
}

fs.writeFileSync('disenador-grafico-barcelona.html', newLines.join('\n'));
console.log('Updated disenador-grafico-barcelona.html');
