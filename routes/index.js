const express = require("express");
const userRoute = require("./user.route");
const authRoute = require("./auth.route");
const feedbackRoute = require("./feedback-questions.route");
router = express.Router();

const defaultRoutes = [
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/feedback",
    route: feedbackRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
