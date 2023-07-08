import { NextFunction, Response } from "express";
import { SuccessResponse } from "../../../core/success.response";
import CheckoutService from "../../service/TIP/checkout.service";
import { RequestCustom } from "./../../auth/authUtils";

class CheckoutController {
  public static checkoutReview = async (req: RequestCustom, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "Create new Cart success",
      metadata: await CheckoutService.checkoutReview(req.body),
    }).send(res);
  };
}
export default CheckoutController;
