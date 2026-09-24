import Client from 'ssh2-sftp-client';
import fs from 'fs';
import path from 'path';

const sftp = new Client();
const config = { host: '147.93.54.119', port: 65002, username: 'u675599434', password: 'Eficiencia--28' };

async function deploy() {
  try {
    // 1. Inline CSS into HTML files
    const distPath = path.join(process.cwd(), 'dist');
    const assetsPath = path.join(distPath, 'assets');
    
    const assetFilesLocal = fs.readdirSync(assetsPath);
    const cssFile = assetFilesLocal.find(f => f.endsWith('.css'));
    
    if (cssFile) {
        const cssContent = fs.readFileSync(path.join(assetsPath, cssFile), 'utf8');
        const htmlFilesLocal = fs.readdirSync(distPath).filter(f => f.endsWith('.html'));
        
        for (const file of htmlFilesLocal) {
            const htmlPath = path.join(distPath, file);
            let htmlContent = fs.readFileSync(htmlPath, 'utf8');
            
            // Replace the stylesheet link with an inline <style> tag
            // Vite injects something like <link rel="stylesheet" crossorigin href="/assets/style-CyPT9s19.css">
            const regex = new RegExp(`<link[^>]+rel="stylesheet"[^>]+href="/assets/${cssFile}"[^>]*>`, 'i');
            htmlContent = htmlContent.replace(regex, `<style>${cssContent}</style>`);
            
            fs.writeFileSync(htmlPath, htmlContent, 'utf8');
            console.log('Inlined CSS into: ' + file);
        }
    }

    // 2. Upload
    await sftp.connect(config);
    
    // HTML files
    const htmlFiles = fs.readdirSync('dist').filter(f => f.endsWith('.html'));
    for (const file of htmlFiles) {
      console.log('Uploading HTML: ' + file);
      await sftp.put(path.join(process.cwd(), 'dist', file), 'domains/vestraweb.es/public_html/' + file);
    }

    // CSS/JS (We still upload CSS just in case any dynamic JS needs it, though unlikely)
    const assetFiles = fs.readdirSync('dist/assets').filter(f => f.endsWith('.css') || f.endsWith('.js'));
    for (const file of assetFiles) {
      console.log('Uploading Asset: ' + file);
      await sftp.put(path.join(process.cwd(), 'dist/assets', file), 'domains/vestraweb.es/public_html/assets/' + file);
    }
    
    console.log('Upload complete!');
  } catch (err) {
    console.error('Failed:', err);
  } finally {
    sftp.end();
  }
}
deploy();
