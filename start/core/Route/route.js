const express = require("express");
const requireAll = require("require-all");

const RegisterRoute = require("./Register/Route");
const RegisterMiddleware = require("./Register/Middleware");

const _routes = [];
class Route {
  constructor(namespace) {
    this.namespace = namespace;
    this.key = _routes.length;
  }

  static registerAll() {
    const app = require("../../index").getInstance();
    console.log("Initializing routes...");
    requireAll(`${process.cwd()}/main/routes`);
    for (const r of _routes) {
      const router = express.Router();
      const { path, controller, method, namespace, middlewares = [] } = r;

      // * register router level middleware
      RegisterMiddleware({ middlewares, method, router, path });

      // * register route
      RegisterRoute({ router, method, path, controller, namespace });

      app.use("/api/", router);
    }
  }

  get(path, controller) {
    this.register(path, controller, "get", this.namespace);
    return this;
  }

  post(path, controller) {
    this.register(path, controller, "post", this.namespace);
    return this;
  }

  put(path, controller) {
    this.register(path, controller, "put", this.namespace);
    return this;
  }

  patch(path, controller) {
    this.register(path, controller, "patch", this.namespace);
    return this;
  }

  delete(path, controller) {
    this.register(path, controller, "delete", this.namespace);
    return this;
  }

  register(path, controller, method, namespace) {
    _routes.push({ path, controller, method, namespace });
    this.key = _routes.length - 1;
  }

  group(callback) {
    callback();
    return this;
  }

  middleware(m) {
    _routes[this.key] = { ..._routes[this.key], middlewares: m };
    return this;
  }
}

module.exports = Route;
