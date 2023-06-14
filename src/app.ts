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

import compression from "compression";

dotenv.config();
// establish database connection

TypeORM.useContainer(Container);

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

    // create init database
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
