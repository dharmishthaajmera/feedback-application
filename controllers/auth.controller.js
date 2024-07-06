const {
  commonErrorHandler,
  customException,
} = require("../helper/error-handler");
const { findUser, checkExistingLogin } = require("../services/user.service");
const bcrypt = require("bcrypt");
const model = require("../models");
const { generateToken } = require("../helper/utility");

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await findUser(email);
    if (!existingUser) {
      throw customException("Email or Password is incorrect.", 401);
    }

    const passwordIsValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!passwordIsValid) {
      throw customException("Email or Password is incorrect.", 401);
    }

    const existingLogin = await checkExistingLogin(existingUser);
    if (existingLogin) {
      await model.userAuthenticate.destroy({
        where: { user_id: existingUser.id },
      });
    }

    const tokens = await generateToken(existingUser.id);

    req.statusCode = 200;
    req.data = {
      id: existingUser.id,
      name: existingUser.userName,
      email: existingUser.email,
      tokens,
    };
    next();
  } catch (error) {
    console.log("loginUser error:", error);
    const statusCode = error.statusCode || 500;
    commonErrorHandler(req, res, error.message, statusCode, error);
  }
};

module.exports = {
  loginUser,
};
