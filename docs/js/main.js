const isLocalhost = window.location.href.includes('127.0.0.1') || window.location.href.includes('localhost');
const componentUrl = isLocalhost ? '../../dist/modal-element-defined.js' : '../lib/modal-element-defined.js';

import(componentUrl).then(() => {
  const openModal1 = document.getElementById('open-modal-1');
  const modal1 = document.getElementById('modal-1');

  openModal1.addEventListener('click', () => {
    modal1.open = true;
  });

  const handleEvents = evt => {
    console.log(`${evt.type} =>`, evt.detail);
  };

  modal1.addEventListener('modal-element-open', handleEvents);
  modal1.addEventListener('modal-element-close', handleEvents);
}).catch(err => {
  console.error(err);
});
