import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

// 1. Fix Parallax flex-direction
html = html.replace(
    /<section class="parallax-banner" style="background-image: url\('\/assets\/mokko_parallax-scaled.jpg'\); background-position: center; background-size: cover;">/,
    '<section class="parallax-banner" style="background-image: url(\'/assets/mokko_parallax-scaled.jpg\'); background-position: center; background-size: cover; flex-direction: column; justify-content: center; align-items: center; padding: 4rem 2rem;">'
);


// 2. Separate the two Accordions
// Extract Expert Section
const expertRegex = /(<!-- Expert Section -->\s*<section class="expert-section"[^>]*>[\s\S]*?<\/section>)/;
const expertMatch = html.match(expertRegex);

if (expertMatch) {
    // Remove Expert Section from its current place
    html = html.replace(expertMatch[0], '');
    
    // Insert it BEFORE the Mid CTA (which is after Services)
    // Wait, let's insert it BEFORE the Portfolio Carousel instead, or right after Process.
    // Let's put it before Mid CTA
    html = html.replace('<!-- Mid CTA -->', expertMatch[0] + '\n\n    <!-- Mid CTA -->');
}

fs.writeFileSync('index.html', html);
