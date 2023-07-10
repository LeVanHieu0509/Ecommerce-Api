import { authentication } from "../../apps/auth/authUtils";
import InventoryController from "../../apps/controllers/tip-js/inventory.controller";

import { asyncHandler } from "../../helpers/asyncHandler";

const router = require("express").Router();

// Get all users
router.use(authentication);
router.post("", asyncHandler(InventoryController.addStockToInventory));

export default router;
