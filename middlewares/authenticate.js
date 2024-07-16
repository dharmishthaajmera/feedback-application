const {
  commonErrorHandler,
  customException,
} = require("../helper/error-handler");
const { authService } = require("../services");
const model = require("../models");
const jwt = require("jsonwebtoken");

const checkAccessToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const accessToken = token ? token.split(" ")[1] : null;
    if (!accessToken) {
      throw customException("Access denied", 401);
    }

    jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(401).json({ error: "Invalid Token" });
      }

      req.user = user;
      next();
    });
  } catch (error) {
    console.log("checkAccessToken error:", error);
    const statusCode = error.statusCode || 401;
    commonErrorHandler(req, res, error.message, statusCode, error);
  }
};

const checkRefreshToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const refreshToken = token ? token.split(" ")[1] : null;
    if (!refreshToken) {
      throw customException("Access denied", 401);
    }

    let decodedJwt;
    jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY, (err, user) => {
      if (err) {
        console.log(err);
        throw customException("Invalid Token", 401);
      }

      decodedJwt = user;
      req.user = user;
    });

    const existingLogin = await model.userAuthenticate.findOne({
      where: {
        user_id: decodedJwt?.user_id,
        refresh_token: decodedJwt?.refreshTokenId,
      },
    });
    if (!existingLogin) throw customException("Please Login", 401);

    req.user = existingLogin;
    req.refreshToken = refreshToken;
    next();
  } catch (error) {
    console.log("checkRefreshToken error:", error);
    const statusCode = error.statusCode || 401;
    commonErrorHandler(req, res, error.message, statusCode, error);
  }
};

module.exports = {
  checkRefreshToken,
  checkAccessToken,
};
