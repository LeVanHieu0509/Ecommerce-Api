import { ApolloServer } from "apollo-server-express";
import * as dotenv from "dotenv";
import express from "express";
import { GraphQLError, GraphQLFormattedError } from "graphql";
import morgan from "morgan";
import path from "path";
import Container from "typedi";
import * as TypeORM from "typeorm";
import buildSchema from "./apps/modules/graphql/schema";
import route from "./routes";
import cors = require("cors");
// const session = require("express-session");

import compression from "compression";
// import { cli, clientSub } from "./dbs/init.redis";
import LoggerService from "./apps/loggers/discord-v2.log";
const { Server } = require("socket.io");
const io = new Server({
  /* options */
});
const redis = require("redis");
import { v4 as uuidv4 } from "uuid";
import { RequestCustom } from "./apps/auth/authUtils";
import MyLogger from "./loggers/mylogger.log";
import { configBot } from "./apps/loggers/telegram.log";
uuidv4();

dotenv.config();
// establish database connection

TypeORM.useContainer(Container);

const initSubscribe = async () => {
  // const redis = await clientSub();
  // await redis.subscribe("MESSAGES", (message) => {
  //   console.log("MESSAGES RECEIVER", message); // 'message'
  // });
};

const initDiscord = async () => {
  const discord = LoggerService.getInstance();
  // discord.commandsMessage()
};

const bootstrap = async () => {
  try {
    var app = express();

    // loaders(app);
    //init middleware
    //morgan: Là thư viện nó có thể in ra được các log khi mà một người dùng chạy một request.
    // /morgan("combined") -- //Trạng thái đầy đủ, bao gồm các thông tin, địa chỉ IP của client, ngày giờ yêu cầu được gửi tới server.
    // /morgan("common") -- Bao gồm thông tin địa chỉ Ip cuả client, ngày giờ yêu cầu được gửi tới server
    // /morgan("short") -- Bao gồm các thông tin về phương thức HTTP, đường dẫn yêu cầu, mã trạng thái phản hồi, kích thước phản hồi và thời gian xử lý yêu cầu
    // /morgan("tiny") -- Bao gồm thông tin về phương thức HTTP: GET /api 500 30 - 3.691 ms
    app.use(morgan("combined")); //Trạng thái code được tô màu đầu ra ngắn gọn.
    // app.use(helmet()); //Bảo vệ bên thứ 3 đọc cookie
    app.use(compression()); //Khi vận chuyển quá nhiều data sẽ tốn băng thông, tốn cho người dùng thì nó sẽ giảm đi 100 lần dung lượng

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Static file
    app.use(express.static(path.join(__dirname, "public")));
    // bot tele
    configBot();

    app.use((req: RequestCustom, res, next) => {
      const requestId = req.headers["x-request-id"];
      req.requestId = requestId ? requestId : uuidv4();

      const myLogger = new MyLogger();
      myLogger.log("input params", [
        req.path,
        {
          requestId: req.requestId,
        },
        req.method == "POST" ? req.body : req.query,
      ]);

      next();
    });

    // create init database
    // app.use(sessionMiddleware);
    // initSubscribe()
    initDiscord();
    require("./dbs/init.sqlserver.ts");
    //Kiểm tra server quá tải
    // const { checkOverLoad } = require("./helpers/check.connect");
    // checkOverLoad();

    const schema = await buildSchema(Container);

    // Ở đây set origin: [/localhost*/] là để tất cả các app frontEnd khác ở localhost có thể gọi tới api của app này.
    // Nếu ko set sẽ bị lỗi Cross-domain.
    const corsConfig = {
      methods: "GET, HEAD, PUT,PATCH,POST,DELETE,OPTIONS",
      credentials: true,
      origin: [/localhost*/],
    };

    app.use(cors(corsConfig));

    //Apolo server sẽ tạo graphql server,
    //playGround: true: có thể test các schema trực tiếp tại localhost localhos:
    const server = new ApolloServer({
      schema,
      context: ({ req, res }) => ({ req, res }),
      debug: true,
      playground: true,
      formatError: (error: GraphQLError): GraphQLFormattedError => {
        if (error && error.extensions) {
          error.extensions.code = "GRAPHQL_VALIDATION_FAILED";
        }
        return error;
      },
    });

    server.applyMiddleware({ app, cors: corsConfig });
    route(app);
    let port = 3000;
    const serverVip = app.listen({ port }, () => {
      console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
    });

    process.on("SIGINT", () => {
      serverVip.close(() => console.log("Exit Server Express"));
    });
  } catch (error) {
    console.log(error);
  }
};

bootstrap();
