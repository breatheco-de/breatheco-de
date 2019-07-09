/* globals document */
(function() {
    "use strict";

    define([ "check-type" ], function(check) {

        var is_check_function_available,
            is_check_function_global,
            results_el;

        check.init();

        is_check_function_available = check(check).is("function");
        is_check_function_global = check(window.check).is("function");

        results_el = document.getElementById("results");
        results_el.innerHTML = ""; // Clear holding text
        results_el.innerHTML = results_el.innerHTML + "<p>Is check function available? <b>" + is_check_function_available + "</b></p>";
        results_el.innerHTML = results_el.innerHTML + "<p>Is check function global?    <b>" + is_check_function_global + "</b></p>";
    });

})();