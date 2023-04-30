import { NextFunction, Request, Response } from "express";
import { CREATED, SuccessResponse } from "../../core/success.response";
import { HEADER } from "../auth/authUtils";
import AccessService from "../service/access.service";

interface RequestCustom extends Request {
  keyStore: any;
}

class AccessController {
  public static logout = async (req: RequestCustom, res: Response, next: NextFunction) => {
    try {
      new SuccessResponse({
        message: "Logout Success",
        statusCode: 200,
        metadata: await AccessService.logout(req.keyStore),
      }).send(res);

      res.json().status(200);
    } catch (error) {
      next(error);
    }
  };

  public static login = async (req: RequestCustom, res: Response, next: NextFunction) => {
    try {
      new SuccessResponse({
        message: "Login ok!",
        metadata: await AccessService.login(req.body),
      }).send(res);
    } catch (error) {
      next(error);
    }
  };

  public static signUp = async (req: RequestCustom, res: Response, next: NextFunction) => {
    try {
      new CREATED({
        message: "Registeded ok!",
        metadata: await AccessService.signUp(req.body),
        options: {
          limit: 10,
        },
      }).send(res);
    } catch (error) {
      next(error);
    }
  };

  public static changePassword = async (req: RequestCustom, res: Response, next: NextFunction) => {
    const userId = req.headers[HEADER.CLIENT_ID];
    try {
      new CREATED({
        message: "Changed ok!",
        metadata: await AccessService.changePassword(req.body, Number(userId)),
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
}

export default AccessController;
