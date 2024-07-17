const yup = require("yup");
const { validator } = require("../helper/validator");

const addFeedbackQuestionValidator = async (req, res, next) => {
  const schema = yup.object({
    body: yup.object({
      question: yup.string().max(150).required().label("feedback question"),
      type: yup
        .string()
        .oneOf(["rating", "content"])
        .label("question type")
        .default("rating"),
    }),
  });

  validator(req, res, schema, next);
};

module.exports = {
  addFeedbackQuestionValidator,
};
