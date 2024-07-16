const { Router } = require("express");
const { userController } = require("../controllers");
const { userValidation } = require("../validators");
const { responseHandler } = require("../helper/generic-response-handler");
const {
  checkRefreshToken,
  checkAccessToken,
} = require("../middlewares/authenticate");
const { checkAdmin } = require("../middlewares/authorize");

const router = Router();

router.post(
  "/",
  checkAccessToken,
  checkAdmin,
  userValidation.addUserValidator,
  userController.addUser,
  responseHandler
);

router.get(
  "/",
  checkAccessToken,
  checkAdmin,
  userController.getAllUsers,
  responseHandler
);

router.get(
  "/:id",
  checkAccessToken,
  userValidation.getUserByIdValidation,
  userController.addUser,
  responseHandler
);

/**
 * @swagger
 * /users/:
 *   post:
 *     summary: Add new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - firstname
 *               - lastname
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               role:
 *                 type: string
 *                 oneOf: ["admin", "user"]
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 description: At least one number, one uppercase and lowercase letter, and at least 8 or more characters.
 *             example:
 *               username: fakeusername
 *               firstname: fake first name
 *               lastname: fake last name
 *               role: user
 *               email: fake@example.com
 *               password: Password1@
 */

module.exports = router;
