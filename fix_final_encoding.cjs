const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;
    if (content.includes('VISIÁ“N')) {
        content = content.replace(/VISIÁ“N/g, 'VISIÓN');
        changed = true;
    }
    if (content.includes('â‚¬')) {
        content = content.replace(/â‚¬/g, '€');
        changed = true;
    }
    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Fixed ' + file);
    }
}
