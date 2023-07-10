import { NextFunction, Response } from "express";
import { SuccessResponse } from "../../../core/success.response";
import InventoryService from "../../service/TIP/inventory.service";
import { RequestCustom } from "./../../auth/authUtils";

class InventoryController {
  public static addStockToInventory = async (req: RequestCustom, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "Create new Cart add stock to inventory success",
      metadata: await InventoryService.addStockToInventory(req.body),
    }).send(res);
  };
}
export default InventoryController;
