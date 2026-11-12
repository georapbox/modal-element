# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.1] - 2026-11-12

### Fixed

- Corrected the default tag name in the generated Custom Elements Manifest.

### Changed

- Updated the build process to reuse the main module in the auto-defined entry point instead of creating a separate bundle.

### Documentation

- Simplified JSDoc annotations by removing redundant attribute, property, and method declarations already handled by the Custom Elements Manifest analyzer.

## [2.0.0] - 2026-11-02

### Breaking Changes

- **Explicit Package Exports**: Added a formal `exports` map to `package.json`.
  - **Supported entry points**: `@georapbox/modal-element`, `@georapbox/modal-element/define`, and `@georapbox/modal-element/custom-elements.json`.
  - **Impact**: Direct imports from internal paths (e.g., `@georapbox/modal-element/dist/...`) are no longer part of the supported public API and may fail in environments that enforce package exports.
- **Method Renaming**: The static `defineCustomElement()` method has been renamed to `define()`.
  - **Action Required**: Update all instances of `defineCustomElement()` to `define()`.
- **CSS Custom Property Renaming**: Renamed all public CSS custom properties from the `--me-` prefix to `--modal-` (e.g., `--me-width` to `--modal-width`).
  - **Action Required**: Update any custom styles using the old `--me-*` properties to their `--modal-*` equivalents.
- **Close Invoker Attribute Removal**: Removed support for the `data-me-close` attribute in favor of the native Invoker Commands API.
  - **Action Required**: Replace `data-me-close` with `commandfor` and `command="--modal-close"` on close buttons, or use the `requestClose()` method for programmatic closing.
- **Static Backdrop Removal**: Removed the `staticBackdrop` property and `static-backdrop` attribute in favor of the new `closedBy` property and `closed-by` attribute, which use the native `<dialog>` element's `closedby` behavior.
  - **Action Required**: Replace `static-backdrop` with `closed-by="closerequest"` to prevent backdrop dismissal while still allowing Escape or mobile Back. Use `closed-by="none"` to disable both native dismissal mechanisms.
  - **Note**: The default is `closed-by="any"`. The feature relies on native browser support and progressively enhances the modal without introducing a JavaScript fallback. Explicit closing mechanisms, such as the default close button, Invoker Commands, and `requestClose()`, remain available regardless of the `closed-by` value.
- **Event Renaming**: Renamed `me-open`, `me-close`, and `me-request-close` to `modal-open`, `modal-close`, and `modal-request-close`, respectively.
  - **Action Required**: Update event listeners to use the new names.
- **Event Payload Changes**: `modal-open` and `modal-close` are now dispatched as native `Event` instances instead of `CustomEvent` instances. The `modal-request-close` event remains a cancelable `CustomEvent`, but its `detail` contains only `reason`; the `element` property has been removed from all event details.
  - **Action Required**: Use `event.target` or `event.currentTarget` to access the modal element instead of `event.detail.element`. Do not access `event.detail` on `modal-open` or `modal-close`.
- **Invoker Command Renaming**: Renamed the `--me-open` and `--me-close` commands to `--modal-open` and `--modal-close`.
  - **Action Required**: Update any `command` attributes or command values used to invoke modal actions.
- **Consistent Close Button Labeling**: The default close button now always uses the `closeLabel` property for its `aria-label`, even when custom content is provided through the `close` slot. Previously, the `aria-label` was removed when custom text content was detected.
  - **Action Required**: If you provide custom visible text through the `close` slot, ensure `closeLabel` matches that text to maintain accessibility.
- **Close Request Reason Changes**: Updated `ModalElement.CLOSE_REQUEST_REASONS` to use shorter, more consistent identifiers. Native backdrop dismissal and platform close requests now share the same reason:
  - `ESCAPE_KEY` (`escape-key`) → `NATIVE` (`native`)
  - `BACKDROP_CLICK` (`backdrop-click`) → `NATIVE` (`native`)
  - `EXTERNAL_INVOKER` (`external-invoker`) → `INVOKER` (`invoker`)
  - `CLOSE_BUTTON` (`close-button`) remains unchanged.
  - **Action Required**: Update references to the renamed constants and comparisons against `event.detail.reason`. Native backdrop dismissal and Escape can no longer be distinguished using the close request reason.
