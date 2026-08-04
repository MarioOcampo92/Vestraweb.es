const fs = require('fs');

const transcriptPath = 'C:/Users/Mario/.gemini/antigravity/brain/b8ff22f5-fda2-4f1e-a13c-613881de7119/.system_generated/logs/transcript_full.jsonl';
const lines = fs.readFileSync(transcriptPath, 'utf8').split('\\n');

let fullCSS = '';
for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].includes('view_file') && lines[i].includes('style.css') && lines[i].includes('/* ====== CONTACT FORM ====== */')) {
        try {
            const data = JSON.parse(lines[i]);
            // Find the output of the view_file tool which contains the css
            if (data.content) {
                // If the view_file output contains the full CSS, it might be in the tool response
                // Actually the tool response is in a different step. 
                // It's easier to just dump the data content to see where the css is.
            }
        } catch(e) {}
    }
}
