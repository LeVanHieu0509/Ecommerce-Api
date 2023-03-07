import user from "./user";
import post from "./post";
import auth from "./auth";

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
}

export default route
