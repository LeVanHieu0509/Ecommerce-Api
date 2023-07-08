import { authentication } from "../../apps/auth/authUtils";
import CheckoutController from "../../apps/controllers/tip-js/checkout.controller";

import { asyncHandler } from "../../helpers/asyncHandler";

const router = require("express").Router();

router.use(authentication);
// Get all users
router.post("/review", asyncHandler(CheckoutController.checkoutReview));

export default router;
