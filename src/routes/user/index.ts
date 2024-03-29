import TipEmailController from "../../apps/controllers/tip-js/email.controller";
import TipUserController from "../../apps/controllers/tip-js/user.controller";
import { asyncHandler } from "../../helpers/asyncHandler";

const router = require("express").Router();

// Get all users
router.post("/new-user", asyncHandler(TipUserController.newUser));

export default router;
