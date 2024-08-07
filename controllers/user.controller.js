const { sequelize } = require("../models");
const { userService } = require("../services");
const {
  customException,
  commonErrorHandler,
} = require("../helper/error-handler");

const addUser = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const { username, firstname, lastname, email, password, role } = req.body;
    const hashedPassword = await userService.encryptPassword(password);

    const existingUser = await userService.findUser(email);

    if (existingUser) {
      throw customException("User already exists", 409);
    }

    const newUser = await userService.addUser(
      transaction,
      username,
      firstname,
      lastname,
      email,
      hashedPassword,
      role
    );

    // const tokens = await generateToken(newUser.id, transaction);
    req.statusCode = 201;
    req.data = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };
    await transaction.commit();
    next();
  } catch (error) {
    await transaction.rollback();
    console.log("addUser error: ", error);
    const statusCode = error.statusCode || 500;
    commonErrorHandler(req, res, error.message, statusCode, error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await userService.getAllUsers();
    req.data = allUsers;
    next();
  } catch (error) {
    console.log(error);
    const statusCode = error.statusCode || 500;
    commonErrorHandler(req, res, error.message, statusCode, error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userDetails = await userService.getUserById(id);
    req.data = userDetails;
    next();
  } catch (error) {
    console.log("get user details error: ", error);
    const statusCode = error.statusCode || 500;
    commonErrorHandler(req, res, error.message, statusCode, error);
  }
};

module.exports = {
  addUser,
  getAllUsers,
  getUserById,
};
