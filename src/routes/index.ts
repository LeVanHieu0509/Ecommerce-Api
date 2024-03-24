import APIError from "../apps/global/response/apierror";
import access from "./access/index";
import cart from "./cart/index";
import checkout from "./checkout/index";
import comment from "./comment/index";
import discord from "./discord/index";
import discount from "./discount/index";
import inventory from "./inventory/index";
import notification from "./notification/index";
import product from "./product/index";
import upload from "./upload/index";
import profile from "./profile/index";

import auth from "./auth";
import home from "./home";
import post from "./post";
import user from "./user";
import rbac from "./rbac";
import MyLogger from "../loggers/mylogger.log";
import { RequestCustom } from "../apps/auth/authUtils";

function route(app) {
  app.use(
    "/v1/rbac",
    function (req, res, next) {
      next();
    },
    rbac
  );
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

  // app.use(apiKey);
  // app.use(permission("0000"));
  app.use(
    "/v1/api",
    function (req, res, next) {
      next();
    },
    access
  );

  app.use(
    "/v1/api/product",
    function (req, res, next) {
      next();
    },
    product
  );

  app.use(
    "/v1/api/discount",
    function (req, res, next) {
      next();
    },
    discount
  );

  app.use(
    "/v1/api/cart",
    function (req, res, next) {
      next();
    },
    cart
  );

  app.use(
    "/v1/api/checkout",
    function (req, res, next) {
      next();
    },
    checkout
  );

  app.use(
    "/v1/api/inventory",
    function (req, res, next) {
      next();
    },
    inventory
  );

  // app.use(
  //   "/v1/api/redis",
  //   function (req, res, next) {
  //     next();
  //   },
  //   redis
  // );

  app.use(
    "/v1/api/discord",
    function (req, res, next) {
      next();
    },
    discord
  );

  app.use(
    "/v1/api/comment",
    function (req, res, next) {
      next();
    },
    comment
  );

  app.use(
    "/v1/api/notification",
    function (req, res, next) {
      next();
    },
    notification
  );

  app.use(
    "/v1/api/upload",
    function (req, res, next) {
      next();
    },
    upload
  );

  app.use(
    "/v1/api/profile",
    function (req, res, next) {
      next();
    },
    profile
  );

  app.use((req, res, next) => {
    const error = new APIError("Not Found", 1237, 404);
    next(error);
  });

  app.use((error, req: RequestCustom, res, next) => {
    const statusCode = error.status || 500;
    const resMessage = `${error.status} - ${Date.now() - error.now}ms - Response: ${JSON.stringify(error)}`;
    const myLogger = new MyLogger();
    myLogger.error(resMessage, [req.path, { requestId: req.requestId }, { message: error.message }]);

    return res.status(statusCode).json({
      status: "error",
      code: statusCode,
      message: error.message || "Internal Server Error",
    });
  });
}

export default route;

//Cách 2:

// module.exports = app => {
//     app.use('/api/v1/auth', authRoute);
//     app.use('/api/v1/orders', ordersRoute);
//     app.use('/api/v1/sessions', sessionsRoute);
//     app.use('/api/v1/assets', assetsRoute);
//     app.use('/api/v1/kLineChart', kLineChartsRoute);
//     app.use('/api/v1/reports', reportsRoute);
//     app.use('/api/v1/stocks', stocksRoute);
//     app.use('/api/v1/users', userRoute);
//     app.use('/api/v1/internal_users', internalUserRoute);
// };
