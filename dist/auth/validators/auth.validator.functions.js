"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePassword = exports.validateIpAddress = exports.validateBirthday = exports.validatePhoneNumber = exports.validateEmail = void 0;
const validateEmail = (email) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
};
exports.validateEmail = validateEmail;
const validatePhoneNumber = (phone) => {
    if (!phone)
        return true;
    const phoneRegex = /^[0-9]{10,15}$/;
    return phoneRegex.test(phone);
};
exports.validatePhoneNumber = validatePhoneNumber;
const validateBirthday = (date) => {
    if (!date)
        return true;
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(date);
};
exports.validateBirthday = validateBirthday;
const validateIpAddress = (ip) => {
    if (!ip)
        return true;
    const ipRegex = /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2})(\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2})){3}$/;
    return ipRegex.test(ip);
};
exports.validateIpAddress = validateIpAddress;
const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};
exports.validatePassword = validatePassword;
//# sourceMappingURL=auth.validator.functions.js.map