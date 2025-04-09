# CHANGELOG

## v1.9.0 (2025-04-09)

- Add support for experimental [Invoker Commands API](https://developer.mozilla.org/docs/Web/API/Invoker_Commands_API).
- Update dev dependencies.

## v1.8.0 (2024-09-27)

- Add CSS part to the default icon of the close button in header, to allow for custom styling.
- Add `--me-color`, `--me-header-color`, `--me-body-color` and `--me-footer-color` CSS custom properties to allow for customizing the foreground color of the the modal and its parts (header, body and footer) separately.
- Add CSS custom properties to allow for customizing the modal's default close button.
- Update dev dependencies.

## v1.7.1 (2024-08-22)

- Replace parcel with esbuild for bundling.
- Update ESLint to use flat configuration.
- Use Prettier for code formatting.
- Update dev dependencies.

## v1.7.0 (2024-05-22)

- Add support to prevent the modal from closing when clicking on CTAs inside the modal that have the `data-me-close` attribute. Fixes issue [#11](https://github.com/georapbox/modal-element/issues/11).

## v1.6.1 (2024-04-22)

- Fix issue [#9](https://github.com/georapbox/modal-element/issues/9).

## v1.6.0 (2024-03-23)

- Add `placement` attribute to allow the user to specify the placement of the modal on the screen.
- Update dev dependencies.

## v1.5.0 (2024-02-21)

- Add automatic modal closure feature via `data-me-close` attribute on the modal's content. When there is a button or a link inside the modal's content with the `data-me-close` attribute, clicking on it will close the modal without the need to add a click event listener to the element. See issue [#6](https://github.com/georapbox/modal-element/issues/6).

## v1.4.0 (2024-02-14)

- Revert the change made in v1.3.0 that did not remove the document's body overflow when the modal is open. See [#4](https://github.com/georapbox/modal-element/issues/4). The modal will now remove the scrollbars from the body when opened. This will be the default behavior but it can be overriden by using the `preserve-overflow` attribute in the cases that the user needs to keep the document's body scrollbars when the modal is open.

## v1.3.0 (2024-02-08)

- Fixes issue [#2](https://github.com/georapbox/modal-element/issues/2). Prior to this version, the modal would remove scrollbars from the body when opened. This was done to prevent the body from scrolling when the modal is open. However, this might not always be the desired behavior and there was no option for the user to disable it. As of this version, the modal will no longer remove the scrollbars from the body when opened following the native `dialog` element's behavior. If you want to prevent the body from scrolling when the modal is open, you can do so by setting the `overflow` property of the body to `hidden` when the modal is open. This can be done in various ways but the simplest is by using the `:has()` pseudo-class. For example:

  ```css
  html:has(modal-element[open]) {
    overflow: hidden;
  }
  ```

- Add `overscroll-behavior` to the modal's body to prevent scroll chaining on neighboring scrolling areas.
- Update dev dependencies.

## v1.2.1 (2023-11-20)

- Minor fix to the scale animation when the modal is opened; the scale is now the same as when the modal is closed.

## v1.2.0 (2023-11-15)

- Add `title` CSS Part to the modal's title wrapper element for styling purposes.

## v1.1.0 (2023-11-14)

- Add support for fullscreen modal using the `fullscreen` attribute.

## v1.0.1 (2023-11-10)

- Fix a styling issue that caused the content to overflow the container especially on smaller viewports.

## v1.0.0 (2023-11-08)

- Initial release
