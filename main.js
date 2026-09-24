import './style.css'

function loadScript(src) {
  return new Promise(resolve => {
    if (document.querySelector(`script[src="${src}"]`)) {
      return resolve();
    }
    const s = document.createElement('script');
    s.src = src;
    s.onload = resolve;
    s.onerror = resolve;
    document.body.appendChild(s);
  });
}

// 1. FAST NATIVE REVEALS (Instant GPU transitions without waiting for external JS)
function initNativeFastReveals() {
  const reveals = document.querySelectorAll('.gs-reveal, .gs-reveal-left, .gs-reveal-right, .gs-reveal-scale');
  if ('IntersectionObserver' in window && reveals.length > 0) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: '60px' });
    reveals.forEach(el => obs.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-revealed'));
  }
}

// 2. CORE INTERACTIVE UI (Available immediately on DOM ready)
function initCoreUI() {
  // Mobile Menu Toggle
  const hamburgerBtn = document.querySelector('.hamburger-icon-btn');
  const navLinks = document.querySelector('.nav-links');
  if (hamburgerBtn && navLinks) {
    const burgerIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`;
    const closeIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
    
    hamburgerBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburgerBtn.innerHTML = navLinks.classList.contains('open') ? closeIcon : burgerIcon;
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        if (navLinks && navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          if (hamburgerBtn) {
            hamburgerBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`;
          }
        }
      }
    });
  });

  // Accordion toggle
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isOpen = item.classList.contains('open');
      const container = item.closest('.accordion');
      if (container) {
        container.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));
      }
      if (!isOpen) item.classList.add('open');
    });
  });

  // Dark mode toggle
  const darkModeBtn = document.querySelector('.dark-mode-icon-btn');
  if (darkModeBtn) {
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark-mode');
      darkModeBtn.textContent = '☀️';
    }
    darkModeBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      darkModeBtn.textContent = isDark ? '☀️' : '🌙';
    });
  }

  // Filter buttons for portfolio
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filterValue = btn.getAttribute('data-filter');
      document.querySelectorAll('.portfolio-item').forEach(item => {
        const itemCategories = item.getAttribute('data-category') || '';
        item.style.display = (filterValue === 'all' || itemCategories.includes(filterValue)) ? 'block' : 'none';
      });
    });
  });

  // Desktop hover tilt for service cards
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('.service-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -12;
        const rotateY = ((x - centerX) / centerX) * 12;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.transition = 'none';
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        card.style.transition = 'transform 0.5s ease';
      });
    });
  }

  // Carousel navigation arrows
  const track = document.querySelector('.unified-carousel-container');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  if (track && prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -320, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: 320, behavior: 'smooth' });
    });
  }
}

