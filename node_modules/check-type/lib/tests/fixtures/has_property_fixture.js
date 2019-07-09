// Fixture for has function
// Functions with properties to test against

var has_property_fixture = function(){};

has_property_fixture.hello = function(){};
has_property_fixture.hello.world = function(){};
has_property_fixture.hello.world.foo = function(){};
has_property_fixture.hello.world.foo.bar = true;

if (typeof module !== "undefined") {
    module.exports = has_property_fixture;
}

// End of file