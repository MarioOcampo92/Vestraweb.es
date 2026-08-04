import https from 'https';

// Check the actual response headers to see when was last modified
const req = https.request({
  hostname: 'vestraweb.es',
  path: '/',
  method: 'GET',
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache'
  }
}, (res) => {
  console.log('Status:', res.statusCode);
  console.log('Last-Modified:', res.headers['last-modified']);
  console.log('Cache-Control:', res.headers['cache-control']);
  console.log('ETag:', res.headers['etag']);
  
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => {
    // Check nav portafolio link
    const navSection = body.substring(body.indexOf('<nav'), body.indexOf('</nav>') + 6);
    console.log('\nNAV HTML:');
    console.log(navSection);
    
    // Check if proyectos.html exists on server
    https.get('https://vestraweb.es/proyectos', (r2) => {
      let b2 = '';
      r2.on('data', d => b2 += d);
      r2.on('end', () => {
        console.log('\n/proyectos status:', r2.statusCode);
        console.log('/proyectos title:', b2.match(/<title>[^<]*/)?.[0]);
      });
    });
    
    // Check favicon directly
    https.get('https://vestraweb.es/favicon.png', (r3) => {
      console.log('\nfavicon.png status:', r3.statusCode);
      console.log('favicon content-type:', r3.headers['content-type']);
      console.log('favicon content-length:', r3.headers['content-length']);
    });
  });
});
req.end();
