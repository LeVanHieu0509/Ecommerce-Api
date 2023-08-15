import { getProductById } from './../../apps/modules/repos/product.repo';
import { authentication } from "../../apps/auth/authUtils";
import CommentsController from "../../apps/controllers/tip-js/comment.controller";
import InventoryController from "../../apps/controllers/tip-js/inventory.controller";

import { asyncHandler } from "../../helpers/asyncHandler";
import NotificationController from '../../apps/controllers/tip-js/notification.controller';

const router = require("express").Router();

// Get all users
router.use(authentication);
router.use("", asyncHandler(NotificationController.listNotiByUser));

export default router;
