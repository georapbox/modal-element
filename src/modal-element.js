const COMPONENT_NAME = 'modal-element';
const MODAL_STATIC_ANIMATION_DURATION = 300;
const template = document.createElement('template');

template.innerHTML = /* html */`
  <style>
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    :host([hidden]),
    [hidden] {
      display: none !important;
    }

    :host {
      --width: 32rem;
      --height: fit-content;
      --header-spacing: 1rem;
      --body-spacing: 1rem;
      --footer-spacing: 1rem;

      display: contents;
    }

    /* Modal */
    .modal {
      width: var(--width);
      height: var(--height);
      padding: 0;
    }

    .modal[open] {
      display: flex;
    }

    .modal::backdrop {
      background-color: rgba(0, 0, 0, 0.4);
      opacity: 0;
    }

    .modal[open]::backdrop {
      opacity: 1;
    }

    @media (prefers-reduced-motion: no-preference) {
      .modal:not(.modal--no-animations),
      .modal:not(.modal--no-animations)::backdrop {
        transition: transform 0.3s, opacity 0.3s, display 0.3s allow-discrete, overlay 0.3s allow-discrete;
      }

      /* IS-OPEN STATE */
      .modal[open] {
        transform: scale(1);
        opacity: 1;
      }

      /* EXIT STATE */
      .modal {
        transform: scale(0.95);
        opacity: 0;
      }

      /* BEFORE-OPEN STATE */
      @starting-style {
        .modal[open] {
          transform: scale(0.9);
          opacity: 0;
        }

        .modal[open]::backdrop {
          opacity: 0;
        }
      }

      .modal--static-backdrop:not(.modal--no-animations) {
        animation-name: modal-static;
        animation-duration: ${MODAL_STATIC_ANIMATION_DURATION}ms;
        animation-timing-function: cubic-bezier(0.2, 0, 0.38, 0.9);
      }

      @keyframes modal-static {
        0%   { transform: scale(1); }
        50%  { transform: scale(1.01); }
        100% { transform: scale(1); }
      }
    }

    /* Modal content */
    .modal__content {
      display: flex;
      flex-direction: column;
      flex: 1 1 auto;
    }

    .modal__header {
      display: flex;
      padding: var(--header-spacing);
      column-gap: 0.5rem;
    }

    .modal__title {
      display: block;
      flex: 1 1 auto;
      padding: 0;
      margin: 0;
    }

    .modal__body {
      display: block;
      flex: 1 1 auto;
      padding: var(--body-spacing);
      overflow: auto;
    }

    .modal__body::slotted(*) {
      color: inherit;
    }

    .modal__footer {
      padding: var(--footer-spacing);
    }

    .modal__dismiss {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.4375rem;
      border: none;
      border-radius: 0.25rem;
      background-color: transparent;
    }

    .modal__dismiss:not(:disabled) {
      cursor: pointer;
    }

    .modal__dismiss:disabled {
      cursor: not-allowed;
    }

    /* Utils */
    .visually-hidden {
      position: absolute !important;
      width: 1px !important;
      height: 1px !important;
      padding: 0 !important;
      margin: -1px !important;
      overflow: hidden !important;
      clip: rect(0,0,0,0) !important;
      white-space: nowrap !important;
      border: 0 !important;
    }
  </style>

  <dialog part="dialog" class="modal">
    <div part="content" class="modal__content">
      <header part="header" class="modal__header">
        <slot name="header" class="modal__title"></slot>

        <form method="dialog">
          <button type="submit" part="dismiss" class="modal__dismiss">
            <slot name="dismiss">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
              </svg>
              <span class="visually-hidden">Close</span>
            </slot>
          </button>
        </form>
      </header>

      <slot name="body" part="body" class="modal__body"></slot>

      <footer part="footer" class="modal__footer" hidden>
        <slot name="footer"></slot>
      </footer>
    </div>
  </dialog>
`;

class ModalElement extends HTMLElement {
  #dialogEl;
  #footerSlotEl;
  #modalStaticAnimationTimeout;

  constructor() {
    super();

    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    this.#dialogEl = this.shadowRoot.querySelector('dialog');
    this.#footerSlotEl = this.shadowRoot.querySelector('slot[name="footer"]');
  }

  static get observedAttributes() {
    return ['open', 'no-header', 'no-animations', 'no-closable'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'open' && oldValue !== newValue) {
      this.open ? this.#openDialog() : this.#closeDialog();
    }

    if (name === 'no-header' && oldValue !== newValue) {
      const headerEl = this.#dialogEl?.querySelector('.modal__header');

      if (headerEl) {
        headerEl.hidden = this.noHeader;
      }
    }

    if (name === 'no-animations' && oldValue !== newValue) {
      this.#dialogEl?.classList.toggle('modal--no-animations', this.noAnimations);
    }

    if (name === 'no-closable' && oldValue !== newValue) {
      const closeBtnEl = this.#dialogEl?.querySelector('.modal__dismiss');

      if (closeBtnEl) {
        closeBtnEl.disabled = this.noClosable;
      }
    }
  }

