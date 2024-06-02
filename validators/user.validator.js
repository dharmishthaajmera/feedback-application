const yup = require("yup");
const { validator } = require("../helper/validator");
const { responseMessages } = require("../constants");

const addUserValidator = async (req, res, next) => {
  const schema = yup.object({
    body: yup.object({
      userName: yup
        .string()
        .matches(/^[A-Za-z\s]+$/, responseMessages.VALID_STRING("userName"))
        .required(responseMessages.REQUIRED_FIELD("userName")),
      email: yup
        .string()
        .email(responseMessages.INVALID_EMAIL)
        .required(responseMessages.REQUIRED_FIELD("Email")),
      password: yup
        .string()
        .required(responseMessages.REQUIRED_FIELD("password"))
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
          responseMessages.INVALID_PASSWORD
        ),
      is_admin: yup
        .boolean()
        .typeError(responseMessages.BOOLEAN_REQUIRED)
        .default(false),
    }),
  });
  validator(req, res, schema, next);
};

module.exports = {
  addUserValidator,
};
