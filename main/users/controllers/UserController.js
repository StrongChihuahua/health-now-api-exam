const UserServices = require("../services/UserService");
// const FactoryException = require("../../../common/exceptions/FactoryException");

class UserController {
  static async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const payload = await UserServices.login({ username, password }, req);
      res.apiSuccess(payload);
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const { body } = req;
      const payload = await UserServices.create({ data: body }, req);
      res.apiCreated(payload);
    } catch (error) {
      next(error);
    }
  }

  static async editUser(req, res, next) {
    try {
      const { body, params } = req;

      await UserServices.editUser({ data: body, id: params.id }, req);

      res.apiUpdated();
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { params } = req;
      await UserServices.deleteUser({ id: params.id }, req);

      res.apiDeleted();
    } catch (error) {
      next(error);
    }
  }

  static async viewUsers(req, res, next) {
    try {
      const payload = await UserServices.viewUsers(req);

      res.apiSuccess(payload);
    } catch (error) {
      next(error);
    }
  }

  static async deleteUsers(req, res, next) {
    try {
      const { users = [] } = req.body;

      await UserServices.deleteUsers({ users }, req);

      res.apiDeleted();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
