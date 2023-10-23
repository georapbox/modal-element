import { expect, fixture, fixtureCleanup, html } from '@open-wc/testing';
import '../src/modal-element.js';

describe('modal-element', () => {
  afterEach(() => {
    fixtureCleanup();
  });

  describe('accessibility', () => {
    it('passes accessibility test', async () => {
      const el = await fixture(html`
        <modal-element>
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
  //     const el = await fixture(html``);
  //   });

  //   it('reflects property "open" to attribute "open"', async () => {
  //     const el = await fixture(html``);
  //     await elementUpdated(el);
  //   });
  // });

  // describe('basic functionality', () => {

  // });

  // describe('custom events', () => {
  //   it('should fire "modal-element-open" event', async () => {
  //     const el = await fixture(html`
  //     `);
  //     const listener = oneEvent(el, 'modal-element-open');
  //     el.open = true;
  //     const { detail } = await listener;
  //     expect(detail).to.deep.equal({});
  //   });
  // });
});
