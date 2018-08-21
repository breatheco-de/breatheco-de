import BaseError from './BaseError';
const scope = 'document';
const call = 'querySelector';

//errors
export default {
    missing_selector: new BaseError("missing_selector", {
        scope, call,
        why: 'Happends when the selector is equal to null or not set',
        message: 'You need to specify a CSS Selector for the element that you want to retrieve from the DOM'
    }),
    invalid_selector: new BaseError("invalid_selector",{
        scope, call,
        why: "This errors happens when the given CSS selector is not a string",
        message: 'The first parameter (the selector) must be a string'
    }),
    element_not_found: new BaseError("element_not_found",{
        scope, call,
        why: "This errors happens when the give CSS selector didn't match with any DOM element on the website",
        message: 'DOM element not found, are you sure you are using the proper CSS selector?'
    })
};