let e=document.createElement("template");e.innerHTML=/* html */`
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
      --me-width: 32rem;
      --me-height: fit-content;
      --me-border-color: initial;
      --me-border-style: solid;
      --me-border-width: initial;
      --me-border-radius: 0;
      --me-box-shadow: none;
      --me-background-color: canvas;
      --me-header-spacing: 1rem;
      --me-body-spacing: 1rem;
      --me-footer-spacing: 1rem;
      --me-header-background-color: transparent;
      --me-body-background-color: transparent;
      --me-footer-background-color: transparent;
      --me-close-border-radius: 0;
      --me-close-background-color: transparent;
      display: contents;
    }

    /* Dialog */
    .dialog {
      width: var(--me-width);
      height: var(--me-height);
      padding: 0;
      border-color: var(--me-border-color);
      border-style: var(--me-border-style);
      border-width: var(--me-border-width);
      border-radius: var(--me-border-radius);
      box-shadow: var(--me-box-shadow);
      background-color: var(--me-background-color);
    }

    .dialog[open] {
      display: flex;
    }

    .dialog::backdrop {
      background-color: rgba(0, 0, 0, 0.5);
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

      .dialog--pulse:not(.dialog--no-animations) {
        animation-name: pulse;
        animation-duration: 300ms;
        animation-timing-function: cubic-bezier(0.2, 0, 0.38, 0.9);
      }

      @keyframes pulse {
        0%   { transform: scale(1); }
        50%  { transform: scale(1.02); }
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
      align-items: center;
      padding: var(--me-header-spacing);
      column-gap: 0.5rem;
      background-color: var(--me-header-background-color);
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
    }

    .dialog__footer {
      flex: 0 0 auto;
      text-align: right;

      padding: var(--me-footer-spacing);
      background-color: var(--me-footer-background-color);
    }

    .dialog__close {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.4375rem;
      border: none;
      background-color: transparent;
    }

    .dialog__close:not(:disabled) {
      cursor: pointer;
    }

    .dialog__close:disabled {
      cursor: not-allowed;
    }
  </style>

  <dialog part="base" class="dialog">
    <div part="panel" class="dialog__panel" aria-labelledby="title">
      <header part="header" class="dialog__header">
        <slot name="header" class="dialog__title" id="title"></slot>

        <form method="dialog">
          <button type="submit" part="close" class="dialog__close" aria-label="Close">
            <slot name="close">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
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
`;/**
 * @summary A custom element that renders a modal dialog.
 * @extends HTMLElement
 *
 * @property {boolean} open - Determines if the modal is open or not.
 * @property {boolean} staticBackdrop - Determines if the modal should close when the backdrop is clicked.
 * @property {boolean} noHeader - Determines if the modal should have a header or not.
 * @property {boolean} noAnimations - Determines if the modal should have animations or not when opening and closing.
 * @property {boolean} noCloseButton - Determines if the modal should have a default close button or not.
 *
 * @attribute {boolean} open - Determines if the modal is open or not.
 * @attribute {boolean} static-backdrop - Determines if the modal should close when the backdrop is clicked.
 * @attribute {boolean} no-header - Determines if the modal should have a header or not.
 * @attribute {boolean} no-animations - Determines if the modal should have animations or not when opening and closing.
 * @attribute {boolean} no-close-button - Determines if the modal should have a default close button or not.
 *
 * @slot - The modal's main content (default/unnamed slot).
 * @slot header - The modal's header content, usually a title.
 * @slot footer - The modals' footer content. Usually used for buttons or other actions.
 * @slot close - The content of the close button that appears in the modal's header.
 *
 * @cssproperty --me-width - The width of the modal. Default is 32rem.
 * @cssproperty --me-height - The height of the modal. Default is fit-content.
 * @cssproperty --me-border-color - The border color of the modal. Default is initial.
 * @cssproperty --me-border-style - The border style of the modal. Default is solid.
 * @cssproperty --me-border-width - The border width of the modal. Default is initial.
 * @cssproperty --me-border-radius - The border radius of the modal. Default is 0.
 * @cssproperty --me-box-shadow - The box shadow of the modal. Default is none.
 * @cssproperty --me-background-color - The background color of the modal. Default is canvas.
 * @cssproperty --me-header-spacing - The spacing of the header. Default is 1rem.
 * @cssproperty --me-body-spacing - The spacing of the body. Default is 1rem.
 * @cssproperty --me-footer-spacing - The spacing of the footer. Default is 1rem.
 * @cssproperty --me-header-background-color - The background color of the header. Default is transparent.
 * @cssproperty --me-body-background-color - The background color of the body. Default is transparent.
 * @cssproperty --me-footer-background-color - The background color of the footer. Default is transparent.
 * @cssproperty --me-close-border-radius - The border radius of the close button. Default is 0.
 * @cssproperty --me-close-background-color - The background color of the close button. Default is transparent.
 *
 * @csspart base - The base wrapper of the modal.
 * @csspart panel - The panel wrapper of the modal.
 * @csspart header - The header wrapper of the modal.
 * @csspart body - The body wrapper of the modal.
 * @csspart footer - The footer wrapper of the modal.
 * @csspart close - The close button of the modal.
 *
 * @fires me-open - Dispatched when the modal is opened.
 * @fires me-close - Dispatched when the modal is closed.
 * @fires me-request-close - Dispatched when the modal is about to close.
 *
 * @method defineCustomElement - Static method. Defines a custom element with the given name.
 * @method show - Instance method. Opens the modal if it is closed, otherwise does nothing.
 * @method hide - Instance method. Closes the modal if it is open, otherwise does nothing.
 *
 * @tagname modal-element - This is the default tag name, unless overridden by the `defineCustomElement` method.
 */class t extends HTMLElement{/** @type {HTMLDialogElement | null} */#e=null;/** @type {HTMLSlotElement | null} */#t=null;/** @type {ReturnType<typeof setTimeout> | undefined} */#o=void 0;constructor(){if(super(),!this.shadowRoot){let t=this.attachShadow({mode:"open"});t.appendChild(e.content.cloneNode(!0))}this.shadowRoot&&(this.#e=this.shadowRoot.querySelector("dialog"),this.#t=this.shadowRoot.querySelector('slot[name="footer"]'))}static get observedAttributes(){return["open","no-header","no-animations","no-close-button"]}/**
   * Lifecycle method that is called when attributes are changed, added, removed, or replaced.
   *
   * @param {string} name - The name of the attribute.
   * @param {string} oldValue - The old value of the attribute.
   * @param {string} newValue - The new value of the attribute.
   */attributeChangedCallback(e,t,o){if(null!=this.#e){if("open"===e&&t!==o&&(this.open?(this.#e.showModal(),document.body&&(document.body.style.overflowY="hidden"),this.dispatchEvent(new CustomEvent("me-open",{bubbles:!0,composed:!0,detail:{element:this}}))):this.#e.close()),"no-header"===e&&t!==o){/** @type {HTMLElement | null} */let e=this.#e.querySelector(".dialog__header");e&&(e.hidden=this.noHeader)}if("no-animations"===e&&t!==o&&this.#e.classList.toggle("dialog--no-animations",this.noAnimations),"no-close-button"===e&&t!==o){/** @type {HTMLElement | null} */let e=this.#e.querySelector(".dialog__close");e&&(e.hidden=this.noCloseButton)}}}/**
   * Lifecycle method that is called when the element is added to the DOM.
   */connectedCallback(){this.#i("open"),this.#i("staticBackdrop"),this.#i("noHeader"),this.#i("noAnimations"),this.#i("noCloseButton"),this.#e?.addEventListener("click",this.#a),this.#e?.addEventListener("close",this.#l),this.#e?.addEventListener("cancel",this.#s),this.#e?.querySelector('form[method="dialog"]')?.addEventListener("submit",this.#n),this.#t?.addEventListener("slotchange",this.#r)}/**
   * Lifecycle method that is called when the element is removed from the DOM.
   */disconnectedCallback(){this.#o&&clearTimeout(this.#o),this.#e?.addEventListener("click",this.#a),this.#e?.removeEventListener("close",this.#l),this.#e?.removeEventListener("cancel",this.#s),this.#e?.querySelector('form[method="dialog"]')?.removeEventListener("submit",this.#n),this.#t?.removeEventListener("slotchange",this.#r)}/**
   * Deternimes if the modal is open or not.
   *
   * @type {boolean} - True if the modal is open, otherwise false. Default is false.
   * @default false
   * @attribute open - Reflects the open property.
   */get open(){return this.hasAttribute("open")}set open(e){e?this.setAttribute("open",""):this.removeAttribute("open")}/**
   * Determines if the modal should close when the backdrop is clicked.
   *
   * @type {boolean} - True if the modal should close when the backdrop is clicked, otherwise false. Default is false.
   * @default false
   * @attribute static-backdrop - Reflects the staticBackdrop property.
   */get staticBackdrop(){return this.hasAttribute("static-backdrop")}set staticBackdrop(e){e?this.setAttribute("static-backdrop",""):this.removeAttribute("static-backdrop")}/**
   * Determines if the modal should have a header or not.
   *
   * @type {boolean} - True if the modal should have a header, otherwise false. Default is false.
   * @default false
   * @attribute no-header - Reflects the noHeader property.
   */get noHeader(){return this.hasAttribute("no-header")}set noHeader(e){e?this.setAttribute("no-header",""):this.removeAttribute("no-header")}/**
   * Determines if the modal should have animations or not when opening and closing.
   *
   * @type {boolean} - True if the modal should have animations, otherwise false. Default is false.
   * @default false
   * @attribute no-animations - Reflects the noAnimations property.
   */get noAnimations(){return this.hasAttribute("no-animations")}set noAnimations(e){e?this.setAttribute("no-animations",""):this.removeAttribute("no-animations")}/**
   * Determines if the modal should have a default close button or not.
   *
   * @type {boolean} - True if the modal should have a close button, otherwise false. Default is false.
   * @default false
   * @attribute no-close-button - Reflects the noCloseButton property.
   */get noCloseButton(){return this.hasAttribute("no-close-button")}set noCloseButton(e){e?this.setAttribute("no-close-button",""):this.removeAttribute("no-close-button")}/**
   * Applies a pulse effect on the dialog.
   */#d(){this.#o||(this.#e?.classList.add("dialog--pulse"),this.#o=setTimeout(()=>{this.#e?.classList.remove("dialog--pulse"),clearTimeout(this.#o),this.#o=void 0},300))}/**
   * Handles the close event of the dialog.
   */#l=()=>{// This is needed because the dialog element does not reset
// the open property when the dialog is closed by the user.
this.open=!1,document.body&&(document.body.style.overflowY=""),this.dispatchEvent(new CustomEvent("me-close",{bubbles:!0,composed:!0,detail:{element:this}}))};/**
   * Handles the cancel event of the dialog.
   * This event is fired when the user presses the escape key.
   *
   * @param {Event} evt - The cancel event.
   */#s=e=>{let t=this.#c("escape-key");this.dispatchEvent(t),t.defaultPrevented&&(e.preventDefault(),this.noAnimations||this.#d())};/**
   * Handles the click event of the close button.
   *
   * @param {Event} evt - The click event.
   */#n=e=>{let t=this.#c("close-button");this.dispatchEvent(t),t.defaultPrevented&&(e.preventDefault(),this.noAnimations||this.#d())};/**
   * Handles the click event of the dialog.
   *
   * @param {MouseEvent} evt - The click event.
   */#a=e=>{if(e.target!==e.currentTarget)return;let t=this.#c("backdrop-click");if(this.dispatchEvent(t),t.defaultPrevented||this.staticBackdrop){this.noAnimations||this.#d();return}this.#e?.close()};/**
   * Handles the slotchange event of the footer slot.
   */#r=()=>{if(null==this.#e)return;/** @type {HTMLElement | null} */let e=this.#e.querySelector(".dialog__footer");if(!e)return;let t=this.#t?.assignedNodes(),o=!!t&&t.length>0;e.hidden=!o};/**
   * Creates a request close event.
   *
   * @param {'close-button' | 'escape-key' | 'backdrop-click'} reason - The reason that the modal is about to close.
   */#c(e){return new CustomEvent("me-request-close",{bubbles:!0,composed:!0,cancelable:!0,detail:{reason:e,element:this}})}/**
   * This is to safe guard against cases where, for instance, a framework may have added the element to the page and set a
   * value on one of its properties, but lazy loaded its definition. Without this guard, the upgraded element would miss that
   * property and the instance property would prevent the class property setter from ever being called.
   *
   * https://developers.google.com/web/fundamentals/web-components/best-practices#lazy-properties
   *
   * @param {keyof ModalElement} prop - The property to upgrade.
   */#i(e){if(Object.prototype.hasOwnProperty.call(this,e)){let t=this[e];delete this[e],// @ts-ignore
this[e]=t}}/**
   * Opens the modal if it is closed, otherwise does nothing.
   * Make sure that the custom element is defined before calling this method.
   *
   * @example
   * const modal = document.querySelector('modal-element');
   * modal.show();
   */show(){this.open||(this.open=!0)}/**
   * Closes the modal if it is open, otherwise does nothing.
   * Make sure that the custom element is defined before calling this method.
   *
   * @example
   * const modal = document.querySelector('modal-element');
   * modal.hide();
   */hide(){this.open&&(this.open=!1)}/**
   * Defines a custom element with the given name.
   * The name must contain a dash (-).
   *
   * @param {string} [elementName='modal-element']
   * @example
   * ModalElement.defineCustomElement('my-modal');
   */static defineCustomElement(e="modal-element"){"undefined"==typeof window||window.customElements.get(e)||window.customElements.define(e,t)}}export{t as ModalElement};
