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
        as: "feedback_question",
      }),
        this.belongsTo(models.Users, {
          foreignKey: "feedback_for",
          targetKey: "id",
          as: "feedbackForUser",
        }),
        this.belongsTo(models.Users, {
          foreignKey: "feedback_from",
          targetKey: "id",
          as: "feedbackFromUser",
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
      },
      rating: {
        type: Sequelize.INTEGER,
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
