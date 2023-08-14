import { authentication } from "../../apps/auth/authUtils";
import CommentsController from "../../apps/controllers/tip-js/comment.controller";
import InventoryController from "../../apps/controllers/tip-js/inventory.controller";

import { asyncHandler } from "../../helpers/asyncHandler";

const router = require("express").Router();

// Get all users
router.use(authentication);
router.post("", asyncHandler(CommentsController.createComment));
router.get("/", asyncHandler(CommentsController.getComments));
router.delete("/", asyncHandler(CommentsController.deleteComment));



export default router;
