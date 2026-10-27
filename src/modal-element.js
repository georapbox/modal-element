// @ts-check

/**
 * Stable identifier for the reason that the modal is about to close.
 *
 * @typedef {typeof ModalElement.CLOSE_REQUEST_REASONS[keyof typeof ModalElement.CLOSE_REQUEST_REASONS]} CloseRequestReason
 */

const PULSE_KEYFRAMES = [{ transform: 'scale(1)' }, { transform: 'scale(1.02)' }, { transform: 'scale(1)' }];
const PULSE_ANIMATION_OPTIONS = { duration: 300, easing: 'cubic-bezier(0.2, 0, 0.38, 0.9)' };

const styles = /* css */ `
  :host {
    --modal-width: 32rem;
    --modal-height: fit-content;
    --modal-border-color: initial;
    --modal-border-style: solid;
    --modal-border-width: initial;
    --modal-border-radius: 0;
    --modal-box-shadow: none;
    --modal-background-color: canvas;
    --modal-color: canvastext;

    --modal-header-spacing: 1rem;
    --modal-footer-spacing: 1rem;
    --modal-header-background-color: transparent;
    --modal-header-color: initial;

    --modal-body-spacing: 1rem;
    --modal-body-background-color: transparent;
    --modal-body-color: initial;
    --modal-footer-background-color: transparent;
    --modal-footer-color: initial;

    --modal-close-padding: 0.4375rem;
    --modal-close-border: none;
    --modal-close-border-radius: 0;
    --modal-close-background-color: transparent;
    --modal-close-color: inherit;
    --modal-close-font-size: 1rem;

    --modal-backdrop-background: rgba(0, 0, 0, 0.5);
    --modal-backdrop-filter: none;

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

    width: var(--modal-width);
    height: var(--modal-height);
    padding: 0;
    border-color: var(--modal-border-color);
    border-style: var(--modal-border-style);
    border-width: var(--modal-border-width);
    border-radius: var(--modal-border-radius);
    box-shadow: var(--modal-box-shadow);
    background-color: var(--modal-background-color);
    color: var(--modal-color);
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
    background: var(--modal-backdrop-background, rgba(0, 0, 0, 0.5));
    backdrop-filter: var(--modal-backdrop-filter, none);
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
    .dialog[open]:not(.dialog--no-animations) {
      transform: scale(1);
      opacity: 1;
    }

    /* 2. EXIT STATE */
    .dialog:not(.dialog--no-animations) {
      transform: scale(0.95);
      opacity: 0;
    }

    /* 0. BEFORE-OPEN STATE */
    @starting-style {
      .dialog[open]:not(.dialog--no-animations) {
        transform: scale(0.95);
        opacity: 0;
      }

      .dialog[open]:not(.dialog--no-animations)::backdrop {
        opacity: 0;
      }
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
    padding: var(--modal-header-spacing);
    column-gap: 0.5rem;
    background-color: var(--modal-header-background-color);
    color: var(--modal-header-color);
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
    padding: var(--modal-body-spacing);
    overflow: auto;
    background-color: var(--modal-body-background-color);
    color: var(--modal-body-color);
    overscroll-behavior: contain;
  }

  .dialog__footer {
    flex: 0 0 auto;
    text-align: end;
    padding: var(--modal-footer-spacing);
    background-color: var(--modal-footer-background-color);
    color: var(--modal-footer-color);
  }

  .dialog__close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: var(--modal-close-padding);
    border: var(--modal-close-border);
    border-radius: var(--modal-close-border-radius);
    background-color: var(--modal-close-background-color);
    color: var(--modal-close-color);
    font-size: var(--modal-close-font-size);
  }

  .dialog__close:not(:disabled) {
    cursor: pointer;
  }

  .dialog__close:disabled {
    cursor: not-allowed;
  }
`;

const template = document.createElement('template');

