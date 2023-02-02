const Joi = require("joi");

const schema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  address: Joi.string().required(),
  post_code: Joi.string().required(),
  contact_number: Joi.string().required(),
  email: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  admin: Joi.boolean(),
});

module.exports = (payload) => {
  return schema.validate(payload);
};
