const { sequelize } = require("../models");
const jwt = require("jsonwebtoken");
const {
  commonErrorHandler,
  customException,
} = require("../helper/error-handler");
const { findUser, checkExistingLogin } = require("../services/user.service");
const bcrypt = require("bcrypt");
const model = require("../models");
const { generateToken } = require("../helper/utility");

const loginUser = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const { email, password } = req.body;
    const { token_id } = req.headers;

    const existingUser = await findUser(email);
    if (!existingUser) {
      throw customException("User not found.", 401);
    }

    const passwordIsValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!passwordIsValid) {
      throw customException("Email or Password is incorrect.", 401);
    }

    const existingLogin = await checkExistingLogin(existingUser, token_id);
    if (existingLogin) {
      await model.userAuthenticate.destroy({
        where: { user_id: existingUser.id, token_id },
      });
    }

    const tokens = await generateToken(existingUser.id, token_id, transaction);

    req.statusCode = 200;
    req.data = {
      id: existingUser.id,
      name: existingUser.userName,
      email: existingUser.email,
      tokens,
    };
    await transaction.commit();
    next();
  } catch (error) {
    await transaction.rollback();
    console.log("loginUser error:", error);
    const statusCode = error.statusCode || 500;
    commonErrorHandler(req, res, error.message, statusCode, error);
  }
};

const logoutUser = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const { user } = req;
    const { token_id } = req.headers;

    await model.userAuthenticate.destroy(
      {
        where: {
          user_id: user.user_id,
          token_id,
        },
      },
      { transaction }
    );
    req.statusCode = 204;

    transaction.commit();
    next();
  } catch (error) {
    transaction.rollback();
    console.log("loginUser error:", error);
    const statusCode = error.statusCode || 500;
    commonErrorHandler(req, res, error.message, statusCode, error);
  }
};

const generateAccessToken = async (req, res, next) => {
  try {
    const { user } = req;

    const accessTokenId = `${crypto.randomUUID()}-${new Date().getTime()}`;

    const newAccessToken = jwt.sign(
      { userId: user.userId, accessTokenId },
      process.env.ACCESS_SECRET_KEY
    );

    req.data = {
      accessToken: newAccessToken,
      refreshToken: req.refreshToken,
    };
    next();
  } catch (error) {
    console.log("generate access token error:", error);
    const statusCode = error.statusCode || 500;
    commonErrorHandler(req, res, error.message, statusCode, error);
  }
};

module.exports = {
  loginUser,
  logoutUser,
  generateAccessToken,
};
