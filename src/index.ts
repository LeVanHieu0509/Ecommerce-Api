import { DatabaseService } from "./apps/service/databaseService";
import * as http from "http";
import { Logger } from "./lib/logger";
const dotenv = require("dotenv"); // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
var bodyParser = require("body-parser");
var express = require("express");
var app = express();
dotenv.config();

// app.get("/", function (req, res) {
//   var sql = require("mssql");
//   // config for your database
//   var config = {
//     user: "sa",
//     password: "Levanhieu1",
//     server: "localhost",
//     database: "test",
//     port: 1433,
//     synchronize: true,
//     trustServerCertificate: true,
//   };
//   // connect to your database
//   sql.connect(config, function (err) {
//     if (err) console.log(err);
//     // create Request object
//     var request = new sql.Request();
//     // query to the database and get the records
//     request.query("select * from USERS", function (err, recordset) {
//       console.log("sql connected");
//       if (err) console.log(err);
//       // send records as a response
//       res.send(recordset);
//     });
//   });
// });
// var server = app.listen(5000, function () {
//   console.log("Server is running..");
// });

// const logger: any = new Logger();

// DatabaseService.getConnection().then(() => {
//   const server = app.listen(parseInt(process.env.PORT || "5000", 10));
//   server.on("listening", async () => {
//     logger.log(
//       "info",
//       `Sample app listening on ${JSON.stringify(server.address())}`
//     );
//   });
//   logger.log(
//     "info",
//     `Sample app listening on ${JSON.stringify(server.address())}`
//   );
// });
