// Fixture for has function
// Object literals with attributes to test against

var has_attribute_fixture = {
    "hello": {
        "world": {
            "foo": {
                "bar": true
            }
        }
    }
};

if (typeof module !== "undefined") {
    module.exports = has_attribute_fixture;
}

// End of file