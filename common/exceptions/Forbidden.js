const GeneralError = require("./GeneralError");

class Forbidden extends GeneralError {
  constructor(message) {
    super(message);
    this.statusCode = 403;
    this.errorName = "Forbidden";
  }
  getCode() {
    return this.statusCode;
  }
}

module.exports = Forbidden;