// 3. DEFERRED GSAP & SCROLL TRIGGER (Loads on user interaction or idle)
let gsapPromise = null;
function setupGsap() {
  if (gsapPromise) return gsapPromise;
  gsapPromise = (async () => {
    await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js");
    await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js");

    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    // Staggered cards
    const staggerElements = gsap.utils.toArray('.project-card, .blog-card, .step, .service-card, .process-step, .slider-item');
    staggerElements.forEach((el, i) => {
      gsap.fromTo(el, { opacity: 0, y: 35 }, {
        scrollTrigger: { trigger: el, start: "top 92%", toggleActions: "play none none reverse" },
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: (i % 3) * 0.1
      });
    });

    // Empresas logos stagger
    gsap.utils.toArray('.empresas-logos > *').forEach((el, i) => {
      gsap.fromTo(el, { opacity: 0, y: 15 }, {
        scrollTrigger: { trigger: '.empresas', start: "top 85%", toggleActions: "play none none reverse" },
        opacity: 1, y: 0, duration: 0.6, delay: i * 0.06, ease: "power2.out"
      });
    });

    // Case study gallery stagger
    gsap.utils.toArray('.case-gallery img').forEach((el, i) => {
      gsap.fromTo(el, { opacity: 0, y: 30, scale: 0.96 }, {
        scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none reverse" },
        opacity: 1, y: 0, scale: 1, duration: 0.7, delay: i * 0.08, ease: "power2.out"
      });
    });

    // Parallax effects
    const parallaxBanner = document.querySelector('.parallax-banner');
    if (parallaxBanner) {
      gsap.to(parallaxBanner, {
        scrollTrigger: { trigger: parallaxBanner, start: "top bottom", end: "bottom top", scrub: true },
        backgroundPositionY: "60%", ease: "none"
      });
    }

    // Ticker track scrub
    const tickerTrack = document.querySelector('.ticker-track');
    if (tickerTrack) {
      tickerTrack.innerHTML += tickerTrack.innerHTML + tickerTrack.innerHTML;
      gsap.to(tickerTrack, {
        xPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: ".ticker",
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      const tickerSpans = tickerTrack.querySelectorAll('span');
      tickerSpans.forEach((span, index) => {
        if (index % 3 === 0) span.classList.add('filled');
      });
    }
  })();
  return gsapPromise;
}

// 4. LAZY THREE.JS SPHERE (Only loaded when approaching viewport, guaranteed GSAP zoom)
let threeLoaded = false;
function setupThreeJsLazy() {
  const canvasContainer = document.getElementById('canvas-container');
  if (!canvasContainer || threeLoaded) return;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      observer.disconnect();
      threeLoaded = true;
      Promise.all([
        loadScript("https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"),
        setupGsap()
      ]).then(() => {
        initThreeSphere(canvasContainer);
      });
    }
  }, { rootMargin: '300px' });

  observer.observe(canvasContainer);
}

function initThreeSphere(canvasContainer) {
  if (typeof THREE === 'undefined' || !canvasContainer) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, canvasContainer.clientWidth / canvasContainer.clientHeight, 0.1, 1000);
  camera.position.z = window.innerWidth < 768 ? 24 : 15;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  canvasContainer.appendChild(renderer.domElement);

  const geometry = new THREE.TorusKnotGeometry(4.5, 1.5, 150, 24);
  const wireMaterial = new THREE.MeshBasicMaterial({
    color: 0x8b5cf6,
    wireframe: true,
    transparent: true,
    opacity: 0.4
  });
  const wireShape = new THREE.Mesh(geometry, wireMaterial);
  scene.add(wireShape);

  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 500;
  const posArray = new Float32Array(particlesCount * 3);
  for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 20;
  }
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.05,
    color: 0x6200ea,
    transparent: true,
    opacity: 0.6
  });
  const particleMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particleMesh);

  let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;
  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;

  document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
  }, { passive: true });

  function animate() {
    requestAnimationFrame(animate);
    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;
    wireShape.rotation.y += 0.002;
    wireShape.rotation.x += 0.001;
    particleMesh.rotation.y -= 0.001;
    wireShape.rotation.x += 0.05 * (targetY - wireShape.rotation.x);
    wireShape.rotation.y += 0.05 * (targetX - wireShape.rotation.y);
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
    camera.position.z = window.innerWidth < 768 ? 24 : 15;
    camera.updateProjectionMatrix();
    renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
  }, { passive: true });

  // ===== AWWWARDS SCROLL EFFECT: ENGULFING ORB (ZOOM EFFECT) =====
  const orbSection = document.getElementById('orb-section');
  if (orbSection && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    let mm = gsap.matchMedia();

    // Desktop: 2-column layout. Pin it, fade text, and engulf screen (zoom).
    mm.add("(min-width: 769px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: orbSection,
          start: 'top top',
          end: '+=150%',
          scrub: 1,
          pin: true
        }
      });
      
      tl.to(wireShape.scale, { x: 3, y: 3, z: 3, duration: 1 })
        .to(particleMesh.scale, { x: 3, y: 3, z: 3, duration: 1 }, '<')
        .to('.orb-text', { opacity: 0, x: 50, duration: 1 })
        .to(wireShape.scale, { x: 30, y: 30, z: 30, duration: 2 }, '<')
        .to(particleMesh.scale, { x: 30, y: 30, z: 30, duration: 2 }, '<')
        .to(particlesMaterial, { opacity: 0, duration: 1 });
    });

    // Mobile: 1-column layout. No pinning, text stays visible, subtle parallax orb.
    mm.add("(max-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: orbSection,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          pin: false
        }
      });
      
      tl.to(wireShape.scale, { x: 1.5, y: 1.5, z: 1.5, duration: 1 })
        .to(particleMesh.scale, { x: 1.5, y: 1.5, z: 1.5, duration: 1 }, '<')
        .to(wireShape.position, { y: 2, duration: 1 }, '<')
        .to(particleMesh.position, { y: 2, duration: 1 }, '<');
    });

    ScrollTrigger.refresh();
  }
}

