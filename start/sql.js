const { createPool, createConnection } = require("mysql2");

class MySql {
  constructor() {
    this.instance = null;
  }

  static init() {
    try {
      const pool = createPool({
        port: process.env.SQL_DB_PORT,
        host: process.env.SQL_DB_HOST,
        user: process.env.SQL_DB_USER,
        password: process.env.SQL_DB_PASSWORD,
        database: process.env.SQL_DB_NAME,
        connectionLimit: 100,
      });

      pool.getConnection((err, connection) => {
        if (err) throw err;

        console.log("Connected to MySQL");
      });

      // const pool = createConnection({
      //   port: process.env.SQL_DB_PORT,
      //   host: process.env.SQL_DB_HOST,
      //   user: process.env.SQL_DB_USER,
      //   password: process.env.SQL_DB_PASSWORD,
      //   database: process.env.SQL_DB_NAME,
      //   connectionLimit: 100,
      // });

      // pool.connect((err, connect) => {
      //   if (err) throw err;

      //   console.log("Connected to MySQL");
      // });

      this.instance = pool;
    } catch (error) {
      console.log(error);
    }
  }

  static getSqlPoolConnection() {
    return this.instance;
  }
}

module.exports = MySql;
