"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "user_authenticate",
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.literal("uuid_generate_v4()"),
        },
        user_id: {
          type: Sequelize.UUID,
          references: {
            model: "users",
            key: "id",
          },
          onDelete: "cascade",
        },
        token_id: {
          type: Sequelize.STRING,
        },
        refresh_token: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        expiry_time: {
          type: Sequelize.BIGINT,
          allowNull: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn("NOW"),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn("NOW"),
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
