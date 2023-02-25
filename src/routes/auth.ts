import UserController from "../apps/controllers/UserController";
const router = require("express").Router();

// Get all users
router.get("/", UserController.listAll);
router.post("/", UserController.addNew);

router.post("/test", UserController.showListUser);

export default router;
