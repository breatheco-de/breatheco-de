import BaseError from './BaseError';
const scope = 'domElement';
const call = 'addEventListener';
export default {
    missing_event_name: new BaseError("missing_event_name", {
        scope, call,
        why: 'Happens when the event name is empty',
        message: 'The first parameter of the event listener function is empty or null, please fix it.'
    }),
    event_not_string: new BaseError("event_not_string", {
        scope, call,
        why: 'Happens when the event name is different from string',
        message: 'The event name must be a string'
    }),
    weird_event_name: new BaseError("weird_event_name", {
        scope, call,
        why: 'Happens when you listend to very weird event names, your event must be one of the following: https://www.w3schools.com/jsref/dom_obj_event.asp',
        message: 'Your event name is really weird, are you sure you want to listen to that?'
    }),
    missing_handler_function: new BaseError("missing_handler_function", {
        scope, call, 
        why: 'Happens when you miss to pass an event handler function when using addEventListener',
        message: 'Missing event hanlder, check your addEventListener second parameter'
    })
};