const fs = require('fs');

let content = fs.readFileSync('main.js', 'utf8');

// Replace DOMContentLoaded with load + requestAnimationFrame trick
// to ensure the browser paints the LCP before executing heavy ScrollTrigger logic.

content = content.replace(
  /document\.addEventListener\("DOMContentLoaded", \(\) => {/g,
  `document.addEventListener("DOMContentLoaded", () => {
  // FAST EXECUTIONS (No ScrollTrigger to avoid reflow on load)
  
  // Hero animations run immediately but without scrolltrigger
  const caseHeroContent = document.querySelector('.case-hero-content');
  if (caseHeroContent && typeof gsap !== 'undefined') {
    gsap.fromTo(caseHeroContent,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.2 }
    );
  }
});

// HEAVY EXECUTIONS (ScrollTrigger, Parallax, VanillaTilt) deferred to window load
window.addEventListener("load", () => {
  setTimeout(() => {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
`
);

// We need to carefully balance the brackets. 
// Since we split the single DOMContentLoaded into two events, the file's final `});` needs to match.
// Actually, it's safer to just wrap the heavy stuff inside the original DOMContentLoaded using setTimeout.

let safeContent = fs.readFileSync('main.js', 'utf8');
safeContent = safeContent.replace(
    `  gsap.registerPlugin(ScrollTrigger);`,
    `  // Delay GSAP and ScrollTrigger initialization to avoid blocking the LCP render
  setTimeout(() => {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);`
);

// We also need to close this setTimeout right before the end of the first DOMContentLoaded.
// The first DOMContentLoaded ends around line 387.
// Let's replace the last `});` of that block with `  } }, 150);\n});`
safeContent = safeContent.replace(
    `  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll(".unified-card"), {
      max: 15,
      speed: 400,
      glare: true,
      "max-glare": 0.3,
      scale: 1.05,
      easing: "cubic-bezier(.03,.98,.52,.99)"
    });
  }
});`,
    `  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll(".unified-card"), {
      max: 15,
      speed: 400,
      glare: true,
      "max-glare": 0.3,
      scale: 1.05,
      easing: "cubic-bezier(.03,.98,.52,.99)"
    });
  }
    }
  }, 150); // 150ms delay yields to the browser's paint cycle
});`
);

fs.writeFileSync('main.js', safeContent, 'utf8');
console.log('main.js optimized for reflow');
