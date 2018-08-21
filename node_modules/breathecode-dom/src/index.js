import Err from './errors';
import {validEvents} from './errors/data';
/**
 * Query Selector
 */
if(document.querySelector) {
    let _querySelector = document.querySelector;
	document.querySelector = function(selector=null) {
        if(!selector) throw Err.querySelector.missing_selector.toConsole();
        if(typeof selector != 'string') throw Err.querySelector.invalid_selector.toConsole();
        var elm = _querySelector.apply(this, [selector]);
        if(!elm) throw Err.querySelector.element_not_found.toConsole();
        return elm;
	};
}

/**
 * Query Selector
 */
if(!window.onload || typeof window.onload == 'undefined'){
    setTimeout(() => {
        if(!window.onload || typeof window.onload == 'undefined')
            throw Err.window.missing_onload.toConsole();
    },1000);
}

/**
 * AddEventListener
 */
var f = EventTarget.prototype.addEventListener;
EventTarget.prototype.addEventListener = function(type=null, fn=null, capture) {
	if(!type) throw Err.addEventListener.missing_event_name.toConsole();
	if(typeof type != 'string') throw Err.addEventListener.event_not_string.toConsole();
    if(validEvents.indexOf(type) == -1) throw Err.addEventListener.weird_event_name.toConsole();
    if(typeof fn == 'undefined' || !fn) throw Err.addEventListener.missing_handler_function.toConsole();
    
    this.f = f;
    this.f(type, fn, capture);
    alert('Added Event Listener: on' + type);
}