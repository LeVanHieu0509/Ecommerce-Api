import { asyncHandler } from "../../apps/auth/checkAuth";
import AccessController from "../../apps/controllers/access.controller";

const router = require("express").Router();

// Get all users
router.post("/shop/signup", asyncHandler(AccessController.signUp));

export default router;
