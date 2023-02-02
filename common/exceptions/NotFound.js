const GeneralError = require("./GeneralError");

class NotFound extends GeneralError {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    this.errorName = "NotFound";
  }
  getCode() {
    return this.statusCode;
  }
}

module.exports = NotFound;
