const model = require("../models");
const bcrypt = require("bcrypt");

const findUser = async (email) => {
  const existingUser = await model.Users.findOne({
    where: {
      email,
    },
  });

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

const checkExistingLogin = async (existingUser) => {
  const existingLogin = await model.userAuthenticate.findOne({
    where: { user_id: existingUser.id },
  });

  return existingLogin;
};

module.exports = {
  findUser,
  addUser,
  encryptPassword,
  checkExistingLogin,
};
