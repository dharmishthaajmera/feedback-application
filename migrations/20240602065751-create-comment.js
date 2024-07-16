"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("comment", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
      },
      comment_id: {
        type: Sequelize.INTEGER,
      },
      feedback_id: {
        type: Sequelize.UUID,
        references: {
          model: "feedback-questions",
          key: "id",
        },
      },
      feedback_for: {
        type: Sequelize.UUID,
        references: {
          model: "users",
          key: "id",
        },
      },
      feedback_from: {
        type: Sequelize.UUID,
        references: {
          model: "users",
          key: "id",
        },
      },
      content: {
        type: Sequelize.STRING,
      },
      rating: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.ENUM,
        values: ["Pending", "Complete"],
        defaultValue: "Pending",
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("comment");
  },
};
