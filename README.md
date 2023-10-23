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

```

### Style

By default, the component comes with minimal styling to remain as less opinionated as possible. However, you can style the various elements of the component using the `::part()` CSS pseudo-elements provided for this purpose. Below are demonstrated all available parts for styling.

```css

```

## API

### Properties
| Name | Reflects | Type | Default | Description |
| ---- | -------- | ---- | ------- | ----------- |

All of the above properties reflect their values as HTML attributes to keep the element's DOM representation in sync with its JavaScript state.

### Slots

| Name | Default | Description |
| ---- | ------- | ----------- |

### CSS Parts

| Name | Description |
| ---- | ----------- |

### CSS Custom Properties

| Name | Description | Default |
| ---- | ----------- | ------- |

### Events

| Name | Description | Event Detail |
| ---- | ----------- | ------------ |

## Changelog

For API updates and breaking changes, check the [CHANGELOG][changelog].

## License

[The MIT License (MIT)][license]
