const fs = require('fs');
const backup = fs.readFileSync('temp_backup.html', 'utf8');
let current = fs.readFileSync('disenador-grafico-barcelona.html', 'utf8');

// From the backup, extract the sections we lost: 
// El Camino/Timeline, Marquee, Portfolio/Obras Maestras
// These are between "Arsenal Técnico" and the footer

// In the backup, find sections after the Arsenal
const backupArsenalEnd = backup.indexOf('<!-- El CAMINO -->');
const backupFooter = backup.indexOf('<footer class="cyber-footer">');

if (backupArsenalEnd === -1) {
    console.log('ERROR: Could not find "El CAMINO" in backup');
    // Try alternative
    const altIdx = backup.indexOf('El Camino');
    console.log('Alternative "El Camino" at:', altIdx);
}

console.log('Backup Arsenal end (El CAMINO):', backupArsenalEnd);
console.log('Backup footer:', backupFooter);

// Extract the missing sections from backup
const missingSections = backup.substring(backupArsenalEnd, backupFooter);
console.log('Missing sections length:', missingSections.length);
console.log('Missing sections preview:', missingSections.substring(0, 300));

// In the current file, find where to insert (after the Arsenal section)
const currentArsenalEnd = current.indexOf('</section>', current.indexOf('brutalist-arsenal'));
const insertPoint = current.indexOf('\n', currentArsenalEnd + '</section>'.length);

// Also find and remove the duplicate webgl-container
current = current.replace(/\n\n\s*<div id="webgl-container"[^>]*><\/div>\s*\n\s*<footer/,'\n\n    <footer');

// Insert the missing sections  
const before = current.substring(0, insertPoint + 1);
const after = current.substring(insertPoint + 1);

current = before + '\n' + missingSections + '\n' + after;

// Remove duplicate footer (keep only cyber-footer)
// Check if there's a second footer
const footerCount = (current.match(/<footer/g) || []).length;
console.log('Footer count:', footerCount);

if (footerCount > 1) {
    // Remove the standard footer, keep cyber-footer
    const standardFooterStart = current.indexOf('<footer class="footer">');
    if (standardFooterStart !== -1) {
        const standardFooterEnd = current.indexOf('</footer>', standardFooterStart) + '</footer>'.length;
        current = current.substring(0, standardFooterStart) + current.substring(standardFooterEnd);
        console.log('Removed duplicate standard footer');
    }
}

// Remove duplicate webgl-container (keep only the first one)
const webglPositions = [];
let searchFrom = 0;
while (true) {
    const idx = current.indexOf('<div id="webgl-container"', searchFrom);
    if (idx === -1) break;
    webglPositions.push(idx);
    searchFrom = idx + 1;
}
console.log('webgl-container positions:', webglPositions.length);

// Remove all but the first webgl-container
for (let i = webglPositions.length - 1; i >= 1; i--) {
    const start = webglPositions[i];
    const end = current.indexOf('</div>', start) + '</div>'.length;
    // Only remove if it's a standalone div (not nested)
    const snippet = current.substring(start, end + 10);
    if (snippet.includes('webgl-container')) {
        current = current.substring(0, start) + current.substring(end);
        console.log('Removed duplicate webgl-container at index', start);
    }
}

// Final audit
const finalHeroes = (current.match(/<header class="hero"/g) || []).length;
const finalHeaders = (current.match(/class="header"/g) || []).length;
const finalSections = (current.match(/<section/g) || []).length;
const finalFooters = (current.match(/<footer/g) || []).length;

console.log('\n=== FINAL STRUCTURE ===');
console.log('Heroes:', finalHeroes);
console.log('VestraWeb headers:', finalHeaders);
console.log('Sections:', finalSections);
console.log('Footers:', finalFooters);

fs.writeFileSync('disenador-grafico-barcelona.html', current, 'utf8');
console.log('Sections restored successfully!');
