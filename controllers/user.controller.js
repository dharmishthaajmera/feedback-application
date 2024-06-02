const { sequelize } = require("../models");
const { userService } = require("../services");

const addUser = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const { userName, email, password } = req.body;
    const hashedPassword = await userService.encryptPassword(password);

    await userService.findUser(email);

    const newUser = await userService.addUser(
      transaction,
      userName,
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

module.exports = {
  addUser,
};
