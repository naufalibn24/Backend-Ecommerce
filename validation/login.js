const Validator = require('validator')
const ifEmpty = require('./if-empty')

module.exports = function validateLogin(data) {
    let errors = {};

    data.email = !ifEmpty(data.email) ? data.email : ''
    data.password = !ifEmpty(data.password) ? data.password : ''

    if (!Validator.isLength(data.email)) {
        errors.email = "Email is invalid"
    }
    if (!Validator.isLength(data.password, { min: 6, max: 10 })) {
        errors.password = "password must be at least 6-10 characters"
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    return {
        errors,
        isValid: ifEmpty(errors)
    };
}