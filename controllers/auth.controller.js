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

    const existingUser = (await findUser(email)).dataValues;
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

    const tokens = await generateToken(
      existingUser.id,
      email,
      token_id,
      transaction
    );

    req.statusCode = 200;
    req.data = {
      id: existingUser.id,
      name: existingUser.username,
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
    const { user_id } = req.user;
    const { token_id } = req.headers;

    await model.userAuthenticate.destroy(
      {
        where: {
          user_id: user_id,
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
    const { email, user_id } = req.user;
    const accessTokenId = `${crypto.randomUUID()}-${new Date().getTime()}`;
    console.log(email);
    const newAccessToken = jwt.sign(
      { email, accessTokenId, user_id },
      process.env.ACCESS_SECRET_KEY,
      {
        expiresIn: 86400,
      }
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
