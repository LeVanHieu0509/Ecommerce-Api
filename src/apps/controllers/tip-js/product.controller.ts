import { NextFunction, Response } from "express";
import { SuccessResponse } from "../../../core/success.response";
import { RequestCustom } from "../../auth/authUtils";
import ProductFactoryLvXXX from "../../service/product.service.lv-xxx";

class ProductController {
  public static createProduct = async (req: RequestCustom, res: Response, next: NextFunction) => {
    // new SuccessResponse({
    //   message: "Create new Product success!",
    //   metadata: await ProductFactory.createProduct(req.body.type, {
    //     ...req.body,
    //     tip_shop: req.user.userId,
    //   }),
    // }).send(res);

    new SuccessResponse({
      message: "Create new Product success!",
      metadata: await ProductFactoryLvXXX.createProduct(req.body.product_type, {
        ...req.body,
        tip_shop: req.user.userId,
      }),
    }).send(res);
  };

  public static publishProductByShop = async (req: RequestCustom, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "Create publish Product By Shop success!",
      metadata: await ProductFactoryLvXXX.publishProductByShop({
        product_id: req.params.id,
        tip_shop: req.user.userId,
      }),
    }).send(res);
  };

  public static unPublishProductByShop = async (req: RequestCustom, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "Un-publish Product By Shop success!",
      metadata: await ProductFactoryLvXXX.unPublishProductByShop({
        product_id: req.params.id,
        tip_shop: req.user.userId,
      }),
    }).send(res);
  };
  /**
  /**
   *
   * @desc: get all
   * @param {String} limit
   * @param Number limit
   * @param next
   * @return {JSON}
   */
  public static getAllDraftsForShop = async (req: RequestCustom, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "Query draft product success!",
      metadata: await ProductFactoryLvXXX.findAllDraftsForShop({ tip_shop: req.user.userId }),
    }).send(res);
  };

  public static getAllPublishedForShop = async (req: RequestCustom, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "Query published product success!",
      metadata: await ProductFactoryLvXXX.findAllPublishedForShop({ tip_shop: req.user.userId }),
    }).send(res);
  };

  public static getListSearchProduct = async (req: RequestCustom, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "get list search product success!",
      metadata: await ProductFactoryLvXXX.searchProduct(req.params),
    }).send(res);
  };

  public static getListAllProduct = async (req: RequestCustom, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "get list product success!",
      metadata: await ProductFactoryLvXXX.findAllProduct(req.query),
    }).send(res);
  };

  public static getProduct = async (req: RequestCustom, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "get product success!",
      metadata: await ProductFactoryLvXXX.getProduct({
        product_id: req.params.product_id,
      }),
    }).send(res);
  };

  public static updateProduct = async (req: RequestCustom, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "update product success!",
      metadata: await ProductFactoryLvXXX.updateProduct(req.body.product_type, req.params.product_id, {
        ...req.body,
        tip_shop: req.user.userId,
      }),
    }).send(res);
  };
}

export default ProductController;
