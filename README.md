[![npm version](https://img.shields.io/npm/v/@georapbox/modal-element.svg)](https://www.npmjs.com/package/@georapbox/modal-element)
[![npm license](https://img.shields.io/npm/l/@georapbox/modal-element.svg)](https://www.npmjs.com/package/@georapbox/modal-element)

[demo]: https://georapbox.github.io/modal-element/
[license]: https://georapbox.mit-license.org/@2023
[changelog]: https://github.com/georapbox/modal-element/blob/main/CHANGELOG.md

# &lt;modal-element&gt;

A custom element to create a modal dialog, using the native [&lt;dialog&gt;](https://developer.mozilla.org/docs/Web/HTML/Element/dialog) element.

[API documentation](#api) &bull; [Demo][demo]

## Install

```sh
$ npm install --save @georapbox/modal-element
```

## Usage

### Script

```js
import { ModalElement } from './node_modules/@georapbox/modal-element/dist/modal-element.js';

// Manually define the element.
ModalElement.defineCustomElement();
```

Alternatively, you can import the automatically defined custom element.

```js
import './node_modules/@georapbox/modal-element/dist/modal-element-defined.js';
```

### Markup

```html
<modal-element>
  <h1 slot="header">Modal Title</h1>
  <div slot="body">Modal content</div>
  <div slot="footer">Modal footer</div>
</modal-element>
```

### Style

By default, the component comes with minimal styling to remain as less opinionated as possible. However, you can style the various elements of the component using the available [CSS Parts](#css-parts) or by overriding the default [CSS Custom Properties](#css-custom-properties). A working example of styling the component can be found [here][demo]. Below are demonstrated some available parts for styling.

```css
modal-element {
  --me-width: 38rem;
  --me-border-width: 0;
  --me-border-radius: 0.375rem;
  --me-bg-color: #ffffff;
  --me-box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.25);
  --me-header-spacing: 1.25rem;
  --me-body-spacing: 1.25rem;
  --me-footer-spacing: 1.25rem;
}

modal-element::part(header) {
  border-bottom: 1px solid #dddddd;
}

modal-element::part(footer) {
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #dddddd;
}
```

## API

### Properties
| Name | Reflects | Type | Required | Default | Description |
| ---- | -------- | ---- | -------- | ------- | ----------- |
| `open` | ✓ | Boolean | - | `false` | Indicates whether the modal is open or not. |
| `staticBackDrop`<br>*`static-backdrop`* | ✓ | Boolean | - | `false` | Indicates whether the modal should be closed when the user clicks outside the modal or not. |
| `noHeader`<br>*`no-header`* | ✓ | Boolean | - | `false` | Indicates whether the modal should have a header or not. Note, that if the modal has no header, the default close button will not be visible as well, therefore you probably need to provide an accessible way for users to dismiss the modal. |
| `noAnimations`<br>*`no-animations`*<sup>1</sup> | ✓ | Boolean | - | `false` | Indicates whether the modal should have animations or not. Animations include the modal's entrance and exit animations, as well as the static backdrop's bounce effect when users clicks on it. |
| `noClosable`<br>*`no-closable`* | ✓ | Boolean | - | `false` | Indicates whether the modal should be closable or not. If the modal is not closable, the modal cannot be dismissed by either clicking on the close button or by pressing the `ESC` key or by clicking outside the modal. Nevertheless, you can still programmatically close the modal by setting the `open` property to `false`. This property is useful when you want to prevent users from dismissing the modal until they have completed a certain task, eg submitting a form. Use it with caution and always remember to set the `open` property to `true` when the task is completed. |
| `noCloseButton`<br>*`no-close-button`* | ✓ | Boolean | - | `false` | Indicates whether the modal should have a default close button or not. If the modal has no close button, you probably need to provide an accessible way for users to dismiss the modal. |

All of the above properties reflect their values as HTML attributes to keep the element's DOM representation in sync with its JavaScript state.

<sup>1</sup> A note for animations: The entry/exit animations of the modal are implemented using the [`@starting-style`](https://caniuse.com/?search=%40starting) CSS at-rule, which is a relatively new feature and currently only supported in Chromium-based browsers. Here is an interesting [article](https://developer.chrome.com/blog/entry-exit-animations/) for more information about the feature. As a fallback, the modal will be rendered without animations in browsers that do not support this feature. Also, keep in mind that if the user has [reduced motion](https://developer.mozilla.org/docs/Web/CSS/@media/prefers-reduced-motion) enabled in their operating system, the animations will be disabled as well, even if they are supported by the browser.

### Slots

| Name | Description |
| ---- | ----------- |
| `header` | The modal's header content, usually a title. |
| `body` | The modal's main content. |
| `footer` | The modals' footer content. Usually used for buttons or other actions. |
| `close` | The content of the close button that appears in the modal's header. |

### CSS Parts

| Name | Description |
| ---- | ----------- |
| `base` | The componen'ts base wrapper. In this case this is the native `<dialog>` element. |
| `panel` | The modal's panel element where the all the content is rendered. |
| `header` | The modal's header element. It wraps the modal's title and close button. |
| `close` | The default close button rendered in the modal's header. |
| `body` | The modal's body element, where all main content is rendered. |
| `footer` | The modal's footer element. |

### CSS Custom Properties

| Name | Description | Default |
| ---- | ----------- | ------- |
| `--me-width` | The preferred width of the modal. If this width is larger than the viewport, the modal's width will adjust to fit the viewport. | `32rem` |
| `--me-height` | The preferred height of the modal. If this height is larger than the viewport, the modal's height will adjust to fit the viewport. | `fit-content` |
| `--me-border-color` | The modal's border color. | `initial` |
| `--me-border-style` | The modal's border style. | `solid` |
| `--me-border-width` | The modal's border width. | `initial` |
| `--me-border-radius` | The modal's border radius. | `0` |
| `--me-box-shadow` | The modal's box shadow. | `none` |
| `--me-bg-color` | The modal's background color. | `canvas` |
| `--me-header-spacing` | The amount of spacing (padding) to use for the header element. | `1rem` |
| `--me-body-spacing` | The amount of spacing (padding) to use for the body element. | `1rem` |
| `--me-footer-spacing` | The amount of spacing (padding) to use for the footer element. | `1rem` |
| `--me-header-bg-color` | The header's background color. | `transparent` |
| `--me-body-bg-color` | The body's background color. | `transparent` |
| `--me-footer-bg-color` | The footer's background color. | `transparent` |

### Events

| Name | Description | Event Detail |
| ---- | ----------- | ------------ |
| `me-open` | Emitted when the modal opens. | `{element: HTMLElement}` |
| `me-close` | Emitted when the modal is dismissed in any way, either by clicking on the close button, by pressing the `ESC` key or by clicking outside the modal. | `{element: HTMLElement}` |

### Methods

| Name | Type | Description | Arguments |
| ---- | ---- | ----------- | --------- |
| `defineCustomElement` | Static | Defines/registers the custom element with the name provided. If no name is provided, the default name is used. The method checks if the element is already defined, hence will skip trying to redefine it. | `elementName='modal-element'` |

## Changelog

For API updates and breaking changes, check the [CHANGELOG][changelog].

## License

[The MIT License (MIT)][license]
