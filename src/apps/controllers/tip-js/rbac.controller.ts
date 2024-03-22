import { NextFunction } from "express";
import { SuccessResponse } from "../../../core/success.response";
import { RequestCustom } from "../../auth/authUtils";
import { createResource, createRole, resourceList, roleList } from "../../service/TIP/rbac.service";

const newRole = async (req: RequestCustom, res: Response, next: NextFunction) => {
  new SuccessResponse({
    message: "create role",
    metadata: await createRole(req.body),
  }).send(res);
};

const newResource = async (req: RequestCustom, res: Response, next: NextFunction) => {
  new SuccessResponse({
    message: "create resource",
    metadata: await createResource(req.body),
  }).send(res);
};

const listRoles = async (req: RequestCustom, res: Response, next: NextFunction) => {
  new SuccessResponse({
    message: "get list role 1",
    metadata: await roleList(req.query),
  }).send(res);
};

const listResources = async (req: RequestCustom, res: Response, next: NextFunction) => {
  new SuccessResponse({
    message: "get list role",
    metadata: await resourceList(req.query as any),
  }).send(res);
};

export { newRole, newResource, listRoles, listResources };
