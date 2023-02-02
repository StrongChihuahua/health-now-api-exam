class GeneralError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.statusCode = 500;
    this.errorName = "Internal Server Error";
  }

  getCode() {
    return this.statusCode;
  }
}

module.exports = GeneralError;
