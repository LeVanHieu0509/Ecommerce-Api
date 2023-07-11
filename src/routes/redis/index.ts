import { authentication } from "../../apps/auth/authUtils";
import RedisController from "../../apps/controllers/redis";

import { asyncHandler } from "../../helpers/asyncHandler";

const router = require("express").Router();

// Get all users
router.use(authentication);
router.put("/set-promise", asyncHandler(RedisController.setPromise));
router.get("/get-promise", asyncHandler(RedisController.getPromise));

export default router;
