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
  <p>Modal content</p>
  <div slot="footer">Modal footer</div>
</modal-element>
```

### Style

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
| `fullscreen` | ✓ | Boolean | - | `false` | Determines whether the modal should be displayed in fullscreen or not. Note, the `--me-width` and `--me-height` CSS custom properties will be overriden if this property is set to `true`. Notice that the backdrop is not visible in fullscreen mode. If you still want a full-width modal with a backdrop, you can use `--me-width: 100%;` and `--me-height: 100%;` instead. |
| `preserveOverflow`<br>*`preserve-overflow`* | ✓ | Boolean | - | `false` | Determines whether the modal should preserve the document's overflow when the modal is open. If this property is set to `true`, the document's overflow will not be hidden when the modal is open. |
| `placement` | ✓ | String | - | `center` | Determines the placement of the modal. Possible values are 'top-start', 'top-center', 'top-end', 'center-start', 'center', 'center-end', 'bottom-start', 'bottom-center', 'bottom-end'. Placement respects the direction of the document, eg if the document is in RTL mode, the placement will be mirrored accordingly. Note, that the placement is not applied when the modal is in fullscreen mode and it might not be visible in some cases when the modal is too large for the viewport, eg in small viewports. |
| `closeLabel`<br>*`close-label`* | ✓ | String | - | `Close` | The label for the default close button that resides in the modal's header. It is used as the `aria-label` attribute of the close button. If user provides text content for the close button using the `close` slot, this property is ignored and the `aria-label` attribute is removed. |

All of the above properties reflect their values as HTML attributes to keep the element's DOM representation in sync with its JavaScript state.

<sup>1</sup> A note for animations: The entry/exit animations of the modal are implemented using the [`@starting-style`](https://caniuse.com/?search=%40starting) CSS at-rule, which is a relatively new feature and currently only supported in Chromium-based browsers. Here is an interesting [article](https://developer.chrome.com/blog/entry-exit-animations/) for more information about the feature. As a fallback, the modal will be rendered without animations in browsers that do not support this feature. Also, keep in mind that if the user has [reduced motion](https://developer.mozilla.org/docs/Web/CSS/@media/prefers-reduced-motion) enabled in their operating system, the animations will be disabled as well, even if they are supported by the browser.

### Slots

| Name | Description |
| ---- | ----------- |
| (default/unnamed) | The modal's main content. |
| `header` | The modal's header content, usually a title. |
| `footer` | The modals' footer content. Usually used for buttons or other actions. |
| `close` | The content of the close button that appears in the modal's header. |

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
| `--me-width` | The preferred width of the modal. If this width is larger than the viewport, the modal's width will adjust to fit the viewport. | `32rem` |
| `--me-height` | The preferred height of the modal. If this height is larger than the viewport, the modal's height will adjust to fit the viewport. | `fit-content` |
| `--me-border-color` | The modal's border color. | `initial` |
| `--me-border-style` | The modal's border style. | `solid` |
| `--me-border-width` | The modal's border width. | `initial` |
| `--me-border-radius` | The modal's border radius. | `0` |
| `--me-box-shadow` | The modal's box shadow. | `none` |
| `--me-background-color` | The modal's background color. | `canvas` |
| `--me-color` | The modal's foreground color. | `canvastext` |
| `--me-header-spacing` | The amount of spacing (padding) to use for the header element. | `1rem` |
| `--me-header-background-color` | The header's background color. | `transparent` |
| `--me-header-color` | The header's foreground color. | `initial` |
| `--me-body-spacing` | The amount of spacing (padding) to use for the body element. | `1rem` |
| `--me-body-background-color` | The body's background color. | `transparent` |
| `--me-body-color` | The body's foreground color. | `initial` |
| `--me-footer-spacing` | The amount of spacing (padding) to use for the footer element. | `1rem` |
| `--me-footer-background-color` | The footer's background color. | `transparent` |
| `--me-footer-color` | The footer's foreground color. | `initial` |
| `--me-close-padding` | The padding of the default close button. | `0.4375rem` |
| `--me-close-border` | The border shorthand property of the default close button. | `none` |
| `--me-close-border-radius` | The border radius shorthand property of the default close button. | `0` |
| `--me-close-background-color` | The background color of the default close button. | `transparent` |
| `--me-close-color` | The foreground color of the default close button. | `inherit` |
| `--me-close-font-size` | The font size of the default close button. | `1rem` |
| `--me-backdrop-background`<sup>1</sup> | The backdrop's background shorthand property. It can be used to set the backdrop's background color, gradient, or image. | `rgba(0, 0, 0, 0.5)` |
| `--me-backdrop-filter`<sup>1</sup> | The backdrop's filter property. It can be used to set the backdrop's filter effects like blur, brightness, contrast, etc. | `none` |

<sup>1</sup> At the time of writing, the `::backdrop` pseudo-element (which is used under the hood) does not inherit from originating element per the specification. This means that the backdrop's CSS custom properties cannot be inherited from the modal's CSS custom properties. Fortunately, this is a known issue and it is being worked on by browser vendors and the CSS working group. Currently, it's already fixed in Firefox Nightly 120+ and Chromium Canary 121+. For more details, check the browser reported bugs below:
- [WHATWG bug report](https://github.com/whatwg/fullscreen/issues/124)
- [Chromium bug report](https://bugs.chromium.org/p/chromium/issues/detail?id=827397)
- [Firefox bug report](https://bugzilla.mozilla.org/show_bug.cgi?id=1855668)
- [Safari bug report](https://bugs.webkit.org/show_bug.cgi?id=263834)

### Events

| Name | Description | Event Detail |
| ---- | ----------- | ------------ |
| `me-open` | Emitted when the modal opens. | `{ element: HTMLElement }` |
| `me-close` | Emitted when the modal is dismissed in any way, either by clicking on the close button, by pressing the `Esc` key or by clicking outside the modal. | `{ element: HTMLElement }` |
| `me-request-close` | Emitted when the modal is about to be dismissed. This event is cancellable, hence you can prevent the modal from being dismissed by calling `event.preventDefault()`. This can be useful when you want to prevent users from dismissing the modal until they have completed a certain task, eg submitting a form. In the `event.detail` object you can find the `reason` why the modal is about to be dismissed. You can use the `reason` to determine whether the modal should be dismissed or not as demonstrated in this [example][example-prevent-close]. Note, that this event is not emitted if the modal is dismissed by an external event, eg by calling the `hide` method or by setting the `open` property to `false` manually. | `{ element: HTMLElement, reason: 'close-button' \| 'escape-key' \| 'backdrop-click' \| 'external-invoker' }` |

### Methods

| Name | Type | Description | Arguments |
| ---- | ---- | ----------- | --------- |
| `defineCustomElement` | Static | Defines/registers the custom element with the name provided. If no name is provided, the default name is used. The method checks if the element is already defined, hence will skip trying to redefine it. | `elementName='modal-element'` |
| `show`<sup>1</sup> | Instance | Opens the modal. | - |
| `hide`<sup>1</sup> | Instance | Closes the modal. | - |

<sup>1</sup> These methods are only available after the component has been defined. To ensure the component is defined, you can use `whenDefined` method of the `CustomElementRegistry` interface, eg `customElements.whenDefined('modal-element').then(() => { /* call methods here */ });`

## Closing mechanisms

The modal provides some default ways for the end user to dismiss the modal. These are:

- By clicking on the default close button in the modal's header.
- By pressing the `Esc` key.
- By clicking outside the modal if the `staticBackdrop` property is set to `false`.

These default mechanisms are enough for most use cases. However, sometimes developers want to provide extra mechanisms for modal closure. The most usual scenario is to provide a "Close" button on the modal's footer or a "Cancel" button for modals that act as confirmation prompts. To achieve this the developer would need to add the button and then add a click event listener to it to dismiss the modal. This is a common pattern and it works well. However, it can be a bit cumbersome to do this for every modal, especially if the developer is using the modal in a lot of places. Therefore, as of v1.5.0, the modal provides an automatic way to dismiss the modal by clicking on a button or a link inside the modal's content with the `data-me-close` attribute. This is a convenient way to dismiss the modal without the need to add a click event listener to the element.

Hopefully, in the future we are going to have more declarative ways to handle these kinds of scenarions natively with [Invokers](https://open-ui.org/components/invokers.explainer/), but for now, this is a simple way to achieve the same result.

Here is an example:

```html
<modal-element>
  <h5 slot="header">Modal Title</h5>
  <p>Modal content</p>
  <button slot="footer" type="button" data-me-close>Close</button>
</modal-element>
```

By just adding the `data-me-close` attribute to the button, the modal will be dismissed when the button is clicked.

**Note:** As of v1.7.0, by clicking on the custom close button, the `me-request-close` event will also be emitted with the `reason` set to `'external-invoker'` and therefore the user can prevent the modal from being dismissed by calling `event.preventDefault()` in the event listener if needed.

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
