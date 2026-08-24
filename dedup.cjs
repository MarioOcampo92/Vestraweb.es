const fs = require('fs');
let html = fs.readFileSync('disenador-grafico-barcelona.html', 'utf8');

// === STRATEGY ===
// The file has 3 copies of sections stacked. We need to:
// 1. Keep ONLY the FIRST occurrence of each section (the clean one with cv-nav)  
// 2. Remove ALL VestraWeb headers
// 3. Remove "IDENTIDAD VERIFICADA"
// 4. Make sure ThreeJS + its init script is at the end
// 5. Fix the Arsenal grid

// Step 1: Find where the FIRST complete page content ends and the DUPLICATE starts
// The first content block goes from <body> through the first set of sections
// The duplicate starts with the SECOND <header class="header">

// Find all the header class="header" positions (VestraWeb corporate headers)
const vestraHeaders = [];
let searchFrom = 0;
while (true) {
    const idx = html.indexOf('<header class="header">', searchFrom);
    if (idx === -1) break;
    vestraHeaders.push(idx);
    searchFrom = idx + 1;
}
console.log('VestraWeb headers at:', vestraHeaders);

// Find all hero positions
const heroes = [];
searchFrom = 0;
while (true) {
    const idx = html.indexOf('<header class="hero"', searchFrom);
    if (idx === -1) break;
    heroes.push(idx);
    searchFrom = idx + 1;
}
console.log('Heroes at:', heroes);

// The FIRST hero (line ~746) is our good one from fix_hero.cjs
// The SECOND header+hero block (lines 1587-1620) is a DUPLICATE
// The THIRD header+hero block (lines 2391-2424) is another DUPLICATE

// Find where the first good content ends: it should end right before the second VestraWeb header
// That means everything from vestraHeaders[0] onwards to the scripts at the end is duplicate junk
// EXCEPT for the scripts/ThreeJS at the very end

// Let's find the boundary more precisely
// The first Arsenal section ends, then a duplicate VestraWeb header appears

// Strategy: cut from the first VestraWeb header to the last VestraWeb header's matching section end
// Then keep the scripts at the bottom

// Find the first occurrence of a VestraWeb header
const firstDuplicateStart = vestraHeaders[0]; // This is where duplicates begin

// Find the LAST </section> before the ThreeJS scripts at the bottom
const threeJsScriptTag = html.indexOf('<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js');
console.log('ThreeJS script tag at:', threeJsScriptTag);

// Find the end of the last duplicate section - it's right before the ThreeJS scripts
// Look for the last </section> before threeJsScriptTag
let lastSectionEnd = html.lastIndexOf('</section>', threeJsScriptTag);
lastSectionEnd = html.indexOf('\n', lastSectionEnd) + 1; // Include the newline

console.log('First duplicate starts at:', firstDuplicateStart);
console.log('Last section before scripts ends at:', lastSectionEnd);

// Cut out everything from firstDuplicateStart to lastSectionEnd (the duplicated sections)
// But we need to check what's between lastSectionEnd and threeJsScriptTag
console.log('\nContent between last section and ThreeJS script:');
console.log(html.substring(lastSectionEnd, threeJsScriptTag).substring(0, 300));

// Now perform the surgery
const beforeDuplicates = html.substring(0, firstDuplicateStart);
const afterDuplicates = html.substring(lastSectionEnd);

html = beforeDuplicates + '\n\n    ' + afterDuplicates;

// Remove IDENTIDAD VERIFICADA
html = html.replace(/<div[^>]*>.*IDENTIDAD VERIFICADA.*<\/div>\s*/gi, '');

// Remove ascii-noise divs  
html = html.replace(/<div class="ascii-noise"[^>]*>[^<]*<\/div>\s*/gi, '');

// Remove SIGNAL_LOST line
html = html.replace(/<div class="hero-top-data">[^<]*<[^>]*>[^<]*<\/span><\/div>\s*/gi, '');

// Verify the structure
const finalHeroes = (html.match(/<header class="hero"/g) || []).length;
const finalVestraHeaders = (html.match(/class="header"/g) || []).length;
const finalArsenals = (html.match(/ARSENAL/gi) || []).length;
const finalManifiestos = (html.match(/Manifiesto/gi) || []).length;

console.log('\n=== AFTER CLEANUP ===');
console.log('Heroes:', finalHeroes);
console.log('VestraWeb headers:', finalVestraHeaders);
console.log('Arsenal mentions:', finalArsenals);
console.log('Manifiesto mentions:', finalManifiestos);

fs.writeFileSync('disenador-grafico-barcelona.html', html, 'utf8');
console.log('\nFile cleaned successfully!');
