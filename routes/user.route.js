const { Router } = require("express");
const { userController } = require("../controllers");
const { userValidation } = require("../validators");
const { responseHandler } = require("../helper/generic-response-handler");
// const {
//   checkAccessToken,
//   checkRefreshToken,
// } = require("../middlewares/authenticate");
const { checkAdmin } = require("../middlewares.js/authorize");

const router = Router();

router.post(
  "/",
  userValidation.addUserValidator,
  checkAdmin,
  userController.addUser,
  responseHandler
);

module.exports = router;
