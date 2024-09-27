// @ts-check

/**
 * Represents a value that may be of type T, or null.
 *
 * @template T
 * @typedef {T | null} Nullable
 */

/**
 * Available values for the request close reason.
 *
 * @typedef {'close-button' | 'escape-key' | 'backdrop-click' | 'external-invoker'} CloseRequestReason
 */

const PULSE_ANIMATION_DURATION = 300; // milliseconds
const template = document.createElement('template');

const styles = /* css */ `
  :host {
    --me-width: 32rem;
    --me-height: fit-content;
    --me-border-color: initial;
    --me-border-style: solid;
    --me-border-width: initial;
    --me-border-radius: 0;
    --me-box-shadow: none;
    --me-background-color: canvas;
    --me-color: canvastext;

    --me-header-spacing: 1rem;
    --me-footer-spacing: 1rem;
    --me-header-background-color: transparent;
    --me-header-color: initial;

    --me-body-spacing: 1rem;
    --me-body-background-color: transparent;
    --me-body-color: initial;
    --me-footer-background-color: transparent;
    --me-footer-color: initial;

    --me-close-padding: 0.4375rem;
    --me-close-border: none;
    --me-close-border-radius: 0;
    --me-close-background-color: transparent;
    --me-close-color: inherit;
    --me-close-font-size: 1rem;

    --me-backdrop-background: rgba(0, 0, 0, 0.5);
    --me-backdrop-filter: none;

    display: contents;
    box-sizing: border-box;
  }

  :host *,
  :host *:after,
  :host *:before {
    box-sizing: inherit;
  }

  :host([hidden]),
  [hidden] {
    display: none !important;
  }

  /* Dialog */
  .dialog {
    --dialog-placement-margin: calc((2em + 6px) / 2);

    width: var(--me-width);
    height: var(--me-height);
    padding: 0;
    border-color: var(--me-border-color);
    border-style: var(--me-border-style);
    border-width: var(--me-border-width);
    border-radius: var(--me-border-radius);
    box-shadow: var(--me-box-shadow);
    background-color: var(--me-background-color);
    color: var(--me-color);
  }

  .dialog[open] {
    display: flex;
  }

  :host([fullscreen]) .dialog {
    max-width: 100%;
    max-height: 100%;
    width: 100%;
    height: 100%;
  }

  .dialog::backdrop {
    background: var(--me-backdrop-background, rgba(0, 0, 0, 0.5));
    backdrop-filter: var(--me-backdrop-filter, none);
    opacity: 0;
  }

  .dialog[open]::backdrop {
    opacity: 1;
  }

  /* Dialog placement */
  :host(:not([fullscreen])[placement="top-start"]) .dialog {
    margin-block-start: var(--dialog-placement-margin);
    margin-inline-start: var(--dialog-placement-margin);
  }

  :host(:not([fullscreen])[placement="top-center"]) .dialog {
    margin-block-start: var(--dialog-placement-margin);
  }

  :host(:not([fullscreen])[placement="top-end"]) .dialog {
    margin-block-start: var(--dialog-placement-margin);
    margin-inline-end: var(--dialog-placement-margin);
  }

  :host(:not([fullscreen])[placement="center-start"]) .dialog {
    margin-inline-start: var(--dialog-placement-margin);
  }

  :host(:not([fullscreen])[placement="center"]) .dialog {
    margin: auto;
  }

  :host(:not([fullscreen])[placement="center-end"]) .dialog {
    margin-inline-end: var(--dialog-placement-margin);
  }

  :host(:not([fullscreen])[placement="bottom-start"]) .dialog {
    margin-block-end: var(--dialog-placement-margin);
    margin-inline-start: var(--dialog-placement-margin);
  }

  :host(:not([fullscreen])[placement="bottom-center"]) .dialog {
    margin-block-end: var(--dialog-placement-margin);
  }

  :host(:not([fullscreen])[placement="bottom-end"]) .dialog {
    margin-block-end: var(--dialog-placement-margin);
    margin-inline-end: var(--dialog-placement-margin);
  }

  /* Dialog animations */
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
        transform: scale(0.95);
        opacity: 0;
      }

      .dialog[open]::backdrop {
        opacity: 0;
      }
    }

    .dialog--pulse:not(.dialog--no-animations) {
      animation-name: pulse;
      animation-duration: ${PULSE_ANIMATION_DURATION}ms;
      animation-timing-function: cubic-bezier(0.2, 0, 0.38, 0.9);
    }

    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.02); }
      100% { transform: scale(1); }
    }
  }

  /* Dialog panel, header, body, footer */
  .dialog__panel {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    width: 100%;
  }

  .dialog__header {
    display: flex;
    align-items: center;
    padding: var(--me-header-spacing);
    column-gap: 0.5rem;
    background-color: var(--me-header-background-color);
    color: var(--me-header-color);
  }

  :host([no-close-button]) .dialog__header {
    column-gap: 0;
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
    padding: var(--me-body-spacing);
    overflow: auto;
    background-color: var(--me-body-background-color);
    color: var(--me-body-color);
    overscroll-behavior: contain;
  }

  .dialog__footer {
    flex: 0 0 auto;
    text-align: end;
    padding: var(--me-footer-spacing);
    background-color: var(--me-footer-background-color);
    color: var(--me-footer-color);
  }

  .dialog__close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: var(--me-close-padding);
    border: var(--me-close-border);
    border-radius: var(--me-close-border-radius);
    background-color: var(--me-close-background-color);
    color: var(--me-close-color);
    font-size: var(--me-close-font-size);
  }

  .dialog__close:not(:disabled) {
    cursor: pointer;
  }

  .dialog__close:disabled {
    cursor: not-allowed;
  }
`;

