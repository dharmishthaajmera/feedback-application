const yup = require("yup");
const { validator } = require("../helper/validator");
const { responseMessages } = require("../constants");

const addUserValidator = async (req, res, next) => {
  const schema = yup.object({
    body: yup.object({
      userName: yup
        .string()
        .matches(/^[A-Za-z\s]+$/, responseMessages.VALID_STRING("userName"))
        .required()
        .label("userName"),
      email: yup.string().email().required().label("email"),
      password: yup
        .string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
          responseMessages.INVALID_PASSWORD
        )
        .required()
        .label("password"),
      is_admin: yup.boolean().typeError().label("is admin").default(false),
    }),
  });
  validator(req, res, schema, next);
};

module.exports = {
  addUserValidator,
};
