import { authentication } from "../../apps/auth/authUtils";
import DiscountController from "../../apps/controllers/tip-js/discount.controller";

import { asyncHandler } from "../../helpers/asyncHandler";

const router = require("express").Router();

// Get all users
router.post("/amount", asyncHandler(DiscountController.getDiscountAmount));
router.get("/list_product_code", asyncHandler(DiscountController.getAllDiscountCodeWithProduct));

router.use(authentication);

router.post("", asyncHandler(DiscountController.createDiscountCode));
router.get("", asyncHandler(DiscountController.getAllDiscountCodeWithShop));

export default router;
