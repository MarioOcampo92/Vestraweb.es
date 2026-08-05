import './style.css'

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
    gsap.registerPlugin(ScrollTrigger);

  // ===== HERO ANIMATION =====
  // We use CSS animations for the main hero text to optimize Largest Contentful Paint (LCP)
  
  // Case study hero reveal
  const caseHeroContent = document.querySelector('.case-hero-content');
  if (caseHeroContent) {
    gsap.fromTo(caseHeroContent,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.2 }
    );
  }

  // ===== SCROLL-TRIGGERED REVEALS =====
  // Fade up from bottom
  document.querySelectorAll('.gs-reveal').forEach(el => {
    gsap.to(el, {
      scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" },
      opacity: 1, y: 0, duration: 1, ease: "power3.out"
    });
  });

  // Slide in from left
  document.querySelectorAll('.gs-reveal-left').forEach(el => {
    gsap.to(el, {
      scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" },
      opacity: 1, x: 0, duration: 1.2, ease: "power3.out"
    });
  });

  // Slide in from right
  document.querySelectorAll('.gs-reveal-right').forEach(el => {
    gsap.to(el, {
      scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" },
      opacity: 1, x: 0, duration: 1.2, ease: "power3.out"
    });
  });

  // Scale up
  document.querySelectorAll('.gs-reveal-scale').forEach(el => {
    gsap.to(el, {
      scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" },
      opacity: 1, scale: 1, duration: 1, ease: "power3.out"
    });
  });

  // ===== STAGGERED CARD ANIMATIONS =====
  // Portfolio items, project cards, blog cards, steps, service cards
  const staggerElements = gsap.utils.toArray('.project-card, .blog-card, .step, .service-card, .process-step, .slider-item');
  staggerElements.forEach((el, i) => {
    gsap.fromTo(el, { opacity: 0, y: 50 }, {
      scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none reverse" },
      opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: (i % 3) * 0.12
    });
  });

  // ===== EMPRESAS LOGOS STAGGER =====
  gsap.utils.toArray('.empresas-logos > *').forEach((el, i) => {
    gsap.fromTo(el, { opacity: 0, y: 20 }, {
      scrollTrigger: { trigger: '.empresas', start: "top 80%", toggleActions: "play none none reverse" },
      opacity: 1, y: 0, duration: 0.6, delay: i * 0.08, ease: "power2.out"
    });
  });

  // ===== CASE STUDY GALLERY STAGGER =====
  gsap.utils.toArray('.case-gallery img').forEach((el, i) => {
    gsap.fromTo(el, { opacity: 0, y: 40, scale: 0.95 }, {
      scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none reverse" },
      opacity: 1, y: 0, scale: 1, duration: 0.7, delay: i * 0.1, ease: "power2.out"
    });
  });

  // ===== PARALLAX EFFECTS =====
  // Banner parallax
  const parallaxBanner = document.querySelector('.parallax-banner');
  if (parallaxBanner) {
    gsap.to(parallaxBanner, {
      scrollTrigger: { trigger: parallaxBanner, start: "top bottom", end: "bottom top", scrub: true },
      backgroundPositionY: "60%", ease: "none"
    });
  }

  // Case study hero GIF parallax
  const caseGif = document.querySelector('.case-hero-gif');
  if (caseGif) {
    gsap.to(caseGif, {
      scrollTrigger: { trigger: '.case-hero', start: "top top", end: "bottom top", scrub: true },
      y: 150, scale: 1.1, ease: "none"
    });
  }

  // Hero video parallax (subtle zoom out on scroll)
  const heroVideo = document.querySelector('.hero-video');
  if (heroVideo) {
    gsap.to(heroVideo, {
      scrollTrigger: { trigger: '.hero', start: "top top", end: "bottom top", scrub: true },
      y: 100, opacity: 0.4, ease: "none"
    });
  }

  // ===== INTERACTIVE ELEMENTS =====
  // Dark mode toggle
  const darkModeBtn = document.querySelector('.dark-mode-icon-btn');
  if (darkModeBtn) {
    // Check saved preference
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark-mode');
      darkModeBtn.textContent = 'â˜€ï¸';
    }
    
    darkModeBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        darkModeBtn.textContent = 'â˜€ï¸';
      } else {
        localStorage.setItem('theme', 'light');
        darkModeBtn.textContent = 'ðŸŒ™';
      }
    });
  }
  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state of buttons
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Filter portfolio items
      const filterValue = btn.getAttribute('data-filter');
      document.querySelectorAll('.portfolio-item').forEach(item => {
        const itemCategories = item.getAttribute('data-category') || '';
        if (filterValue === 'all' || itemCategories.includes(filterValue)) {
          item.style.display = 'block'; // Or whatever display was default, usually flex/block
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 1. Smooth scrolling for nav links
  document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if(target) {
        target.scrollIntoView({ behavior: 'smooth' });
        // Close mobile menu if open
        const navLinks = document.querySelector('.nav-links');
        const hamburgerBtn = document.querySelector('.hamburger-icon-btn');
        if (navLinks && navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          if (hamburgerBtn) {
            hamburgerBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`;
          }
        }
      }
    });
  });

  // Mobile Menu Toggle
  const hamburgerBtn = document.querySelector('.hamburger-icon-btn');
  const navLinks = document.querySelector('.nav-links');
  if (hamburgerBtn && navLinks) {
    const burgerIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`;
    const closeIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
    
    hamburgerBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      if (navLinks.classList.contains('open')) {
        hamburgerBtn.innerHTML = closeIcon;
      } else {
        hamburgerBtn.innerHTML = burgerIcon;
      }
    });
  }

  // Accordion toggle
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isOpen = item.classList.contains('open');
      // Close all other items in the same accordion
      item.closest('.accordion').querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ===== TICKER SCROLL LINKED AND CLONE =====
  const tickerTrack = document.querySelector('.ticker-track');
  if (tickerTrack) {
    // Clone twice for extra safety on wide screens
    tickerTrack.innerHTML += tickerTrack.innerHTML + tickerTrack.innerHTML;
    
    // Make ticker track move with scroll using GSAP ScrollTrigger
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

    // Fill some random words in ticker
    const tickerSpans = tickerTrack.querySelectorAll('span');
    tickerSpans.forEach((span, index) => {
      if (index % 3 === 0) span.classList.add('filled');
    });
  }

  // ===== BRUTAL 3D TILT EFFECT =====
  const tiltCards = document.querySelectorAll('.service-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -15; // Max 15deg
      const rotateY = ((x - centerX) / centerX) * 15;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      card.style.transition = 'none'; // Instant follow
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.5s ease';
    });
  });

  // Process steps are animated by the global STAGGERED CARD ANIMATIONS above.
  // ===== SPECTACULAR THREE.JS INTERACTIVE SPHERE (AWWWARDS STYLE) =====
  const canvasContainer = document.getElementById('canvas-container');
  if (canvasContainer && typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, canvasContainer.clientWidth / canvasContainer.clientHeight, 0.1, 1000);
    camera.position.z = window.innerWidth < 768 ? 24 : 15;

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvasContainer.appendChild(renderer.domElement);

    // Create a BRUTAL, complex wireframe Torus Knot (Awwwards staple)
    const geometry = new THREE.TorusKnotGeometry(4.5, 1.5, 200, 32);
    
    // Outer wireframe glowing material
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6, // Vibrant purple
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    const wireShape = new THREE.Mesh(geometry, wireMaterial);
    scene.add(wireShape);

    // Add a subtle particle dust cloud around it
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 700;
    const posArray = new Float32Array(particlesCount * 3);
    for(let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 20; // Spread over 20 units
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

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
      mouseX = (event.clientX - windowHalfX);
      mouseY = (event.clientY - windowHalfY);
    });

    // Animation Loop
    function animate() {
      requestAnimationFrame(animate);

      // Smooth mouse follow
      targetX = mouseX * 0.001;
      targetY = mouseY * 0.001;
      
      wireShape.rotation.y += 0.002;
      wireShape.rotation.x += 0.001;
      particleMesh.rotation.y -= 0.001;
      
      // Wobble effect based on mouse
      wireShape.rotation.x += 0.05 * (targetY - wireShape.rotation.x);
      wireShape.rotation.y += 0.05 * (targetX - wireShape.rotation.y);

      renderer.render(scene, camera);
    }
    animate();

    // Handle Resize
    window.addEventListener('resize', () => {
      camera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
      camera.position.z = window.innerWidth < 768 ? 24 : 15;
      camera.updateProjectionMatrix();
      renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    });

    // ===== AWWWARDS SCROLL EFFECT: ENGULFING ORB =====
    const orbSection = document.getElementById('orb-section');
    if (orbSection) {
      let mm = gsap.matchMedia();

      // Desktop: 2-column layout. Pin it, fade text, and engulf screen.
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
    }
  }

  // ===== SPECTACULAR 3D HOVER EFFECT (VANILLA TILT) =====
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll(".unified-card"), {
      max: 15,
      speed: 400,
      glare: true,
      "max-glare": 0.3,
      scale: 1.05,
      easing: "cubic-bezier(.03,.98,.52,.99)"
    });
  }
  } // Close the 'if (typeof gsap !== undefined)' block
} // Close the initHeavyAnimations function

