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

const addUser = async (
  transaction,
  userName,
  firstname,
  lastname,
  email,
  password
) => {
  const newUser = await model.Users.create(
    {
      userName,
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

module.exports = {
  findUser,
  addUser,
  encryptPassword,
  checkExistingLogin,
};
