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
  userController.getUserById,
  responseHandler
);

/**
 * @swagger
 * /v1/users/:
 *   post:
 *     summary: Add new user
 *     tags: [User]
 *     headers:
 *       required: true
 *       content:
 *          access-token
 *       example:
 *        token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IklNZEVCaWxuMmE5UktmSEYiLCJhY2Nlc3NUb2tlbklkIjoiMjE0Njg2YWItNDg5ZS00ODJmLWI0N2ItZTA5ODU3NWNiYzVhLTE3MjEyMDExNDQxNTgiLCJpYXQiOjE3MjEyMDExNDQsImV4cCI6MTcyMTI4NzU0NH0.mAXUnz_lveLUfZERCoc9MOsuLY3rC8AHN3I82N8p1c8
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
 *                 enum: [admin, user]
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
 *     responses:
 *       200:
 *         description: User created details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                   example: 2000b183-5b3e-4354-b928-f40bf8dac687
 *                 email:
 *                   type: string
 *                   example: fake@example.com
 */

/**
 * @swagger
 * /v1/users/:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   username:
 *                     type: string
 *                     example: fakeusername
 *                   firstname:
 *                     type: string
 *                     example: fake first name
 *                   lastname:
 *                     type: string
 *                     example: fake last name
 *                   role:
 *                     type: string
 *                     example: user
 *                   email:
 *                     type: string
 *                     example: fake@example.com
 */

module.exports = router;