document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector('.unified-carousel-container');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');

    if (track && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            track.scrollBy({ left: -300, behavior: 'smooth' });
        });
        nextBtn.addEventListener('click', () => {
            track.scrollBy({ left: 300, behavior: 'smooth' });
        });
    }
});

// ===== CONTACT FORM AJAX HANDLER =====
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.contact-form').forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            // Loading state
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
                    // Success Animation
                    gsap.to(form.children, {
                        opacity: 0,
                        y: -20,
                        stagger: 0.05,
                        duration: 0.4,
                        ease: 'power2.in',
                        onComplete: () => {
                            form.innerHTML = '<div class="success-message" style="text-align:center; padding: 2rem 0; opacity:0;"><svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 64 64" style="margin: 0 auto 1.5rem; display:block; filter: drop-shadow(0 10px 15px rgba(16, 185, 129, 0.3));"><defs><linearGradient id="premium-green" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#10b981"/><stop offset="100%" stop-color="#059669"/></linearGradient></defs><circle cx="32" cy="32" r="30" fill="none" stroke="url(#premium-green)" stroke-width="4" stroke-dasharray="188" stroke-dashoffset="188"><animate attributeName="stroke-dashoffset" values="188;0" dur="0.8s" fill="freeze" calcMode="spline" keySplines="0.16 1 0.3 1"/></circle><circle cx="32" cy="32" r="24" fill="url(#premium-green)" opacity="0"><animate attributeName="opacity" values="0;0.15" dur="0.8s" begin="0.3s" fill="freeze" /></circle><path d="M20 32 L28 40 L45 23" fill="none" stroke="url(#premium-green)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="50" stroke-dashoffset="50"><animate attributeName="stroke-dashoffset" values="50;0" dur="0.5s" begin="0.4s" fill="freeze" calcMode="spline" keySplines="0.16 1 0.3 1"/></path></svg><h3 style="font-size:1.8rem; font-weight:800; margin-bottom:0.5rem; background: linear-gradient(135deg, #10b981, #3b82f6); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">¡Mensaje enviado con éxito!</h3><p style="color:var(--color-text-light); font-size:1.1rem;">Nos pondremos en contacto contigo muy pronto.</p></div>';
                            gsap.to(form.querySelector('.success-message'), { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
                        }
                    });
                } else {
                    btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-right:8px;"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg> Error al enviar. Intenta de nuevo.';
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.disabled = false;
                        btn.style.opacity = '1';
                    }, 3000);
                }
            } catch (err) {
                btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-right:8px;"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg> Error al enviar. Intenta de nuevo.';
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    btn.style.opacity = '1';
                }, 3000);
            }
        });
    });

    // Adding spin animation if not exists
    if (!document.getElementById('spin-keyframe')) {
        const style = document.createElement('style');
        style.id = 'spin-keyframe';
        style.innerHTML = '@keyframes spin { 100% { transform: rotate(360deg); } }';
        document.head.appendChild(style);
    }
});
