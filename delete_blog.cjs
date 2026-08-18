const fs = require('fs');
const path = require('path');

// 1. Remove blog link from all HTML files
function cleanBlogLinks(folder) {
    const files = fs.readdirSync(folder);
    for (const file of files) {
        const fullPath = path.join(folder, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== 'dist') {
                cleanBlogLinks(fullPath);
            }
        } else if (file.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            if (content.includes('<a href="/blog">Blog</a>')) {
                // Remove the line with the blog link
                content = content.replace(/[ \t]*<a href="\/blog">Blog<\/a>\r?\n?/g, '');
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log('Removed blog link from', fullPath);
            }
        }
    }
}
cleanBlogLinks(__dirname);

// 2. Remove blog from vite.config.js
let viteConfig = fs.readFileSync('vite.config.js', 'utf8');
viteConfig = viteConfig.replace(/[ \t]*blog: resolve\(__dirname, 'blog\.html'\),\r?\n?/g, '');
fs.writeFileSync('vite.config.js', viteConfig, 'utf8');
console.log('Removed blog from vite.config.js');

// 3. Update .htaccess to redirect old blog posts to / instead of /blog
let htaccess = fs.readFileSync('.htaccess', 'utf8');
htaccess = htaccess.replace(/Redirect 301 (.*?) \/blog/g, 'Redirect 301 $1 /');
fs.writeFileSync('.htaccess', htaccess, 'utf8');
console.log('Updated .htaccess redirects');

// 4. Double check noindex in contactar.html and portafolio.html
function ensureNoIndex(filename) {
    if (fs.existsSync(filename)) {
        let content = fs.readFileSync(filename, 'utf8');
        if (!content.includes('<meta name="robots" content="noindex">')) {
            content = content.replace('</head>', '    <meta name="robots" content="noindex">\n</head>');
            fs.writeFileSync(filename, content, 'utf8');
            console.log('Added noindex to', filename);
        } else {
            console.log('noindex already present in', filename);
        }
    }
}
ensureNoIndex('contactar.html');
ensureNoIndex('portafolio.html');

// 5. Delete blog.html
if (fs.existsSync('blog.html')) {
    fs.unlinkSync('blog.html');
    console.log('Deleted blog.html');
}
