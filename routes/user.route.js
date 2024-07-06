const { Router } = require("express");
const { userController } = require("../controllers");
const { userValidation } = require("../validators");
const { responseHandler } = require("../helper/generic-response-handler");
const { checkRefreshToken } = require("../middlewares/authenticate");
const { checkAdmin } = require("../middlewares/authorize");

const router = Router();

router.post(
  "/",
  checkRefreshToken,
  userValidation.addUserValidator,
  checkAdmin,
  userController.addUser,
  responseHandler
);

/**
 * @swagger
 * /users/:
 *   post:
 *     summary: Add a user
 *     description: Add a new user to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */

module.exports = router;
