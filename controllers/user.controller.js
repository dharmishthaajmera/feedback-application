const { sequelize } = require("../models");
const { Op } = require("sequelize");
const { userService } = require("../services");

const addUser = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const { userName, firstname, lastname, email, password } = req.body;
    const hashedPassword = await userService.encryptPassword(password);

    await userService.findUser(email);

    const newUser = await userService.addUser(
      transaction,
      userName,
      firstname,
      lastname,
      email,
      hashedPassword
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
    const allUsers = await model.Users.findAll({
      where: { role: { [Op.not]: "admin" } },
      attributes: ["id", "username", "firstname", "lastname", "email"],
    });
    req.data = allUsers;
    next();
  } catch (error) {
    console.log("getAllUsers error: ", error);
    const statusCode = error.statusCode || 500;
    commonErrorHandler(req, res, error.message, statusCode, error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.param;
    const userDetails = await model.Users.findAll({
      where: { role: { id } },
      attributes: ["id", "username", "firstname", "lastname", "email", "role"],
    });
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
