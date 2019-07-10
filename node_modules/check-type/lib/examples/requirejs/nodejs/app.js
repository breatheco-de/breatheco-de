(function() {
    "use strict";

    // Start require
    var requirejs = require("requirejs");

    requirejs.config({
        nodeRequire: require,
        baseUrl: __dirname
    });

    requirejs([ "check-type" ], function(check) {
        var is_check_function;

        check.init();

        is_check_function = check(check).is("function");
        /* jshint devel: true */
        console.log("Is check function available?", is_check_function);
    });

})();
