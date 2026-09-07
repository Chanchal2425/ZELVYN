/**
 * ZELVYN — Global Main Script
 */

document.addEventListener('DOMContentLoaded', () => {
  initBusinessConfig();
  initStickyHeader();
  initMobileMenu();
  initScrollReveal();
  initBackToTop();
  initFloatingWhatsApp();
  highlightActiveNav();
});

/**
 * 1. Populate dynamic config elements from ZELVYN_CONFIG
 */
function initBusinessConfig() {
  const cfg = (typeof ZELVYN_CONFIG !== 'undefined') ? ZELVYN_CONFIG : ((typeof NOVAFLOW_CONFIG !== 'undefined') ? NOVAFLOW_CONFIG : ((typeof NEXORA_CONFIG !== 'undefined') ? NEXORA_CONFIG : null));
  if (!cfg) return;

  // Replace text nodes with data-config
  document.querySelectorAll('[data-config]').forEach(el => {
    const keyPath = el.getAttribute('data-config').split('.');
    let val = cfg;
    for (const key of keyPath) {
      if (val && val[key] !== undefined) {
        val = val[key];
      } else {
        val = null;
        break;
      }
    }
    if (val !== null) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.value = val;
      } else {
        el.textContent = val;
      }
    }
  });

  // Replace href attributes with data-config-href
  document.querySelectorAll('[data-config-href]').forEach(el => {
    const keyPath = el.getAttribute('data-config-href').split('.');
    let val = cfg;
    for (const key of keyPath) {
      if (val && val[key] !== undefined) {
        val = val[key];
      } else {
        val = null;
        break;
      }
    }
    if (val !== null) {
      el.setAttribute('href', val);
    }
  });
}

/**
 * 2. Sticky Header with Dynamic Backdrop Blur & Shadow
 */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const checkScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', checkScroll, { passive: true });
  checkScroll();
}

/**
 * 3. Mobile Navigation Drawer & Hamburger Toggle
 */
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const backdrop = document.querySelector('.mobile-backdrop');

  if (!toggle || !drawer) return;

  function openMenu() {
    toggle.classList.add('is-active');
    drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    toggle.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    toggle.classList.remove('is-active');
    drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    document.body.style.overflow = '';
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (backdrop) {
    backdrop.addEventListener('click', closeMenu);
  }

  // Close when clicking any nav link
  drawer.querySelectorAll('.mobile-nav-link, .btn').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeMenu();
    }
  });
}

/**
 * 4. Intersection Observer for Scroll Reveal Animations
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }
}

/**
 * 5. Back to Top Button
 */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * 6. Floating Action Button
 */
function initFloatingWhatsApp() {
  const btn = document.querySelector('.whatsapp-float');
  const cfg = (typeof ZELVYN_CONFIG !== 'undefined') ? ZELVYN_CONFIG : ((typeof NOVAFLOW_CONFIG !== 'undefined') ? NOVAFLOW_CONFIG : ((typeof NEXORA_CONFIG !== 'undefined') ? NEXORA_CONFIG : null));
  if (!btn || !cfg) return;

  const phone = (cfg.contact && cfg.contact.whatsappNumber) ? cfg.contact.whatsappNumber.trim() : '';
  
  if (phone) {
    const message = encodeURIComponent(cfg.contact.defaultWhatsAppMessage || 'Hi ZELVYN, I would like to discuss a project.');
    btn.setAttribute('href', `https://wa.me/${phone}?text=${message}`);
    btn.setAttribute('target', '_blank');
    btn.setAttribute('rel', 'noopener noreferrer');
  } else {
    // Graceful fallback to contact page if phone is not yet configured
    const isSubdir = window.location.pathname.includes('/services/') || window.location.pathname.includes('/projects/');
    btn.setAttribute('href', isSubdir ? '../contact.html' : 'contact.html');
    btn.removeAttribute('target');
    btn.removeAttribute('rel');
    const span = btn.querySelector('span');
    if (span) span.textContent = 'Book Consultation';
  }
}

/**
 * 7. Active Navigation State Detection
 */
function highlightActiveNav() {
  const currentPath = window.location.pathname.toLowerCase();
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    const linkPath = href.toLowerCase();
    
    // Check if matching current page
    const isHomePage = (currentPath === '/' || currentPath.endsWith('index.html') || currentPath === '') && (linkPath === 'index.html' || linkPath === './index.html' || linkPath === '/');
    const isCurrentPage = currentPath.includes(linkPath.replace('./', '').replace('../', '').replace('/', ''));

    if (isHomePage || (linkPath !== 'index.html' && linkPath !== '/' && isCurrentPage)) {
      link.classList.add('active');
    }
  });
}
