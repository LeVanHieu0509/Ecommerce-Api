import bodyParser from "body-parser";
import { Server } from "http";
import mssql, { config as Config } from "mssql";
import path from "path";
import route from "./routes";
import express, { Response } from "express";
import redisClient from "./ultis/connectRedis";

const config: Config = {
  server: "localhost",
  port: 1433,
  user: "sa",
  password: "Levanhieu1",
  database: "test",
};

const app = express();
var server: Server;

app.use(bodyParser.urlencoded({ extended: true })); //if false then parse only strings
app.use(bodyParser.json());
// Static file
app.use(express.static(path.join(__dirname, "public")));
route(app);

// HEALTH CHECKER
app.get("/api/healthchecker", async (_, res: Response) => {
  const message = await redisClient.get("try");
  res.status(200).json({
    status: "success",
    message,
  });
});

mssql
  .connect(config)
  .then((e) => {
    console.log("Connected to SQL Server");
    server = app.listen(3000, () => {
      console.log(`Listening on port ${3000}`);
    });
  })
  .catch((e) => {
    console.error(e);
  });
