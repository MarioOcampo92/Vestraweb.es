const fs = require('fs');
const lines = fs.readFileSync('index.html', 'utf8').split('\n');
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('<section') || lines[i].includes('</section>') || lines[i].includes('<form') || lines[i].includes('</form>') || lines[i].includes('<header') || lines[i].includes('</header>') || lines[i].includes('<footer') || lines[i].includes('</footer>')) {
        console.log(i + ': ' + lines[i].trim());
    }
}
