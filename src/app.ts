var express = require("express");
const path = require("path");
import * as dotenv from "dotenv";
import { Request, Response } from "express";
import { User } from "./apps/modules/entities/user.entity";
import { AppDataSource } from "./data-source";
import { Photo } from "./apps/modules/entities/photo.entity";
var bodyParser = require("body-parser");
const route = require("./routes");
// establish database connection
dotenv.config();

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

// create and setup express app

var app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true })); //if false then parse only strings
app.use(bodyParser.json());
// Static file
app.use(express.static(path.join(__dirname, "public")));

route(app);

app.get("/", (req, res) => {
  res.json("home");
});

// app.put("/users/:id", async function (req: Request, res: Response) {
//   const user = await AppDataSource.getRepository(User).findOneBy({
//     id: req.params.id,
//   });
//   AppDataSource.getRepository(User).merge(user, req.body);
//   const results = await AppDataSource.getRepository(User).save(user);
//   return res.send(results);
// });

// app.delete("/users/:id", async function (req: Request, res: Response) {
//   const results = await AppDataSource.getRepository(User).delete(req.params.id);
//   return res.send(results);
// });

//   const [photos, photosCount] = await photoRepository.findAndCount();
//   console.log("All photos: ", photos);
//   console.log("Photos count: ", photosCount);
//   res.json(allPhotos);
// });

// start express server
var server = app.listen(5000, function () {
  console.log("Server is running..");
});
