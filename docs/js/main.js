const isLocalhost = window.location.href.includes('127.0.0.1') || window.location.href.includes('localhost');
const componentUrl = isLocalhost ? '../../dist/modal-element.js' : '../../src/modal-element.js';

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
}).catch(err => {
  console.error(err);
});
