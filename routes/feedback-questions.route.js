const { Router } = require("express");
const { feedbackQuestionsController } = require("../controllers");
const { feedbackQuestionsValidation } = require("../validators");
const { responseHandler } = require("../helper/generic-response-handler");
const { checkAccessToken } = require("../middlewares/authenticate");
const { checkAdmin } = require("../middlewares/authorize");

const router = Router();

router.post(
  "/",
  checkAccessToken,
  checkAdmin,
  feedbackQuestionsValidation.addFeedbackQuestionValidator,
  feedbackQuestionsController.addFeedbackQuestion,
  responseHandler
);

router.get(
  "/",
  checkAccessToken,
  checkAdmin,
  feedbackQuestionsController.getFeedbackQuestions,
  responseHandler
);