- **Title Slot Renaming**: Renamed the `header` slot to `title` to better reflect its purpose.
  - **Action Required**: Replace `slot="header"` with `slot="title"` wherever a modal title is provided.
- **TypeScript Declaration Changes**: Removed the exported `Nullable<T>` and `CommandEvent` utility types.
  - **Action Required**: Replace `Nullable<T>` with `T | null` and use the native DOM `CommandEvent` type instead.

### Added

- **Native Closing Behavior**: Added the `closedBy` property (`closed-by` attribute), reflecting its value to the native `<dialog>` element's `closedby` attribute. Supported values are `'any'` (default), `'closerequest'`, and `'none'`.
- **Programmatic Close Requests**: Added the `requestClose()` method, which dispatches a cancelable `modal-request-close` event before closing the modal. If the event is canceled, the modal remains open. Added `PROGRAMMATIC` (`programmatic`) to `ModalElement.CLOSE_REQUEST_REASONS` to identify these requests.

### Changed

- **Native Backdrop Dismissal**: Replaced custom backdrop click handling with native `<dialog>` dismissal behavior and removed the pulse animation previously used for blocked close requests.
- **Improved Dialog Accessibility**: Moved `aria-labelledby` from the modal's panel to the native `<dialog>` element, ensuring the dialog is correctly associated with its title provided through the `title` slot.
- Updated development dependencies.

### Fixed

- **Scroll Lock Cleanup**: Fixed an issue where the document's body overflow was not restored when an open modal was disconnected from the DOM.

## [1.11.2] - 2026-10-14

### Fixed

- Preserved and restored the document body's previous `overflow` value when the modal closes instead of resetting it, improving scroll locking for nested modals.

### Changed

- Used `ownerDocument` and `defaultView` instead of global `document` and `window` references internally for better compatibility across documents.
- Clarified native `<dialog>` behavior in Chromium-based browsers when preventing dismissal via the `Esc` key.
- Updated Invoker Commands documentation to reflect current browser support.
- Updated animation browser support information and removed outdated backdrop styling notes.
- Updated the nested modals example to demonstrate automatic overflow restoration without `preserve-overflow`.

## [1.11.1] - 2026-03-06

### Fixed

