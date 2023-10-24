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
      --modal-width: 32rem;
      --modal-height: fit-content;
      --header-spacing: 1rem;
      --body-spacing: 1rem;
      --footer-spacing: 1rem;

      display: contents;
    }

    /* Dialog */
    .dialog {
      width: var(--modal-width);
      height: var(--modal-height);
      padding: 0;
    }

    .dialog[open] {
      display: flex;
    }

    .dialog::backdrop {
      background-color: rgba(0, 0, 0, 0.4);
      opacity: 0;
    }

    .dialog[open]::backdrop {
      opacity: 1;
    }

    @media (prefers-reduced-motion: no-preference) {
      .dialog:not(.dialog--no-animations),
      .dialog:not(.dialog--no-animations)::backdrop {
        transition: transform 0.3s, opacity 0.3s, display 0.3s allow-discrete, overlay 0.3s allow-discrete;
      }

      /* 1. IS-OPEN STATE */
      .dialog[open] {
        transform: scale(1);
        opacity: 1;
      }

      /* 2. EXIT STATE */
      .dialog {
        transform: scale(0.95);
        opacity: 0;
      }

      /* 0. BEFORE-OPEN STATE */
      @starting-style {
        .dialog[open] {
          transform: scale(0.9);
          opacity: 0;
        }

        .dialog[open]::backdrop {
          opacity: 0;
        }
      }

      .dialog--static-backdrop:not(.dialog--no-animations) {
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

    /* Dialog panel, header, body, footer */
    .dialog__panel {
      display: flex;
      flex-direction: column;
      flex: 1 1 auto;
    }

    .dialog__header {
      display: flex;
      padding: var(--header-spacing);
      column-gap: 0.5rem;
    }

    .dialog__title {
      display: block;
      flex: 1 1 auto;
      padding: 0;
      margin: 0;
    }

    .dialog__body {
      display: block;
      flex: 1 1 auto;
      padding: var(--body-spacing);
      overflow: auto;
    }

    .dialog__footer {
      padding: var(--footer-spacing);
    }

    .dialog__close {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.4375rem;
      border: none;
      border-radius: 0.25rem;
      background-color: transparent;
    }

    .dialog__close:not(:disabled) {
      cursor: pointer;
    }

    .dialog__close:disabled {
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

  <dialog part="base" class="dialog">
    <div part="panel" class="dialog__panel">
      <header part="header" class="dialog__header">
        <slot name="header" class="dialog__title"></slot>

        <form method="dialog">
          <button type="submit" part="close" class="dialog__close">
            <slot name="close">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
              </svg>
              <span class="visually-hidden">Close</span>
            </slot>
          </button>
        </form>
      </header>

      <slot name="body" part="body" class="dialog__body"></slot>

      <footer part="footer" class="dialog__footer" hidden>
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
      const headerEl = this.#dialogEl?.querySelector('.dialog__header');

      if (headerEl) {
        headerEl.hidden = this.noHeader;
      }
    }

    if (name === 'no-animations' && oldValue !== newValue) {
      this.#dialogEl?.classList.toggle('dialog--no-animations', this.noAnimations);
    }

    if (name === 'no-closable' && oldValue !== newValue) {
      const closeBtnEl = this.#dialogEl?.querySelector('.dialog__close');

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
      detail: { element: this }
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
      detail: { element: this }
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

      this.#dialogEl?.classList.add('dialog--static-backdrop');

      this.#modalStaticAnimationTimeout = setTimeout(() => {
        this.#dialogEl?.classList.remove('dialog--static-backdrop');
        clearTimeout(this.#modalStaticAnimationTimeout);
        this.#modalStaticAnimationTimeout = null;
      }, MODAL_STATIC_ANIMATION_DURATION);
    }

    if (evt.target === evt.currentTarget && !this.staticBackDrop && !this.noClosable) {
      this.#closeDialog();
    }
  };

  #handleFooterSlotChange = () => {
    const footerEl = this.#dialogEl?.querySelector('.dialog__footer');
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
