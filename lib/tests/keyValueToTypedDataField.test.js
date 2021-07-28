"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var infer_types_1 = require("../infer-types");
test("keyValueToTypedDataField with string value", function () {
    var key1 = "example", value1 = "Hello world";
    var type1 = infer_types_1.keyValueToTypedDataField(key1, value1);
    expect(type1).not.toBeNull();
    expect(type1.name).toBe(key1);
    expect(type1.type).toBe("string");
});
test("keyValueToTypedDataField with number value", function () {
    var key1 = "example", value1 = 1;
    var type1 = infer_types_1.keyValueToTypedDataField(key1, value1);
    expect(type1).not.toBeNull();
    expect(type1.name).toBe(key1);
    expect(type1.type).toBe("int32");
});
test("keyValueToTypedDataField with BigNumber value", function () {
    var key1 = "example", value1 = "99999999999999999999999999";
    var type1 = infer_types_1.keyValueToTypedDataField(key1, value1);
    expect(type1).not.toBeNull();
    expect(type1.name).toBe(key1);
    expect(type1.type).toBe("uint256");
});
test("keyValueToTypedDataField with address value", function () {
    var key1 = "example", value1 = "0x0000000000000000000000000000000000000000";
    var type1 = infer_types_1.keyValueToTypedDataField(key1, value1);
    expect(type1).not.toBeNull();
    expect(type1.name).toBe(key1);
    expect(type1.type).toBe("address");
});
test("keyValueToTypedDataField with bool value", function () {
    var key1 = "example", value1 = true;
    var type1 = infer_types_1.keyValueToTypedDataField(key1, value1);
    expect(type1).not.toBeNull();
    expect(type1.name).toBe(key1);
    expect(type1.type).toBe("bool");
});
test("keyValueToTypedDataField with object value", function () {
    var key1 = "example", value1 = { "msg": "hello world" };
    var type1 = infer_types_1.keyValueToTypedDataField(key1, value1);
    expect(type1).not.toBeNull();
    expect(type1.name).toBe(key1);
    expect(type1.type).toBe("Example");
});
test("keyValueToTypedDataField with array value", function () {
    var key1 = "example", value1 = [0, 1, 2, 3, 4, 5];
    var type1 = infer_types_1.keyValueToTypedDataField(key1, value1);
    expect(type1).not.toBeNull();
    expect(type1.name).toBe(key1);
    expect(type1.type).toBe("int32[]");
});
