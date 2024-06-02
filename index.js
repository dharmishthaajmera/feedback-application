const app = require("./app");
require("dotenv").config();
const { sequelize } = require("./models");
app.get("/", (req, res) => {
  res.send("Started Working, Express!");
});

let server;
const main = async (req, res) => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    server = app.listen(process.env.SERVER_PORT);
    console.log(`====Server started on ${process.env.SERVER_PORT}====`);
  } catch (error) {
    console.log("server setup failed", error);
    console.log("Error: ", error.message);
  }
};

const unexpectedErrorHandler = (error) => {
  console.log(error);
  gracefulShutdownHandler;
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

const gracefulShutdownHandler = () => {
  setTimeout(() => {
    server.close(() => {
      console.log("Shutting down gracefully...");
      sequelize.close();
      process.exit();
    });
  }, 0);
};

process.on("SIGINT", gracefulShutdownHandler);
process.on("SIGTERM", gracefulShutdownHandler);

main();
