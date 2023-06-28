const { ValidationError } = require("yup");
const httpSettings = require("../utils/httpSettings");

const ErrorHandler = (error, res) => {
  var statusCode = httpSettings.codes.InternalServerError;
  var message = error?.message;

  if (error instanceof ValidationError) {
    statusCode = httpSettings.codes.BadRequest;
    message = error?.errors;
  }

  res.status(statusCode).json({
    error: {
      statusCode,
      message
    }
  });
};

module.exports = ErrorHandler;