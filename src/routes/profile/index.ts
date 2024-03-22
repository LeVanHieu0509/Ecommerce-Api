import ProfileController from "../../apps/controllers/tip-js/profile.controller";

import { grantAccess } from "../../middlewares/rbac";

const router = require("express").Router();

// admin có truyền truy cập tất cả các profile của shop
const profiles = [{}, {}, []];

router.get("/viewAny", grantAccess({ action: "readAny", resource: "profile" }), ProfileController.profiles);

//shop
const profile = {};

router.get("/viewOwn", grantAccess({ action: "readOwn", resource: "profile" }), ProfileController.profile);
// Get all users
// router.use(authentication);
// router.post("", asyncHandler(CommentsController.createComment));

export default router;
