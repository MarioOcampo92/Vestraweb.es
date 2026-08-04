const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The accordion is at the very top of the file, above <!DOCTYPE html>.
const doctypeIdx = html.indexOf('<!DOCTYPE html>');
if (doctypeIdx > 0) {
    const accordionBlock = html.substring(0, doctypeIdx).trim();
    html = html.substring(doctypeIdx);
    
    // Now insert it into services
    const servicesStr = '<section class=\"services\">';
    const servicesStart = html.indexOf(servicesStr);
    
    // Find the closing </section> of services
    const nextSection = html.indexOf('<section', servicesStart + 10);
    // The closing tag before nextSection
    const servicesEnd = html.lastIndexOf('</section>', nextSection);
    
    if (servicesEnd !== -1) {
        html = html.substring(0, servicesEnd) + '    ' + accordionBlock + '\n    ' + html.substring(servicesEnd);
    }
    
    fs.writeFileSync('index.html', html, 'utf8');
    console.log('Fixed accordion position!');
} else {
    console.log('Could not find accordion at the top.');
}
