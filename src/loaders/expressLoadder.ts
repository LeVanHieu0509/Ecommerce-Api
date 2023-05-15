const express = require("express");
const errorHandler = require("../middleware/errorHandler.middleware");
const routes = require("../routes");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

module.exports = (app) => {
  app.use(cors());
  app.use(express.json());
  app.use(helmet());
  app.use(morgan("combined"));
  routes(app);
  app.use(errorHandler);
};
