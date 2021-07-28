"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBigNumber = exports.isEthereumAddress = exports.capitalize = void 0;
var capitalize = function (s) {
    return "" + s[0].toUpperCase() + s.slice(1);
};
exports.capitalize = capitalize;
var isEthereumAddress = function (s) {
    return /^0x[a-fA-F0-9]{40}$/.test(s);
};
exports.isEthereumAddress = isEthereumAddress;
var isBigNumber = function (s) {
    return /^[-+]?[1-9]\d*$/.test(s);
};
exports.isBigNumber = isBigNumber;