- Fixed an issue where `static-backdrop` prevented closing the modal through elements with `data-me-close` ([#17](https://github.com/georapbox/modal-element/issues/17)).

### Changed

- Switched the internal pulse animation to the Web Animations API, respecting `prefers-reduced-motion`.
- Improved README usage examples and updated import instructions.

## [1.11.0] - 2026-02-15

### Added

- Added Custom Elements Manifest (CEM) support using `@custom-elements-manifest/analyzer`.
- Added an `analyze` script to generate the Custom Elements Manifest.
- Added `custom-elements-manifest.config.js` configuration.
- Added the `customElements` metadata field to `package.json`.

### Changed

- Updated `.nvmrc` to Node.js 24.
- Refined JSDoc attribute documentation in `src/modal-element.js` for improved tooling and editor support.

### Fixed

- Fixed a race condition that could trigger the opening animation even when `no-animations` was present. The internal animation state is now synchronized immediately before the modal opens.

## [1.10.0] - 2025-09-19

### Added

- Exposed `CLOSE_REQUEST_REASONS` as a static property on the `ModalElement` class for consumer reference.

### Changed

- Combined duplicate backdrop and external-invoker click handlers into a single handler.
- Updated development dependencies.

## [1.9.1] - 2025-08-21

### Fixed

- Replaced `addEventListener` with `removeEventListener` for `#handleDialogClick` in `disconnectedCallback` to prevent memory leaks.

### Changed

- Updated development dependencies.

## [1.9.0] - 2025-04-09

### Added

- Added support for the experimental [Invoker Commands API](https://developer.mozilla.org/docs/Web/API/Invoker_Commands_API).

### Changed

- Updated development dependencies.

## [1.8.0] - 2024-09-27

### Added

- Added a CSS part for the default close button icon in the header, allowing custom styling.
- Added `--me-color`, `--me-header-color`, `--me-body-color`, and `--me-footer-color` CSS custom properties for customizing foreground colors independently.
- Added CSS custom properties for customizing the default close button.

### Changed

- Updated development dependencies.

## [1.7.1] - 2024-08-22

### Changed

- Replaced Parcel with esbuild for bundling.
- Updated ESLint to use flat configuration.
- Adopted Prettier for code formatting.
- Updated development dependencies.

## [1.7.0] - 2024-05-22

### Fixed

- Allowed consumers to prevent closing the modal when clicking elements with `data-me-close` ([#11](https://github.com/georapbox/modal-element/issues/11)).

## [1.6.1] - 2024-04-22

### Fixed

- Fixed issue [#9](https://github.com/georapbox/modal-element/issues/9).

## [1.6.0] - 2024-03-23

### Added

- Added the `placement` attribute to control the modal's position on the screen.

### Changed

- Updated development dependencies.

## [1.5.0] - 2024-02-21

### Added

- Added the `data-me-close` attribute to allow buttons and links inside modal content to close the modal without a custom click handler ([#6](https://github.com/georapbox/modal-element/issues/6)).

## [1.4.0] - 2024-02-14

### Changed

- Restored automatic body scroll locking when the modal opens, reverting the behavior introduced in v1.3.0. The `preserve-overflow` attribute allows consumers to retain body scrolling when needed ([#4](https://github.com/georapbox/modal-element/issues/4)).

## [1.3.0] - 2024-02-08

### Changed

- Stopped automatically hiding the document body's scrollbars when the modal opens, following native `<dialog>` behavior ([#2](https://github.com/georapbox/modal-element/issues/2)). Consumers can opt into scroll locking using CSS, for example:

  ```css
  html:has(modal-element[open]) {
    overflow: hidden;
  }
  ```

### Added

- Added `overscroll-behavior` to the modal body to prevent scroll chaining into neighboring scrolling areas.

### Changed

- Updated development dependencies.

## [1.2.1] - 2023-11-20

### Fixed

- Corrected the scale animation so the modal uses the same scale when opening and closing.

## [1.2.0] - 2023-11-15

### Added

- Added the `title` CSS part to allow styling the modal title wrapper.

## [1.1.0] - 2023-11-14

### Added

- Added fullscreen modal support via the `fullscreen` attribute.

## [1.0.1] - 2023-11-10

### Fixed

- Fixed a styling issue that caused modal content to overflow its container, especially on smaller viewports.

## [1.0.0] - 2023-11-08

### Added

- Initial release.

[unreleased]: https://github.com/georapbox/modal-element/compare/v2.0.1...HEAD
[2.0.1]: https://github.com/georapbox/modal-element/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/georapbox/modal-element/compare/v1.11.2...v2.0.0
[1.11.2]: https://github.com/georapbox/modal-element/compare/v1.11.1...v1.11.2
[1.11.1]: https://github.com/georapbox/modal-element/compare/v1.11.0...v1.11.1
[1.11.0]: https://github.com/georapbox/modal-element/compare/v1.10.0...v1.11.0
[1.10.0]: https://github.com/georapbox/modal-element/compare/v1.9.1...v1.10.0
[1.9.1]: https://github.com/georapbox/modal-element/compare/v1.9.0...v1.9.1
[1.9.0]: https://github.com/georapbox/modal-element/compare/v1.8.0...v1.9.0
[1.8.0]: https://github.com/georapbox/modal-element/compare/v1.7.1...v1.8.0
[1.7.1]: https://github.com/georapbox/modal-element/compare/v1.7.0...v1.7.1
[1.7.0]: https://github.com/georapbox/modal-element/compare/v1.6.1...v1.7.0
[1.6.1]: https://github.com/georapbox/modal-element/compare/v1.6.0...v1.6.1
[1.6.0]: https://github.com/georapbox/modal-element/compare/v1.5.0...v1.6.0
[1.5.0]: https://github.com/georapbox/modal-element/compare/v1.4.0...v1.5.0
[1.4.0]: https://github.com/georapbox/modal-element/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/georapbox/modal-element/compare/v1.2.1...v1.3.0
[1.2.1]: https://github.com/georapbox/modal-element/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/georapbox/modal-element/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/georapbox/modal-element/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/georapbox/modal-element/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/georapbox/modal-element/releases/tag/v1.0.0
