"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EIP712Message = void 0;
var infer_types_1 = require("./infer-types");
var EIP712Message = /** @class */ (function () {
    function EIP712Message(message, types, domain) {
        this.message = message;
        this.types = types || infer_types_1.inferTypes("Message", message);
        this.domain = domain || {};
    }
    EIP712Message.prototype.sign = function (signer) {
        return signer._signTypedData(this.domain, this.types, this.message);
    };
    return EIP712Message;
}());
exports.EIP712Message = EIP712Message;
