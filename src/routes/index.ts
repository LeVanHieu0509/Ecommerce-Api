import user from "./user";
import post from "./post";
import auth from "./auth";
import home from "./home";
import access from "./access/index";

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
  app.use(
    "/v1/api",
    function (req, res, next) {
      next();
    },
    access
  );
}

export default route;
