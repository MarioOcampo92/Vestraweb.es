import fs from 'fs';
import path from 'path';

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (!content.includes('rel="preload" as="image" href="/assets/vestra-logo-gradient.svg"')) {
        content = content.replace(/<head>/i, '<head>\n    <link rel="preload" as="image" href="/assets/vestra-logo-gradient.svg" type="image/svg+xml">');
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Added preload to ${file}`);
    }
});
