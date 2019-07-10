/*
 * Grunt file
 *
 * - Run JSHint
 * - Run Mocha tests
 *
 * @author Alistair Brown <github@alistairjcbrown.com>
 */

module.exports = function(grunt) {
    "use strict";

    var generate_path_matches = function(extension) {
        var base = [
            "./*{extension}",
            "./**/*{extension}",
            "!./*.min{extension}",
            "!./node_modules/**/*{extension}",
            "!./**/node_modules/**/*{extension}",
            "!./bower_components/**/*{extension}",
            "!./**/bower_components/**/*{extension}",
            "!./components/**/*{extension}",
            "!./**/components/**/*{extension}",
            "!./.git/"
        ];

        base.forEach(function(element, index, array) {
            array[index] = element.replace("{extension}", extension);
        });

        return base;
    },
    jshint, mocha_nodejs, mocha_browser, test_tasks,
    check_meta, sync_meta, generate_toc, uglify, keybase_dir;

    // ------

    // Strict JSHint rules
    jshint = {
        "all": generate_path_matches(".js"),
        "options": {
            "curly":      true,
            "devel":      false,
            "eqeqeq":     true,
            "eqnull":     true,
            "expr":       true,
            "immed":      true,
            "indent":     4,
            "latedef":    true,
            "maxdepth":   3,
            "maxlen":     140,
            "maxparams":  10,
            "newcap":     true,
            "noarg":      true,
            "noempty":    true,
            "quotmark":   "double",
            "strict":     true,
            "trailing":   true,
            "undef":      true,
            "unused":     true,
            "globals": {
                "_":         true,
                "define":    true,
                "module":    true,
                "require":   true,
                "suite":     true,
                "test":      true,
                "setup":     true,
                "teardown":  true,
                "window":    true,
                "process":   true,
                "__dirname": true
            }
        }
    },

    // Run mocha tests in node
    mocha_nodejs = {
        "test": {
            "src": generate_path_matches(".test.js"),
            "options": {
                "reporter": "spec",
                "ui":       "tdd"
            }
        }
    },

    // Run mocha tests in browser
    mocha_browser = {
        "test": {
            "src": generate_path_matches(".test.html"),
            "options": {
                "reporter": "Spec",
                "ui":       "tdd",
                "log":      true,
                "run":      true
            }
        }
    };

    // Check all properties are correct in the package.json file
    check_meta = {
        "all": {
            "options": {
                // make sure package.json ends with \n\n, default false
                "blankLine": true,
                "version": function (value) {
                    // strict version number validation
                    return (/\d{1,2}\.\d{1,2}\.\d{1,2}/).test(value);
                }
            }
        }
    };

    // Sync all shared properties between meta files
    sync_meta = {
        bower: {
            src: "package.json",
            dest: "bower.json",
            fields: [
                "name",
                "description",
                "version",
                "author",
                "bugs",
                "contributors",
                "dependencies",
                "homepage",
                "keywords",
                "license",
                "main",
                "repository"
            ]
        },
        component: {
            src: "package.json",
            dest: "component.json",
            fields: [
                "name",
                "description",
                "version",
                "author",
                "bugs",
                "contributors",
                "homepage",
                "keywords",
                "license",
                "main"
            ]
        }
    };

    // Generate markdown table of contents
    generate_toc = {
        "options": {
            "heading": "## Table of Contents\n\n"
        },
        "readme": {
            "files": {
                "toc.md": ["README.md"]
            }
        }
    };

    // Minify and uglify the code
    uglify = {
        options: {
            mangle: {
                except: [ "_" ]
            },
            compress: {
                drop_console: true
            },
            banner: "/*! <%= pkg.name %>@v<%= pkg.version %> - " +
                    "<%= grunt.template.today(\"yyyy-mm-dd\") %> */\n"
        },
        my_target: {
            files: {
                "check-type.min.js": [ "lib/check-type.js" ]
            }
        }
    };

    keybase_dir = {
        verify: {},
        sign: {}
    };

    grunt.initConfig({
        "pkg":          grunt.file.readJSON("package.json"),
        "jshint":       jshint,
        "mochaTest":    mocha_nodejs,
        "mocha":        mocha_browser,
        "nice-package": check_meta,
        "update_json":  sync_meta,
        "toc":          generate_toc,
        "uglify":       uglify,
        "keybase_dir":  keybase_dir
    });

    // Load Tasks
    require("load-grunt-tasks")(grunt);

    // Allow flag after test
    test_tasks = [ "mochaTest", "mocha" ];
    if (process.argv[2] === "test") {
        if (grunt.option("nodejs")) {
            test_tasks = [ test_tasks[0] ];
        } else if (grunt.option("browser")) {
            test_tasks = [ test_tasks[1] ];
        }
    }

    // Define tasks
    grunt.registerTask("lint",    [ "jshint" ]);
    grunt.registerTask("verify",  [ "keybase_dir:verify" ]);
    grunt.registerTask("test",      test_tasks);
    grunt.registerTask("go",      [ "lint", "verify", "test" ]);
    grunt.registerTask("build",   [ "lint", "nice-package", "update_json", "uglify", "test", "toc", "keybase_dir:sign" ]);
    grunt.registerTask("default", [ "go" ]);

};

// End of file
