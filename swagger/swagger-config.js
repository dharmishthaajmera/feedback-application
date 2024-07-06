const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "feedback Application",
    version: "1.0.0",
    description: "API description",
  },
  servers: [
    {
      url: "http://localhost:3001",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["../routes"], // Ensure this path is correct
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
