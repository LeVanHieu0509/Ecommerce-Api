import { authentication } from "../../apps/auth/authUtils";
import ProductController from "../../apps/controllers/tip-js/product.controller";
import { asyncHandler } from "../../helpers/asyncHandler";

const router = require("express").Router();

router.use(authentication);
router.post("", asyncHandler(ProductController.createProduct));

//Query
router.get("/drafts/all", asyncHandler(ProductController.getAllDraftsForShop));

export default router;
