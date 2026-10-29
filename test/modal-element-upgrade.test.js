import { expect, fixture, fixtureCleanup, html } from '@open-wc/testing';
import { ModalElement } from '../src/modal-element.js';

describe('modal-element upgrading', () => {
  afterEach(() => {
    fixtureCleanup();
  });

  it('should preserve properties set before the custom element is defined', async () => {
    const container = await fixture(html`<div></div>`);
    const el = document.createElement('modal-element');

    // Set properties before upgrading
    el.open = true;
    el.staticBackdrop = true;
    el.noHeader = true;
    el.noAnimations = true;
    el.noCloseButton = true;
    el.fullscreen = true;
    el.preserveOverflow = true;
    el.placement = 'top-start';
    el.closeLabel = 'Close';

    // Define and explicitly upgrade the custom element
    ModalElement.define();
    customElements.upgrade(el);

    // Connect the element so connectedCallback runs
    container.appendChild(el);

    expect(el.getAttribute('open')).to.equal('');
    expect(el.getAttribute('static-backdrop')).to.equal('');
    expect(el.getAttribute('no-header')).to.equal('');
    expect(el.getAttribute('no-animations')).to.equal('');
    expect(el.getAttribute('no-close-button')).to.equal('');
    expect(el.getAttribute('fullscreen')).to.equal('');
    expect(el.getAttribute('placement')).to.equal('top-start');
    expect(el.getAttribute('close-label')).to.equal('Close');
  });
});
