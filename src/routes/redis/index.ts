import { authentication } from "../../apps/auth/authUtils";
import RedisController from "../../apps/controllers/redis";

import { asyncHandler } from "../../helpers/asyncHandler";

const router = require("express").Router();

// Get all users
router.use(authentication);
router.put("/set-promise", asyncHandler(RedisController.setPromise));
router.post("/get-promise", asyncHandler(RedisController.getPromise));
router.post("/publish", asyncHandler(RedisController.publishRedis));


export default router;