// 5. DESKTOP-ONLY VANILLA TILT (Completely skipped on mobile)
function setupVanillaTilt() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  loadScript("https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.8.1/vanilla-tilt.min.js").then(() => {
    if (typeof VanillaTilt !== 'undefined') {
      VanillaTilt.init(document.querySelectorAll(".unified-card"), {
        max: 12,
        speed: 400,
        glare: true,
        "max-glare": 0.25,
        scale: 1.04,
        easing: "cubic-bezier(.03,.98,.52,.99)"
      });
    }
  });
}

// 6. CONTACT FORM AJAX HANDLER
function initContactForms() {
  document.querySelectorAll('.contact-form, .contact-page-form').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      
      btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; animation: spin 1s linear infinite; margin-right:8px;"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>Enviando...';
      btn.disabled = true;
      btn.style.opacity = '0.8';

      try {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          form.innerHTML = '<div class="success-message" style="text-align:center; padding: 2rem 0;"><svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" style="margin: 0 auto 1.5rem; display:block; filter: drop-shadow(0 10px 15px rgba(16, 185, 129, 0.3));"><circle cx="32" cy="32" r="30" fill="none" stroke="#10b981" stroke-width="4"></circle><path d="M20 32 L28 40 L45 23" fill="none" stroke="#10b981" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></path></svg><h3 style="font-size:1.8rem; font-weight:800; margin-bottom:0.5rem; color:#10b981;">¡Mensaje enviado con éxito!</h3><p style="color:var(--color-text-light); font-size:1.1rem;">Nos pondremos en contacto contigo muy pronto.</p></div>';
        } else {
          btn.innerHTML = 'Error al enviar. Intenta de nuevo.';
          setTimeout(() => { btn.innerHTML = originalText; btn.disabled = false; btn.style.opacity = '1'; }, 3000);
        }
      } catch (err) {
        btn.innerHTML = 'Error al enviar. Intenta de nuevo.';
        setTimeout(() => { btn.innerHTML = originalText; btn.disabled = false; btn.style.opacity = '1'; }, 3000);
      }
    });
  });

  if (!document.getElementById('spin-keyframe')) {
    const style = document.createElement('style');
    style.id = 'spin-keyframe';
    style.innerHTML = '@keyframes spin { 100% { transform: rotate(360deg); } }';
    document.head.appendChild(style);
  }
}

// ===== LIFECYCLE INITIALIZATION =====
document.addEventListener("DOMContentLoaded", () => {
  initNativeFastReveals();
  initCoreUI();
  initContactForms();
  setupThreeJsLazy();
});

window.addEventListener("load", () => {
  // Start GSAP & VanillaTilt on idle or first scroll
  const onInteraction = () => {
    ['scroll', 'touchstart', 'mousemove', 'wheel'].forEach(evt => window.removeEventListener(evt, onInteraction, { passive: true }));
    setupGsap();
    setupVanillaTilt();
  };
  ['scroll', 'touchstart', 'mousemove', 'wheel'].forEach(evt => window.addEventListener(evt, onInteraction, { passive: true, once: true }));

  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      setupGsap();
      setupVanillaTilt();
    }, { timeout: 2000 });
  } else {
    setTimeout(() => {
      setupGsap();
      setupVanillaTilt();
    }, 1500);
  }
});
