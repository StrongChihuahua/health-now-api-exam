const GeneralError = require("./GeneralError");

class Conflict extends GeneralError {
  constructor(message) {
    super(message);
    this.statusCode = 409;
    this.errorName = "Conflict";
  }
  getCode() {
    return this.statusCode;
  }
}

module.exports = Conflict;
