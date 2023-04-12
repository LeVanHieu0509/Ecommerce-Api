import AccessController from "../../apps/controllers/access.controller";
import { asyncHandler } from "../../helpers/asyncHandler";

const router = require("express").Router();

// Get all users
router.post("/user/login", asyncHandler(AccessController.login));
router.post("/user/signup", asyncHandler(AccessController.signUp));

//authentication
router.post("/user/signup", asyncHandler(AccessController.signUp));

export default router;
