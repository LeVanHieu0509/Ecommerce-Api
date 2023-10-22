import { uploadDisk } from "../../apps/config/multer.config";
import UploadController from "../../apps/controllers/tip-js/upload.controller";

import { asyncHandler } from "../../helpers/asyncHandler";

const router = require("express").Router();

// Get all users
router.post("/product", asyncHandler(UploadController.uploadFile));
router.post("/product/thumb", uploadDisk.single("file"), asyncHandler(UploadController.uploadThump));
router.post(
  "/product/thumb-multi",
  uploadDisk.fields([
    { name: "file1", maxCount: 8 },
    { name: "file2", maxCount: 8 },
  ]),
  asyncHandler(UploadController.uploadMultiThump)
);

export default router;
