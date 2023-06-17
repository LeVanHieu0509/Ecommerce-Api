import { authentication } from "../../apps/auth/authUtils";
import ProductController from "../../apps/controllers/tip-js/product.controller";
import { asyncHandler } from "../../helpers/asyncHandler";

const router = require("express").Router();

router.use(authentication);
router.post("", asyncHandler(ProductController.createProduct));
router.post("/publish/:id", asyncHandler(ProductController.publishProductByShop));
router.post("/un-publish/:id", asyncHandler(ProductController.unPublishProductByShop));
router.post("/search/:keySearch", asyncHandler(ProductController.getListSearchProduct));

//Query
router.get("", asyncHandler(ProductController.getListAllProduct));
router.get("/drafts/all", asyncHandler(ProductController.getAllDraftsForShop));
router.get("/published/all", asyncHandler(ProductController.getAllPublishedForShop));
router.get("/:product_id", asyncHandler(ProductController.getProduct));

export default router;
