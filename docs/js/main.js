const isLocalhost = window.location.href.includes('127.0.0.1') || window.location.href.includes('localhost');
const componentUrl = isLocalhost ? '../../dist/modal-element.js' : '../lib/modal-element.js';

import(componentUrl).then(module => {
  module.ModalElement.defineCustomElement();

  document.querySelectorAll('[data-open^="modal"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = document.getElementById(btn.dataset.open);

      if (modal) {
        modal.open = true;
      }
    });
  });

  document.querySelectorAll('[data-close^="modal"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = document.getElementById(btn.dataset.close);

      if (modal) {
        modal.open = false;
      }
    });
  });

  const handleEvents = evt => {
    if (evt.type === 'me-request-close' && evt.detail.reason === 'close-button' && evt.detail.element.id === 'modal-9') {
      evt.preventDefault();
    }

    console.log(`${evt.type} =>`, evt.detail);
  };

  document.addEventListener('me-open', handleEvents);
  document.addEventListener('me-close', handleEvents);
  document.addEventListener('me-request-close', handleEvents);

  // Interactive demo
  const attributesForm = document.getElementById('attributes-form');
  const reasonsForm = document.getElementById('reasons-form');
  const customStylingForm = document.getElementById('custom-styling-form');
  const interactiveDemoModal = document.getElementById('modal-10');

  attributesForm.addEventListener('change', evt => {
    evt.preventDefault();

    [...attributesForm.elements].forEach(el => {
      if (el.type === 'checkbox') {
        el.checked ? interactiveDemoModal.setAttribute(el.name, '') : interactiveDemoModal.removeAttribute(el.name);
      } else if (el.type === 'input') {
        interactiveDemoModal.setAttribute(el.name, el.value);
      }
    });
  });

  interactiveDemoModal.addEventListener('me-request-close', evt => {
    reasonsForm.querySelectorAll('[name^="reason"]').forEach(el => {
      if (el.checked && el.value === evt.detail.reason) {
        evt.preventDefault();
      }
    });
  });

  customStylingForm.addEventListener('change', evt => {
    evt.preventDefault();

    [...customStylingForm.elements].forEach(el => {
      if (el.type === 'checkbox') {
        interactiveDemoModal.classList.toggle('custom-styling', el.checked);
      }
    });
  });

  reasonsForm.addEventListener('change', evt => {
    evt.preventDefault();
  });
}).catch(err => {
  console.error(err);
});
