const userModel = {
  id: "INT NOT NULL AUTO_INCREMENT",
  first_name: "VARCHAR(255) NOT NULL",
  last_name: "VARCHAR(255) NOT NULL",
  address: "VARCHAR(255) NOT NULL",
  post_code: "VARCHAR(255) NOT NULL",
  contact_number: "VARCHAR(255) NOT NULL",
  email: "VARCHAR(255) NOT NULL",
  username: "VARCHAR(255) NOT NULL UNIQUE",
  password: "VARCHAR(255) NOT NULL",
  admin: "TINYINT(1) NOT NULL",
  "PRIMARY KEY": "(id)",
};

module.exports = userModel;
