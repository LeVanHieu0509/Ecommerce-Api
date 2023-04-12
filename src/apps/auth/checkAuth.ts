import { NextFunction, Request, Response } from "express";
import findById from "../service/apiKey.service";

interface RequestCustom extends Request {
  objKey: any;
}
const HEADER = {
  API_KEY: "x-api-key",
  AUTHORIZATION: "authorization",
};

const apiKey = async (req: RequestCustom, res: Response, next: NextFunction) => {
  try {
    const key = req.headers[HEADER.API_KEY]?.toString();
    if (!key) {
      return res.status(403).json({ message: "Forbidden Error" });
    }

    const objKey = await findById(key);

    if (!objKey) {
      return res.json({ status: "-1", message: "permission denied" });
    }

    req.objKey = objKey;

    return next();
  } catch (e) {
    return res.json({ status: "-1", message: "permission denied" });
  }
};

const permission = (permission) => {
  return (req: RequestCustom, res: Response, next: NextFunction) => {
    try {
      if (!req.objKey.permissions) {
        return res.json({ status: "-1", message: "permission denied" });
      }

      const validPermission = req.objKey.permissions.includes(permission);

      if (!validPermission) {
        return res.json({ status: "-1", message: "permission denied" });
      }
      return next();
    } catch (error) {
      return res.json({ status: "-1", message: "permission denied" });
    }
  };
};

export { apiKey, permission };
