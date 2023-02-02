const bcrypt = require("bcryptjs");

module.exports = {
  hashString: (string) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(string, salt);
  },

  compareString: (string, hashedString) => {
    return bcrypt.compareSync(string, hashedString);
  },
};
