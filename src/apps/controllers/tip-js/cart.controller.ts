import { NextFunction } from "express";
import { SuccessResponse } from "../../../core/success.response";
import { RequestCustom } from "../../auth/authUtils";
import CartService from "../../service/TIP/cart.service";

class CartController {
  public static addToCart = async (req: RequestCustom, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "Create new Cart success",
      metadata: await CartService.addToCart(req.body),
    }).send(res);
  };

  public static update = async (req: RequestCustom, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "Create new Cart success",
      metadata: await CartService.addToCartV2(req.body),
    }).send(res);
  };

  public static delete = async (req: RequestCustom, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "Delete Item User Cart",
      metadata: await CartService.deleteUserCart(req.body),
    }).send(res);
  };

  public static listToCart = async (req: RequestCustom, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "list To Cart",
      metadata: await CartService.getListUserCart(req.query),
    }).send(res);
  };
}

export default CartController;
