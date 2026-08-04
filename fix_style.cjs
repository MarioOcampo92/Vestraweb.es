const fs = require('fs');
let s = fs.readFileSync('style.css', 'utf8');

const anchor = '  .unified-carousel-track { gap: 1.5rem; }';
const idx = s.indexOf(anchor);

if (idx !== -1) {
    const startOfBadCode = idx + anchor.length;
    // Find where the real next code should be, which is `/* ====== TEAM ====== */`
    const teamIdx = s.lastIndexOf('/* ====== TEAM ====== */');
    
    if (teamIdx !== -1) {
        const properReplacement = `
  .unified-card { width: 80vw; max-width: 300px; }
  .unified-img-wrapper { height: 350px; }
  
  .about-image { max-width: 300px; }
  .lottie-orb { width: 100%; height: auto; max-width: 320px; margin: 0 auto; }
  .orb-grid { gap: 2rem; }
  .intro-section { padding: 4rem 0 1rem; }
  .services { padding: 4rem 0; }
  .about { padding: 4rem 0; }
  .process { padding: 4rem 0; }
  .accordion { padding: 0 1.5rem; }
  h2, .h2 { font-size: clamp(1.8rem, 6vw, 2.5rem) !important; }
  h2, .h2 { font-size: clamp(1.8rem, 6vw, 2.5rem); }
}

@supports (-webkit-touch-callout: none) { .parallax-banner { background-attachment: scroll !important; } }

`;
        s = s.substring(0, startOfBadCode) + properReplacement + s.substring(teamIdx);
        fs.writeFileSync('style.css', s, 'utf8');
        console.log('Fixed style.css!');
    }
}
