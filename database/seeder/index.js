const requireAll = require("require-all");

class Seeder {
  static async run() {
    const tables = requireAll(`${process.cwd()}/database/seeder/tables`);

    //* Run all seeders available
    for (const seed in tables) {
      await tables[seed].run();
    }

    console.log("Done Running Seeders!");
  }
}

module.exports = Seeder;
