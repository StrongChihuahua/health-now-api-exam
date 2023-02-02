require("dotenv").config();
const _Route = require("./core/Route/route");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
//* SQL
const MySql = require(`./sql`);

//* APP instance

// const app = express();

//* PORT
const port = process.env.PORT || 4101;

//* Custom middlewares
const ResponseMiddleware = require("../common/middleware/Response");
const handleErrors = require("../common/middleware/ExceptionHandler");
// const MongoSession = require('../common/middleware/MongoSession')

let app = "test";

class Start {
  static seed() {
    const Seeder = require("../database/seeder");
    Seeder.run();
  }

  static migration() {
    const Migration = require("../database/migrations");
    Migration.run();
  }

  static boot(command) {
    app = express();

    //* Initializing mySQL
    MySql.init();

    switch (command) {
      case "seed":
        this.seed();
        break;

      case "migration":
        this.migration();
        break;

      default:
        this.init();
        break;
    }
  }

  static init() {
    //* Applicate level middlewares
    app.use(bodyParser.json());
    app.use(cors());

    //* Custom middlwares
    app.use(ResponseMiddleware);
    app.use((req, res, next) => {
      req.pool = MySql.getSqlPoolConnection();
      next();
    });

    //* Register routes
    _Route.registerAll();

    //* Error Handler
    app.use((err, req, res, next) => {
      handleErrors(err, res);
    });

    app.listen(port, () => {
      console.log(`Server is running on PORT ${port}`);
    });
  }

  static getInstance() {
    return app;
  }
}

module.exports = Start;
