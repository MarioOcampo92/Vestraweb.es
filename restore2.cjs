const fs = require('fs');
const backup = fs.readFileSync('temp_backup.html', 'utf8');
let current = fs.readFileSync('disenador-grafico-barcelona.html', 'utf8');

// Find the sections in backup that we lost
// In the backup, sections go: Manifesto -> Arsenal (swiper) -> Marquee -> Timeline -> Portfolio -> Footer
// We need everything from after the Arsenal (swiper) section to the footer

// Find markers in backup
const backupSections = backup.match(/<!-- [A-Z].*?-->/g);
console.log('Backup section markers:', backupSections);

// Find all section/header/footer tags in backup
const backupTags = [];
const tagRegex = /<(section|header|footer|div class="marquee)[^>]*>/g;
let m;
while ((m = tagRegex.exec(backup)) !== null) {
    backupTags.push({ tag: m[0].substring(0, 80), index: m.index, line: backup.substring(0, m.index).split('\n').length });
}
console.log('\nBackup structure:');
backupTags.forEach((t, i) => console.log(`  ${i+1}. Line ${t.line}: ${t.tag}`));

// In the backup, find the marquee section (it comes after Arsenal)
const marqueeIdx = backup.indexOf('class="marquee-container"');
console.log('\nMarquee at index:', marqueeIdx);

// Find timeline section
const timelineIdx = backup.indexOf('id="timeline-section"');
console.log('Timeline at index:', timelineIdx);

// Find portfolio/obras section  
const portfolioIdx = backup.indexOf('Obras Mae');
console.log('Portfolio at index:', portfolioIdx);

// Find cyber footer
const cyberFooterIdx = backup.indexOf('<footer class="cyber-footer">');
console.log('Cyber footer at index:', cyberFooterIdx);

// Extract everything from marquee to cyber footer (NOT including the footer itself)
if (marqueeIdx !== -1 && cyberFooterIdx !== -1) {
    // Go back to find the start of the marquee div
    const marqueeStart = backup.lastIndexOf('<div', marqueeIdx);
    const missingSections = backup.substring(marqueeStart, cyberFooterIdx);
    console.log('\nExtracted missing sections length:', missingSections.length);
    console.log('Preview:', missingSections.substring(0, 200));
    
    // In the current file, insert these sections after the Arsenal section (before the footer)
    const currentFooter = current.indexOf('<footer class="cyber-footer">');
    if (currentFooter !== -1) {
        current = current.substring(0, currentFooter) + missingSections + '\n\n    ' + current.substring(currentFooter);
        console.log('\nInserted missing sections before footer');
    }
} else {
    console.log('ERROR: Could not find markers in backup');
    
    // Alternative: Find the sections by looking for specific content
    const swipeEndIdx = backup.indexOf('</section>', backup.lastIndexOf('swiper mySwiper'));
    const swiperSectionEnd = backup.indexOf('\n', swipeEndIdx + '</section>'.length) + 1;
    console.log('Swiper section ends at:', swiperSectionEnd);
    
    // Get everything from after swiper to footer
    const footerStart = backup.indexOf('<footer');
    if (footerStart !== -1) {
        const middleSections = backup.substring(swiperSectionEnd, footerStart);
        console.log('Middle sections length:', middleSections.length);
        console.log('Middle sections preview:', middleSections.substring(0, 300));
        
        const currentFooter = current.indexOf('<footer');
        if (currentFooter !== -1) {
            current = current.substring(0, currentFooter) + middleSections + '\n\n' + current.substring(currentFooter);
            console.log('Inserted middle sections');
        }
    }
}

// Final structure check
const finalTags = [];
const tr = /<(section|header|footer)[^>]*>/g;
let fm;
while ((fm = tr.exec(current)) !== null) {
    finalTags.push(fm[0].substring(0, 80));
}
console.log('\n=== FINAL STRUCTURE ===');
finalTags.forEach((t, i) => console.log(`  ${i+1}. ${t}`));

fs.writeFileSync('disenador-grafico-barcelona.html', current, 'utf8');
console.log('\nDone!');
