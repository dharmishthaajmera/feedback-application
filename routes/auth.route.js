const { Router } = require("express");
const authController = require("../controllers/auth.controller");
const { authValidation } = require("../validators");
// const { responseHandler } = require("../helper/generic-response");
// const {
//   checkAccessToken,
//   checkRefreshToken,
// } = require("../middlewares/authenticate");
// const { checkAdmin } = require("../middlewares/authorize");

const router = Router();

router.post(
  "/login",
  authValidation.loginUserValidator,
  authController.loginUser,
  responseHandler
);

module.exports = router;
