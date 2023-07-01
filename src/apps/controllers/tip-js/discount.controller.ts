import { NextFunction } from "express";
import { SuccessResponse } from "../../../core/success.response";
import { RequestCustom } from "../../auth/authUtils";
import DiscountService from "../../service/TIP/discount.service";

class DiscountController {
  public static createDiscountCode = async (req: RequestCustom, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "Successful code generation",
      metadata: await DiscountService.createDiscountCode({
        ...req.body,
        shopId: req.user.userId,
      }),
    }).send(res);
  };

  public static getAllDiscountCodeWithShop = async (req: RequestCustom, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "Successful Code Found",
      metadata: await DiscountService.getAllDiscountCodeWithShop({
        ...req.query,
        shopId: req.user.userId,
      }),
    }).send(res);
  };

  public static getDiscountAmount = async (req: RequestCustom, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "Successful Code Found",
      metadata: await DiscountService.getDiscountAmount({
        ...req.body,
        shopId: req.user.userId,
      }),
    }).send(res);
  };

  public static getAllDiscountCodeWithProduct = async (req: RequestCustom, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "Successful Code Found",
      metadata: await DiscountService.getAllDiscountCodeWithProduct({
        ...req.query,
        shopId: req.user.userId,
      }),
    }).send(res);
  };
}

export default DiscountController;
