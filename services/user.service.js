const model = require("../models");
const bcrypt = require("bcrypt");
const { customException } = require("../helper/error-handler");

const findUser = async (email) => {
  const existingUser = await model.Users.findOne({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw customException("User already exists", 409);
  }

  return existingUser;
};

const addUser = async (transaction, userName, email, password) => {
  const newUser = await model.Users.create(
    {
      userName,
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

module.exports = {
  findUser,
  addUser,
  encryptPassword,
};
