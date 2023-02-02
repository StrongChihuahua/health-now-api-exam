// instance of joi
const validator = require("../../../main/users/validators/user");

// Joi result Extractor
const extractResult = require("./utils/extract");

// Exception
const FactoryException = require("../../exceptions/FactoryException");

module.exports = (req, res, next) => {
  try {
    const { body } = req;
    const { error, value } = extractResult(validator(body));

    if (error) throw FactoryException("BadRequest", error);

    req.body = value;
    next();
  } catch (error) {
    next(error);
  }
};
