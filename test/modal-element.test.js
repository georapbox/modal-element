import { expect, fixture, fixtureCleanup, html, elementUpdated, aTimeout, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { ModalElement } from '../src/modal-element';

ModalElement.defineCustomElement();

describe('modal-element', () => {
  afterEach(() => {
    fixtureCleanup();
  });

  describe('accessibility', () => {
    it('passes accessibility test', async () => {
      const el = await fixture(html`
        <modal-element></modal-element>
      `);
      el.setAttribute('open', '');
      await elementUpdated(el);
      await expect(el).to.be.accessible();
    });
  });

  describe('attributes - properties', () => {
    // open
    it('reflects attribute "open" to property "open"', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);
      el.setAttribute('open', '');
      expect(el.open).to.equal(true);
    });

    it('reflects property "open" to attribute "open"', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);
      el.open = true;
      await elementUpdated(el);
      expect(el.hasAttribute('open')).to.equal(true);
      el.open = false;
      await elementUpdated(el);
      expect(el.hasAttribute('open')).to.equal(false);
    });

    // static-backdrop
    it('reflects attribute "static-backdrop" to property "staticBackdrop"', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);
      el.setAttribute('static-backdrop', '');
      expect(el.staticBackdrop).to.equal(true);
    });

    it('reflects property "staticBackdrop" to attribute "static-backdrop"', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);
      el.staticBackdrop = true;
      await elementUpdated(el);
      expect(el.hasAttribute('static-backdrop')).to.equal(true);
      el.staticBackdrop = false;
      await elementUpdated(el);
      expect(el.hasAttribute('static-backdrop')).to.equal(false);
    });

    // no-header
    it('reflects attribute "no-header" to property "noHeader"', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);
      el.setAttribute('no-header', '');
      expect(el.noHeader).to.equal(true);
    });

    it('reflects property "noHeader" to attribute "no-header"', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);
      el.noHeader = true;
      await elementUpdated(el);
      expect(el.hasAttribute('no-header')).to.equal(true);
      el.noHeader = false;
      await elementUpdated(el);
      expect(el.hasAttribute('no-header')).to.equal(false);
    });

    // no-animations
    it('reflects attribute "no-animations" to property "noAnimations"', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);
      el.setAttribute('no-animations', '');
      expect(el.noAnimations).to.equal(true);
    });

    it('reflects property "noAnimations" to attribute "no-animations"', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);
      el.noAnimations = true;
      await elementUpdated(el);
      expect(el.hasAttribute('no-animations')).to.equal(true);
      el.noAnimations = false;
      await elementUpdated(el);
      expect(el.hasAttribute('no-animations')).to.equal(false);
    });

    // no-close-button
    it('reflects attribute "no-close-button" to property "noCloseButton"', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);
      el.setAttribute('no-close-button', '');
      expect(el.noCloseButton).to.equal(true);
    });

    it('reflects property "noCloseButton" to attribute "no-close-button"', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);
      el.noCloseButton = true;
      await elementUpdated(el);
      expect(el.hasAttribute('no-close-button')).to.equal(true);
      el.noCloseButton = false;
      await elementUpdated(el);
      expect(el.hasAttribute('no-close-button')).to.equal(false);
    });

    // fullscreen
    it('reflects attribute "fullscreen" to property "fullscreen"', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);
      el.setAttribute('fullscreen', '');
      expect(el.fullscreen).to.equal(true);
    });

    it('reflects property "fullscreen" to attribute "fullscreen"', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);
      el.fullscreen = true;
      await elementUpdated(el);
      expect(el.hasAttribute('fullscreen')).to.equal(true);
      el.fullscreen = false;
      await elementUpdated(el);
      expect(el.hasAttribute('fullscreen')).to.equal(false);
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
    it('should fire "me-open" event', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);
      const listener = oneEvent(el, 'me-open');
      el.setAttribute('open', '');
      const { detail } = await listener;
      expect(detail).to.deep.equal({ element: el });
    });

    it('should fire "me-close" event', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);
      const listener = oneEvent(el, 'me-close');
      el.setAttribute('open', '');
      aTimeout(100);
      el.removeAttribute('open');
      const { detail } = await listener;
      expect(detail).to.deep.equal({ element: el });
    });

    it('should fire "me-request-close" event when clicking the close button', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);
      el.setAttribute('open', '');
      const listener = oneEvent(el, 'me-request-close');
      const closeButton = el.shadowRoot.querySelector('.dialog__close');
      closeButton.click();
      const { detail } = await listener;
      expect(detail).to.deep.equal({ element: el, reason: 'close-button' });
    });

    it('should fire "me-request-close" event when pressing the Esc key', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);
      el.setAttribute('open', '');
      const listener = oneEvent(el, 'me-request-close');
      await sendKeys({ press: 'Escape' });
      const { detail } = await listener;
      expect(detail).to.deep.equal({ element: el, reason: 'escape-key' });
    });

    it('should fire "me-request-close" event when clicking on the ::backdrop', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);
      el.setAttribute('open', '');
      const listener = oneEvent(el, 'me-request-close');
      const backdrop = el.shadowRoot.querySelector('.dialog');
      backdrop.click();
      const { detail } = await listener;
      expect(detail).to.deep.equal({ element: el, reason: 'backdrop-click' });
    });
  });

  describe('methods', () => {
    it ('should open modal when calling "show()" method', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);
      aTimeout(100);
      el.show();
      await elementUpdated(el);
      expect(el.open).to.equal(true);
    });

    it ('should close modal when calling "hide()" method', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);
      el.setAttribute('open', '');
      await elementUpdated(el);
      aTimeout(100);
      el.hide();
      await elementUpdated(el);
      expect(el.open).to.equal(false);
    });
  });

  describe('basic usage', () => {
    it('the open attribute of internal dialog eleement should follow the open attribute of modal-element', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);
      el.setAttribute('open', '');
      await elementUpdated(el);
      const dialog = el.shadowRoot.querySelector('.dialog');
      expect(dialog.getAttribute('open')).to.equal('');
      el.removeAttribute('open');
      await elementUpdated(el);
      expect(dialog.hasAttribute('open')).to.equal(false);
    });

    it('should hide the header when "no-header" attribute is set', async () => {
      const el = await fixture(html`<modal-element no-header></modal-element>`);
      const header = el.shadowRoot.querySelector('.dialog__header');
      expect(header).to.have.attribute('hidden');
    });

    it('it should hide the footer if no footer slot is provided', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);
      const footer = el.shadowRoot.querySelector('.dialog__footer');
      expect(footer).to.have.attribute('hidden');
    });

    it('should hide the close button when "no-close-button" attribute is set', async () => {
      const el = await fixture(html`<modal-element no-close-button></modal-element>`);
      const closeButton = el.shadowRoot.querySelector('.dialog__close');
      expect(closeButton).to.have.attribute('hidden');
    });

    it('prevents closing the dilaog when using preventDefault on "me-request-close" event while clicking the close button', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);
      el.setAttribute('open', '');
      const listener = oneEvent(el, 'me-request-close');
      el.addEventListener('me-request-close', (event) => event.preventDefault());
      const closeButton = el.shadowRoot.querySelector('.dialog__close');
      closeButton.click();
      const { detail } = await listener;
      expect(detail).to.deep.equal({ element: el, reason: 'close-button' });
      expect(el.open).to.equal(true);
    });

    it('prevents closing the dilaog when using preventDefault on "me-request-close" event while pressing the Esc key', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);
      el.setAttribute('open', '');
      const listener = oneEvent(el, 'me-request-close');
      el.addEventListener('me-request-close', (event) => event.preventDefault());
      await sendKeys({ press: 'Escape' });
      const { detail } = await listener;
      expect(detail).to.deep.equal({ element: el, reason: 'escape-key' });
      expect(el.open).to.equal(true);
    });

    it('prevents closing the dilaog when using preventDefault on "me-request-close" event while clicking on the ::backdrop', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);
      el.setAttribute('open', '');
      const listener = oneEvent(el, 'me-request-close');
      el.addEventListener('me-request-close', (event) => event.preventDefault());
      const backdrop = el.shadowRoot.querySelector('.dialog');
      backdrop.click();
      const { detail } = await listener;
      expect(detail).to.deep.equal({ element: el, reason: 'backdrop-click' });
      expect(el.open).to.equal(true);
    });

    it('should close the dialog when clicking the close button', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);
      el.setAttribute('open', '');
      const closeButton = el.shadowRoot.querySelector('.dialog__close');
      closeButton.click();
      await elementUpdated(el);
      expect(el.open).to.equal(false);
    });

    it('should close the dialog when pressing the Esc key', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);
      el.setAttribute('open', '');
      await sendKeys({ press: 'Escape' });
      await elementUpdated(el);
      expect(el.open).to.equal(false);
    });

    it('should close the dialog when clicking on the ::backdrop', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);
      el.setAttribute('open', '');
      const backdrop = el.shadowRoot.querySelector('.dialog');
      backdrop.click();
      await elementUpdated(el);
      expect(el.open).to.equal(false);
    });

    it('should not close the dialog when clicking on the ::backdrop if "static-backdrop" attribute is set', async () => {
      const el = await fixture(html`<modal-element static-backdrop></modal-element>`);
      el.setAttribute('open', '');
      const backdrop = el.shadowRoot.querySelector('.dialog');
      backdrop.click();
      await elementUpdated(el);
      expect(el.open).to.equal(true);
    });
  });
});
