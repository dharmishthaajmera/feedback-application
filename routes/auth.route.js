const { Router } = require("express");
const authController = require("../controllers/auth.controller");
const { authValidation } = require("../validators");
const { responseHandler } = require("../helper/generic-response-handler");
const {
  checkAccessToken,
  checkRefreshToken,
} = require("../middlewares/authenticate");
// const { checkAdmin } = require("../middlewares/authorize");

const router = Router();

router.post("/", authController.addUser);

router.post(
  "/logout",
  checkAccessToken,
  authValidation.logoutUserValidator,
  authController.logoutUser,
  responseHandler
);

router.post(
  "/generateAccessToken",
  checkRefreshToken,
  authController.generateAccessToken,
  responseHandler
);

module.exports = router;
