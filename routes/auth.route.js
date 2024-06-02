const { Router } = require("express");
const authController = require("../controllers/auth.controller");
// const userValidator = require("../validators/user.validator");
// const { responseHandler } = require("../helper/generic-response");
// const {
//   checkAccessToken,
//   checkRefreshToken,
// } = require("../middlewares/authenticate");
// const { checkAdmin } = require("../middlewares/authorize");

const router = Router();

router.post("/", authController.addUser);

module.exports = router;