template.innerHTML = /* html */ `
  <style>${styles}</style>

  <dialog part="base" class="dialog" aria-labelledby="title">
    <div part="panel" class="dialog__panel">
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
 * @tagname modal-element - This is the default tag name, unless overridden by the `define` method.
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
 * @property {string} closeLabel - The accessible label for the default close button, used as its aria-label attribute.
 *
 * @attribute {boolean} open - Determines whether the modal is open or not.
 * @attribute {boolean} static-backdrop - Determines whether the modal should close when the backdrop is clicked.
 * @attribute {boolean} no-header - Determines whether the modal should have a header or not.
 * @attribute {boolean} no-animations - Determines whether the modal should have animations or not when opening and closing.
 * @attribute {boolean} no-close-button - Determines whether the modal should have a default close button or not.
 * @attribute {boolean} fullscreen - Determines whether the modal should be fullscreen or not.
 * @attribute {boolean} preserve-overflow - Determines whether the overflow of the body should be preserved when the modal is open.
 * @attribute {string} placement - Determines the placement of the modal.
 * @attribute {string} close-label - The accessible label for the default close button, used as its aria-label attribute.
 *
 * @slot - The modal's main content (default/unnamed slot).
 * @slot header - The modal's header content, usually a title.
 * @slot footer - The modals' footer content. Usually used for buttons or other actions.
 * @slot close - The content of the close button in the modal's header.
 *
 * @cssproperty --modal-width - The width of the modal.
 * @cssproperty --modal-height - The height of the modal.
 * @cssproperty --modal-border-color - The border color of the modal.
 * @cssproperty --modal-border-style - The border style of the modal.
 * @cssproperty --modal-border-width - The border width of the modal.
 * @cssproperty --modal-border-radius - The border radius of the modal.
 * @cssproperty --modal-box-shadow - The box shadow of the modal.
 * @cssproperty --modal-background-color - The background color of the modal.
 * @cssproperty --modal-color - The foreground color of the modal.
 * @cssproperty --modal-header-spacing - The spacing of the header.
 * @cssproperty --modal-header-background-color - The background color of the header.
 * @cssproperty --modal-header-color - The foreground color of the header.
 * @cssproperty --modal-body-spacing - The spacing of the body.
 * @cssproperty --modal-body-background-color - The background color of the body.
 * @cssproperty --modal-body-color - The foreground color of the body.
 * @cssproperty --modal-footer-spacing - The spacing of the footer.
 * @cssproperty --modal-footer-background-color - The background color of the footer.
 * @cssproperty --modal-footer-color - The foreground color of the footer.
 * @cssproperty --modal-close-padding - The padding of the close button.
 * @cssproperty --modal-close-border - The border shorthand property of the close button.
 * @cssproperty --modal-close-border-radius - The border radius shorthand property of the close button.
 * @cssproperty --modal-close-background-color - The background color of the close button.
 * @cssproperty --modal-close-color - The foreground color of the close button.
 * @cssproperty --modal-close-font-size - The font size of the close button.
 * @cssproperty --modal-backdrop-background - The background shorthand property of the backdrop.
 * @cssproperty --modal-backdrop-filter - The backdrop filter property of the backdrop.
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
 * @fires modal-open - Dispatched when the modal is opened.
 * @fires modal-close - Dispatched when the modal is closed.
 * @fires modal-request-close - Dispatched when the modal is about to close.
 *
 * @method define - Static method. Registers the custom element with the browser's CustomElementRegistry unless it has already been defined.
 * @method show - Instance method. Opens the modal if it is closed, otherwise does nothing.
 * @method hide - Instance method. Closes the modal if it is open, otherwise does nothing.
 * @method requestClose - Instance method. Requests to close the modal, allowing the close request to be canceled.
 */
class ModalElement extends HTMLElement {
  /**
   * Central list of all possible reasons that the modal is about to close.
   * @readonly
   */
  static CLOSE_REQUEST_REASONS = /** @type {const} */ ({
    CLOSE_BUTTON: 'close-button',
    BACKDROP: 'backdrop',
    INVOKER: 'invoker',
    PLATFORM: 'platform',
    PROGRAMMATIC: 'programmatic'
  });

  /** @type {HTMLDialogElement | null} */
  #dialogEl = null;

  /** @type {HTMLSlotElement | null} */
  #footerSlotEl = null;

  /** @type {Animation | null} */
  #pulseAnimation = null;

  /** @type {string | null} */
  #previousBodyOverflow = null;

  constructor() {
    super();

    if (!this.shadowRoot) {
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(template.content.cloneNode(true));
    }

    if (this.shadowRoot) {
      this.#dialogEl = this.shadowRoot.querySelector('dialog');
      this.#footerSlotEl = this.shadowRoot.querySelector('slot[name="footer"]');
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
        this.#dialogEl.classList.toggle('dialog--no-animations', this.noAnimations);
        this.#dialogEl.showModal();
        this.#emit('modal-open');

        const body = this.ownerDocument.body;

        if (body && !this.preserveOverflow) {
          this.#previousBodyOverflow = body.style.overflow;
          body.style.overflow = 'hidden';
        }
      } else {
        this.#dialogEl.close();
      }
    }

    if (name === 'no-header' && oldValue !== newValue) {
      /** @type {HTMLElement | null} */
      const headerEl = this.#dialogEl.querySelector('.dialog__header');

      if (headerEl !== null) {
        headerEl.hidden = this.noHeader;
      }
    }

    if (name === 'no-animations' && oldValue !== newValue) {
      this.#dialogEl.classList.toggle('dialog--no-animations', this.noAnimations);
    }

    if (name === 'no-close-button' && oldValue !== newValue) {
      /** @type {HTMLElement | null} */
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
    this.addEventListener('command', /** @type {EventListener} */ (this.#handleCommandEvent));
  }

  /**
   * Lifecycle method that is called when the element is removed from the DOM.
   */
  disconnectedCallback() {
    this.#dialogEl?.removeEventListener('click', this.#handleDialogClick);
    this.#dialogEl?.removeEventListener('close', this.#handleDialogClose);
    this.#dialogEl?.removeEventListener('cancel', this.#handleDialogCancel);
    this.#dialogEl?.querySelector('form[method="dialog"]')?.removeEventListener('submit', this.#handleCloseButtonClick);
    this.#footerSlotEl?.removeEventListener('slotchange', this.#handleFooterSlotChange);
    this.removeEventListener('command', /** @type {EventListener} */ (this.#handleCommandEvent));

    if (this.#pulseAnimation) {
      this.#pulseAnimation?.cancel();
      this.#pulseAnimation = null;
    }

    this.#restoreBodyOverflow();
  }

  /**
   * Determines if the modal is open or not.
   *
   * @type {boolean} - True if the modal is open, otherwise false.
   * @attribute open
   * @default false
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
   * @type {boolean} - True if clicking the backdrop should not close the modal, otherwise false.
   * @attribute static-backdrop
   * @default false
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
   * @type {boolean} - True if the header should be hidden, otherwise false.
   * @attribute no-header
   * @default false
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
   * @attribute no-animations
   * @default false
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
   * @type {boolean} - True if the close button should be hidden, otherwise false.
   * @attribute no-close-button
   * @default false
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
   * @attribute fullscreen
   * @default false
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
   * @attribute preserve-overflow
   * @default false
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
   * @attribute placement
   * @default 'center'
   */
  get placement() {
    return this.getAttribute('placement') || 'center';
  }

  set placement(value) {
    this.setAttribute('placement', value != null ? value.toString() : value);
  }

  /**
   * The accessible label for the default close button, used as its aria-label attribute.
   * When providing custom text content through the `close` slot, make sure `closeLabel`
   * matches the visible text to ensure accessibility.
   *
   * @type {string}
   * @attribute close-label
   * @default 'Close'
   */
  get closeLabel() {
    return this.getAttribute('close-label') || 'Close';
  }

  set closeLabel(value) {
    this.setAttribute('close-label', value != null ? value.toString() : value);
  }

  /**
   * Updates the close button's aria-label attribute
   * using the `closeLabel` property.
   */
  #updateCloseLabel() {
    const closeButtonEl = this.#dialogEl?.querySelector('.dialog__close');

    if (closeButtonEl) {
      closeButtonEl.setAttribute('aria-label', this.closeLabel);
    }
  }

  /**
   * Applies a pulse effect on the dialog to indicate that the
   * modal is about to close but the close action was blocked.
   */
  #pulseDialog() {
    const defaultView = this.ownerDocument.defaultView;
    const prefersReducedMotion = defaultView?.matchMedia('(prefers-reduced-motion: reduce)').matches ?? false;
    const shouldSkipPulse = this.noAnimations || prefersReducedMotion || this.#pulseAnimation;
    if (shouldSkipPulse) {
      return;
    }

    const dialog = this.#dialogEl;
    if (!dialog || typeof dialog.animate !== 'function') {
      return;
    }

    this.#pulseAnimation = dialog.animate(PULSE_KEYFRAMES, PULSE_ANIMATION_OPTIONS);
    this.#pulseAnimation.finished
      .catch(() => {})
      .finally(() => {
        this.#pulseAnimation = null;
      });
  }

  /**
   * Handles the close event of the dialog.
   */
  #handleDialogClose = () => {
    // This is required because the dialog element does not reset
    // the open property when the dialog is closed by the user.
    this.open = false;

    this.#emit('modal-close');
    this.#restoreBodyOverflow();
  };

  /**
   * Handles the cancel event of the dialog.
   * This event is fired when the user presses the escape key.
   *
   * @param {Event} evt - The cancel event.
   */
  #handleDialogCancel = evt => {
    const canClose = this.#emit(
      'modal-request-close',
      { reason: ModalElement.CLOSE_REQUEST_REASONS.PLATFORM },
      { cancelable: true }
    );

    if (!canClose) {
      evt.preventDefault();
      this.#pulseDialog();
    }
  };

  /**
   * Handles the click event of the close button.
   *
   * @param {Event} evt - The click event.
   */
  #handleCloseButtonClick = evt => {
    const canClose = this.#emit(
      'modal-request-close',
      { reason: ModalElement.CLOSE_REQUEST_REASONS.CLOSE_BUTTON },
      { cancelable: true }
    );

    if (!canClose) {
      evt.preventDefault();
      this.#pulseDialog();
    }
  };

  /**
   * Handles the click event of the dialog.
   *
   * @param {MouseEvent} evt - The click event.
   */
  #handleDialogClick = evt => {
    const { target, currentTarget } = evt;

    const isBackdropClick = target === currentTarget;
    const isCloseInvoker = target instanceof HTMLElement && target.closest('[data-modal-close]') !== null;

    if (!isBackdropClick && !isCloseInvoker) {
      return;
    }

    const closeReason = isBackdropClick
      ? ModalElement.CLOSE_REQUEST_REASONS.BACKDROP
      : ModalElement.CLOSE_REQUEST_REASONS.INVOKER;

    const canClose = this.#emit('modal-request-close', { reason: closeReason }, { cancelable: true });

    const shouldPreventClose = !canClose || (isBackdropClick && this.staticBackdrop);

    if (shouldPreventClose) {
      this.#pulseDialog();
      return;
    }

    this.hide();
  };

  /**
   * Handles the command event. Allows external invokers, such as buttons outside the modal,
   * to trigger certain actions on the modal, such as opening or closing it, by dispatching
   * a command event with the corresponding command.
   *
   * @param {CommandEvent} evt - The command event.
   */
  #handleCommandEvent = evt => {
    switch (evt.command) {
      case '--modal-open': {
        if (this.open) {
          return;
        }
        this.show();
        return;
      }

      case '--modal-close': {
        if (!this.open) {
          return;
        }

        const canClose = this.#emit(
          'modal-request-close',
          { reason: ModalElement.CLOSE_REQUEST_REASONS.INVOKER },
          { cancelable: true }
        );

        if (!canClose) {
          this.#pulseDialog();
          return;
        }

        this.hide();
        return;
      }

      default:
        return;
    }
  };

  /**
   * Handles the slotchange event of the footer slot.
   */
  #handleFooterSlotChange = () => {
    if (this.#dialogEl === null) {
      return;
    }

    /** @type {HTMLElement | null} */
    const footerEl = this.#dialogEl.querySelector('.dialog__footer');

    if (footerEl === null) {
      return;
    }

    const footerSlotNodes = this.#footerSlotEl?.assignedNodes();
    const hasFooterSlotNodes = footerSlotNodes ? footerSlotNodes.length > 0 : false;

    footerEl.hidden = !hasFooterSlotNodes;
  };

  /**
   * Restores the body's previous overflow value when the modal is closed
   * or disconnected from the DOM.
   */
  #restoreBodyOverflow() {
    const body = this.ownerDocument.body;

    if (body && this.#previousBodyOverflow !== null) {
      body.style.overflow = this.#previousBodyOverflow;
      this.#previousBodyOverflow = null;
    }
  }

  /**
   * Dispatches an event, using CustomEvent when detail is provided.
   *
   * @template T
   * @param {string} type - The event type.
   * @param {T} [detail] - Optional event detail.
   * @param {{ cancelable?: boolean }} [options] - Event options.
   * @returns {boolean} Whether the event was not canceled.
   */
  #emit(type, detail, { cancelable = false } = {}) {
    const options = { bubbles: true, composed: true, cancelable };
    const event = detail === undefined ? new Event(type, options) : new CustomEvent(type, { ...options, detail });
    return this.dispatchEvent(event);
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
    const instance = /** @type {HTMLElement & Record<string, unknown>} */ (this);

    if (Object.hasOwn(instance, prop)) {
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
   * Requests to close the modal if it is open.
   * Dispatches a cancelable `modal-request-close` event before closing.
   * If the event is canceled, the modal remains open.
   *
   * @example
   * const modal = document.querySelector('modal-element');
   * modal.requestClose();
   */
  requestClose() {
    if (!this.open) {
      return;
    }

    const canClose = this.#emit(
      'modal-request-close',
      { reason: ModalElement.CLOSE_REQUEST_REASONS.PROGRAMMATIC },
      { cancelable: true }
    );

    if (!canClose) {
      this.#pulseDialog();
      return;
    }

    this.hide();
  }

  /**
   * Registers the custom element with the browser's CustomElementRegistry unless
   * it has already been defined.
   *
   * @param {string} [tagName='modal-element'] - The tag name to use for the custom element.
   */
  static define(tagName = 'modal-element') {
    if (typeof window === 'undefined' || window.customElements.get(tagName)) {
      return;
    }
    window.customElements.define(tagName, ModalElement);
  }
}

export { ModalElement };
