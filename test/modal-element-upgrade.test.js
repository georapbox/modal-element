import { elementUpdated, expect, fixture, fixtureCleanup, html } from '@open-wc/testing';
import { ModalElement } from '../src/modal-element.js';

describe('modal-element upgrading', () => {
  it('default properties', async () => {
    const el = await fixture(html`<modal-element></modal-element>`);

    // Update properties before upgrading
    el.open = true;
    el.staticBackdrop = true;
    el.noHeader = true;
    el.noAnimations = true;
    el.noCloseButton = true;
    el.fullscreen = true;
    el.preserveOverflow = true;
    el.placement = 'top-start';
    el.closeLabel = 'Close';

    // Upgrade custom element
    ModalElement.define();

    await elementUpdated(el);

    expect(el.getAttribute('open')).to.equal('');
    expect(el.getAttribute('static-backdrop')).to.equal('');
    expect(el.getAttribute('no-header')).to.equal('');
    expect(el.getAttribute('no-animations')).to.equal('');
    expect(el.getAttribute('no-close-button')).to.equal('');
    expect(el.getAttribute('fullscreen')).to.equal('');
    expect(el.getAttribute('placement')).to.equal('top-start');
    expect(el.getAttribute('close-label')).to.equal('Close');
  });

  afterEach(() => {
    fixtureCleanup();
  });
});
