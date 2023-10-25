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

  const handleEvents = evt => {
    console.log(`${evt.type} =>`, evt.detail);
  };

  document.addEventListener('me-open', handleEvents);
  document.addEventListener('me-close', handleEvents);

  const userForm = document.getElementById('user-form');

  userForm.addEventListener('submit', evt => {
    evt.preventDefault();

    const modal = userForm.closest('modal-element');
    const submitButton = modal.querySelector('button[type="submit"]');

    modal.setAttribute('no-closable', '');
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    setTimeout(() => {
      modal.removeAttribute('no-closable');
      submitButton.disabled = false;
      submitButton.textContent = 'Send';
    }, 2000);
  });
}).catch(err => {
  console.error(err);
});
