'use strict';

class PLazy extends Promise {
	constructor(executor) {
		super(resolve => {
			resolve();
		});

		this._executor = executor;
		this._promise = null;
	}
	static from(fn) {
		return new PLazy(resolve => {
			resolve(fn());
		});
	}
	then(onFulfilled, onRejected) {
		this._promise = this._promise || new Promise(this._executor);
		return this._promise.then(onFulfilled, onRejected);
	}
	catch(onRejected) {
		this._promise = this._promise || new Promise(this._executor);
		return this._promise.catch(onRejected);
	}
}

module.exports = PLazy;
