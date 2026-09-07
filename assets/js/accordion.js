/**
 * Nexora AI — Accessible Collapsible Accordion
 */

document.addEventListener('DOMContentLoaded', () => {
  const accordions = document.querySelectorAll('.accordion');

  accordions.forEach(accordion => {
    const items = accordion.querySelectorAll('.accordion-item');

    items.forEach(item => {
      const header = item.querySelector('.accordion-header');
      const body = item.querySelector('.accordion-body');

      if (!header || !body) return;

      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close other sibling items in the same accordion
        items.forEach(sibling => {
          if (sibling !== item) {
            sibling.classList.remove('active');
            const siblingBody = sibling.querySelector('.accordion-body');
            const siblingHeader = sibling.querySelector('.accordion-header');
            if (siblingBody) siblingBody.style.maxHeight = null;
            if (siblingHeader) siblingHeader.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle current item
        if (isActive) {
          item.classList.remove('active');
          body.style.maxHeight = null;
          header.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('active');
          body.style.maxHeight = body.scrollHeight + 'px';
          header.setAttribute('aria-expanded', 'true');
        }
      });
    });
  });
});
