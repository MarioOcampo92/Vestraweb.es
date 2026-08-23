import Client from 'ssh2-sftp-client';

const sftp = new Client();
const config = {
  host: '147.93.54.119',
  port: 65002,
  username: 'u675599434',
  password: 'Eficiencia--28'
};

async function deleteOldFile() {
  try {
    console.log('Connecting to SFTP server to delete old file...');
    await sftp.connect(config);
    const remoteFile = 'domains/vestraweb.es/public_html/desarrollo-web-castellon.html';
    
    if (await sftp.exists(remoteFile)) {
        await sftp.delete(remoteFile);
        console.log(`Deleted ${remoteFile}`);
    } else {
        console.log(`${remoteFile} does not exist remotely.`);
    }
  } catch (err) {
    console.error('Delete failed:', err);
  } finally {
    sftp.end();
  }
}

deleteOldFile();
