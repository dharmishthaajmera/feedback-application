const {
  customException,
  commonErrorHandler,
} = require("../helper/error-handler");
const { userService } = require("../services");

const checkAdmin = async (req, res, next) => {
  try {
    const { email } = req.user;
    const existingUser = await userService.findUser(email);
    const isAdmin = existingUser?.role === "admin";

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
