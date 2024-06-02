"use strict";
const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add seed commands here.
    // Example:
    await queryInterface.bulkInsert(
      "users",
      [
        {
          userName: "Dharmishtha Ajmera",
          email: "dharmishthaajmera@gmail.com",
          password: await bcrypt.hash("test@123", 10),
          is_admin: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    // Add commands to revert seed here.
    // Example:
    await queryInterface.bulkDelete("users", null, {});
  },
};
