const GeneralError = require("./GeneralError");

class BadRequest extends GeneralError {
  constructor(message) {
    super(message);
    this.statusCode = 400;
    this.errorName = "BadRequest";
  }
  getCode() {
    return this.statusCode;
  }
}

module.exports = BadRequest;
