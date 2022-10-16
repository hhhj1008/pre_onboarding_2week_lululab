const express = require("express");
const logger = require("morgan");
const routes = require("./routes");

const createApp = () => {
  const app = express();
  app.use(logger("combined"), express.json(), routes);
  
  return app;
};

module.exports = { createApp };
