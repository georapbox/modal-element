import { expect, fixture, fixtureCleanup, html, oneEvent } from '@open-wc/testing';
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
      const el = await fixture(html`
        <modal-element>
          <h2 slot="title">Test modal</h2>
          <p>Modal content</p>
        </modal-element>
      `);

      el.show();

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

    it('close button retains default aria-label when custom content is provided', async () => {
      const el = await fixture(html`
        <modal-element>
          <span slot="close">Close modal</span>
        </modal-element>
      `);
      const closeButton = el.shadowRoot.querySelector('.dialog__close');

      expect(closeButton.getAttribute('aria-label')).to.equal('Close');
    });

    it('close button uses custom aria-label when custom content is provided', async () => {
      const el = await fixture(html`
        <modal-element close-label="Close modal">
          <span slot="close">Close modal</span>
        </modal-element>
      `);
      const closeButton = el.shadowRoot.querySelector('.dialog__close');

      expect(closeButton.getAttribute('aria-label')).to.equal('Close modal');
    });

    it('should have an accessible name when the header is hidden', async () => {
      const el = await fixture(html`
        <modal-element no-header>
          <h2 slot="title">Account settings</h2>
          <p>Manage your account settings.</p>
        </modal-element>
      `);

      const dialog = el.shadowRoot.querySelector('dialog');
      const header = el.shadowRoot.querySelector('.dialog__header');

      el.show();

      expect(header.hidden).to.be.true;
      expect(dialog.getAttribute('aria-labelledby')).to.equal('title');

      await expect(el).to.be.accessible();
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

      expect(el.hasAttribute('open')).to.be.true;

      el.open = false;

      expect(el.hasAttribute('open')).to.be.false;
    });

    // closed-by
    it('reflects attribute "closed-by" to property "closedBy"', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);

      el.setAttribute('closed-by', 'closerequest');

      expect(el.closedBy).to.equal('closerequest');
    });

    it('reflects property "closedBy" to attribute "closed-by"', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);

      el.closedBy = 'none';

      expect(el.getAttribute('closed-by')).to.equal('none');

      el.closedBy = null;

      expect(el.hasAttribute('closed-by')).to.be.false;
      expect(el.closedBy).to.equal('any');
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

      expect(el.hasAttribute('no-header')).to.be.true;

      el.noHeader = false;

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

      expect(el.hasAttribute('no-animations')).to.be.true;

      el.noAnimations = false;

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

      expect(el.hasAttribute('no-close-button')).to.be.true;

      el.noCloseButton = false;

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

      expect(el.hasAttribute('fullscreen')).to.be.true;

      el.fullscreen = false;

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

      expect(el.hasAttribute('preserve-overflow')).to.be.true;

      el.preserveOverflow = false;

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

      expect(bodySlot.assignedElements()).to.deep.equal([body]);
    });

    it('should have "title" slot', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);
      const titleSlot = el.shadowRoot.querySelector('slot[name="title"]');

      expect(titleSlot).to.exist;

      const title = document.createElement('h2');
      title.setAttribute('slot', 'title');
      title.textContent = 'Modal title';
      el.appendChild(title);

      expect(titleSlot.assignedElements()).to.deep.equal([title]);
    });

    it('should have "footer" slot', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);
      const footerSlot = el.shadowRoot.querySelector('slot[name="footer"]');

      expect(footerSlot).to.exist;

      const footer = document.createElement('p');
      footer.setAttribute('slot', 'footer');
      footer.textContent = 'Footer goes here';
      el.appendChild(footer);

      expect(footerSlot.assignedElements()).to.deep.equal([footer]);
    });

    it('should have "close" slot', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);
      const closeSlot = el.shadowRoot.querySelector('slot[name="close"]');

      expect(closeSlot).to.exist;

      const close = document.createElement('span');
      close.setAttribute('slot', 'close');
      close.textContent = 'Close';
      el.appendChild(close);

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

    it('should close modal when calling "requestClose()" method', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);

      el.show();
      el.requestClose();

      expect(el.open).to.be.false;
    });

    it('should not close the modal when the request from "requestClose()" is canceled', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);

      el.show();
      el.addEventListener('modal-request-close', evt => evt.preventDefault());

      el.requestClose();

      expect(el.open).to.be.true;
      expect(el.shadowRoot.querySelector('dialog').open).to.be.true;
    });

    it('should do nothing when calling "requestClose()" on a closed modal', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);
      const spy = sinon.spy();

      el.addEventListener('modal-request-close', spy);
      el.requestClose();

      expect(el.open).to.be.false;
      expect(spy.called).to.be.false;
    });

    it('should do nothing when calling "hide()" on an already closed modal', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);
      const dialog = el.shadowRoot.querySelector('dialog');
      const spy = sinon.spy(dialog, 'close');

      el.hide();

      expect(el.open).to.be.false;
      expect(dialog.open).to.be.false;
      expect(spy.called).to.be.false;
    });
  });

  describe('custom events', () => {
    it('should dispatch "modal-open" event', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);
      const spy = sinon.spy();

      el.addEventListener('modal-open', spy);
      el.show();

      expect(spy.calledOnce).to.be.true;
    });

    it('should dispatch "modal-close" event', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);
      const spy = sinon.spy();

      el.show();
      el.addEventListener('modal-close', spy);

      const listener = oneEvent(el, 'modal-close');

      el.hide();
      await listener;

      expect(spy.calledOnce).to.be.true;
    });

    it('should dispatch "modal-request-close" event when clicking the close button', async () => {
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

    it('should dispatch "modal-request-close" event when pressing the Esc key', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);
      const spy = sinon.spy();

      el.show();
      el.addEventListener('modal-request-close', spy);

      await sendKeys({ press: 'Escape' });

      expect(spy.calledOnce).to.be.true;
      expect(spy.firstCall.args[0].cancelable).to.be.true;
      expect(spy.firstCall.args[0].detail).to.deep.equal({ reason: 'native' });
    });

    it('should dispatch "modal-request-close" with reason "programmatic" when calling "requestClose()" method', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);
      const spy = sinon.spy();

      el.show();
      el.addEventListener('modal-request-close', spy);

      el.requestClose();

      expect(spy.calledOnce).to.be.true;
      expect(spy.firstCall.args[0].cancelable).to.be.true;
      expect(spy.firstCall.args[0].detail).to.deep.equal({ reason: 'programmatic' });
    });
  });

  describe('closing behavior', () => {
    it('should prevent closing when the close button request is canceled', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);

      el.show();
      el.addEventListener('modal-request-close', evt => evt.preventDefault());
      const closeButton = el.shadowRoot.querySelector('.dialog__close');

      closeButton.click();

      expect(el.open).to.be.true;
    });

    it('should prevent the first Escape close request after user activation', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);
      const dialog = el.shadowRoot.querySelector('dialog');

      el.show();
      el.addEventListener('modal-request-close', evt => evt.preventDefault());

      // Provide user activation before the native close request.
      await sendKeys({ press: 'Tab' });
      await sendKeys({ press: 'Escape' });

      expect(el.open).to.be.true;
      expect(dialog.open).to.be.true;
    });

    it('should close the modal when clicking the close button', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);

      el.show();

      const closeButton = el.shadowRoot.querySelector('.dialog__close');
      const closed = oneEvent(el, 'modal-close');
      closeButton.click();
      await closed;

      expect(el.open).to.be.false;
    });

    it('should close the modal when pressing the Esc key', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);

      el.show();

      const closed = oneEvent(el, 'modal-close');
      await sendKeys({ press: 'Escape' });
      await closed;

      expect(el.open).to.be.false;
    });

    it('should not close the modal when pressing Escape with "closed-by" set to "none"', async function () {
      const el = await fixture(html`<modal-element closed-by="none"></modal-element>`);
      const dialog = el.shadowRoot.querySelector('dialog');

      // Skip if the browser doesn't support the native closedBy property.
      if (!('closedBy' in dialog)) {
        this.skip();
      }

      el.show();

      await sendKeys({ press: 'Escape' });

      expect(el.open).to.be.true;
      expect(dialog.open).to.be.true;
    });
  });

  describe('element behavior', () => {
    it('the open attribute of internal dialog element should follow the open attribute of modal-element', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);

      el.setAttribute('open', '');

      const dialog = el.shadowRoot.querySelector('.dialog');

      expect(dialog.getAttribute('open')).to.equal('');

      el.removeAttribute('open');

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

    it('should reflect "closed-by" to the internal dialog "closedby" attribute', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);
      const dialog = el.shadowRoot.querySelector('dialog');

      expect(dialog.getAttribute('closedby')).to.equal('any');

      el.closedBy = 'none';
      expect(dialog.getAttribute('closedby')).to.equal('none');

      el.closedBy = 'closerequest';
      expect(dialog.getAttribute('closedby')).to.equal('closerequest');

      el.removeAttribute('closed-by');
      expect(dialog.getAttribute('closedby')).to.equal('any');
    });

    it('should remain open when reopened before the native close event fires', async () => {
      const el = await fixture(html`<modal-element></modal-element>`);
      const dialog = el.shadowRoot.querySelector('dialog');
      const spy = sinon.spy();

      el.addEventListener('modal-close', spy);

      el.show();

      const nativeClose = oneEvent(dialog, 'close');

      el.hide();
      el.show();

      await nativeClose;

      expect(el.open).to.be.true;
      expect(dialog.open).to.be.true;
      expect(spy.called).to.be.false;
    });
  });

  describe('invoker commands', () => {
    it('should open the modal when using "--modal-open" command', async () => {
      const container = await fixture(html`
        <div>
          <button type="button" commandfor="test-modal" command="--modal-open">Open</button>
          <modal-element id="test-modal"></modal-element>
        </div>
      `);

      const el = container.querySelector('modal-element');
      const invoker = container.querySelector('[command="--modal-open"]');
      const spy = sinon.spy();

      el.addEventListener('modal-open', spy);

      invoker.click();

      expect(el.open).to.be.true;
      expect(el.shadowRoot.querySelector('dialog').open).to.be.true;
      expect(spy.calledOnce).to.be.true;
    });

    it('should close the modal when using "--modal-close" command', async () => {
      const el = await fixture(html`
        <modal-element id="test-modal">
          <button type="button" commandfor="test-modal" command="--modal-close">Close</button>
        </modal-element>
      `);

      el.show();

      const invoker = el.querySelector('[command="--modal-close"]');
      invoker.click();

      expect(el.open).to.be.false;
    });

    it('should dispatch "modal-request-close" event when using "--modal-close" command', async () => {
      const el = await fixture(html`
        <modal-element id="test-modal">
          <button type="button" commandfor="test-modal" command="--modal-close">Close</button>
        </modal-element>
      `);
      const spy = sinon.spy();
      const invoker = el.querySelector('[command="--modal-close"]');

      el.show();
      el.addEventListener('modal-request-close', spy);

      invoker.click();

      expect(spy.calledOnce).to.be.true;
      expect(spy.firstCall.args[0].cancelable).to.be.true;
      expect(spy.firstCall.args[0].detail).to.deep.equal({ reason: 'invoker' });
    });

    it('should prevent closing when the invoker command request is canceled', async () => {
      const el = await fixture(html`
        <modal-element id="test-modal">
          <button type="button" commandfor="test-modal" command="--modal-close">Close</button>
        </modal-element>
      `);

      el.show();
      el.addEventListener('modal-request-close', evt => evt.preventDefault());

      el.querySelector('[command="--modal-close"]').click();

      expect(el.open).to.be.true;
    });

    it('should do nothing when using "--modal-open" command on an already open modal', async () => {
      const container = await fixture(html`
        <div>
          <button type="button" commandfor="test-modal" command="--modal-open">Open</button>
          <modal-element id="test-modal"></modal-element>
        </div>
      `);

      const el = container.querySelector('modal-element');
      const invoker = container.querySelector('[command="--modal-open"]');
      const spy = sinon.spy();

      el.addEventListener('modal-open', spy);

      invoker.click();
      invoker.click();

      expect(el.open).to.be.true;
      expect(el.shadowRoot.querySelector('dialog').open).to.be.true;
      expect(spy.calledOnce).to.be.true;
    });

    it('should do nothing when using "--modal-close" command on an already closed modal', async () => {
      const container = await fixture(html`
        <div>
          <button type="button" commandfor="test-modal" command="--modal-close">Close</button>
          <modal-element id="test-modal"></modal-element>
        </div>
      `);

      const el = container.querySelector('modal-element');
      const invoker = container.querySelector('[command="--modal-close"]');
      const spy = sinon.spy();

      el.addEventListener('modal-request-close', spy);

      el.show();

      invoker.click();
      invoker.click();

      expect(el.open).to.be.false;
      expect(el.shadowRoot.querySelector('dialog').open).to.be.false;
      expect(spy.calledOnce).to.be.true;
    });
  });
});
