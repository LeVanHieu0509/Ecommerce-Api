import { authentication } from "../../apps/auth/authUtils";
import AccessController from "../../apps/controllers/access.controller";
import { asyncHandler } from "../../helpers/asyncHandler";

const router = require("express").Router();

// Get all users
router.post("/user/login", asyncHandler(AccessController.login));
router.post("/user/signup", asyncHandler(AccessController.signUp));

router.use(authentication);
router.post("/user/logout", asyncHandler(AccessController.logout));

router.post("/user/changePassword", asyncHandler(AccessController.changePassword));

export default router;
