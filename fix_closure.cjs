const fs = require('fs');
let safeContent = fs.readFileSync('main.js', 'utf8');

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
console.log('Fixed closure');
