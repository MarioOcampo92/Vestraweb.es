import Client from 'ssh2-sftp-client';
import fs from 'fs';
import path from 'path';

const sftp = new Client();
const config = {
  host: process.env.SFTP_HOST || '193.203.168.140',
  port: 22,
  username: process.env.SFTP_USER || 'u242018868',
  password: process.env.SFTP_PASSWORD || 'Ocampobros1.'
};

async function deploy() {
  try {
    console.log('Connecting to SFTP server...');
    await sftp.connect(config);
    console.log('Connected!');

    // Read dist folder to find the exact main CSS and JS filenames
    const assets = fs.readdirSync('dist/assets');
    const cssFile = assets.find(f => f.endsWith('.css'));
    const jsFile = assets.find(f => f.endsWith('.js'));

    const filesToUpload = [
      { local: 'dist/index.html', remote: 'domains/vestraweb.es/public_html/index.html' },
      { local: 'dist/portafolio.html', remote: 'domains/vestraweb.es/public_html/portafolio.html' },
      { local: 'dist/blog.html', remote: 'domains/vestraweb.es/public_html/blog.html' },
      { local: 'dist/contactar.html', remote: 'domains/vestraweb.es/public_html/contactar.html' },
      { local: 'dist/proyectos.html', remote: 'domains/vestraweb.es/public_html/proyectos.html' },
      { local: 'dist/mellows.html', remote: 'domains/vestraweb.es/public_html/mellows.html' },
      { local: 'dist/compassionate-christmas.html', remote: 'domains/vestraweb.es/public_html/compassionate-christmas.html' },
      { local: 'dist/selva-de-sabores.html', remote: 'domains/vestraweb.es/public_html/selva-de-sabores.html' },
      { local: 'dist/auarquitectos.html', remote: 'domains/vestraweb.es/public_html/auarquitectos.html' },
      { local: 'dist/jordina-arnau.html', remote: 'domains/vestraweb.es/public_html/jordina-arnau.html' },
      { local: 'dist/ball-de-lletres.html', remote: 'domains/vestraweb.es/public_html/ball-de-lletres.html' },
      { local: 'dist/send_mail.php', remote: 'domains/vestraweb.es/public_html/send_mail.php' },
      { local: `dist/assets/${cssFile}`, remote: `domains/vestraweb.es/public_html/assets/${cssFile}` },
      { local: `dist/assets/${jsFile}`, remote: `domains/vestraweb.es/public_html/assets/${jsFile}` }
    ];

    for (const f of filesToUpload) {
        if (fs.existsSync(f.local)) {
            console.log('Uploading ' + f.local);
            await sftp.fastPut(f.local, f.remote);
        }
    }
    console.log('Deploy completed successfully!');
  } catch (err) {
    console.error('Deployment failed:', err);
  } finally {
    await sftp.end();
  }
}
deploy();

