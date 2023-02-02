module.exports = (errType, message = "Error") => {
  const Error = require(`./${errType}`);
  return new Error(message);
};
