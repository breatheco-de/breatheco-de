# Check Type

[![Build Status](https://travis-ci.org/alistairjcbrown/check-type.svg?branch=master)](https://travis-ci.org/alistairjcbrown/check-type)
[![GitHub version](https://badge.fury.io/gh/alistairjcbrown%2Fcheck-type.svg)](http://badge.fury.io/gh/alistairjcbrown%2Fcheck-type)
[![Dependency Status](https://david-dm.org/alistairjcbrown/check-type.svg?theme=shields.io)](https://david-dm.org/alistairjcbrown/check-type)
[![devDependency Status](https://david-dm.org/alistairjcbrown/check-type/dev-status.svg?theme=shields.io)](https://david-dm.org/alistairjcbrown/check-type#info=devDependencies)

A type checking framework for Javascript.

Check type lets you check variable types and structures with the format `check(x).is("y")` and `check(x).has("a.b")`


---

## Table of Contents

  * [Dependencies](#dependencies)
  * [Installation](#installation)
    * [Node.js](#nodejs)
    * [Bower](#bower)
    * [Component](#component)
    * [Manual](#manual)
  * [Use](#use)
    * [Node.js](#nodejs)
    * [Browser](#browser)
    * [RequireJS](#requirejs)
  * [Testing](#testing)
    * [Test in Node.js](#test-in-nodejs)
    * [Test in Browser](#test-in-browser)
  * [No Conflict](#no-conflict)
  * [Init](#init)
    * [Simple use](#simple-use)
    * [More complex use](#more-complex-use)
  * [Clear](#clear)
  * [Type checking](#type-checking)
    * [Example: Checking for string using `is`](#example-checking-for-string-using-is)
    * [Example: Checking for string using `is.not`](#example-checking-for-string-using-isnot)
  * [Object path checking](#object-path-checking)
    * [Example: Checking object path using `has`](#example-checking-object-path-using-has)
  * [Object structure checking](#object-structure-checking)
    * [Example: Checking object properties using `matches`](#example-checking-object-properties-using-matches)
  * [Complex example](#complex-example)
      * [Set up `check-type`](#set-up-check-type)
      * [Retrieve username and password from authentication request](#retrieve-username-and-password-from-authentication-request)
  * [Contact](#contact)

---


## Dependencies

 * [Underscore.js](http://underscorejs.org/).



## Installation

### Node.js

`check-type` is available through the [npm package manager](https://npmjs.org/package/check-type).

[![NPM version](https://badge.fury.io/js/check-type.svg)](http://badge.fury.io/js/check-type)

For Node.js package management, you can install [using npm](https://www.npmjs.org/).

```
npm install check-type
```

### Bower

`check-type` is available through the [bower package manager](http://bower.io/search/?q=check-type).

[![Bower version](https://badge.fury.io/bo/check-type.svg)](http://badge.fury.io/bo/check-type)

For front-end package management, you can install [using Bower](http://bower.io/).

```
bower install check-type
```

### Component

`check-type` is available through the [component package manager](http://component.io/alistairjcbrown/check-type).

For package management, you can install [using Component](https://github.com/component/component#installation).

```
component install alistairjcbrown/check-type
```

### Manual

For manual management, you can grab the Javascript file directly or clone the git repository.
You will need to grab `underscore.js` as well.

```
# Grab the file
wget https://raw.githubusercontent.com/alistairjcbrown/check-type/master/check-type.min.js

# Clone the repo
git clone git@github.com:alistairjcbrown/check-type.git
```


## Use

### Node.js

```js
var check = require("check-type").init();
```

The module can be required using Node.js built in `require` ([See example](lib/examples/nodejs)).


### Browser

```html
<script src="/path/to/underscore"></script>
<script src="/path/to/check-type/check-type.min.js"></script>
<script>
    check.init();
</script>
```

The module can be used in the browser through the `<script>` tag and will bind to `window` ([See example](lib/examples/browser)).


### RequireJS

The module supports the AMD format and uses `define` if available. Therefore it can be used as a RequireJS module ([See Browser example](lib/examples/requirejs/browser), [See Node.js example](lib/examples/requirejs/nodejs)).

```js
define([ "check-type" ], function(check) {
    check.init();
});
```


## Testing

Built in tests and linting using [Grunt](http://gruntjs.com/) to call [JSHint](http://www.jshint.com/about/) and [Mocha](http://visionmedia.github.io/mocha/).

Get all of the developer dependecies by running:

```
npm install           # install dev dependencies
```

### Test in Node.js

```
grunt lint            # Lint the code with JSHint
grunt test --nodejs   # Run all tests in node.js
grunt test --browser  # Run all tests in phantomjs
grunt test            # Run all tests in both environments
grunt go              # Run everything above
```

### Test in Browser

Open `lib/test/check-type.test.html` in browser



## No Conflict

To prevent conlicts with other libraries using `window.check`, if `check-type` binds to `window` it will also provide a `check.noConflict` function to restore the variable to its previous value.

`check-type` will only bind to `window` in the browser environment when RequireJS is not available.


## Init

`check-type` does not come with type checking functionality. Instead, it simply provides the `check` interface. Type checking functions should be  provided when calling `check.init`.

`check.init` can be called without parameters which will use the type checking functions from [Underscore.js](http://underscorejs.org/).

`check.init` can be called multiple times and will add type checking functions which have not already been defined.
To override a previously defined type checking function, pass boolean `true` as the second parameter.

### Simple use

```js
var check = require("check-type").init();
```

### More complex use

```js
var check = require("check-type"),
    custom_functions = {
        "isEmail": function(value) {
            return value.indexOf("@") !== -1
        },
        "isEmpty": function(value) {
            return value === "empty";
        }
    },

// Initialise check with underscore type checking functions
//  and custom checking functions, overriding underscore's isEmpty function
check.init()
     .init(custom_functions, true);
```

## Clear

This clears all of the internal stored type checking functions.

```js
check.clear();
```


## Type checking

Once the `check` function has been initialised, it can utilise any defined type checking functions using `is`.

### Example: Checking for string using `is`

```js
var my_string = "hello world";
check.init();

check(my_string).is("string"); // true
check(my_string).is("number"); // false

check(my_string).is("foo");    // throws Error for unsupported type
```

You can also negate the check with `is.not`

### Example: Checking for string using `is.not`

```js
var my_string = "hello world";
check.init();

check(my_string).is.not("string"); // false
check(my_string).is.not("number"); // true

check(my_string).is.not("foo");    // throws Error for unsupported type
```


## Object path checking

`check-type` can check for the presence of values within an object under a particular path.

### Example: Checking object path using `has`

```js
var my_object = {
    hello: {
        world: false
    }
};

check(my_object).has("hello.world"); // true
check(my_object).has("foo.bar");     // false
```


## Object structure checking

`check-type` can check an object properties for specific types

### Example: Checking object properties using `matches`

```js
var my_object = {
    "customer_number": 123456789,
    "password":        "abc123"
};

check(my_object).matches({
    "customer_number": "number",
    "password":        "string"
});
// true

check(my_object).matches({
    "username": "string",
    "password": "string"
});
// false
```


## Complex example

The functionality of `check` can be used in combination, for example when validating response data.

See the example below as a [jsfiddle](http://jsfiddle.net/alistairjcbrown/B9AHu/).

#### Set up `check-type`

```js
var custom_types = {};

custom_types.isUsername = function(value) {
    return /^\w+$/.test(value);
};

custom_types.isAuthObject = function(value) {
    return check(value).matches({
        "username": "username",
        "password": "string"
    });
};

// Initialise with underscorejs functions
check.init();

// Add custom functions too
check.init(custom_types);
```

#### Retrieve username and password from authentication request

```js
function handleAuthentication(request) {
    var username, password;

    if (check(request).has("auth") &&
        check(request.auth).is("AuthObject")) {

        username = request.auth.username;
        password = request.auth.password;

        return {
            username: username,
            password: password
        };

    }

    return false;
}
```

## Contact

Twitter [@alistairjcbrown](http://twitter.com/alistairjcbrown)

Code signed using [keybase](SIGNED.md) as [alistairjcbrown](https://keybase.io/alistairjcbrown). Verify with `keybase dir verify`