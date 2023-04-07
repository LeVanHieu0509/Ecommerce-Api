// import bodyParser from "body-parser";
// import { Server } from "http";
// import mssql, { config as Config } from "mssql";
// import path from "path";
// import route from "./routes";
// import express, { Response } from "express";
// import redisClient from "./ultis/connectRedis";
// import { graphqlHTTP } from "express-graphql";
// import buildSchema from "./apps/modules/graphql/schema";
// import morgan from "morgan";

// const config: Config = {
//   server: "localhost",
//   port: 1433,
//   user: "sa",
//   password: "Levanhieu1",
//   database: "test",
// };

// const app = express();
// var server: Server;

// //morgan: Là thư viện nó có thể in ra được các log khi mà một người dùng chạy một request.
// app.use(morgan("dev")); //Trạng thái code được tô màu

// app.use(bodyParser.urlencoded({ extended: true })); //if false then parse only strings
// app.use(bodyParser.json());

// // Static file
// app.use(express.static(path.join(__dirname, "public")));

// route(app);

// //middleware
// // Ví dụ: giả sử chúng tôi muốn máy chủ của mình ghi lại địa chỉ IP của mọi yêu cầu và
// // chúng tôi cũng muốn viết một API trả về địa chỉ IP của người gọi.
// // Chúng ta có thể thực hiện cái trước với phần mềm trung gian và cái sau bằng cách truy cập requestđối tượng trong trình phân giải.
// // Đây là mã máy chủ thực hiện điều này:
// const loggingMiddleware = (req, res, next) => {
//   console.log("ip:", req.ip);
//   next();
// };
// var schema: any = buildSchema(`
//   type Query {
//     ip: String
//   }
// `);

// var root = {
//   ip: function (args, request) {
//     return request.ip;
//   },
// };
// // app.use(
// //   "/graphql",
// //   graphqlHTTP({
// //     schema: schema,
// //     rootValue: root,
// //     graphiql: true,
// //   })
// // );
// app.use(loggingMiddleware);

// // HEALTH CHECKER
// app.get("/api/healthchecker", async (_, res: Response) => {
//   res.status(200).json({
//     status: "success",
//     message: "test ",
//   });
// });

// //connect sql server
// mssql
//   .connect(config)
//   .then((e) => {
//     console.log("Connected to SQL Server");
//     server = app.listen(3000, () => {
//       console.log(`Listening on port ${3000}`);
//     });
//   })
//   .catch((e) => {
//     console.error(e);
//   });
