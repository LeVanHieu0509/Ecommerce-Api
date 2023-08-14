import { NextFunction, Response } from "express";
import { SuccessResponse } from "../../../core/success.response";
import CheckoutService from "../../service/TIP/checkout.service";
import { RequestCustom } from "./../../auth/authUtils";
import CommentServices from "../../service/TIP/comment.service";

class CommentsController {
  public static createComment = async (req: RequestCustom, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "Create new Comment success",
      metadata: await CommentServices.createComment(req.body),
    }).send(res);
  };

  public static getComments = async (req: RequestCustom, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "get list comment success",
      metadata: await CommentServices.getCommentsByParentId(req.query),
    }).send(res);
  };

  public static deleteComment = async (req: RequestCustom, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "get list comment success",
      metadata: await CommentServices.deleteComment(req.body),
    }).send(res);
  };
}
export default CommentsController;
