export const errorHandler = (statusCode, message, errorMsg) => {
  const error = new Error();
  error.statusCode = statusCode;
  if (errorMsg) {
    error.errorMessage = message;
  }
  error.message = message;
  return error;
};
