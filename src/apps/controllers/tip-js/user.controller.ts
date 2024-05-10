import { NextFunction } from "express";
import { RequestCustom } from "../../auth/authUtils";
import { SuccessResponse } from "../../../core/success.response";
import { checkTokenEmailTokenService, newUser } from "../../service/TIP/user.service";

class TipUserController {
  constructor(parameters) {}

  // new user
  public static newUser = async (req: RequestCustom, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "Create new user",
      metadata: await newUser(req.body),
    }).send(res);
  };

  public static checkLoginEmailToken = async (req: RequestCustom, res: Response, next: NextFunction) => {
    const { token = null } = req.query;
    new SuccessResponse({
      message: "welcome-back",
      metadata: await checkTokenEmailTokenService({ token }),
    }).send(res);
  };
}

export default TipUserController;
