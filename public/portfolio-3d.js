const vertexShader = 
varying vec2 vUv;
uniform float uTime;
uniform float uHoverState;
void main() {
    vUv = uv;
    vec3 newPosition = position;
    // Add wave effect based on hover state
    newPosition.z += sin(newPosition.x * 10.0 + uTime * 2.0) * 0.1 * uHoverState;
    newPosition.z += sin(newPosition.y * 10.0 + uTime * 2.0) * 0.1 * uHoverState;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
;

const fragmentShader = 
uniform sampler2D tTexture;
uniform float uHoverState;
varying vec2 vUv;
void main() {
    vec2 p = vUv;
    // Zoom effect on hover
    p = p + (0.5 - p) * uHoverState * 0.1;
    // RGB shift effect
    float r = texture2D(tTexture, p + vec2(0.01 * uHoverState, 0.0)).r;
    float g = texture2D(tTexture, p).g;
    float b = texture2D(tTexture, p - vec2(0.01 * uHoverState, 0.0)).b;
    vec4 color = vec4(r, g, b, 1.0);
    gl_FragColor = color;
}
;

document.addEventListener('DOMContentLoaded', () => {
    if (typeof THREE === 'undefined') return;

    const items = document.querySelectorAll('.portfolio-item');
    
    items.forEach(item => {
        const imgWrapper = item.querySelector('.bento-img-wrapper');
        const img = imgWrapper.querySelector('img');
        if (!img) return;

        // Hide original image
        img.style.opacity = '0';
        
        // Setup Three.js
        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera( -1, 1, 1, -1, 0, 1 );
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(imgWrapper.clientWidth, imgWrapper.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        
        // Create container for canvas
        const canvasContainer = document.createElement('div');
        canvasContainer.style.position = 'absolute';
        canvasContainer.style.top = '0';
        canvasContainer.style.left = '0';
        canvasContainer.style.width = '100%';
        canvasContainer.style.height = '100%';
        canvasContainer.style.pointerEvents = 'none'; // let hover pass to item
        imgWrapper.appendChild(canvasContainer);
        canvasContainer.appendChild(renderer.domElement);

        // Load texture
        const loader = new THREE.TextureLoader();
        loader.load(img.src, (texture) => {
            const material = new THREE.ShaderMaterial({
                vertexShader,
                fragmentShader,
                uniforms: {
                    uTime: { value: 0 },
                    uHoverState: { value: 0 },
                    tTexture: { value: texture }
                }
            });

            const geometry = new THREE.PlaneGeometry(2, 2, 32, 32);
            const mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);

            let hoverState = 0;
            item.addEventListener('mouseenter', () => { hoverState = 1; });
            item.addEventListener('mouseleave', () => { hoverState = 0; });

            const clock = new THREE.Clock();
            function animate() {
                requestAnimationFrame(animate);
                const time = clock.getElapsedTime();
                material.uniforms.uTime.value = time;
                
                // Lerp hover state
                material.uniforms.uHoverState.value += (hoverState - material.uniforms.uHoverState.value) * 0.1;
                
                renderer.render(scene, camera);
            }
            animate();

            // Handle resize
            window.addEventListener('resize', () => {
                renderer.setSize(imgWrapper.clientWidth, imgWrapper.clientHeight);
            });
        });
    });
});
