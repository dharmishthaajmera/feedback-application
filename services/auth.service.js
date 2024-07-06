const jwt = require("jsonwebtoken");

const verifyJWT = async (refreshToken) => {
  const decodedJwt = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);

  return decodedJwt;
};

module.exports = { verifyJWT };
