[![npm version](https://img.shields.io/npm/v/@georapbox/modal-element.svg)](https://www.npmjs.com/package/@georapbox/modal-element)
[![npm license](https://img.shields.io/npm/l/@georapbox/modal-element.svg)](https://www.npmjs.com/package/@georapbox/modal-element)

[demo]: https://georapbox.github.io/modal-element/
[example-custom-styling]: https://georapbox.github.io/modal-element#example-custom-styling
[example-prevent-close]: https://georapbox.github.io/modal-element#example-prevent-close
[license]: https://github.com/georapbox/modal-element/blob/main/LICENSE
[changelog]: https://github.com/georapbox/modal-element/blob/main/CHANGELOG.md

# &lt;modal-element&gt;

A custom element to create a modal, using the native [&lt;dialog&gt;](https://developer.mozilla.org/docs/Web/HTML/Element/dialog) element under the hood.

[API documentation](#api) &bull; [Demo][demo]

## Usage

### Installation

```sh
$ npm install --save @georapbox/modal-element
```

### Importing the component

By default, the package exports the element class without registering it. This lets the application decide when the custom element is defined.

#### Manual definition

```js
import { ModalElement } from '@georapbox/modal-element';

// Define using the default tag name
ModalElement.define();
```

#### Auto-defined (convenience)

If you don't need control over registration, you can import the pre-defined build which immediately registers `<modal-element>`.

```js
import '@georapbox/modal-element/define';
```

### Using the component in your HTML

```html
<modal-element>
  <h1 slot="header">Modal Title</h1>
  <p>Modal content</p>
  <div slot="footer">Modal footer</div>
</modal-element>
```

### Component styling

By default, the component comes with minimal styling to remain as less opinionated as possible. However, you can style the various elements of the component using the available [CSS Parts](#css-parts) or by overriding the default [CSS Custom Properties](#css-custom-properties). A working example of styling the component can be found [here][example-custom-styling].

## API

### Properties
| Name | Reflects | Type | Required | Default | Description |
| ---- | -------- | ---- | -------- | ------- | ----------- |
| `open` | ✓ | Boolean | - | `false` | Determines whether the modal is open or not.<br><br>**NOTE:** If you create a modal-element programmatically via `document.createElement('modal-element')`, you need to append it to the DOM before setting this property to `true`. Otherwise, you will get an error like this: `Uncaught DOMException: Failed to execute 'showModal' on 'HTMLDialogElement': The element is not in a Document.` This is because the native [`showModal`](https://developer.mozilla.org/docs/Web/API/HTMLDialogElement/showModal) method of the `HTMLDialogElement` requires the element to be in the DOM before it can be called. |
| `staticBackdrop`<br>*`static-backdrop`* | ✓ | Boolean | - | `false` | Determines whether the modal should be closed when the user clicks outside the modal or not. |
| `noHeader`<br>*`no-header`* | ✓ | Boolean | - | `false` | Determines whether the modal should have a header or not. Note, that if the modal has no header, the default close button will not be visible as well, therefore you probably need to provide an accessible way for users to dismiss the modal. |
| `noAnimations`<br>*`no-animations`*<sup>1</sup> | ✓ | Boolean | - | `false` | Determines whether the modal should have animations or not. Animations include the modal's entrance and exit animations, as well as the static backdrop's bounce effect when users clicks on it. |
| `noCloseButton`<br>*`no-close-button`* | ✓ | Boolean | - | `false` | Determines whether the modal should have a default close button or not. If the modal has no close button, you probably need to provide an accessible way for users to dismiss the modal. |
| `fullscreen` | ✓ | Boolean | - | `false` | Determines whether the modal should be displayed in fullscreen or not. Note, the `--modal-width` and `--modal-height` CSS custom properties will be overriden if this property is set to `true`. Notice that the backdrop is not visible in fullscreen mode. If you still want a full-width modal with a backdrop, you can use `--modal-width: 100%;` and `--modal-height: 100%;` instead. |
| `preserveOverflow`<br>*`preserve-overflow`* | ✓ | Boolean | - | `false` | Determines whether the modal should preserve the document's overflow when the modal is open. If this property is set to `true`, the document's overflow will not be hidden when the modal is open. |
| `placement` | ✓ | String | - | `center` | Determines the placement of the modal. Possible values are 'top-start', 'top-center', 'top-end', 'center-start', 'center', 'center-end', 'bottom-start', 'bottom-center', 'bottom-end'. Placement respects the direction of the document, eg if the document is in RTL mode, the placement will be mirrored accordingly. Note, that the placement is not applied when the modal is in fullscreen mode and it might not be visible in some cases when the modal is too large for the viewport, eg in small viewports. |
| `closeLabel`<br>*`close-label`* | ✓ | String | - | `Close` | The accessible label for the default close button, used as its `aria-label` attribute. When providing custom text content through the `close` slot, make sure `closeLabel` matches the visible text to ensure accessibility. |

<sup>1</sup> The modal's entry/exit animations are implemented using modern CSS features, including [`@starting-style`](https://developer.mozilla.org/docs/Web/CSS/Reference/At-rules/@starting-style) and [`transition-behavior: allow-discrete`](https://developer.mozilla.org/docs/Web/CSS/transition-behavior). Browser support for these features varies, so some animations may not work as expected in certain browsers. When animations are not supported, the modal remains fully functional. Additionally, animations are disabled when the user has [reduced motion](https://developer.mozilla.org/docs/Web/CSS/@media/prefers-reduced-motion) enabled in their operating system.

All of the above properties reflect their values as HTML attributes to keep the element's DOM representation in sync with its JavaScript state.

### Slots

| Name | Description |
| ---- | ----------- |
| (default/unnamed) | The modal's main content. |
| `header` | The modal's header content, usually a title. |
| `footer` | The modals' footer content. Usually used for buttons or other actions. |
| `close` | The content of the close button in the modal's header. When providing visible text, ensure the closeLabel property matches the text. |

### CSS Parts

| Name | Description |
| ---- | ----------- |
| `base` | The componen'ts base wrapper. In this case this is the native `<dialog>` element. |
| `panel` | The modal's panel element where the all the content is rendered. |
| `header` | The modal's header element. It wraps the modal's title and close button. |
| `title` | The modal's title wrapper element. |
| `close` | The default close button rendered in the modal's header. |
| `close-icon` | The default close button's icon. |
| `body` | The modal's body element, where all main content is rendered. |
| `footer` | The modal's footer element. |

### CSS Custom Properties

| Name | Description | Default |
| ---- | ----------- | ------- |
| `--modal-width` | The preferred width of the modal. If this width is larger than the viewport, the modal's width will adjust to fit the viewport. | `32rem` |
| `--modal-height` | The preferred height of the modal. If this height is larger than the viewport, the modal's height will adjust to fit the viewport. | `fit-content` |
| `--modal-border-color` | The modal's border color. | `initial` |
| `--modal-border-style` | The modal's border style. | `solid` |
| `--modal-border-width` | The modal's border width. | `initial` |
| `--modal-border-radius` | The modal's border radius. | `0` |
| `--modal-box-shadow` | The modal's box shadow. | `none` |
| `--modal-background-color` | The modal's background color. | `canvas` |
| `--modal-color` | The modal's foreground color. | `canvastext` |
| `--modal-header-spacing` | The amount of spacing (padding) to use for the header element. | `1rem` |
| `--modal-header-background-color` | The header's background color. | `transparent` |
| `--modal-header-color` | The header's foreground color. | `initial` |
| `--modal-body-spacing` | The amount of spacing (padding) to use for the body element. | `1rem` |
| `--modal-body-background-color` | The body's background color. | `transparent` |
| `--modal-body-color` | The body's foreground color. | `initial` |
| `--modal-footer-spacing` | The amount of spacing (padding) to use for the footer element. | `1rem` |
| `--modal-footer-background-color` | The footer's background color. | `transparent` |
| `--modal-footer-color` | The footer's foreground color. | `initial` |
| `--modal-close-padding` | The padding of the default close button. | `0.4375rem` |
| `--modal-close-border` | The border shorthand property of the default close button. | `none` |
| `--modal-close-border-radius` | The border radius shorthand property of the default close button. | `0` |
| `--modal-close-background-color` | The background color of the default close button. | `transparent` |
| `--modal-close-color` | The foreground color of the default close button. | `inherit` |
| `--modal-close-font-size` | The font size of the default close button. | `1rem` |
| `--modal-backdrop-background` | The backdrop's background shorthand property. It can be used to set the backdrop's background color, gradient, or image. | `rgba(0, 0, 0, 0.5)` |
| `--modal-backdrop-filter` | The backdrop's filter property. It can be used to set the backdrop's filter effects like blur, brightness, contrast, etc. | `none` |

### Events

| Name | Type | Description | Event Detail |
| ---- | ---- | ----------- | ------------ |
| `modal-open` | Event | Dispatched when the modal opens. | - |
| `modal-close` | Event | Dispatched when the modal is dismissed in any way, either by clicking on the close button, by pressing the `Esc` key or by clicking outside the modal. | - |
| `modal-request-close` | CustomEvent | Dispatched when the modal is about to be dismissed. This event is cancelable, allowing you to prevent dismissal by calling `event.preventDefault()`, subject to native browser behavior. The `event.detail` object contains the reason for dismissal. This event is not emitted when the modal is closed programmatically using `hide()` or by setting `open` to `false`. | `{ reason: 'close-button' \| 'backdrop' \| 'invoker' \| 'platform' }` |

> [!NOTE]
> When dismissing the modal using the `Esc` key, the browser may not always allow the close request to be canceled. In Chromium-based browsers, pressing `Esc` repeatedly without any intervening user activation may close the modal even if `event.preventDefault()` is called on `modal-request-close`.
>
> This is intentional native `<dialog>` behavior designed to prevent websites from trapping users inside dialogs. See the [HTML specification](https://html.spec.whatwg.org/multipage/interaction.html#close-watcher-infrastructure) for more details.

### Methods

| Name | Type | Description | Arguments |
| ---- | ---- | ----------- | --------- |
| `define` | Static | Registers the custom element with the browser's CustomElementRegistry unless it has already been defined. | `tagName='modal-element'` |
| `show`<sup>1</sup> | Instance | Opens the modal. | - |
| `hide`<sup>1</sup> | Instance | Closes the modal. | - |

<sup>1</sup> Instance methods are only available after the custom element has been defined. Use [`customElements.whenDefined()`](https://developer.mozilla.org/docs/Web/API/CustomElementRegistry/whenDefined) to ensure the element is registered before calling these methods.

### Static Properties

Below are static properties exposed on the `ModalElement` class for consumer reference.

| Name | Type | Description |
| ---- | ---- | ----------- |
| `CLOSE_REQUEST_REASONS` | Object | Static object of stable identifiers used in the `reason` property of the `modal-request-close` event's detail object. |

## Scroll locking

By default, the modal prevents the document from scrolling while it is open by setting the body's `overflow` property to `hidden`. The previous value is restored when the modal closes. This behavior can be disabled using the `preserve-overflow` attribute.

Hiding the scrollbar may cause horizontal layout shifts. To prevent this, consider applying [`scrollbar-gutter: stable`](https://developer.mozilla.org/docs/Web/CSS/scrollbar-gutter) to the document's root element:

```css
html {
  scrollbar-gutter: stable;
}
```

Unlike scroll locking, which is managed by the component, scrollbar gutter behavior is left to the consuming application because it affects the layout of the entire document. This allows applications to decide whether to reserve scrollbar space based on their own layout requirements.

Note that `scrollbar-gutter` has no effect on browsers that use overlay scrollbars.

## Closing mechanisms

The modal provides some default ways for the end user to dismiss the modal. These are:

- By clicking on the default close button in the modal's header.
- By pressing the `Esc` key.
- By clicking outside the modal if the `staticBackdrop` property is set to `false`.

These default mechanisms are enough for most use cases. However, sometimes developers want to provide extra mechanisms for modal closure. The most usual scenario is to provide a "Close" button on the modal's footer or a "Cancel" button for modals that act as confirmation prompts. To achieve this the developer would need to add the button and then add a click event listener to it to dismiss the modal. This is a common pattern and it works well. However, it can be a bit cumbersome to do this for every modal, especially if the developer is using the modal in a lot of places. Therefore, as of v1.5.0, the modal provides an automatic way to dismiss the modal by clicking on a button or a link inside the modal's content with the `data-modal-close` attribute. This is a convenient way to dismiss the modal without the need to add a click event listener to the element.

Alternatively, you can use the [Invoker Commands API](#invoker-commands) to declaratively open and close the modal without adding event listeners.

Here is an example:

```html
<modal-element>
  <h5 slot="header">Modal Title</h5>
  <p>Modal content</p>
  <button slot="footer" type="button" data-modal-close>Close</button>
</modal-element>
```

By just adding the `data-modal-close` attribute to the button, the modal will be dismissed when the button is clicked.

Clicking on the custom close button, the `modal-request-close` event will also be emitted with the `reason` set to `'invoker'` and therefore the user can prevent the modal from being dismissed by calling `event.preventDefault()` in the event listener if needed.

## Invoker Commands

Invoker Commands are supported to provide a more declarative way to handle user interactions. The modal provides the following commands:

- `--modal-open` command to open the modal
- `--modal-close` command to close the modal

Here is an example, demonstrating how to use the API to open and close the modal.

```html
<button type="button" commandfor="my-modal" command="--modal-open">Open modal</button>

<modal-element id="my-modal">
  <h5 slot="header">Modal Title</h5>
  <p>Modal content</p>
  <button slot="footer" type="button" commandfor="my-modal" command="--modal-close">Close</button>
</modal-element>
```

Closing the modal using `--modal-close` dispatches a cancelable `modal-request-close` event with the reason set to `'invoker'`, just like elements using `data-modal-close`.

> [!NOTE]
> The Invoker Commands API is [Baseline Newly Available](https://developer.mozilla.org/docs/Web/API/Invoker_Commands_API) since December 2025 and is supported in the latest versions of all major browsers. Older browser versions may not support this feature. Check [browser compatibility](https://developer.mozilla.org/docs/Web/API/Invoker_Commands_API#browser_compatibility) for more details.

## Changelog

For API updates and breaking changes, check the [CHANGELOG][changelog].

## Development setup

### Prerequisites

The project requires `Node.js` and `npm` to be installed on your environment. Preferrably, use [nvm](https://github.com/nvm-sh/nvm) Node Version Manager and use the version of Node.js specified in the `.nvmrc` file by running `nvm use`.

### Install dependencies

Install the project dependencies by running the following command.

```sh
npm install
```

### Build for development

Watch for changes and start a development server by running the following command.

```sh
npm start
```

### Linting

Lint the code by running the following command.

```sh
npm run lint
```

### Testing

Run the tests by running any of the following commands.

```sh
npm test
npm run test:watch # watch mode
```

### Build for production

Create a production build by running the following command.

```sh
npm run build
```

## License

[The MIT License (MIT)][license]
