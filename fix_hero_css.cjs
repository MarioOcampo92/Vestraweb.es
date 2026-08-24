const fs = require('fs');
let html = fs.readFileSync('disenador-grafico-barcelona.html', 'utf8');

// 1. Fix the hero-content layout to be left-aligned and spaced (not centered)
const oldHeroContent = 'display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; text-align: center;';
const newHeroContent = 'display: flex; flex-direction: column; align-items: flex-start; justify-content: center; width: 100%; text-align: left; padding-left: 5%; margin-top: 5vh;';
html = html.replace(oldHeroContent, newHeroContent);

// 2. Add the missing CSS for the hero title (since it's a div now, not an h1) and the glitch effect
const newCss = `
        /* GLITCH HERO & TITLE FIX */
        .hero .hero-title {
            font-size: clamp(3rem, 7.5vw, 6rem) !important;
            font-weight: 900; 
            color: #fff;
            line-height: 0.95; 
            letter-spacing: -2px;
            margin-bottom: 2.5rem;
            text-align: left;
        }
        .hero .hero-title h1 {
            font-size: inherit;
            line-height: inherit;
        }
        .glitch-wrapper {
            position: relative;
            display: inline-block;
        }
        .glitch-layer {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            opacity: 0.8;
            mix-blend-mode: screen;
            font-size: inherit;
            line-height: inherit;
        }
        .glitch-cyan {
            color: #00f0ff;
            transform: translate(-3px, 1px);
            clip-path: polygon(0 10%, 100% 10%, 100% 20%, 0 20%);
            animation: glitch-anim-1 2s infinite linear alternate-reverse;
        }
        .glitch-magenta {
            color: #ff2bd6;
            transform: translate(3px, -1px);
            clip-path: polygon(0 60%, 100% 60%, 100% 70%, 0 70%);
            animation: glitch-anim-2 2.5s infinite linear alternate-reverse;
        }
        @keyframes glitch-anim-1 {
            0% { clip-path: polygon(0 10%, 100% 10%, 100% 20%, 0 20%); transform: translate(-3px, 1px); }
            20% { clip-path: polygon(0 40%, 100% 40%, 100% 50%, 0 50%); transform: translate(3px, -2px); }
            40% { clip-path: polygon(0 80%, 100% 80%, 100% 90%, 0 90%); transform: translate(-3px, 3px); }
            60% { clip-path: polygon(0 20%, 100% 20%, 100% 30%, 0 30%); transform: translate(4px, -1px); }
            80% { clip-path: polygon(0 60%, 100% 60%, 100% 70%, 0 70%); transform: translate(-1px, 4px); }
            100% { clip-path: polygon(0 30%, 100% 30%, 100% 40%, 0 40%); transform: translate(2px, -3px); }
        }
        @keyframes glitch-anim-2 {
            0% { clip-path: polygon(0 60%, 100% 60%, 100% 70%, 0 70%); transform: translate(3px, -1px); }
            20% { clip-path: polygon(0 20%, 100% 20%, 100% 30%, 0 30%); transform: translate(-3px, 2px); }
            40% { clip-path: polygon(0 50%, 100% 50%, 100% 60%, 0 60%); transform: translate(3px, -3px); }
            60% { clip-path: polygon(0 90%, 100% 90%, 100% 100%, 0 100%); transform: translate(-4px, 1px); }
            80% { clip-path: polygon(0 40%, 100% 40%, 100% 50%, 0 50%); transform: translate(1px, -4px); }
            100% { clip-path: polygon(0 80%, 100% 80%, 100% 90%, 0 90%); transform: translate(-2px, 3px); }
        }
</style>`;

html = html.replace('</style>', newCss);
fs.writeFileSync('disenador-grafico-barcelona.html', html, 'utf8');
console.log('Hero Layout, Font Size, and Glitch Effect CSS injected!');
