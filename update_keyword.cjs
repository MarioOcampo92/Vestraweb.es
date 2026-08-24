const fs = require('fs');
const path = require('path');

console.log("Starting Keyword Pivot and Link Injection...");

// 1. UPDATE disenador-grafico-barcelona.html
let cvPath = 'disenador-grafico-barcelona.html';
let cv = fs.readFileSync(cvPath, 'utf8');

// The old wrong keyword: "Diseño Web WordPress Barcelona"
// The new correct keyword: "Diseñador Gráfico en Barcelona"

cv = cv.replace(/Diseño Web WordPress Barcelona/g, "Diseñador Gráfico en Barcelona");
cv = cv.replace(/Diseño Web WordPress/g, "Diseñador Gráfico en");

// Update glitch hero text
cv = cv.replace(
    /<span class="filled" style="color: #fff;">DISEÑO WEB<\/span><br>\s*<span class="filled" style="color: #fff;">WORDPRESS<\/span><br>\s*<span class="filled" style="color: #fff;">BARCELONA<\/span>/g, 
    `<span class="filled" style="color: #fff;">DISEÑADOR</span><br>
            <span class="filled" style="color: #fff;">GRÁFICO EN</span><br>
            <span class="filled" style="color: #fff;">BARCELONA</span>`
);
cv = cv.replace(/<div class="glitch-layer glitch-cyan">DISEÑO WEB<br>WORDPRESS<br>BARCELONA<\/div>/g, '<div class="glitch-layer glitch-cyan">DISEÑADOR<br>GRÁFICO EN<br>BARCELONA</div>');
cv = cv.replace(/<div class="glitch-layer glitch-magenta">DISEÑO WEB<br>WORDPRESS<br>BARCELONA<\/div>/g, '<div class="glitch-layer glitch-magenta">DISEÑADOR<br>GRÁFICO EN<br>BARCELONA</div>');

fs.writeFileSync(cvPath, cv, 'utf8');
console.log("- CV Page Keyword Pivot Done.");

// 2. UPDATE components/footer.html
let footerPath = 'components/footer.html';
if (fs.existsSync(footerPath)) {
    let footer = fs.readFileSync(footerPath, 'utf8');
    if (!footer.includes('Bio: Diseñador Gráfico')) {
        footer = footer.replace(
            '<a href="/diseno-web-castellon">Diseño web Castellón</a>',
            '<a href="/diseno-web-castellon">Diseño web Castellón</a>\n                <a href="/diseno-web-wordpress-barcelona">Diseño web Barcelona</a>\n                <a href="/disenador-grafico-barcelona" title="Bio Diseñador Gráfico en Barcelona">Bio: Diseñador Gráfico Barcelona</a>'
        );
        fs.writeFileSync(footerPath, footer, 'utf8');
        console.log("- Footer Component Updated.");
    }
}

// 3. INJECT INTO NAVIGATION OF ALL HTML FILES
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    let changed = false;
    
    // Add to Header Dropdown
    if (content.includes('<a href="/diseno-web-wordpress-barcelona">Barcelona</a>') && !content.includes('Bio: Diseñador Gráfico')) {
        content = content.replace(
            '<a href="/diseno-web-wordpress-barcelona">Barcelona</a>',
            '<a href="/diseno-web-wordpress-barcelona">Barcelona</a>\n                    <a href="/disenador-grafico-barcelona" title="Bio Diseñador Gráfico en Barcelona">Bio: Diseñador Gráfico Barcelona</a>'
        );
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(f, content, 'utf8');
        console.log(`- Injected Nav link into ${f}`);
    }
});

console.log("All updates completed successfully.");
