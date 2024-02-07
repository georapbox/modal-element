# CHANGELOG

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
