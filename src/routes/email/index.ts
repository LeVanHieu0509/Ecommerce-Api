import TipEmailController from "../../apps/controllers/tip-js/email.controller";
import { asyncHandler } from "../../helpers/asyncHandler";

const router = require("express").Router();

// Get all users
router.post("/new-template", asyncHandler(TipEmailController.newTemplate));

export default router;
