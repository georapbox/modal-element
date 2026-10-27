import { expect, fixture, fixtureCleanup, html, elementUpdated, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import sinon from 'sinon';
import { ModalElement } from '../src/modal-element';

ModalElement.define();

describe('modal-element', () => {
  afterEach(() => {
    fixtureCleanup();
  });

  describe('accessibility', () => {
    it('passes accessibility tests', async () => {
      const el = await fixture(html` <modal-element></modal-element> `);

      el.show();
      await elementUpdated(el);

      await expect(el).to.be.accessible();
    });

    it('close button has a default aria-label attribute', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);
      const closeButton = el.shadowRoot.querySelector('.dialog__close');

      expect(closeButton.getAttribute('aria-label')).to.equal('Close');
    });

    it('close button has a custom aria-label attribute', async () => {
      const el = await fixture(html`<modal-element close-label="Close modal"></modal-element>`);
      const closeButton = el.shadowRoot.querySelector('.dialog__close');

      expect(closeButton.getAttribute('aria-label')).to.equal('Close modal');
    });

    it('close button retains aria-label when custom content is provided', async () => {
      const el = await fixture(html`
        <modal-element>
          <span slot="close">Close modal</span>
        </modal-element>
      `);
      const closeButton = el.shadowRoot.querySelector('.dialog__close');

      expect(closeButton.getAttribute('aria-label')).to.equal('Close');
    });

    it('close button has default aria-label attribute if user provides non-text content for the button', async () => {
      const el = await fixture(html`
        <modal-element>
          <span slot="close">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              viewBox="0 0 16 16"
              aria-hidden="true"
            >
              <path
                d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
              />
            </svg>
          </span>
        </modal-element>
      `);
      const closeButton = el.shadowRoot.querySelector('.dialog__close');

      expect(closeButton.getAttribute('aria-label')).to.equal('Close');
    });

    it('close button has custom aria-label attribute if user provides non-text content for the button and close-label attribute', async () => {
      const el = await fixture(html`
        <modal-element close-label="Close modal">
          <span slot="close">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              viewBox="0 0 16 16"
              aria-hidden="true"
            >
              <path
                d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
              />
            </svg>
          </span>
        </modal-element>
      `);
      const closeButton = el.shadowRoot.querySelector('.dialog__close');

      expect(closeButton.getAttribute('aria-label')).to.equal('Close modal');
    });
  });

  describe('attributes - properties', () => {
    // open
    it('reflects attribute "open" to property "open"', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);

      el.setAttribute('open', '');

      expect(el.open).to.be.true;
    });

    it('reflects property "open" to attribute "open"', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);

      el.open = true;
      await elementUpdated(el);

      expect(el.hasAttribute('open')).to.be.true;

      el.open = false;
      await elementUpdated(el);

      expect(el.hasAttribute('open')).to.be.false;
    });

    // static-backdrop
    it('reflects attribute "static-backdrop" to property "staticBackdrop"', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);

      el.setAttribute('static-backdrop', '');

      expect(el.staticBackdrop).to.be.true;
    });

    it('reflects property "staticBackdrop" to attribute "static-backdrop"', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);

      el.staticBackdrop = true;
      await elementUpdated(el);

      expect(el.hasAttribute('static-backdrop')).to.be.true;

      el.staticBackdrop = false;
      await elementUpdated(el);

      expect(el.hasAttribute('static-backdrop')).to.be.false;
    });

    // no-header
    it('reflects attribute "no-header" to property "noHeader"', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);

      el.setAttribute('no-header', '');

      expect(el.noHeader).to.be.true;
    });

    it('reflects property "noHeader" to attribute "no-header"', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);

      el.noHeader = true;
      await elementUpdated(el);

      expect(el.hasAttribute('no-header')).to.be.true;

      el.noHeader = false;
      await elementUpdated(el);

      expect(el.hasAttribute('no-header')).to.be.false;
    });

    // no-animations
    it('reflects attribute "no-animations" to property "noAnimations"', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);

      el.setAttribute('no-animations', '');

      expect(el.noAnimations).to.be.true;
    });

    it('reflects property "noAnimations" to attribute "no-animations"', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);

      el.noAnimations = true;
      await elementUpdated(el);

      expect(el.hasAttribute('no-animations')).to.be.true;

      el.noAnimations = false;
      await elementUpdated(el);

      expect(el.hasAttribute('no-animations')).to.be.false;
    });

    // no-close-button
    it('reflects attribute "no-close-button" to property "noCloseButton"', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);

      el.setAttribute('no-close-button', '');

      expect(el.noCloseButton).to.be.true;
    });

    it('reflects property "noCloseButton" to attribute "no-close-button"', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);

      el.noCloseButton = true;
      await elementUpdated(el);

      expect(el.hasAttribute('no-close-button')).to.be.true;

      el.noCloseButton = false;
      await elementUpdated(el);

      expect(el.hasAttribute('no-close-button')).to.be.false;
    });

    // fullscreen
    it('reflects attribute "fullscreen" to property "fullscreen"', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);

      el.setAttribute('fullscreen', '');

      expect(el.fullscreen).to.be.true;
    });

    it('reflects property "fullscreen" to attribute "fullscreen"', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);

      el.fullscreen = true;
      await elementUpdated(el);

      expect(el.hasAttribute('fullscreen')).to.be.true;

      el.fullscreen = false;
      await elementUpdated(el);

      expect(el.hasAttribute('fullscreen')).to.be.false;
    });

    // preserve-overflow
    it('reflects attribute "preserve-overflow" to property "preserveOverflow"', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);

      el.setAttribute('preserve-overflow', '');

      expect(el.preserveOverflow).to.be.true;
    });

    it('reflects property "preserveOverflow" to attribute "preserve-overflow"', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);

      el.preserveOverflow = true;
      await elementUpdated(el);

      expect(el.hasAttribute('preserve-overflow')).to.be.true;

      el.preserveOverflow = false;
      await elementUpdated(el);

      expect(el.hasAttribute('preserve-overflow')).to.be.false;
    });

    // placement
    it('reflects attribute "placement" to property "placement"', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);

      el.setAttribute('placement', 'top-start');

      expect(el.placement).to.equal('top-start');
    });

    it('reflects property "placement" to attribute "placement"', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);

      el.placement = 'top-start';
      await elementUpdated(el);

      expect(el.getAttribute('placement')).to.equal('top-start');
    });

    // close-label
    it('reflects attribute "close-label" to property "closeLabel"', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);

      el.setAttribute('close-label', 'Close modal');

      expect(el.closeLabel).to.equal('Close modal');
    });

    it('reflects property "closeLabel" to attribute "close-label"', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);

      el.closeLabel = 'Close modal';
      await elementUpdated(el);

      expect(el.getAttribute('close-label')).to.equal('Close modal');
    });
  });

  describe('slots', () => {
    it('should have a default/unnamed slot', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);
      const bodySlot = el.shadowRoot.querySelector('slot:not([name])');

      expect(bodySlot).to.exist;

      const body = document.createElement('p');
      body.textContent = 'Main content goes here';
      el.appendChild(body);

      await elementUpdated(el);

      expect(bodySlot.assignedElements()).to.deep.equal([body]);
    });

    it('should have "header" slot', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);
      const headerSlot = el.shadowRoot.querySelector('slot[name="header"]');

      expect(headerSlot).to.exist;

      const header = document.createElement('h2');
      header.setAttribute('slot', 'header');
      header.textContent = 'Modal title';
      el.appendChild(header);

      await elementUpdated(el);

      expect(headerSlot.assignedElements()).to.deep.equal([header]);
    });

    it('should have "footer" slot', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);
      const footerSlot = el.shadowRoot.querySelector('slot[name="footer"]');

      expect(footerSlot).to.exist;

      const footer = document.createElement('p');
      footer.setAttribute('slot', 'footer');
      footer.textContent = 'Footer goes here';
      el.appendChild(footer);

      await elementUpdated(el);

      expect(footerSlot.assignedElements()).to.deep.equal([footer]);
    });

    it('should have "close" slot', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);
      const closeSlot = el.shadowRoot.querySelector('slot[name="close"]');

      expect(closeSlot).to.exist;

      const close = document.createElement('button');
      close.setAttribute('slot', 'close');
      close.textContent = 'Close';
      el.appendChild(close);

      await elementUpdated(el);

      expect(closeSlot.assignedElements()).to.deep.equal([close]);
    });
  });

  describe('CSS Parts', () => {
    it('should have "base" CSS part', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);
      const dialog = el.shadowRoot.querySelector('.dialog');

      expect(dialog.getAttribute('part')).to.equal('base');
    });

    it('should have "panel" CSS part', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);
      const panel = el.shadowRoot.querySelector('.dialog__panel');

      expect(panel.getAttribute('part')).to.equal('panel');
    });

    it('should have "header" CSS part', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);
      const header = el.shadowRoot.querySelector('.dialog__header');

      expect(header.getAttribute('part')).to.equal('header');
    });

    it('should have "title" CSS part', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);
      const title = el.shadowRoot.querySelector('.dialog__title');

      expect(title.getAttribute('part')).to.equal('title');
    });

    it('should have "body" CSS part', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);
      const body = el.shadowRoot.querySelector('.dialog__body');

      expect(body.getAttribute('part')).to.equal('body');
    });

    it('should have "footer" CSS part', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);
      const footer = el.shadowRoot.querySelector('.dialog__footer');

      expect(footer.getAttribute('part')).to.equal('footer');
    });

    it('should have "close" CSS part', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);
      const close = el.shadowRoot.querySelector('.dialog__close');

      expect(close.getAttribute('part')).to.equal('close');
    });
  });

  describe('custom events', () => {
    it('should fire "modal-open" event', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);
      const spy = sinon.spy();

      el.addEventListener('modal-open', spy);
      el.show();

      expect(spy.calledOnce).to.be.true;
    });

    it('should fire "modal-close" event', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);
      const spy = sinon.spy();

      el.show();
      el.addEventListener('modal-close', spy);

      const listener = oneEvent(el, 'modal-close');

      el.hide();
      await listener;

      expect(spy.calledOnce).to.be.true;
    });

    it('should fire "modal-request-close" event when clicking the close button', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);
      const spy = sinon.spy();
      const closeButton = el.shadowRoot.querySelector('.dialog__close');

      el.show();
      el.addEventListener('modal-request-close', spy);

      closeButton.click();

      expect(spy.calledOnce).to.be.true;
      expect(spy.firstCall.args[0].cancelable).to.be.true;
      expect(spy.firstCall.args[0].detail).to.deep.equal({ reason: 'close-button' });
    });

    it('should fire "modal-request-close" event when pressing the Esc key', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);
      const spy = sinon.spy();

      el.show();
      el.addEventListener('modal-request-close', spy);

      await sendKeys({ press: 'Escape' });

      expect(spy.calledOnce).to.be.true;
      expect(spy.firstCall.args[0].cancelable).to.be.true;
      expect(spy.firstCall.args[0].detail).to.deep.equal({ reason: 'platform' });
    });

    it('should fire "modal-request-close" event when clicking on the ::backdrop', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);
      const spy = sinon.spy();
      const backdrop = el.shadowRoot.querySelector('.dialog');

      el.show();
      el.addEventListener('modal-request-close', spy);

      backdrop.click();

      expect(spy.calledOnce).to.be.true;
      expect(spy.firstCall.args[0].cancelable).to.be.true;
      expect(spy.firstCall.args[0].detail).to.deep.equal({ reason: 'backdrop' });
    });

    it('should fire "modal-request-close" event when clicking on an external invoker', async () => {
      const el = await fixture(html`<modal-element><button data-modal-close>Close</button></modal-element>`);
      const spy = sinon.spy();
      const invoker = el.querySelector('[data-modal-close]');

      el.show();
      el.addEventListener('modal-request-close', spy);

      invoker.click();

      expect(spy.calledOnce).to.be.true;
      expect(spy.firstCall.args[0].cancelable).to.be.true;
      expect(spy.firstCall.args[0].detail).to.deep.equal({ reason: 'invoker' });
    });
  });

  describe('methods', () => {
    it('should open modal when calling "show()" method', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);

      el.show();

      expect(el.open).to.be.true;
    });

    it('should close modal when calling "hide()" method', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);

      el.show();
      el.hide();

      expect(el.open).to.be.false;
    });
  });

  describe('basic usage', () => {
    it('the open attribute of internal dialog element should follow the open attribute of modal-element', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);

      el.setAttribute('open', '');
      await elementUpdated(el);

      const dialog = el.shadowRoot.querySelector('.dialog');

      expect(dialog.getAttribute('open')).to.equal('');

      el.removeAttribute('open');
      await elementUpdated(el);

      expect(dialog.hasAttribute('open')).to.be.false;
    });

    it('should hide the header when "no-header" attribute is set', async () => {
      const el = await fixture(html`<modal-element no-header></modal-element>`);
      const header = el.shadowRoot.querySelector('.dialog__header');

      expect(header.hasAttribute('hidden')).to.be.true;
    });

    it('it should hide the footer if no footer slot is provided', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);
      const footer = el.shadowRoot.querySelector('.dialog__footer');

      expect(footer.hasAttribute('hidden')).to.be.true;
    });

    it('should hide the close button when "no-close-button" attribute is set', async () => {
      const el = await fixture(html`<modal-element no-close-button></modal-element>`);
      const closeButton = el.shadowRoot.querySelector('.dialog__close');

      expect(closeButton.hasAttribute('hidden')).to.be.true;
    });

    it('prevents closing the modal when using preventDefault on "modal-request-close" event while clicking the close button', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);

      el.show();
      const listener = oneEvent(el, 'modal-request-close');
      el.addEventListener('modal-request-close', evt => evt.preventDefault());
      const closeButton = el.shadowRoot.querySelector('.dialog__close');

      closeButton.click();

      const event = await listener;

      expect(event.detail).to.deep.equal({ reason: 'close-button' });
      expect(el.open).to.be.true;
    });

    it.skip('prevents closing the modal when using preventDefault on "modal-request-close" event while pressing the Esc key', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);

      el.show();
      const listener = oneEvent(el, 'modal-request-close');
      el.addEventListener('modal-request-close', evt => evt.preventDefault());

      await sendKeys({ press: 'Escape' });

      const event = await listener;

      expect(event.detail).to.deep.equal({ reason: 'platform' });
      expect(el.open).to.be.true;
    });

    it('prevents closing the modal when using preventDefault on "modal-request-close" event while clicking on the ::backdrop', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);

      el.show();
      const listener = oneEvent(el, 'modal-request-close');
      el.addEventListener('modal-request-close', evt => evt.preventDefault());
      const backdrop = el.shadowRoot.querySelector('.dialog');

      backdrop.click();

      const event = await listener;

      expect(event.detail).to.deep.equal({ reason: 'backdrop' });
      expect(el.open).to.be.true;
    });

    it('should close the modal when clicking the close button', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);

      el.show();
      const closeButton = el.shadowRoot.querySelector('.dialog__close');

      closeButton.click();

      await elementUpdated(el);

      expect(el.open).to.be.false;
    });

    it('should close the modal when pressing the Esc key', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);

      el.show();
      await sendKeys({ press: 'Escape' });
      await elementUpdated(el);

      expect(el.open).to.be.false;
    });

    it('should close the modal when clicking on the ::backdrop', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);

      el.show();
      const backdrop = el.shadowRoot.querySelector('.dialog');

      backdrop.click();

      await elementUpdated(el);

      expect(el.open).to.be.false;
    });

    it('should not close the modal when clicking on the ::backdrop if "static-backdrop" attribute is set', async () => {
      const el = await fixture(html`<modal-element static-backdrop></modal-element>`);

      el.show();
      const backdrop = el.shadowRoot.querySelector('.dialog');

      backdrop.click();

      await elementUpdated(el);

      expect(el.open).to.be.true;
    });

    it('should close the modal when clicking on a button with `data-modal-close` attribute', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);

      el.show();

      const button = document.createElement('button');
      button.setAttribute('data-modal-close', '');
      el.appendChild(button);

      button.click();

      await elementUpdated(el);

      expect(el.open).to.be.false;
    });

    it('static-backdrop should not block close requests from external invokers', async () => {
      const el = await fixture(
        html`<modal-element static-backdrop>
          <button data-modal-close>Close</button>
        </modal-element>`
      );

      el.show();
      const requestClose = oneEvent(el, 'modal-request-close');

      el.querySelector('[data-modal-close]').click();

      const { detail } = await requestClose;

      expect(detail.reason).to.equal('invoker');

      await elementUpdated(el);

      expect(el.open).to.be.false;
    });
  });
});
