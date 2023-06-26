const yup = require('yup');

const registerUserSchema = yup.object({
  name: yup.string()
    .trim()
    .required('Name is required'),
  email: yup.string()
    .trim()
    .email()
    .required('Email is required'),
  password: yup.string()
    .trim()
    .required('Password is required')
});

module.exports = registerUserSchema;