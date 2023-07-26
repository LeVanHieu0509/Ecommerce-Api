import { authentication } from "../../apps/auth/authUtils";
import RedisController from "../../apps/controllers/redis";

import { asyncHandler } from "../../helpers/asyncHandler";
import { pushToLogDiscord } from "../../middlewares/discord";


const router = require("express").Router();

// Get all users
// router.use(authentication);
router.post("/test", pushToLogDiscord);

export default router;
