const yup = require("yup");
const { validator } = require("../helper/validator");
const { responseMessages } = require("../constants");

const addUserValidator = async (req, res, next) => {
  const schema = yup.object({
    body: yup.object({
      username: yup
        .string()
        .matches(/^[A-Za-z\s]+$/, responseMessages.VALID_STRING("username"))
        .required()
        .label("username"),
      firstname: yup
        .string()
        .matches(/^[A-Za-z\s]+$/, responseMessages.VALID_STRING("firstname"))
        .required()
        .label("usefirstnamerName"),
      lastname: yup
        .string()
        .matches(/^[A-Za-z\s]+$/, responseMessages.VALID_STRING("lastname"))
        .required()
        .label("lastname"),
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

const getUserByIdValidation = async (req, res, next) => {
  const schema = yup.object({
    param: yup.object({
      id: yup.string().uuid().required().label("Id"),
    }),
  });
  validator(req, res, schema, next);
};

module.exports = {
  addUserValidator,
  getUserByIdValidation,
};
