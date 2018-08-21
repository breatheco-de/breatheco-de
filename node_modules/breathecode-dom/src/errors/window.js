import BaseError from './BaseError';
const scope = 'window';
const call = 'onload';
export default {
    missing_onload: new BaseError("missing_onload", {
        scope, call,
        why: 'Happens when window.onload == to undefined or null',
        message: 'Every program written in Vanilla JS must start on the window.onload function and it seems that you have not declared or set any function to it'
    })
};