import { NextFunction } from "express";
import { RequestCustom } from "../../auth/authUtils";
import { SuccessResponse } from "../../../core/success.response";
import { newUser } from "../../service/TIP/user.service";

class TipUserController {
  constructor(parameters) {}

  // new user
  public static newUser = async (req: RequestCustom, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "Create new user",
      metadata: await newUser(req.body),
    }).send(res);
  };
}

export default TipUserController;
