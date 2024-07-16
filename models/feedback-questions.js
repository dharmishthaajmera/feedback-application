"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class feedbackQuestion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.comment, {
        foreignKey: "feedback_id",
      });
    }
  }
  feedbackQuestion.init(
    {
      question: {
        type: Sequelize.STRING,
      },
      rating_or_content: {
        type: Sequelize.ENUM,
        values: ["rating", "content"],
        defaultValue: "rating",
      },
    },
    {
      sequelize,
      modelName: "feedbackQuestion",
      tableName: "feedback_question",
    }
  );
  return feedbackQuestion;
};
