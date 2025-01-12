"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
class CryptoUtils {
}
_a = CryptoUtils;
CryptoUtils.getHash = async (toBeHashed = '', salt) => {
    if (!toBeHashed)
        return '';
    return await bcrypt.hash(toBeHashed, salt);
};
exports.default = CryptoUtils;
//# sourceMappingURL=crypto.utils.js.map