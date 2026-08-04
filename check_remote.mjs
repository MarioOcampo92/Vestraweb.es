import Client from 'ssh2-sftp-client';

const sftp = new Client();
const config = {
  host: '147.93.54.119',
  port: 65002,
  username: 'u675599434',
  password: 'Eficiencia--28'
};

async function check() {
  try {
    await sftp.connect(config);
    const remotePath = 'domains/vestraweb.es/public_html/index.html';
    const content = await sftp.get(remotePath);
    console.log("Remote index.html length:", content.length);
    console.log("Contains stylesheet?", content.toString('utf-8').includes('stylesheet'));
    console.log("Contains main-Chof?", content.toString('utf-8').includes('main-Chof'));
  } catch (err) {
    console.error(err);
  } finally {
    sftp.end();
  }
}

check();
