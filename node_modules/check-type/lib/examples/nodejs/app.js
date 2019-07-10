(function() {
    "use strict";

    var check = require("check-type").init(),
        is_check_function;

    is_check_function = check(check).is("function");
    /* jshint devel: true */
    console.log("Is check function available?", is_check_function);
})();