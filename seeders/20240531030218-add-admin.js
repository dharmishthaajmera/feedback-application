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
          username: "dajmera",
          firstname: "Dharmishtha",
          lastname: "Ajmera",
          email: "dharmishthaajmera@gmail.com",
          password: await bcrypt.hash("test@123", 10),
          role: "admin",
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
