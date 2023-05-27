import { NextFunction, Response } from "express";
import { SuccessResponse } from "../../../core/success.response";
import { RequestCustom } from "../../auth/authUtils";
import ProductFactory from "../../service/product.service";

class ProductController {
  public static createProduct = async (req: RequestCustom, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "Create new Product success!",
      metadata: await ProductFactory.createProduct(req.body.type, {
        ...req.body,
        tip_shop: req.user.userId,
      }),
    }).send(res);
  };
}

export default ProductController;
