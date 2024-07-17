"use strict";
/** @type {import('sequelize-cli').Migration} */
const FeedbackQuestions = require("../models/feedback-questions");
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
        autoIncrement: true,
        primaryKey: true,
      },
      feedback_id: {
        type: Sequelize.UUID,
        references: {
          model: "feedback_question",
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
        validate: {
          isCorrectType(value) {
            if (!this.feedback_id) return;

            return FeedbackQuestions.findByPk(this.feedback_id).then(
              (rating_or_content) => {
                if (rating_or_content) {
                  if (
                    rating_or_content.value === "rating" &&
                    !Number.isInteger(Number(value))
                  ) {
                    throw new Error(
                      "Content must be an integer for rating type"
                    );
                  }
                  if (
                    rating_or_content.value === "content" &&
                    typeof value !== "string"
                  ) {
                    throw new Error(
                      "Content must be a string for content type"
                    );
                  }
                }
              }
            );
          },
          validate: { len: [0, 75] },
        },
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
  async down(queryInterface) {
    await queryInterface.dropTable("comment");
  },
};
