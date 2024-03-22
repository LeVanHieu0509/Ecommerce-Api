import { uploadDisk, uploadMemory } from "../../apps/config/multer.config";
import UploadController from "../../apps/controllers/tip-js/upload.controller";

import { asyncHandler } from "../../helpers/asyncHandler";

const router = require("express").Router();

// Get all users
router.post("/product", asyncHandler(UploadController.uploadFile));
router.post("/product/thumb", uploadDisk.single("file"), asyncHandler(UploadController.uploadThump));
router.post("/product/thumb-multi", uploadDisk.array("files", 3), asyncHandler(UploadController.uploadMultiThump));

//Upload S3
router.post("/product/thumb-s3", uploadMemory.single("file"), asyncHandler(UploadController.uploadThumpS3));

export default router;
