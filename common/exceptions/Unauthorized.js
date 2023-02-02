const GeneralError = require("./GeneralError");

class Unauthorized extends GeneralError {
  constructor(message) {
    super(message);
    this.statusCode = 401;
    this.errorName = "Unauthorized";
  }
  getCode() {
    return this.statusCode;
  }
}

module.exports = Unauthorized;
