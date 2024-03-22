import { listResources, listRoles, newResource, newRole } from "../../apps/controllers/tip-js/rbac.controller";
import { asyncHandler } from "../../helpers/asyncHandler";

const router = require("express").Router();

// Get all users
router.post("/role", asyncHandler(newRole));
router.get("/roles", asyncHandler(listRoles));

router.post("/resource", asyncHandler(newResource));
router.get("/resources", asyncHandler(listResources));

export default router;
