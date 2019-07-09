# modularscale
Calculate a modular scale

Idea from http://www.modularscale.com/

## Install
`npm install modularscale`

## Usage
```javascript
var ms = require('modularscale');

// Defaults to using golden ratio
ms(1);
// --> 1.618

// Set desired ratio
ms(1, "minor second");
// --> 1.066

// See modularscale.com for the full list of preset ratios.
// You can also pass it any ratio you'd like.
```
