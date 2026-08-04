import Client from 'ssh2-sftp-client';

const sftp = new Client();
const config = {
  host: '147.93.54.119',
  port: 65002,
  username: 'u675599434',
  password: 'Eficiencia--28'
};

async function list() {
  try {
    await sftp.connect(config);
    const remotePath = 'domains/vestraweb.es/public_html/assets';
    const files = await sftp.list(remotePath);
    console.log(files.map(f => f.name).filter(n => n.endsWith('.css')));
  } catch (err) {
    console.error(err);
  } finally {
    sftp.end();
  }
}

list();
