# compass-vertical-rhythm
A port-in-progress of the [Compass vertical rhythm
library](http://compass-style.org/reference/compass/typography/vertical_rhythm/).

Only the rhythm function has been ported atm.

## Install
`npm install compass-vertical-rhythm`

## Usage
```javascript
var VerticalRhythm = require('compass-vertical-rhythm');

var rhythm = VerticalRhythm({baseFontSize: '24px', baseLineHeight: 1.5}).rhythm;

rhythm(1);
// ---> 1.25rem

rhythm(0.5);
// ---> 0.625rem

rhythm(0.25);
// ---> 0.3125rem

// Use it for React inline styles.
React.createClass({
  render: function() {
    <div style={{margin: rhythm(1)}}>
      Hello world
    </div>
  }
});
```
