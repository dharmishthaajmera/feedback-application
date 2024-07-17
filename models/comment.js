"use strict";
const FeedbackQuestions = require("./feedback-questions");
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.feedbackQuestion, {
        foreignKey: "feedback_id",
        targetKey: "id",
        as: "feedback_comment_fk",
      }),
        this.belongsTo(models.Users, {
          foreignKey: "feedback_for",
          targetKey: "id",
          as: "feedback_for_user_fk",
        }),
        this.belongsTo(models.Users, {
          foreignKey: "feedback_from",
          targetKey: "id",
          as: "feedback_from_user_fk",
        });
    }
  }
  comment.init(
    {
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
    },
    {
      sequelize,
      modelName: "comment",
      tableName: "comment",
    }
  );
  return comment;
};
