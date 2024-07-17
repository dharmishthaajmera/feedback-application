const yup = require("yup");
const { validator } = require("../helper/validator");

const loginUserValidator = async (req, res, next) => {
  const schema = yup.object({
    body: yup.object({
      email: yup.string().email().required().label("email"),
      password: yup.string().required().label("password"),
    }),
    headers: yup.object({
      token_id: yup.string().required().label("device token id"),
    }),
  });

  validator(req, res, schema, next);
};

const logoutUserValidator = async (req, res, next) => {
  const schema = yup.object({
    headers: yup.object({
      token_id: yup.string().required().label("device token id"),
    }),
  });

  validator(req, res, schema, next);
};

module.exports = {
  loginUserValidator,
  logoutUserValidator,
};
