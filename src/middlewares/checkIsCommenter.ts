import { Request } from "express";
import { AppDataSource } from "../data-source";
import { Comment } from "./../apps/modules/entities/comment.entity";

export const checkIsCommenter = (req: Request, res: any, next: any) => {
  const currentUserId = req.payload.userId;
  AppDataSource.getRepository(Comment)
    .findOne(req.params.id)
    .then((comment: Comment) => {
      const commenterId = comment.user.id;
      if (commenterId === currentUserId) {
        next();
      } else {
        res.status(401).json({
          message: "Not Allowed as you are not the owner of this commend",
        });
        return;
      }
    });
};
