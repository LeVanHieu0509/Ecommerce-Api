import { apiKey, permission } from "../apps/auth/checkAuth";
import access from "./access/index";
import auth from "./auth";
import home from "./home";
import post from "./post";
import user from "./user";

function route(app) {
  app.use(
    "/v1/auth",
    function (req, res, next) {
      next();
    },
    user
  );

  app.use(
    "/v1/user",
    function (req, res, next) {
      next();
    },
    auth
  );
  app.use(
    "/v1/post",
    function (req, res, next) {
      next();
    },
    post
  );
  app.use(
    "/api",
    function (req, res, next) {
      next();
    },
    home
  );

  app.use(apiKey);
  app.use(permission("0000"));
  app.use(
    "/v1/api",
    function (req, res, next) {
      next();
    },
    access
  );
}

export default route;
