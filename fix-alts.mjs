import fs from 'fs';
import path from 'path';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            if (!file.includes('node_modules') && !file.includes('dist')) {
                results = results.concat(walk(file));
            }
        } else if (file.endsWith('.html')) {
            results.push(file);
        }
    });
    return results;
}

const htmlFiles = walk(process.cwd());

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    // 1. Fix Logo Alts
    const logoRegex = /alt="VestraWeb(?:\s*-\s*)?([^"]*)"/g;
    content = content.replace(logoRegex, (match, p1) => {
        changed = true;
        if (p1 && p1.trim() !== '') {
            return `alt="${p1.trim()}"`;
        }
        // If it was just "VestraWeb" (like in legal pages), fallback
        return `alt="Diseño Web y SEO"`;
    });

    // 2. Fix other image alts if they start or end with "por VestraWeb" or "VestraWeb"
    const generalAltRegex = /alt="([^"]*?)\s*(?:-|por|by)?\s*VestraWeb\s*([^"]*?)"/gi;
    content = content.replace(generalAltRegex, (match, before, after) => {
        changed = true;
        const newAlt = `${before} ${after}`.trim();
        return `alt="${newAlt}"`;
    });
    
    // Catch cases like alt="VestraWeb Team"
    const vestraWebRegex = /alt="([^"]*?)VestraWeb([^"]*?)"/gi;
    content = content.replace(vestraWebRegex, (match, before, after) => {
        changed = true;
        const newAlt = `${before}${after}`.trim();
        return `alt="${newAlt}"`;
    });

    // Also to fix the LCP issue, add link rel preload for the logo in components/head.html
    if (file.includes('head.html') || file.endsWith('head.html')) {
        if (!content.includes('rel="preload" as="image" href="/assets/vestra-logo-gradient.svg"')) {
            content = content.replace('<head>', '<head>\n    <link rel="preload" as="image" href="/assets/vestra-logo-gradient.svg" type="image/svg+xml">');
            changed = true;
        }
    }

    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated alts in ${file}`);
    }
});
