const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const routes = require("./routes");
const { commonErrorHandler } = require("./helper/error-handler");

const app = express();
app.use(express.json());
app.use(helmet());
// Enable cors support to accept cross origin requests
app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));

// Enable helmet js middlewares to configure secure headers
app.use(helmet());

// Enable gzip compression module for REST API
app.use(compression());

app.use("/health", (req, res) => {
  res.send({ message: "Application runing successfully!" });
});

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// REST API entry point
app.use("/v1", routes);

// 404 Error Handling
app.use((req, res) => {
  const message = "Invalid endpoint";
  commonErrorHandler(req, res, message, 404);
});

module.exports = app;
