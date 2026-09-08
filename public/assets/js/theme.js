/**
 * ZELVYN — Theme Management System (Light / Dark Mode)
 * Supports system preference auto-detection, manual toggle, localStorage persistence,
 * and eliminates flash of wrong theme (FOUT) on load.
 */

(function () {
  const THEME_KEY = 'zelvyn-theme';

  // Determine initial theme
  function getPreferredTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark'; // default dark-first
  }

  // Apply theme to document element immediately
  const initialTheme = getPreferredTheme();
  document.documentElement.setAttribute('data-theme', initialTheme);

  // Expose toggle API
  window.ZELVYN_THEME = {
    getTheme: function () {
      return document.documentElement.getAttribute('data-theme') || 'dark';
    },
    setTheme: function (theme) {
      if (theme !== 'light' && theme !== 'dark') return;
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem(THEME_KEY, theme);
      updateToggleButtons(theme);
    },
    toggle: function () {
      const current = this.getTheme();
      const next = current === 'dark' ? 'light' : 'dark';
      this.setTheme(next);
      return next;
    }
  };

  // Sync toggle button UI states
  function updateToggleButtons(theme) {
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
      btn.setAttribute('data-current-theme', theme);
      const iconDark = btn.querySelector('.theme-icon-dark');
      const iconLight = btn.querySelector('.theme-icon-light');
      if (iconDark && iconLight) {
        if (theme === 'dark') {
          iconDark.style.display = 'block';
          iconLight.style.display = 'none';
        } else {
          iconDark.style.display = 'none';
          iconLight.style.display = 'block';
        }
      }
    });
  }

  // Initialize event listeners when DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    const currentTheme = window.ZELVYN_THEME.getTheme();
    updateToggleButtons(currentTheme);

    // Bind click events to all theme toggle buttons (desktop + mobile)
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        window.ZELVYN_THEME.toggle();
      });
    });

    // Listen for OS system theme changes if user hasn't explicitly saved a preference
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem(THEME_KEY)) {
          const newTheme = e.matches ? 'dark' : 'light';
          window.ZELVYN_THEME.setTheme(newTheme);
        }
      });
    }
  });
})();
