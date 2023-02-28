import { Request } from "express";
import { AppDataSource } from "../data-source";
import { Comment } from "../apps/modules/entities/comment.entity";
import Post from "../apps/modules/entities/post.entity";

export const checkIsAuthor = (req: Request, res: any, next: any) => {
  const currentUserId = req.payload.userId;
  AppDataSource.getRepository(Post)
    .findOne(req.params.id)
    .then((posts: Post) => {
      const authorId = posts.user.id;
      if (authorId === currentUserId) {
        next();
      } else {
        res.status(401).json({
          message: "Not Allowed as you are not the owner of this author",
        });
        return;
      }
    });
};
