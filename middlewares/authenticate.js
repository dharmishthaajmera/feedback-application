const {
  commonErrorHandler,
  customException,
} = require("../helper/error-handler");
const { authService } = require("../services");
const { models } = require("../models");

const checkRefreshToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const refreshToken = token ? token.split(" ")[1] : null;
    if (!refreshToken) {
      throw customException("Access denied", 401);
    }

    const decodedJwt = await authService.verifyJWT(refreshToken);

    const existingLogin = await models.UserAuthenticate.findOne({
      where: {
        user_id: decodedJwt.userId,
        refresh_token: decodedJwt.tokenId,
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
};
