const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { authService } = require("../services");
const model = require("../models");
const { customException } = require("./error-handler");

const generateToken = async (user_id, email, token_id, transaction = null) => {
  try {
    const refreshTokenId = `${crypto.randomUUID()}-${new Date().getTime()}`;
    const accessTokenId = `${crypto.randomUUID()}-${new Date().getTime()}`;

    const refreshToken = jwt.sign(
      { email, refreshTokenId, user_id },
      process.env.REFRESH_SECRET_KEY,
      {
        expiresIn: 7776000,
      }
    );

    const accessToken = jwt.sign(
      { email, accessTokenId, user_id },
      process.env.ACCESS_SECRET_KEY,
      {
        expiresIn: 86400,
      }
    );

    const decodeRefreshToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_SECRET_KEY
    );
    const refreshTokenExpireTime = decodeRefreshToken.exp;
    const body = {
      user_id,
      token_id,
      refresh_token: refreshTokenId,
      expiry_time: refreshTokenExpireTime,
    };

    await model.userAuthenticate.create(body, { transaction });

    const token = {
      refreshToken,
      accessToken,
    };

    return token;
  } catch (error) {
    console.log(error);
    throw customException("Error generating tokens", 500);
  }
};

module.exports = {
  generateToken,
};
