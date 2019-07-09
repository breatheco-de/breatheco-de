# gray-percentage
Convenience function to get a gray value by percentage e.g. gray(60) ->
"hsla(0,0%,100%, 0.4)"

The function takes a required "lightness" value from 0-100 and an
optional second parameter to mixin color to the gray value. The second
parameter can either be a "hue" value from 0-360 or one of three named
hues, "cool", "slate", and "warm".

As suggested by [Google Material
Design](https://material.google.com/style/color.html#color-text-background-colors)
we color lightness using opacity instead of gray values. Quoting Google:
"Black or white text that is transparent remains legible and vibrant
against background color changes. This makes it more flexible than grey
text in the same contexts."

We assume when picking the opacity/lightness that the background is
light. If, for example, you have dark background with light text, set
the third paramter, `darkBackground` to true e.g. `gray(80, 0, true)`.

We use color theory to choose an appropriate saturation value. Basically
the darker the gray, the higher the saturation value that is choosen.
This article was very helpful in picking appropriate saturation values
http://ianstormtaylor.com/design-tip-never-use-black/

The following is the curve that choose saturation values and is used
[here in the code](https://github.com/KyleAMathews/gray-percentage/blob/239cc2d4e972b778f23f26c3b677f91e9487c803/index.js#L37-L42).

![screen shot 2016-06-08 at 10 08 11 am](https://cloud.githubusercontent.com/assets/71047/15903355/2ce29a6c-2d61-11e6-9f17-d273e8e76e10.png)

## Install
`npm install gray-percentage`

## Usage

```javascript
var gray = require('gray-percentage');

var textColor = gray(30);
// textColor = "hsla(0,0%,100%,0.7)"

// Get a "cool" gray.
var background = gray(93, "cool")
// background = "hsla(237,0.9935851860000025%,100%,0.07)"

// Mixin arbitrary hues e.g. Red.
var sidebarBg = gray(15, 360)
// sidebarBg = "hsla(360,14.84301465%,100%,0.85)"

// Get color for dark background
var lightGray = gray(85, 0, true)
// lightGray = "hsla(0, 0%, 100%, 0.85)"
```
