import EventEmitter = require("events");
import { createConnection } from "typeorm";
import { User } from "../models/entities/user.entity";
import { Logger } from "../../lib/logger";
import config from "../config/config";
var sql = require("mssql");

class DatabaseService {
  public static emitter: EventEmitter = new EventEmitter();
  public static isConnected = false;
  public static logger: any = new Logger();

  public static async getConnection(callback = null, wait = false) {
    DatabaseService.handleConnectionError();
    return await DatabaseService.createConnection();
  }

  public static async createConnection() {
    //const dbConfig = config[`development`];

    var config = {
      user: "sa",
      password: "Levanhieu1",
      server: "localhost",
      database: "test",
      port: 1432,
      synchronize: true,
      trustServerCertificate: true,
    };

    let myPromise = new Promise(function (myResolve, myReject) {
      // "Producing Code" (May take some time)
      try {
        let sql1223 = sql.connect(config, function (err) {});
        myResolve(sql1223);
      } catch (error) {
        myReject(error);
      }
    });

    // "Consuming Code" (Must wait for a fulfilled Promise)
    return myPromise
      .then(function (value) {
        DatabaseService.isConnected = true;
        DatabaseService.logger.log("info", "database connected successfully");
      })
      .catch((err) => {
        DatabaseService.logger.log(
          "info",
          "database connection error...retrying"
        );
        DatabaseService.emitter.emit("DB_CONNECT_ERROR");
      });

    // return await createConnection({
    //   type: "mysql",
    //   host: "localhost",
    //   port: 1433,
    //   username: "sa",
    //   password: "Levanhieu1",
    //   database: "test",
    // })
    //   .then(() => {
    //     DatabaseService.isConnected = true;
    //     DatabaseService.logger.log("info", "database connected successfully");
    //   })
    //   .catch((err: Error) => {
    //     DatabaseService.logger.log(
    //       "info",
    //       "database connection error...retrying"
    //     );
    //     DatabaseService.emitter.emit("DB_CONNECT_ERROR");
    //   });
  }
  public static async handleConnectionError() {
    DatabaseService.emitter.on("DB_CONNECT_ERROR", async () => {
      DatabaseService.logger.log(
        "info",
        "database connection error...retrying"
      );
      setTimeout(async () => {
        await DatabaseService.createConnection();
      }, 3000);
    });
  }
}

export { DatabaseService };
