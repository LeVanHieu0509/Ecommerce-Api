import { Request, Response, Router } from "express";
import user from "./auth";

function route(app) {
  app.use(
    "/v1/user",
    function (req, res, next) {
      console.log("Request Type:", req.method);
      next();
    },
    user
  );
}

module.exports = route;
