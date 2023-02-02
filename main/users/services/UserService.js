// libraries
const jwt = require("jsonwebtoken");

// jwt_secret_key
const jwtSecretKey = process.env.jwt_secret_key;

// Exception
const FactoryException = require("../../../common/exceptions/FactoryException");

// Utility
const Utility = require("../../../common/utilities")["bcrypt"];

class UserServices {
  static async login({ username, password }, req) {
    const { pool } = req;

    //* check user
    const [user] = await pool
      .promise()
      .query(`SELECT * FROM users WHERE username='${username}'`);

    if (!user.length)
      throw FactoryException("Unauthorized", "Invalid Credentials");

    const [{ password: user_password = "", ...others }] = user;

    //* Check password
    const isMatch = Utility.compareString(password, user_password);

    if (!isMatch) throw FactoryException("Unauthorized", "Invalid Credentials");

    const token = jwt.sign(
      {
        id: others.id,
        usename: others.username,
        email: others.email,
        first_name: others.first_name,
        last_name: others.last_name,
        admin: others.admin === 1,
      },
      jwtSecretKey
    );

    return {
      id: others.id,
      usename: others.username,
      email: others.email,
      access_token: token,
    };
  }

  static async create({ data }, req) {
    const { pool, user_payload } = req;

    //* check if admin
    if (!user_payload.admin)
      throw FactoryException("Forbidden", "User doesn't have admin access");

    const { username, password, admin = false, ...others } = data;

    const [existing_user] = await pool
      .promise()
      .query(`SELECT username, id FROM users WHERE username='${username}'`);

    if (existing_user.length)
      throw FactoryException("BadRequest", "Username is already existed!");

    data.password = Utility.hashString(password);
    data.admin = admin ? 1 : 0;

    const [created_user] = await pool
      .promise()
      .query(
        "INSERT INTO users (first_name, last_name, address, post_code, contact_number, email, username, password, admin) VALUES (?,?,?,?,?,?,?,?,?)",
        [
          data.first_name,
          data.last_name,
          data.address,
          data.post_code,
          data.contact_number,
          data.email,
          data.username,
          data.password,
          data.admin,
        ]
      );

    return { id: created_user.insertId };
  }

  static async editUser({ data, id }, req) {
    const { pool, user_payload } = req;

    //* check if admin
    if (!user_payload.admin)
      throw FactoryException("Forbidden", "User doesn't have admin access");

    const [user] = await pool
      .promise()
      .query(`SELECT * FROM users WHERE id='${id}'`);

    if (!user.length) throw FactoryException("NotFound", "User Not found");

    const [_user = {}] = user;
    const valid_fields = Object.keys(_user);
    const sanitized_data = {};

    for (const field of Object.keys(data)) {
      if (valid_fields.includes(field)) {
        if (field === "password") data[field] = Utility.hashString(data[field]);

        sanitized_data[field] = data[field];
      }
    }

    const dynamic_query = [];
    for (const d in sanitized_data) {
      dynamic_query.push(`${d} = '${sanitized_data[d]}'`);
    }

    const query = `UPDATE users SET ${dynamic_query.join()} WHERE id='${id}'`;

    await pool.promise().query(query);
  }

  static async deleteUser({ id }, req) {
    const { pool, user_payload } = req;
    //* check if admin
    if (!user_payload.admin)
      throw FactoryException("Forbidden", "User doesn't have admin access");

    const [user] = await pool
      .promise()
      .query(`SELECT * FROM users WHERE id='${id}'`);

    if (!user.length) throw FactoryException("NotFound", "User Not found");

    await pool.promise().query(`DELETE FROM users WHERE id='${id}'`);
  }

  static async viewUsers(req) {
    const { pool, user_payload } = req;
    //* check if admin
    if (!user_payload.admin)
      throw FactoryException("Forbidden", "User doesn't have admin access");

    const [users] = await pool
      .promise()
      .query(
        "SELECT id, first_name, last_name, address, post_code, contact_number, email, username FROM users"
      );

    return users;
  }

  static async deleteUsers({ users = [] }, req) {
    const { pool, user_payload } = req;
    //* check if admin
    if (!user_payload.admin)
      throw FactoryException("Forbidden", "User doesn't have admin access");

    if (!users.length)
      throw FactoryException("BadRequest", "Array of User ids is required");

    await pool
      .promise()
      .query(`DELETE FROM users WHERE id IN (${users.join()})`);
  }
}

module.exports = UserServices;
