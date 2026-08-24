const fs = require('fs');
let html = fs.readFileSync('disenador-grafico-barcelona.html', 'utf8');

const cameraLook = html.indexOf('camera.lookAt(0, -2, -10);');
if (cameraLook > -1) {
    const garbageStart = html.indexOf('<div style="font-family: var(--font-heading)', cameraLook);
    const scriptEnd = html.indexOf('renderer.render(scene, camera);', cameraLook);
    
    if (garbageStart > -1 && scriptEnd > -1 && garbageStart < scriptEnd) {
        html = html.substring(0, garbageStart) + html.substring(scriptEnd);
        fs.writeFileSync('disenador-grafico-barcelona.html', html, 'utf8');
        console.log('Garbage removed from script!');
    } else {
        console.log('Could not find exact bounds for garbage:', { garbageStart, scriptEnd });
    }
} else {
    console.log('Could not find camera.lookAt');
}
