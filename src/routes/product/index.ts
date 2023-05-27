import { authentication } from "../../apps/auth/authUtils";
import ProductController from "../../apps/controllers/tip-js/product.controller";
import { asyncHandler } from "../../helpers/asyncHandler";

const router = require("express").Router();

router.use(authentication);
router.post("", asyncHandler(ProductController.createProduct));

export default router;
