"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var infer_types_1 = require("../infer-types");
test("inferTypes on simple object", function () {
    var primaryKey = "Message";
    var object = { msg: "Hello world" };
    var types = infer_types_1.inferTypes(primaryKey, object);
    expect(types[primaryKey]).not.toBeNull();
    expect(types[primaryKey][0]).not.toBeNull();
    expect(types[primaryKey][0].name).toBe("msg");
    expect(types[primaryKey][0].type).toBe("string");
});
test("inferTypes on simple object with array", function () {
    var primaryKey = "Message";
    var object = { msg: "Hello world", arr: [1, 2, 3, 4, 5] };
    var types = infer_types_1.inferTypes(primaryKey, object);
    expect(types[primaryKey]).not.toBeNull();
    expect(types[primaryKey].length).toBe(2);
    expect(types[primaryKey][1].name).toBe("arr");
    expect(types[primaryKey][1].type).toBe("int32[]");
});
test("inferTypes on simple object with nested object", function () {
    var primaryKey = "Message";
    var nestedObject = { foo: "bar" };
    var object = { msg: "Hello world", nested: nestedObject };
    var types = infer_types_1.inferTypes(primaryKey, object);
    expect(types[primaryKey]).not.toBeNull();
    expect(types[primaryKey].length).toBe(2);
    expect(types["Nested"].length).toBe(1);
    expect(types["Nested"][0].name).toBe("foo");
    expect(types["Nested"][0].type).toBe("string");
});
