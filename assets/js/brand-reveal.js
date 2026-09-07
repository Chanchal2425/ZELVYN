/**
 * ZELVYN — Brand Reveal & Interactive Acronym Experience
 * Full Brand Meaning:
 * Zero-friction Engineering, Logic, Vision, Your-growth & Networks
 */

document.addEventListener('DOMContentLoaded', () => {
  initBrandIntroAnimation();
  initInteractiveAcronym();
  initLogoReplay();
});

/**
 * 1. Sophisticated Brand Reveal Intro (Session-Gated)
 */
function initBrandIntroAnimation() {
  const introModal = document.getElementById('zelvyn-brand-intro');
  if (!introModal) return;

  const hasSeenIntro = sessionStorage.getItem('zelvyn-intro-seen');
  
  // If user has already seen the intro during this browser session, skip immediately
  if (hasSeenIntro) {
    introModal.style.display = 'none';
    return;
  }

  // Otherwise, run the smooth intro sequence
  introModal.classList.add('is-animating');
  document.body.style.overflow = 'hidden';

  // Sequence progression
  // Phase 1 (0ms): ZELVYN wordmark fades in with tracking
  // Phase 2 (700ms): Smooth expansion into letter breakdown
  setTimeout(() => {
    introModal.classList.add('phase-expanded');
  }, 800);

  // Phase 3 (2800ms): Smooth convergence back into ZELVYN
  setTimeout(() => {
    introModal.classList.add('phase-converged');
  }, 3000);

  // Phase 4 (3800ms): Fade out overlay smoothly & restore scroll
  setTimeout(() => {
    introModal.classList.add('phase-finished');
    document.body.style.overflow = '';
    sessionStorage.setItem('zelvyn-intro-seen', 'true');
    setTimeout(() => {
      introModal.style.display = 'none';
    }, 600);
  }, 3800);

  // Allow user to skip anytime with click or Escape key
  introModal.addEventListener('click', closeIntroImmediately);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && introModal.style.display !== 'none') {
      closeIntroImmediately();
    }
  });

  function closeIntroImmediately() {
    introModal.classList.add('phase-finished');
    document.body.style.overflow = '';
    sessionStorage.setItem('zelvyn-intro-seen', 'true');
    setTimeout(() => {
      introModal.style.display = 'none';
    }, 400);
  }
}

/**
 * 2. Interactive "What ZELVYN Means" Acronym Cards
 */
function initInteractiveAcronym() {
  const acronymItems = document.querySelectorAll('.zelvyn-letter-item');
  if (!acronymItems.length) return;

  acronymItems.forEach(item => {
    const trigger = item.querySelector('.letter-trigger');
    
    // Hover & focus activation
    item.addEventListener('mouseenter', () => {
      acronymItems.forEach(other => other.classList.remove('is-active'));
      item.classList.add('is-active');
    });

    // Touch / click toggle for mobile
    if (trigger) {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const wasActive = item.classList.contains('is-active');
        acronymItems.forEach(other => other.classList.remove('is-active'));
        if (!wasActive) {
          item.classList.add('is-active');
        }
      });
    }
  });
}

/**
 * 3. Logo Micro-Interaction (Replay letter expansion on logo click/hover)
 */
function initLogoReplay() {
  const logos = document.querySelectorAll('.brand-logo');
  logos.forEach(logo => {
    logo.addEventListener('mouseenter', () => {
      const mark = logo.querySelector('.brand-mark');
      if (mark) {
        mark.classList.add('pulse-subtle');
        setTimeout(() => mark.classList.remove('pulse-subtle'), 800);
      }
    });
  });
}

// Global helper to replay brand reveal on demand
window.replayZelvynIntro = function () {
  sessionStorage.removeItem('zelvyn-intro-seen');
  const introModal = document.getElementById('zelvyn-brand-intro');
  if (introModal) {
    introModal.style.display = 'flex';
    introModal.className = 'zelvyn-intro-overlay is-animating';
    initBrandIntroAnimation();
  }
};
