const {
  customException,
  commonErrorHandler,
} = require("../helper/error-handler");
const model = require("../models");
const { userService } = require("../services");

const checkAdmin = async (req, res, next) => {
  try {
    const { email } = req.headers;
    const existingUser = await userService.findUser(email);
    const isAdmin = existingUser?.is_admin;

    if (!isAdmin) {
      throw customException("User is not authorized.", 403);
    }

    return next();
  } catch (error) {
    console.log("User is not authorized:", error);
    const statusCode = error.status || 500;
    return commonErrorHandler(req, res, error.message, statusCode, error);
  }
};

module.exports = {
  checkAdmin,
};
