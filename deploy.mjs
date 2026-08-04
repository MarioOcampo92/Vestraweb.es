import Client from 'ssh2-sftp-client';
import path from 'path';

const sftp = new Client();

const config = {
  host: '147.93.54.119',
  port: 65002,
  username: 'u675599434',
  password: 'Eficiencia--28'
};

async function deploy() {
  try {
    console.log('Connecting to SFTP server...');
    await sftp.connect(config);
    console.log('Connected!');

    const localPath = path.join(process.cwd(), 'dist');
    const remotePath = 'domains/vestraweb.es/public_html';

    console.log(`Uploading ${localPath} to ${remotePath}...`);
    
    // Upload the directory contents
    await sftp.uploadDir(localPath, remotePath);

    console.log('Deploy completed successfully!');
  } catch (err) {
    console.error('Deployment failed:', err);
  } finally {
    sftp.end();
  }
}

deploy();
