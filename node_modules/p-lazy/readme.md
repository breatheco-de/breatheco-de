# p-lazy [![Build Status](https://travis-ci.org/sindresorhus/p-lazy.svg?branch=master)](https://travis-ci.org/sindresorhus/p-lazy)

> Create a lazy promise that defers execution until `.then()` or `.catch()` is called

Useful if you're doing some heavy operations and would like to only do it when the promise is actually used.


## Install

```
$ npm install --save p-lazy
```


## Usage

```js
const PLazy = require('p-lazy');

const lazyPromise = new PLazy(resolve => {
	someHeavyOperation(resolve);
});

// `someHeavyOperation` is not yet called

doSomethingFun.then(() => {
	// `someHeavyOperation` is called
	lazyPromise.then(console.log);
});
```


## API

### new PLazy(executor)

Same as the [`Promise` constructor](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise). `PLazy` is a subclass of `Promise`.

### PLazy.from(fn)

Create a `PLazy` promise from a promise-returning or async function.


## Related

- [p-defer](https://github.com/sindresorhus/p-defer) - Create a deferred promise
- [More…](https://github.com/sindresorhus/promise-fun)


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