  connectedCallback() {
    this.#upgradeProperty('open');
    this.#upgradeProperty('staticBackDrop');
    this.#upgradeProperty('noHeader');
    this.#upgradeProperty('noAnimations');
    this.#upgradeProperty('noClosable');

    this.#dialogEl?.addEventListener('click', this.#handleDialogClick);
    this.#dialogEl?.addEventListener('close', this.#handleDialogClose);
    this.#dialogEl?.addEventListener('cancel', this.#handleDialogCancel);
    this.#footerSlotEl?.addEventListener('slotchange', this.#handleFooterSlotChange);
  }

  disconnectedCallback() {
    this.#modalStaticAnimationTimeout && clearTimeout(this.#modalStaticAnimationTimeout);
    this.#dialogEl?.addEventListener('click', this.#handleDialogClick);
    this.#dialogEl?.removeEventListener('close', this.#handleDialogClose);
    this.#dialogEl?.removeEventListener('cancel', this.#handleDialogCancel);
    this.#footerSlotEl?.removeEventListener('slotchange', this.#handleFooterSlotChange);
  }

  get open() {
    return this.hasAttribute('open');
  }

  set open(value) {
    if (value) {
      this.setAttribute('open', '');
    } else {
      this.removeAttribute('open');
    }
  }

  get staticBackDrop() {
    return this.hasAttribute('static-backdrop');
  }

  set staticBackDrop(value) {
    if (value) {
      this.setAttribute('static-backdrop', '');
    } else {
      this.removeAttribute('static-backdrop');
    }
  }

  get noHeader() {
    return this.hasAttribute('no-header');
  }

  set noHeader(value) {
    if (value) {
      this.setAttribute('no-header', '');
    } else {
      this.removeAttribute('no-header');
    }
  }

  get noAnimations() {
    return this.hasAttribute('no-animations');
  }

  set noAnimations(value) {
    if (value) {
      this.setAttribute('no-animations', '');
    } else {
      this.removeAttribute('no-animations');
    }
  }

  get noClosable() {
    return this.hasAttribute('no-closable');
  }

  set noClosable(value) {
    if (value) {
      this.setAttribute('no-closable', '');
    } else {
      this.removeAttribute('no-closable');
    }
  }

  async #openDialog() {
    this.#dialogEl?.showModal();
    document.body.style.overflowY = 'hidden';

    this.dispatchEvent(new CustomEvent(`${COMPONENT_NAME}-open`, {
      bubbles: true,
      composed: true,
      detail: { modal: this }
    }));
  }

  #closeDialog() {
    this.#dialogEl?.close();
  }

  #handleDialogClose = () => {
    this.open = false;
    document.body.style.overflowY = null;

    this.dispatchEvent(new CustomEvent(`${COMPONENT_NAME}-close`, {
      bubbles: true,
      composed: true,
      detail: { modal: this }
    }));
  };

  #handleDialogCancel = evt => {
    if (this.noClosable) {
      evt.preventDefault();
    }
  };

  #handleDialogClick = evt => {
    if (
      evt.target === evt.currentTarget
      && this.staticBackDrop
      && !this.noAnimations
      || this.noClosable
    ) {
      if (this.#modalStaticAnimationTimeout) {
        return;
      }

      this.#dialogEl?.classList.add('modal--static-backdrop');

      this.#modalStaticAnimationTimeout = setTimeout(() => {
        this.#dialogEl?.classList.remove('modal--static-backdrop');
        clearTimeout(this.#modalStaticAnimationTimeout);
        this.#modalStaticAnimationTimeout = null;
      }, MODAL_STATIC_ANIMATION_DURATION);
    }

    if (evt.target === evt.currentTarget && !this.staticBackDrop && !this.noClosable) {
      this.#closeDialog();
    }
  };

  #handleFooterSlotChange = () => {
    const footerEl = this.#dialogEl?.querySelector('.modal__footer');
    const hasFooterSlotNodes = this.#footerSlotEl?.assignedNodes()?.length > 0;

    if (!footerEl) {
      return;
    }

    footerEl.hidden = !hasFooterSlotNodes;
  };

  #upgradeProperty(prop) {
    if (Object.prototype.hasOwnProperty.call(this, prop)) {
      const value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }

  static defineCustomElement(elementName = COMPONENT_NAME) {
    if (typeof window !== 'undefined' && !window.customElements.get(elementName)) {
      window.customElements.define(elementName, ModalElement);
    }
  }
}

export { ModalElement };
