const Joi = require("joi");

const schema = Joi.object({
  username: Joi.string().required().max(30),
  password: Joi.string().required().max(30),
});

module.exports = (payload) => {
  return schema.validate(payload);
};
