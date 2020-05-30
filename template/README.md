# {{ asyncapi.info().title() }}

## API description
{{ asyncapi.info().description() | safe }}

## Usage

### Installation

#### Node.js
Simply require `client.js`:
```javascript
const Client = require('<pathToGeneratedCode>/lib/client.js');
```

#### Browser
Simply include `browser.bundle.js` (see [index.html](index.html)):
```html
<script src="lib/browser.bundle.js"></script>
```

### API
See example code in [index.html](index.html).