template.innerHTML = /* html */ `
  <style>${styles}</style>

  <dialog part="base" class="dialog">
    <div part="panel" class="dialog__panel" aria-labelledby="title">
      <header part="header" class="dialog__header">
        <slot name="header" part="title" class="dialog__title" id="title"></slot>

        <form method="dialog">
          <button type="submit" part="close" class="dialog__close" aria-label="Close">
            <slot name="close">
              <svg part="close-icon" xmlns="http://www.w3.org/2000/svg" width="1.125em" height="1.125em" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
              </svg>
            </slot>
          </button>
        </form>
      </header>

      <slot part="body" class="dialog__body"></slot>

      <footer part="footer" class="dialog__footer" hidden>
        <slot name="footer"></slot>
      </footer>
    </div>
  </dialog>
`;

/**
 * @summary A custom element that renders a modal dialog.
 * @documentation https://github.com/georapbox/modal-element
 *
 * @tagname modal-element - This is the default tag name, unless overridden by the `defineCustomElement` method.
 * @extends HTMLElement
 *
 * @property {boolean} open - Determines whether the modal is open or not.
 * @property {boolean} staticBackdrop - Determines whether the modal should close when the backdrop is clicked.
 * @property {boolean} noHeader - Determines whether the modal should have a header or not.
 * @property {boolean} noAnimations - Determines whether the modal should have animations or not when opening and closing.
 * @property {boolean} noCloseButton - Determines whether the modal should have a default close button or not.
 * @property {boolean} fullscreen - Determines whether the modal should be fullscreen or not.
 * @property {boolean} preserveOverflow - Determines whether the overflow of the body should be preserved when the modal is open.
 * @property {string} placement - Determines the placement of the modal.
 * @property {string} closeLabel - The label of the default close button, used as the aria-label attribute of the close button.
 *
 * @attribute {boolean} open - Reflects the open property.
 * @attribute {boolean} static-backdrop - Reflects the staticBackdrop property.
 * @attribute {boolean} no-header - Reflects the noHeader property.
 * @attribute {boolean} no-animations - Reflects the noAnimations property.
 * @attribute {boolean} no-close-button - Reflects the noCloseButton property.
 * @attribute {boolean} fullscreen - Reflects the fullscreen property.
 * @attribute {boolean} preserve-overflow - Reflects the preserveOverflow property.
 * @attribute {string} placement - Reflects the placement property.
 * @attribute {string} close-label - Reflects the closeLabel property.
 *
 * @slot - The modal's main content (default/unnamed slot).
 * @slot header - The modal's header content, usually a title.
 * @slot footer - The modals' footer content. Usually used for buttons or other actions.
 * @slot close - The content of the close button that appears in the modal's header.
 *
 * @cssproperty --me-width - The width of the modal.
 * @cssproperty --me-height - The height of the modal.
 * @cssproperty --me-border-color - The border color of the modal.
 * @cssproperty --me-border-style - The border style of the modal.
 * @cssproperty --me-border-width - The border width of the modal.
 * @cssproperty --me-border-radius - The border radius of the modal.
 * @cssproperty --me-box-shadow - The box shadow of the modal.
 * @cssproperty --me-background-color - The background color of the modal.
 * @cssproperty --me-color - The foreground color of the modal.
 * @cssproperty --me-header-spacing - The spacing of the header.
 * @cssproperty --me-header-background-color - The background color of the header.
 * @cssproperty --me-header-color - The foreground color of the header.
 * @cssproperty --me-body-spacing - The spacing of the body.
 * @cssproperty --me-body-background-color - The background color of the body.
 * @cssproperty --me-body-color - The foreground color of the body.
 * @cssproperty --me-footer-spacing - The spacing of the footer.
 * @cssproperty --me-footer-background-color - The background color of the footer.
 * @cssproperty --me-footer-color - The foreground color of the footer.
 * @cssproperty --me-close-padding - The padding of the close button.
 * @cssproperty --me-close-border - The border shorthand property of the close button.
 * @cssproperty --me-close-border-radius - The border radius shorthand property of the close button.
 * @cssproperty --me-close-background-color - The background color of the close button.
 * @cssproperty --me-close-color - The foreground color of the close button.
 * @cssproperty --me-close-font-size - The font size of the close button.
 * @cssproperty --me-backdrop-background - The background shorthand property of the backdrop.
 * @cssproperty --me-backdrop-filter - The backdrop filter property of the backdrop.
 *
 * @csspart base - The base wrapper of the modal.
 * @csspart panel - The panel wrapper of the modal.
 * @csspart header - The header wrapper of the modal.
 * @csspart title - The title wrapper of the modal.
 * @csspart close - The default close button rendered in the modal's header.
 * @csspart close-icon - The close icon of the default close button.
 * @csspart body - The body wrapper of the modal.
 * @csspart footer - The footer wrapper of the modal.
 *
 * @fires me-open - Dispatched when the modal is opened.
 * @fires me-close - Dispatched when the modal is closed.
 * @fires me-request-close - Dispatched when the modal is about to close.
 *
 * @method defineCustomElement - Static method. Defines a custom element with the given name.
 * @method show - Instance method. Opens the modal if it is closed, otherwise does nothing.
 * @method hide - Instance method. Closes the modal if it is open, otherwise does nothing.
 */
