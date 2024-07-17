const model = require("../models");
const { customException } = require("../helper/error-handler");

const addFeedbackQuestion = async (questionData, transaction = null) => {
  const { question, type } = questionData;

  try {
    const questionAdded = model.feedbackQuestion.create(
      {
        question,
        rating_or_content: type,
      },
      { transaction }
    );
    return questionAdded;
  } catch (error) {
    console.log(error);
    throw customException("Error creating feedback question", 500);
  }
};

const getFeedbackQuestions = async () => {
  try {
    const questionsData = model.feedbackQuestion.findAll({
      attributes: ["id", "question", "rating_or_content"],
    });
    return questionsData;
  } catch (error) {
    console.log(error);
    throw customException("Error getting feedback questions", 500);
  }
};

module.exports = {
  addFeedbackQuestion,
  getFeedbackQuestions,
};
