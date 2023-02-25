var express = require("express");
const path = require("path");
import { Request, Response } from "express";
import { User } from "./apps/models/entities/user.entity";
import { AppDataSource } from "./data-source";
import { Photo } from "./apps/models/entities/photo.entity";
var bodyParser = require("body-parser");
const route = require("./routes");
// establish database connection

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

// register routes
// app.get("/users", async function (req: Request, res: Response) {
//   const users = await AppDataSource.getRepository(User).find();
//   res.json(users);
// });

// app.get("/users/:id", async function (req: Request, res: Response) {
//   const results = await AppDataSource.getRepository(User).findOneBy({
//     id: req.params.id,
//   });
//   return res.send(results);
// });

// app.post("/users", async function (req: Request, res: Response) {
//   const user = await AppDataSource.getRepository(User).create(req.body);
//   const results = await AppDataSource.getRepository(User).save(user);
//   return res.send(results);
// });

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

// app.get("/photo", async function (req: Request, res: Response) {
//   const photoRepository = AppDataSource.getRepository(Photo);
//   const allPhotos = await photoRepository.find();
//   console.log("All photos from the db: ", allPhotos);

//   const firstPhoto = await photoRepository.findOneBy({
//     id: 1,
//   });
//   console.log("First photo from the db: ", firstPhoto);

//   const meAndBearsPhoto = await photoRepository.findOneBy({
//     name: "Me and Bears",
//   });
//   console.log("Me and Bears photo from the db: ", meAndBearsPhoto);

//   const allViewedPhotos = await photoRepository.findBy({ views: 1 });
//   console.log("All viewed photos: ", allViewedPhotos);

//   const allPublishedPhotos = await photoRepository.findBy({
//     isPublished: true,
//   });
//   console.log("All published photos: ", allPublishedPhotos);

//   const [photos, photosCount] = await photoRepository.findAndCount();
//   console.log("All photos: ", photos);
//   console.log("Photos count: ", photosCount);
//   res.json(allPhotos);
// });

// start express server
var server = app.listen(5000, function () {
  console.log("Server is running..");
});