class ModalElement extends HTMLElement {
  /** @type {Nullable<HTMLDialogElement>} */
  #dialogEl = null;

  /** @type {Nullable<HTMLSlotElement>} */
  #footerSlotEl = null;

  /** @type {Nullable<HTMLSlotElement>} */
  #closeSlotEl = null;

  /** @type {ReturnType<typeof setTimeout> | undefined} */
  #pulseAnimationTimeout = void 0;

  constructor() {
    super();

    if (!this.shadowRoot) {
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(template.content.cloneNode(true));
    }

    if (this.shadowRoot) {
      this.#dialogEl = this.shadowRoot.querySelector('dialog');
      this.#footerSlotEl = this.shadowRoot.querySelector('slot[name="footer"]');
      this.#closeSlotEl = this.shadowRoot.querySelector('slot[name="close"]');
    }
  }

  static get observedAttributes() {
    return ['open', 'no-header', 'no-animations', 'no-close-button', 'close-label'];
  }

  /**
   * Lifecycle method that is called when attributes are changed, added, removed, or replaced.
   *
   * @param {string} name - The name of the attribute.
   * @param {string} oldValue - The old value of the attribute.
   * @param {string} newValue - The new value of the attribute.
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (this.#dialogEl === null) {
      return;
    }

    if (name === 'open' && oldValue !== newValue) {
      if (this.open) {
        this.#dialogEl.showModal();

        this.dispatchEvent(
          new CustomEvent('me-open', {
            bubbles: true,
            composed: true,
            detail: { element: this }
          })
        );

        if (document.body && !this.preserveOverflow) {
          document.body.style.overflow = 'hidden';
        }
      } else {
        this.#dialogEl.close();
      }
    }

    if (name === 'no-header' && oldValue !== newValue) {
      /** @type {Nullable<HTMLElement>} */
      const headerEl = this.#dialogEl.querySelector('.dialog__header');

