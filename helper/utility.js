const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { authService } = require("../services");

const generateToken = async (user_id, transaction = null) => {
  const refreshTokenId = `${crypto.randomUUID()}-${new Date().getTime()}`;

  const refreshToken = jwt.sign(
    { user_id, tokenId: refreshTokenId },
    process.env.REFRESH_SECRET_KEY,
    {
      expiresIn: process.env.REFRESH_EXPIRY_TIME,
    }
  );

  const decodeAccessToken = await authService.verifyJWT(refreshToken);
  const refreshTokenExpireTime = decodeAccessToken.exp;
  const body = {
    user_id,
    refreshTokenId,
    refreshTokenExpireTime,
  };
  await model.UserAuthenticate.create(body, { transaction });

  return refreshToken;
};

module.exports = {
  generateToken,
};
