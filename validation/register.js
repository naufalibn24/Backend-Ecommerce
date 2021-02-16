const Validator = require("validator");
const ifEmpty = require("./if-empty");

module.exports = function validateRegister(data) {
  let errors = {};

  data.username = !ifEmpty(data.username) ? data.username : "";
  data.password = !ifEmpty(data.password) ? data.password : "";
  data.email = !ifEmpty(data.email) ? data.email : "";
  data.first_name = !ifEmpty(data.first_name) ? data.first_name : "";
  data.last_name = !ifEmpty(data.last_name) ? data.last_name : "";
  data.Age = !ifEmpty(data.Age) ? data.Age : "";

  if (!Validator.isLength(data.username, { min: 6, max: 10 })) {
    errors.username = "username must be at least 6-10 characters";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 10 })) {
    errors.password = "password must be at least 6-10 characters";
  }
  if (!Validator.isLength(data.email)) {
    errors.email = "Email is invalid";
  }
  if (!Validator.isLength(data.first_name, { min: 2, max: 20 })) {
    errors.first_name = "First name must be at least 2-20 characters";
  }
  if (!Validator.isLength(data.last_name, { min: 2, max: 20 })) {
    errors.last_name = "Last name must be at least 2-20 characters";
  }
  if (!Validator.isNumeric(data.Age, { min: 17, max: 100 })) {
    errors.username = "Age must be 17 or older";
  }
  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }
  if (Validator.isEmpty(data.first_name)) {
    errors.first_name = "First name is required";
  }
  if (Validator.isEmpty(data.last_name)) {
    errors.last_name = "Last name is required";
  }
  if (Validator.isEmpty(data.Age)) {
    errors.Age = "Age field is required";
  }
  return {
    errors,
    isValid: ifEmpty(errors),
  };
};