      if (headerEl !== null) {
        headerEl.hidden = this.noHeader;
      }
    }

    if (name === 'no-animations' && oldValue !== newValue) {
      this.#dialogEl.classList.toggle('dialog--no-animations', this.noAnimations);
    }

    if (name === 'no-close-button' && oldValue !== newValue) {
      /** @type {Nullable<HTMLElement>} */
      const closeBtnEl = this.#dialogEl.querySelector('.dialog__close');

      if (closeBtnEl !== null) {
        closeBtnEl.hidden = this.noCloseButton;
      }
    }

    if (name === 'close-label' && oldValue !== newValue) {
      this.#updateCloseLabel();
    }
  }

  /**
   * Lifecycle method that is called when the element is added to the DOM.
   */
  connectedCallback() {
    this.#upgradeProperty('open');
    this.#upgradeProperty('staticBackdrop');
    this.#upgradeProperty('noHeader');
    this.#upgradeProperty('noAnimations');
    this.#upgradeProperty('noCloseButton');
    this.#upgradeProperty('fullscreen');
    this.#upgradeProperty('preserveOverflow');
    this.#upgradeProperty('placement');
    this.#upgradeProperty('closeLabel');

    this.#dialogEl?.addEventListener('click', this.#handleDialogClick);
    this.#dialogEl?.addEventListener('close', this.#handleDialogClose);
    this.#dialogEl?.addEventListener('cancel', this.#handleDialogCancel);
    this.#dialogEl?.querySelector('form[method="dialog"]')?.addEventListener('submit', this.#handleCloseButtonClick);
    this.#footerSlotEl?.addEventListener('slotchange', this.#handleFooterSlotChange);
    this.#closeSlotEl?.addEventListener('slotchange', this.#handleCloseSlotChange);
  }

  /**
   * Lifecycle method that is called when the element is removed from the DOM.
   */
  disconnectedCallback() {
    this.#pulseAnimationTimeout && clearTimeout(this.#pulseAnimationTimeout);
    this.#dialogEl?.addEventListener('click', this.#handleDialogClick);
    this.#dialogEl?.removeEventListener('close', this.#handleDialogClose);
    this.#dialogEl?.removeEventListener('cancel', this.#handleDialogCancel);
    this.#dialogEl?.querySelector('form[method="dialog"]')?.removeEventListener('submit', this.#handleCloseButtonClick);
    this.#footerSlotEl?.removeEventListener('slotchange', this.#handleFooterSlotChange);
    this.#closeSlotEl?.removeEventListener('slotchange', this.#handleCloseSlotChange);
  }

  /**
   * Deternimes if the modal is open or not.
   *
   * @type {boolean} - True if the modal is open, otherwise false.
   * @default false
   * @attribute open - Reflects the open property.
   */
  get open() {
    return this.hasAttribute('open');
  }

  set open(value) {
    this.toggleAttribute('open', !!value);
  }

  /**
   * Determines whether the modal should close when the backdrop is clicked.
   *
   * @type {boolean} - True if the modal should close when the backdrop is clicked, otherwise false.
   * @default false
   * @attribute static-backdrop - Reflects the staticBackdrop property.
   */
  get staticBackdrop() {
    return this.hasAttribute('static-backdrop');
  }

  set staticBackdrop(value) {
    this.toggleAttribute('static-backdrop', !!value);
  }

  /**
   * Determines whether the modal should have a header or not.
   *
   * @type {boolean} - True if the modal should have a header, otherwise false.
   * @default false
   * @attribute no-header - Reflects the noHeader property.
   */
  get noHeader() {
    return this.hasAttribute('no-header');
  }

  set noHeader(value) {
    this.toggleAttribute('no-header', !!value);
  }

  /**
   * Determines whether the modal should have animations or not when opening and closing.
   *
   * @type {boolean} - True if the modal should have animations, otherwise false.
   * @default false
   * @attribute no-animations - Reflects the noAnimations property.
   */
  get noAnimations() {
    return this.hasAttribute('no-animations');
  }

  set noAnimations(value) {
    this.toggleAttribute('no-animations', !!value);
  }

  /**
   * Determines whether the modal should have a default close button or not.
   *
   * @type {boolean} - True if the modal should have a close button, otherwise false.
   * @default false
   * @attribute no-close-button - Reflects the noCloseButton property.
   */
  get noCloseButton() {
    return this.hasAttribute('no-close-button');
  }

  set noCloseButton(value) {
    this.toggleAttribute('no-close-button', !!value);
  }

  /**
   * Determines whether the modal should be fullscreen or not.
   *
   * @type {boolean} - True if the modal should be fullscreen, otherwise false.
   * @default false
   * @attribute fullscreen - Reflects the fullscreen property.
   */
  get fullscreen() {
    return this.hasAttribute('fullscreen');
  }

  set fullscreen(value) {
    this.toggleAttribute('fullscreen', !!value);
  }

  /**
   * Determines whether the overflow of the body should be preserved when the modal is open.
   *
   * @type {boolean} - True if the overflow of the body should be preserved, otherwise false.
   * @default false
   * @attribute preserve-overflow - Reflects the preserveOverflow property.
   */
  get preserveOverflow() {
    return this.hasAttribute('preserve-overflow');
  }

  set preserveOverflow(value) {
    this.toggleAttribute('preserve-overflow', !!value);
  }

  /**
   * Determines the placement of the modal.
   * Possible values are 'top-start', 'top-center', 'top-end', 'center-start', 'center', 'center-end', 'bottom-start', 'bottom-center', 'bottom-end'.
   *
   * @type {string}
   * @default 'center'
   * @attribute placement - Reflects the placement property.
   */
  get placement() {
    return this.getAttribute('placement') || 'center';
  }

  set placement(value) {
    this.setAttribute('placement', value != null ? value.toString() : value);
  }

  /**
   * The label of the default close button, used as the aria-label attribute of the close button.
   * If user provides text content for the close button using the `close` slot, this property is ignored and the aria-label attribute is removed.
   *
   * @type {string}
   * @default 'Close'
   * @attribute close-label - Reflects the closeLabel property.
   */
  get closeLabel() {
    return this.getAttribute('close-label') || 'Close';
  }

  set closeLabel(value) {
    this.setAttribute('close-label', value != null ? value.toString() : value);
  }

  /**
   * Updates the aria-label attribute of the close button.
   * If the slot for the close button has text content, the aria-label attribute is removed to allow the text content to be used as the label.
   * Otherwise, the aria-label attribute is set to the `closeLabel` property.
   *
   * @returns
   */
  #updateCloseLabel() {
    if (this.#dialogEl === null) {
      return;
    }

    const closeButtonEl = this.#dialogEl.querySelector('.dialog__close');

    if (closeButtonEl === null) {
      return;
    }

    const assignedElements = this.#closeSlotEl?.assignedElements() || [];
    const hasTextContent = assignedElements?.some(el => el.textContent?.replace(/\s/g, '') !== '');

    hasTextContent
      ? closeButtonEl.removeAttribute('aria-label')
      : closeButtonEl.setAttribute('aria-label', this.closeLabel);
  }

  /**
   * Applies a pulse effect on the dialog.
   */
  #applyPulseEffectOnDialog() {
    if (this.#pulseAnimationTimeout) {
      return;
    }

    this.#dialogEl?.classList.add('dialog--pulse');

    this.#pulseAnimationTimeout = setTimeout(() => {
      this.#dialogEl?.classList.remove('dialog--pulse');
      clearTimeout(this.#pulseAnimationTimeout);
      this.#pulseAnimationTimeout = void 0;
    }, PULSE_ANIMATION_DURATION);
  }

  /**
   * Handles the close event of the dialog.
   */
  #handleDialogClose = () => {
    // This is required because the dialog element does not reset
    // the open property when the dialog is closed by the user.
    this.open = false;

    this.dispatchEvent(
      new CustomEvent('me-close', {
        bubbles: true,
        composed: true,
        detail: { element: this }
      })
    );

    if (document.body && !this.preserveOverflow) {
      document.body.style.overflow = '';
    }
  };

  /**
   * Handles the cancel event of the dialog.
   * This event is fired when the user presses the escape key.
   *
   * @param {Event} evt - The cancel event.
   */
  #handleDialogCancel = evt => {
    const requestCloseEvent = this.#createRequestCloseEvent('escape-key');

    this.dispatchEvent(requestCloseEvent);

    if (requestCloseEvent.defaultPrevented) {
      evt.preventDefault();
      !this.noAnimations && this.#applyPulseEffectOnDialog();
    }
  };

  /**
   * Handles the click event of the close button.
   *
   * @param {Event} evt - The click event.
   */
  #handleCloseButtonClick = evt => {
    const requestCloseEvent = this.#createRequestCloseEvent('close-button');

    this.dispatchEvent(requestCloseEvent);

    if (requestCloseEvent.defaultPrevented) {
      evt.preventDefault();
      !this.noAnimations && this.#applyPulseEffectOnDialog();
    }
  };

  /**
   * Handles the click event of the dialog.
   *
   * @param {MouseEvent} evt - The click event.
   */
  #handleDialogClick = evt => {
    const target = evt.target;
    const currentTarget = evt.currentTarget;

    // Close the dialog when the backdrop is clicked.
    if (target === currentTarget) {
      const requestCloseEvent = this.#createRequestCloseEvent('backdrop-click');

      this.dispatchEvent(requestCloseEvent);

      if (requestCloseEvent.defaultPrevented || this.staticBackdrop) {
        !this.noAnimations && this.#applyPulseEffectOnDialog();
      } else {
        this.hide();
      }
    }

    // Close the dialog when external invoker is clicked.
    if (target instanceof HTMLElement && target.closest('[data-me-close]') !== null) {
      const requestCloseEvent = this.#createRequestCloseEvent('external-invoker');

      this.dispatchEvent(requestCloseEvent);

      if (requestCloseEvent.defaultPrevented) {
        !this.noAnimations && this.#applyPulseEffectOnDialog();
      } else {
        this.hide();
      }
    }
  };

  /**
   * Handles the slotchange event of the footer slot.
   */
  #handleFooterSlotChange = () => {
    if (this.#dialogEl === null) {
      return;
    }

    /** @type {Nullable<HTMLElement>} */
    const footerEl = this.#dialogEl.querySelector('.dialog__footer');

    if (footerEl === null) {
      return;
    }

    const footerSlotNodes = this.#footerSlotEl?.assignedNodes();
    const hasFooterSlotNodes = footerSlotNodes ? footerSlotNodes.length > 0 : false;

    footerEl.hidden = !hasFooterSlotNodes;
  };

  /**
   * Handles the slotchange event of the close slot.
   */
  #handleCloseSlotChange = () => {
    this.#updateCloseLabel();
  };

  /**
   * Creates a request close event.
   *
   * @param {CloseRequestReason} reason - The reason that the modal is about to close.
   */
  #createRequestCloseEvent(reason) {
    return new CustomEvent('me-request-close', {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail: {
        reason,
        element: this
      }
    });
  }

  /**
   * This is to safe guard against cases where, for instance, a framework may have added the element to the page and set a
   * value on one of its properties, but lazy loaded its definition. Without this guard, the upgraded element would miss that
   * property and the instance property would prevent the class property setter from ever being called.
   *
   * https://developers.google.com/web/fundamentals/web-components/best-practices#lazy-properties
   *
   * @param {'open' | 'staticBackdrop' | 'noHeader' | 'noAnimations' | 'noCloseButton' | 'fullscreen' | 'preserveOverflow' | 'placement' | 'closeLabel'} prop - The property to upgrade.
   */
  #upgradeProperty(prop) {
    /** @type {any} */
    const instance = this;

    if (Object.prototype.hasOwnProperty.call(instance, prop)) {
      const value = instance[prop];
      delete instance[prop];
      instance[prop] = value;
    }
  }

  /**
   * Opens the modal if it is closed, otherwise does nothing.
   * Make sure that the custom element is defined before calling this method.
   *
   * @example
   * const modal = document.querySelector('modal-element');
   * modal.show();
   */
  show() {
    if (this.open) {
      return;
    }

    this.open = true;
  }

  /**
   * Closes the modal if it is open, otherwise does nothing.
   * Make sure that the custom element is defined before calling this method.
   *
   * @example
   * const modal = document.querySelector('modal-element');
   * modal.hide();
   */
  hide() {
    if (!this.open) {
      return;
    }

    this.open = false;
  }

  /**
   * Defines a custom element with the given name.
   * The name must contain a dash (-).
   *
   * @param {string} [elementName='modal-element']
   * @example
   * ModalElement.defineCustomElement('my-modal');
   */
  static defineCustomElement(elementName = 'modal-element') {
    if (typeof window !== 'undefined' && !window.customElements.get(elementName)) {
      window.customElements.define(elementName, ModalElement);
    }
  }
}

export { ModalElement };
