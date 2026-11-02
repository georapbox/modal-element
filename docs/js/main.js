import '../lib/browser-window.js';

const url = window.location.href;
const isLocalhost = url.includes('127.0.0.1') || url.includes('localhost');
const componentUrl = isLocalhost ? '../../dist/modal-element.js' : '../lib/modal-element.js';

try {
  const { ModalElement } = await import(componentUrl);
  ModalElement.define();
} catch (err) {
  console.error(err);
}

document.querySelectorAll('[data-open^="modal"]').forEach(btn => {
  btn.addEventListener('click', () => {
    const modal = document.getElementById(btn.dataset.open);

    if (modal) {
      modal.open = true;
    }
  });
});

// Placement demo
const placementForm = document.forms['modal-placement-form'];

placementForm.addEventListener('change', evt => {
  const modal = document.getElementById('modal-placement');

  if (evt.target.name === 'placement') {
    modal.setAttribute('placement', evt.target.value);
    modal.querySelector('code').textContent = `placement="${evt.target.value}"`;
  }
});

// Interactive demo
const attributesForm = document.getElementById('attributes-form');
const reasonsForm = document.getElementById('reasons-form');
const customStylingForm = document.getElementById('custom-styling-form');
const interactiveDemoModal = document.getElementById('modal-interactive');

attributesForm.addEventListener('change', evt => {
  const el = evt.target;

  if (el.name === 'closed-by') {
    interactiveDemoModal.closedBy = el.value;
    return;
  }

  if (el.type === 'checkbox') {
    interactiveDemoModal.toggleAttribute(el.name, el.checked);
  }
});

interactiveDemoModal.addEventListener('modal-request-close', evt => {
  reasonsForm.querySelectorAll('input[type="checkbox"]').forEach(el => {
    if (el.checked) {
      const reason = el.getAttribute('data-reason');

      if (reason === evt.detail.reason) {
        evt.preventDefault();
      }
    }
  });
});

customStylingForm.addEventListener('change', () => {
  customStylingForm.querySelectorAll('input[type="checkbox"]').forEach(el => {
    if (el.type === 'checkbox') {
      interactiveDemoModal.classList.toggle(el.getAttribute('name'), el.checked);
    }
  });
});

// Events
const handleEvents = evt => {
  const { type, target } = evt;

  if (type === 'modal-open') {
    console.group(`Modal: ${target.id}`);
  }

  const shouldPreventClose =
    type === 'modal-request-close' && evt.detail.reason === 'close-button' && target.id === 'modal-prevent-close';

  if (shouldPreventClose) {
    evt.preventDefault();
  }

  console.log(type, evt);

  if (type === 'modal-close') {
    console.groupEnd();
  }
};

document.addEventListener('modal-open', handleEvents);
document.addEventListener('modal-close', handleEvents);
document.addEventListener('modal-request-close', handleEvents);
