import fs from 'fs';
import path from 'path';
import https from 'https';

const urlRegex = /https:\/\/(vestraweb\.es\/wp-content\/uploads|theme\.madsparrow\.me\/[^'"]+)[^'"\s\)\>]+/g;
const publicAssetsDir = path.join(process.cwd(), 'public', 'assets');

if (!fs.existsSync(publicAssetsDir)) {
    fs.mkdirSync(publicAssetsDir, { recursive: true });
}

function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(dest)) return resolve(true); // Skip if exists
        const file = fs.createWriteStream(dest);
        https.get(url, response => {
            if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => {
                    file.close(resolve);
                });
            } else if (response.statusCode === 301 || response.statusCode === 302) {
                downloadFile(response.headers.location, dest).then(resolve).catch(reject);
            } else {
                reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
            }
        }).on('error', err => {
            fs.unlink(dest, () => reject(err));
        });
    });
}

async function processFiles() {
    const filesToScan = [];
    const dirsToScan = [process.cwd()];

    while (dirsToScan.length > 0) {
        const currentDir = dirsToScan.pop();
        const entries = fs.readdirSync(currentDir, { withFileTypes: true });
        for (const entry of entries) {
            if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === '.git') continue;
            const fullPath = path.join(currentDir, entry.name);
            if (entry.isDirectory()) {
                dirsToScan.push(fullPath);
            } else if (entry.isFile() && /\.(html|js|css)$/.test(entry.name)) {
                filesToScan.push(fullPath);
            }
        }
    }

    for (const filePath of filesToScan) {
        let content = fs.readFileSync(filePath, 'utf8');
        const matches = content.match(urlRegex);
        if (matches) {
            let modified = false;
            for (const url of new Set(matches)) {
                // Ensure no trailing quotes/parentheses
                const cleanUrl = url.replace(/['"\)]+$/, '');
                // Try to get a valid filename
                let filename;
                try {
                     filename = path.basename(new URL(cleanUrl).pathname);
                } catch(e) {
                     continue;
                }
                
                const localPath = `/assets/${filename}`;
                const destPath = path.join(publicAssetsDir, filename);
                
                try {
                    console.log(`Downloading ${cleanUrl} to ${destPath}`);
                    await downloadFile(cleanUrl, destPath);
                    // Global replace
                    content = content.split(cleanUrl).join(localPath);
                    modified = true;
                } catch (e) {
                    console.error(`Error with ${cleanUrl}:`, e.message);
                }
            }
            if (modified) {
                fs.writeFileSync(filePath, content);
                console.log(`Updated ${filePath}`);
            }
        }
    }
    console.log("Done!");
}

processFiles().catch(console.error);
