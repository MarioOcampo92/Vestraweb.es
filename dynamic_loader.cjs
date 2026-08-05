const fs = require('fs');

let c = fs.readFileSync('main.js', 'utf8');
// Normalize line endings for replacement
c = c.replace(/\r\n/g, '\n');

const loaderHeader = `import './style.css'

function loadScript(src) {
  return new Promise(resolve => {
    const s = document.createElement('script');
    s.src = src;
    s.onload = resolve;
    document.body.appendChild(s);
  });
}

window.addEventListener('load', () => {
  setTimeout(async () => {
    // Dynamically load heavy libraries AFTER the page is fully loaded and painted
    await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js");
    await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js");
    await loadScript("https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js");
    await loadScript("https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.8.1/vanilla-tilt.min.js");
    
    // Now initialize everything safely
    initHeavyAnimations();
  }, 100);
});

function initHeavyAnimations() {
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);`;

const targetTop = `import './style.css'

document.addEventListener("DOMContentLoaded", () => {
  // Delay GSAP and ScrollTrigger initialization to avoid blocking the LCP render
  setTimeout(() => {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);`;

c = c.replace(targetTop, loaderHeader);

const targetBottom = `      scale: 1.05,
      easing: "cubic-bezier(.03,.98,.52,.99)"
    });
  }
    }
  }, 150);
});`;

const loaderFooter = `      scale: 1.05,
      easing: "cubic-bezier(.03,.98,.52,.99)"
    });
  }
  } // Close the 'if (typeof gsap !== undefined)' block
} // Close the initHeavyAnimations function`;

c = c.replace(targetBottom, loaderFooter);

fs.writeFileSync('main.js', c, 'utf8');
console.log('Main.js updated for dynamic loading with normalized line endings');
