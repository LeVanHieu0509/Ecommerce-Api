import { NextFunction } from "express";
import { RequestCustom } from "../../auth/authUtils";
import { SuccessResponse } from "../../../core/success.response";
import { newTemplate } from "../../service/TIP/template.service";

class TipEmailController {
  constructor(parameters) {}

  public static newTemplate = async (req: RequestCustom, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "Create new Cart add stock to inventory success",
      metadata: await newTemplate(req.body),
    }).send(res);
  };
}

export default TipEmailController;
