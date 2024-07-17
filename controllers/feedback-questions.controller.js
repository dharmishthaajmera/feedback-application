const { sequelize } = require("../models");
const { commonErrorHandler } = require("../helper/error-handler");
const { feedbackQuestionsService } = require("../services");

const addFeedbackQuestion = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const questionAdded = await feedbackQuestionsService.addFeedbackQuestion(
      req.body,
      transaction
    );
    transaction.commit();

    req.data = questionAdded;
    req.statusCode = 201;
    next();
  } catch (error) {
    transaction.rollback();
    console.log("add feedback questions error: ", error);
    const statusCode = error.statusCode || 500;
    commonErrorHandler(req, res, error.message, statusCode, error);
  }
};

const getFeedbackQuestions = async (req, res, next) => {
  try {
    const questionsData = await feedbackQuestionsService.getFeedbackQuestions();

    req.data = questionsData;
    req.statusCode = 200;
    next();
  } catch (error) {
    console.log("get feedback questions error: ", error);
    const statusCode = error.statusCode || 500;
    commonErrorHandler(req, res, error.message, statusCode, error);
  }
};

module.exports = {
  addFeedbackQuestion,
  getFeedbackQuestions,
};
