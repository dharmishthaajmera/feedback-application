"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "user_authenticate",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        user_id: {
          type: Sequelize.INTEGER,
          references: {
            model: "users",
            key: "id",
          },
          onDelete: "cascade",
        },
        token_id: {
          type: Sequelize.INTEGER,
        },
        refresh_token: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        expiry_time: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW(),
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      {
        indexes: [
          {
            unique: true,
            fields: ["user_id", "token_id"],
          },
        ],
      }
    );
  },
  async down(queryInterface) {
    await queryInterface.dropTable("user_authenticate");
  },
};
