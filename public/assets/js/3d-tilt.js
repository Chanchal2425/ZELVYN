/**
 * ZELVYN — 3D Tilt, Parallax & Interactive System Visualization
 * High-performance hardware-accelerated CSS 3D transforms with requestAnimationFrame.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Check reduced motion preference
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  initHero3DParallax();
  initCard3DTilt();
});

/**
 * 1. Hero 3D System Cluster Parallax
 */
function initHero3DParallax() {
  const container = document.querySelector('.hero-3d-system-wrapper');
  const cluster = document.querySelector('.hero-3d-cluster');
  const core = document.querySelector('.cluster-core-zelvyn');
  const nodes = document.querySelectorAll('.orbit-node-3d');

  if (!container || !cluster) return;

  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;
  let isHovering = false;

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Normalize (-1 to 1)
    mouseX = x / (rect.width / 2);
    mouseY = y / (rect.height / 2);
    isHovering = true;
  });

  container.addEventListener('mouseleave', () => {
    mouseX = 0;
    mouseY = 0;
    isHovering = false;
  });

  function render() {
    // Smooth easing interpolation
    currentX += (mouseX - currentX) * 0.08;
    currentY += (mouseY - currentY) * 0.08;

    const rotX = -currentY * 12; // tilt up/down
    const rotY = currentX * 16;  // tilt left/right

    cluster.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;

    if (core) {
      core.style.transform = `translateZ(40px) scale(${1 + Math.abs(currentX * 0.05)})`;
    }

    nodes.forEach((node, index) => {
      const depth = 20 + (index % 3) * 15;
      const shiftX = -currentX * (index % 2 === 0 ? 12 : -12);
      const shiftY = -currentY * (index % 2 === 0 ? 10 : -10);
      node.style.transform = `translate3d(${shiftX}px, ${shiftY}px, ${depth}px)`;
    });

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

/**
 * 2. Card 3D Hover Tilt for Interactive Cards
 */
function initCard3DTilt() {
  const tiltCards = document.querySelectorAll('[data-tilt], .card-tilt');
  if (!tiltCards.length) return;

  tiltCards.forEach(card => {
    card.style.transformStyle = 'preserve-3d';
    card.style.perspective = '1000px';

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotX = -((y - centerY) / centerY) * 8;
      const rotY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}
