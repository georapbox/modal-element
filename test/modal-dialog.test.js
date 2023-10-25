import { expect, fixture, fixtureCleanup, html } from '@open-wc/testing';
import { ModalElement } from '../src/modal-element';

ModalElement.defineCustomElement();

describe('modal-element', () => {
  afterEach(() => {
    fixtureCleanup();
  });

  describe('accessibility', () => {
    it('passes accessibility test', async () => {
      const el = await fixture(html`
        <modal-element open>
          <h2 slot="header">Modal title</h2>
          <p>Main content goes here</p>
          <p slot="footer">Footer goes here</p>
        </modal-element>
      `);

      await expect(el).to.be.accessible();
    });
  });

  // describe('attributes - properties', () => {
  //   it('reflects attribute "open" to property "open"', async () => {
  //     const el = await fixture(html`<modal-element open></modal-element>`);
  //     expect(el.open).to.equal(true);
  //   });

  //   it('reflects property "open" to attribute "open"', async () => {
  //     const el = await fixture(html`<modal-element></modal-element>`);
  //     el.open = true;
  //     await elementUpdated(el);
  //     expect(el.hasAttribute('open')).to.equal(true);
  //   });
  // });

  // describe('basic functionality', () => {

  // });

  // describe('custom events', () => {
  //   it('should fire "me-open" event', async () => {
  //     const el = await fixture(html`
  //     `);
  //     const listener = oneEvent(el, 'me-open');
  //     el.open = true;
  //     const { detail } = await listener;
  //     expect(detail).to.deep.equal({});
  //   });
  // });
});
