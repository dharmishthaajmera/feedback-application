const yup = require("yup");
const validator = require("../helper/validator");

const loginUserValidator = async (req, res, next) => {
  const schema = yup.object({
    body: yup.object({
      email: yup.string().email().required().label("email"),
      password: yup.string().required().label("password"),
    }),
  });

  validator(req, res, schema, next);
};

module.exports = {
  loginUserValidator,
};
