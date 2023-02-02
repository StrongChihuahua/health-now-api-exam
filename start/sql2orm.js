// const { createPool } = require("mysql");
const { Sequelize, DataTypes } = require("sequelize");

class MySql {
  constructor() {
    this.instance = null;
  }

  static init() {
    try {
      const sequelize = new Sequelize(
        process.env.SQL_DB_NAME,
        process.env.SQL_DB_USER,
        process.env.SQL_DB_PASSWORD,
        {
          host: process.env.SQL_DB_HOST,
          port: process.env.SQL_DB_PORT,
          dialect: "mysql",
        }
      );

      sequelize
        .authenticate()
        .then(() => {
          console.log("Connected to MySQL DB");
        })
        .catch((err) => {
          console.log(`Connection Error: ${err}`);
        });

      this.instance = sequelize;
    } catch (error) {
      console.log(error);
    }
  }

  static getSqlConnection() {
    return this.instance;
  }
}

module.exports = MySql;
