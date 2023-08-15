import { NextFunction, Response } from "express";
import { SuccessResponse } from "../../../core/success.response";
import CheckoutService from "../../service/TIP/checkout.service";
import { RequestCustom } from "./../../auth/authUtils";
import CommentServices from "../../service/TIP/comment.service";
import { listNotiByUser } from "../../service/TIP/notification.service";

class NotificationController {
  public static listNotiByUser = async (req: RequestCustom, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "Get list notification by user success",
      metadata: await listNotiByUser(req.query),
    }).send(res);
  };
}
export default NotificationController;
