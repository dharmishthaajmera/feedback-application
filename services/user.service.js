const { customException } = require("../helper/error-handler");
const model = require("../models");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

const findUser = async (email) => {
  const existingUser = await model.Users.findOne({
    where: {
      email,
    },
  });

  return existingUser;
};

const addUser = async (
  transaction,
  username,
  firstname,
  lastname,
  email,
  password
) => {
  const newUser = await model.Users.create(
    {
      username,
      firstname,
      lastname,
      email,
      password,
    },
    { transaction }
  );

  return newUser;
};

const encryptPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

const checkExistingLogin = async (existingUser, token_id) => {
  const existingLogin = await model.userAuthenticate.findOne({
    where: { user_id: existingUser.id, token_id },
  });

  return existingLogin;
};

const getAllUsers = async () => {
  try {
    const allUsers = await model.Users.findAll({
      where: { role: { [Op.not]: "admin" } },
      attributes: ["id", "username", "firstname", "lastname", "email"],
    });

    return allUsers;
  } catch (error) {
    console.log(error);
    throw customException("Error getting all users");
  }
};

const getUserById = async (id) => {
  const userDetails = await model.Users.findAll({
    where: { id },
    attributes: ["id", "username", "firstname", "lastname", "email", "role"],
  });

  return userDetails;
};

module.exports = {
  findUser,
  addUser,
  encryptPassword,
  checkExistingLogin,
  getAllUsers,
  getUserById,
};
