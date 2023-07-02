import { authentication } from "../../apps/auth/authUtils";
import CartController from "../../apps/controllers/tip-js/cart.controller";

import { asyncHandler } from "../../helpers/asyncHandler";

const router = require("express").Router();

router.use(authentication);
// Get all users
router.post("", asyncHandler(CartController.addToCart));
router.delete("", asyncHandler(CartController.delete));

router.post("/update", asyncHandler(CartController.update));
router.get("", asyncHandler(CartController.listToCart));

export default router;
