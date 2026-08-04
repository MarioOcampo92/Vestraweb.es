import fs from 'fs';

let c = fs.readFileSync('index.html', 'utf8');

// Insert arrows right before </div>\n        </div>\n        <div class="unified-btn-container">
const target = `            </div>\n        </div>\n        <div class="unified-btn-container">`;
const arrows = `            </div>
          <button class="carousel-prev" aria-label="Anterior">&#10094;</button>
          <button class="carousel-next" aria-label="Siguiente">&#10095;</button>
        </div>
        <div class="unified-btn-container">`;

if (c.includes(target)) {
  c = c.replace(target, arrows);
  console.log('Arrows inserted successfully');
} else {
  // Try to find it
  const idx = c.indexOf('unified-btn-container');
  console.log('Context around unified-btn-container:');
  console.log(JSON.stringify(c.substring(idx-200, idx+50)));
}

// Also fix portafolio nav link
c = c.replace(/href="\/portafolio"/g, 'href="/proyectos"');
c = c.replace(/href="\/portafolio\.html"/g, 'href="/proyectos"');

fs.writeFileSync('index.html', c, 'utf8');
