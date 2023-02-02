const requireAll = require("require-all");
const pool = require("../../start/sql").instance;

class Migration {
  static async run() {
    const models = requireAll(`${process.cwd()}/database/data/model`);

    try {
      for (const model in models) {
        const types = [];
        for (const key in models[model]) {
          types.push(`${key} ${models[model][key]}`);
        }

        const query = `CREATE TABLE users (${types.join()}) DEFAULT CHARSET=utf8`;

        await pool.promise().query(query);
      }

      console.log(
        `${Object.keys(models).length} table structure has been migratated.`
      );
      process.exit();
    } catch (error) {
      console.error(error);
      throw error;
    }

    //* Run all table structure
  }
}

module.exports = Migration;
