const fs = require('fs');

let indexHtml = fs.readFileSync('index.html', 'utf8');

function extractBlock(startRegex, endRegex) {
    const matchStart = indexHtml.match(startRegex);
    if (!matchStart) return null;
    const startIdx = matchStart.index;
    
    const matchEnd = indexHtml.substring(startIdx).match(endRegex);
    if (!matchEnd) return null;
    const endIdx = startIdx + matchEnd.index + matchEnd[0].length;
    
    return indexHtml.substring(startIdx, endIdx);
}

// 1. Hero and Intro
const heroContent = extractBlock(/<section class="hero">/, /<\/section>\s*<!-- 4\. Spectacular Three\.js/);
if (heroContent) {
    // Cut right before <!-- 4.
    const realHero = heroContent.replace(/\s*<!-- 4\. Spectacular Three\.js.*$/, '');
    fs.writeFileSync('components/index-hero.html', realHero, 'utf8');
    indexHtml = indexHtml.replace(realHero, '<include src="components/index-hero.html"></include>\\n');
}

// 2. Services
const servicesContent = extractBlock(/<section class="services">/, /<\/section>\s*<!-- 9\. Unified Projects/);
if (servicesContent) {
    const realServices = servicesContent.replace(/\s*<!-- 9\. Unified Projects.*$/, '');
    fs.writeFileSync('components/index-services.html', realServices, 'utf8');
    indexHtml = indexHtml.replace(realServices, '<include src="components/index-services.html"></include>\\n');
}

// 3. Unified Projects
const projectsContent = extractBlock(/<section class="unified-projects" id="portafolio-section">/, /<\/section>\s*<!-- 10\. Contact/);
if (projectsContent) {
    const realProjects = projectsContent.replace(/\s*<!-- 10\. Contact.*$/, '');
    fs.writeFileSync('components/index-portfolio.html', realProjects, 'utf8');
    indexHtml = indexHtml.replace(realProjects, '<include src="components/index-portfolio.html"></include>\\n');
}

fs.writeFileSync('index.html', indexHtml, 'utf8');
console.log('index.html sections modularized!');
