/*!
 * @georapbox/modal-element
 * A custom element to create a modal, using the native dialog element under the hood.
 *
 * @version 1.11.2
 * @homepage https://github.com/georapbox/modal-element#readme
 * @author George Raptis <georapbox@gmail.com>
 * @license MIT
 */
var s=`
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
`,i=document.createElement("template");i.innerHTML=`
  <style>${s}</style>

  <dialog part="base" class="dialog" closedby="any" aria-labelledby="title">
    <div part="panel" class="dialog__panel">
      <header part="header" class="dialog__header">
        <slot name="title" part="title" class="dialog__title" id="title"></slot>

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
`;var n=class l extends HTMLElement{static CLOSE_REQUEST_REASONS={CLOSE_BUTTON:"close-button",INVOKER:"invoker",NATIVE:"native",PROGRAMMATIC:"programmatic"};#e=null;#n=null;#a=null;#l=null;constructor(){super();let e=this.shadowRoot;e||(e=this.attachShadow({mode:"open"}),e.appendChild(i.content.cloneNode(!0))),this.#e=e.querySelector("dialog"),this.#n=e.querySelector('form[method="dialog"]'),this.#a=e.querySelector('slot[name="footer"]')}static get observedAttributes(){return["open","no-header","no-animations","no-close-button","close-label","closed-by"]}attributeChangedCallback(e,o,a){if(this.#e!==null){if(e==="open"&&o!==a)if(this.open){this.#e.classList.toggle("dialog--no-animations",this.noAnimations),this.#e.showModal();let t=this.ownerDocument.body;t&&!this.preserveOverflow&&(this.#l=t.style.overflow,t.style.overflow="hidden"),this.#t("modal-open")}else this.#e.close();if(e==="closed-by"&&o!==a&&this.#e.setAttribute("closedby",this.closedBy),e==="no-header"&&o!==a){let t=this.#e.querySelector(".dialog__header");t!==null&&(t.hidden=this.noHeader)}if(e==="no-animations"&&o!==a&&this.#e.classList.toggle("dialog--no-animations",this.noAnimations),e==="no-close-button"&&o!==a){let t=this.#e.querySelector(".dialog__close");t!==null&&(t.hidden=this.noCloseButton)}e==="close-label"&&o!==a&&this.#m()}}connectedCallback(){this.#o("open"),this.#o("closedBy"),this.#o("noHeader"),this.#o("noAnimations"),this.#o("noCloseButton"),this.#o("fullscreen"),this.#o("preserveOverflow"),this.#o("placement"),this.#o("closeLabel"),this.#e?.addEventListener("close",this.#i),this.#e?.addEventListener("cancel",this.#r),this.#n?.addEventListener("submit",this.#s),this.#a?.addEventListener("slotchange",this.#c),this.addEventListener("command",this.#d)}disconnectedCallback(){this.#e?.removeEventListener("close",this.#i),this.#e?.removeEventListener("cancel",this.#r),this.#n?.removeEventListener("submit",this.#s),this.#a?.removeEventListener("slotchange",this.#c),this.removeEventListener("command",this.#d),this.#h()}get open(){return this.hasAttribute("open")}set open(e){this.toggleAttribute("open",!!e)}get closedBy(){let e=this.getAttribute("closed-by");return e==="any"||e==="closerequest"||e==="none"?e:"any"}set closedBy(e){e==null?this.removeAttribute("closed-by"):this.setAttribute("closed-by",e)}get noHeader(){return this.hasAttribute("no-header")}set noHeader(e){this.toggleAttribute("no-header",!!e)}get noAnimations(){return this.hasAttribute("no-animations")}set noAnimations(e){this.toggleAttribute("no-animations",!!e)}get noCloseButton(){return this.hasAttribute("no-close-button")}set noCloseButton(e){this.toggleAttribute("no-close-button",!!e)}get fullscreen(){return this.hasAttribute("fullscreen")}set fullscreen(e){this.toggleAttribute("fullscreen",!!e)}get preserveOverflow(){return this.hasAttribute("preserve-overflow")}set preserveOverflow(e){this.toggleAttribute("preserve-overflow",!!e)}get placement(){return this.getAttribute("placement")||"center"}set placement(e){this.setAttribute("placement",e!=null?e.toString():e)}get closeLabel(){return this.getAttribute("close-label")||"Close"}set closeLabel(e){this.setAttribute("close-label",e!=null?e.toString():e)}#m(){let e=this.#e?.querySelector(".dialog__close");e&&e.setAttribute("aria-label",this.closeLabel)}#i=()=>{!this.#e||this.#e.open||(this.open=!1,this.#h(),this.#t("modal-close"))};#r=e=>{this.#t("modal-request-close",{reason:l.CLOSE_REQUEST_REASONS.NATIVE},{cancelable:!0})||e.preventDefault()};#s=e=>{this.#t("modal-request-close",{reason:l.CLOSE_REQUEST_REASONS.CLOSE_BUTTON},{cancelable:!0})||e.preventDefault()};#d=e=>{let o=e;if(o.command==="--modal-open"){this.show();return}o.command==="--modal-close"&&this.open&&this.#t("modal-request-close",{reason:l.CLOSE_REQUEST_REASONS.INVOKER},{cancelable:!0})&&this.hide()};#c=()=>{let e=this.#e?.querySelector(".dialog__footer")||null;e&&(e.hidden=!this.#a?.assignedElements().length)};#h(){let e=this.ownerDocument.body;e&&this.#l!==null&&(e.style.overflow=this.#l,this.#l=null)}#t(e,o,{cancelable:a=!1}={}){let t={bubbles:!0,composed:!0,cancelable:a},r=o===void 0?new Event(e,t):new CustomEvent(e,{...t,detail:o});return this.dispatchEvent(r)}#o(e){let o=this;if(Object.hasOwn(o,e)){let a=o[e];delete o[e],o[e]=a}}show(){this.open||(this.open=!0)}hide(){this.open&&(this.open=!1)}requestClose(){!this.open||!this.#t("modal-request-close",{reason:l.CLOSE_REQUEST_REASONS.PROGRAMMATIC},{cancelable:!0})||this.hide()}static define(e="modal-element"){typeof window>"u"||window.customElements.get(e)||window.customElements.define(e,l)}};export{n as ModalElement};
