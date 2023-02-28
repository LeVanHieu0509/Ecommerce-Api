import { checkIsUser } from "./../middlewares/checkIsUser";
import { checkJwt } from "./../middlewares/checkJwt.handler";
import PostController from "../apps/controllers/PostController";
import { checkIsAuthor } from "../middlewares/checkIsAuthor";
const router = require("express").Router();

// Get all users
router.get("/", PostController.listAll);
router.get("/:id", PostController.findOneBy);
router.post("/", [checkJwt], PostController.addNew);
router.put("/:id", [checkJwt, checkIsUser], PostController.edit);
router.delete("/:id", PostController.delete);

export default router;
