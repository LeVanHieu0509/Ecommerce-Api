import { NextFunction, Request, Response } from "express";
import { CREATED, SuccessResponse } from "../../core/success.response";
import AccessService from "../service/access.service";

class AccessController {
  public static login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      new SuccessResponse({
        message: "Login ok!",
        metadata: await AccessService.login(req.body),
      }).send(res);
    } catch (error) {
      next(error);
    }
  };

  public static signUp = async (req: Request, res: Response, next: NextFunction) => {
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
}

export default AccessController;
