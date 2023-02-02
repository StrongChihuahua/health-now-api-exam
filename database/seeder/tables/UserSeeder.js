const pool = require("../../../start/sql").instance;
const data = require("../../data/users");

class UserSeeder {
  static async run() {
    try {
      for (const user of data) {
        await pool
          .promise()
          .query(
            "INSERT INTO users (first_name, last_name, address, post_code, contact_number, email, username, password, admin) VALUES (?,?,?,?,?,?,?,?,?)",
            [
              user.first_name,
              user.last_name,
              user.address,
              user.post_code,
              user.contact_number,
              user.email,
              user.username,
              user.password,
              user.admin,
            ]
          );
      }

      console.log(`${data.length} records has been seeded.`);
      process.exit();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = UserSeeder;
