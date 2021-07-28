"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keyValueToTypedDataField = exports.inferTypes = void 0;
var text_1 = require("./text");
/** Infer the EIP-712 types for the provided object recursively.
 *
 * @param primaryKey The name of the object. If undefined defaults to 'Message'
 * @param object The object to infer the types from.
 * @param types optional types to append newly inferred types too. (Used internally for recursion).
*/
var inferTypes = function (primaryKey, object, types) {
    if (primaryKey === void 0) { primaryKey = "Message"; }
    types = types || {};
    types[primaryKey] = [];
    var keys = Object.keys(object);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var value = object[key];
        var typedDataField = exports.keyValueToTypedDataField(key, value, types);
        // if type was found add it to the type list
        if (typedDataField === null)
            continue;
        types[primaryKey].push(typedDataField);
    }
    return types;
};
exports.inferTypes = inferTypes;
/** convert key value pair into EIP-712 TypedDataField.
 * @param types optional type map to support arrays and nested objects, which require multiple types. Used by infertypes.
 */
var keyValueToTypedDataField = function (key, value, types) {
    var type = (typeof value);
    // if undefined or unsupported type
    if (type === "undefined" || type === "function" || type === "symbol" || value === undefined) {
        return null;
    }
    // if address
    else if (type === "string" && text_1.isEthereumAddress(value)) {
        type = "address";
    }
    // if bigint
    else if (type === "bigint") {
        type = "int256";
        if (value > 0)
            type = "uint256";
    }
    // big num 
    else if (type === "string" && value.length > 0 && text_1.isBigNumber(value)) {
        type = "uint256";
        if (value[0] == "-")
            type = "int256";
    }
    // if number
    else if (type === "number") {
        type = "string";
        if (value % 1 == 0)
            type = "int32";
        // TODO: handle numbers better
    }
    // if boolean
    else if (type === "boolean") {
        type = "bool";
    }
    // if is an object or array
    else if (type === "object") {
        if (Array.isArray(value) && value.length > 0) {
            // TODO: ensure all elements in array are of the same type
            var elem = exports.keyValueToTypedDataField(key, value[0], types);
            type = elem.type + "[]";
        }
        else {
            exports.inferTypes(text_1.capitalize(key), value, types);
            type = text_1.capitalize(key);
        }
    }
    return { name: key, type: type };
};
exports.keyValueToTypedDataField = keyValueToTypedDataField;
