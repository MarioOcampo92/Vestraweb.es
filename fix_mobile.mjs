import fs from 'fs';

// 1. UPDATE style.css to fix minmax for mobile safely
let css = fs.readFileSync('style.css', 'utf-8');
css = css.replace(/minmax\((\d+)px, 1fr\)/g, 'minmax(min(100%, $1px), 1fr)');
fs.writeFileSync('style.css', css);
console.log('Fixed minmax in style.css');

// 2. UPDATE main.js to fix Three.js Lottie/Orb size on mobile
let js = fs.readFileSync('main.js', 'utf-8');
const cameraInit = `const camera = new THREE.PerspectiveCamera(75, canvasContainer.clientWidth / canvasContainer.clientHeight, 0.1, 1000);
    camera.position.z = window.innerWidth < 768 ? 24 : 15;`;
js = js.replace(/const camera = new THREE\.PerspectiveCamera[^;]+;[\s\n]*camera\.position\.z = 15;/, cameraInit);

const cameraResize = `window.addEventListener('resize', () => {
      camera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
      camera.position.z = window.innerWidth < 768 ? 24 : 15;
      camera.updateProjectionMatrix();`;
js = js.replace(/window\.addEventListener\('resize', \(\) => {[\s\n]*camera\.aspect = canvasContainer\.clientWidth \/ canvasContainer\.clientHeight;[\s\n]*camera\.updateProjectionMatrix\(\);/, cameraResize);
fs.writeFileSync('main.js', js);
console.log('Fixed Three.js camera in main.js');

// 3. UPDATE index.html for Mario Ocampo's title
let html = fs.readFileSync('index.html', 'utf-8');
html = html.replace('<p>CEO & Desarrollador Web</p>', '<p>CEO & Desarrollador Full-Stack (Python, IA & Web)</p>');
fs.writeFileSync('index.html', html);
console.log('Fixed Mario title in index.html');
