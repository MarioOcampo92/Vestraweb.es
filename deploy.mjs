import Client from 'ssh2-sftp-client';
import fs from 'fs';
import path from 'path';

const sftp = new Client();

const config = {
  host: '147.93.54.119',
  port: 65002,
  username: 'u675599434',
  password: 'asdasdasdasdasdasd63541--RR'
};

async function deploy() {
  try {
    const distPath = path.join(process.cwd(), 'dist');
    const assetsPath = path.join(distPath, 'assets');

    // 1. Inline CSS into HTML files to eliminate critical request chain & speed up FCP/LCP
    const assetFilesLocal = fs.readdirSync(assetsPath);
    const cssFile = assetFilesLocal.find(f => f.endsWith('.css'));
    if (cssFile) {
      const cssContent = fs.readFileSync(path.join(assetsPath, cssFile), 'utf8');
      const htmlFilesLocal = fs.readdirSync(distPath).filter(f => f.endsWith('.html'));
      for (const file of htmlFilesLocal) {
        const htmlPath = path.join(distPath, file);
        let htmlContent = fs.readFileSync(htmlPath, 'utf8');
        const regex = new RegExp(`<link[^>]+rel="stylesheet"[^>]+href="/assets/${cssFile}"[^>]*>`, 'i');
        htmlContent = htmlContent.replace(regex, `<style>${cssContent}</style>`);
        fs.writeFileSync(htmlPath, htmlContent, 'utf8');
      }
      console.log('Inlined critical CSS into all HTML files');
    }

    console.log('Connecting to SFTP server...');
    await sftp.connect(config);
    console.log('Connected!');

    const remotePath = 'domains/vestraweb.es/public_html';
    console.log(`Uploading ${distPath} to ${remotePath}...`);
    
    await sftp.uploadDir(distPath, remotePath);

    console.log('Deploy completed successfully!');
  } catch (err) {
    console.error('Deployment failed:', err);
  } finally {
    sftp.end();
  }
}

deploy();
