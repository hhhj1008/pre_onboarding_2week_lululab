const throwErrorMsg = (msg) => {
  const error = new Error({ message: msg}.message);
  error.statusCode = 400;
  throw error;
}

module.exports = { throwErrorMsg }