import { NextFunction, Request, Response } from "express";
import { ServerException } from "../../lib/custom-errors";
import Template from "../global/response";
import APIError from "../global/response/apierror";
import { PostService } from "../service/PostService";
const service = new PostService();

class PostController {
  public static listAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    service
      .get()
      .then((users) => {
        if (users && users.length > 0) {
          res.json(Template.success(users, "Posts Feated succesfully"));
        } else {
          res.json(Template.success(users, "Posts Feated succesfully"));
        }
      })
      .catch((err) => {
        next(new ServerException("error occured"));
      });
  };

  public static findOneBy = (req: Request, res: Response, next: any) => {
    const { id } = req.params;

    service
      .getOneById(Number(id))
      .then((user) => {
        if (user) {
          res.json(Template.success(user, "Posts saved succesfully"));
        }
      })
      .catch((err) => {
        if (err.ErrorID == 2110) {
          next(new APIError(err.message, err.ErrorID));
        }
        next(new ServerException("error occured"));
      });
  };

  public static addNew = (req: Request, res: Response, next: any) => {
    const { userId } = req.body;

    service
      .add(req.body, userId)
      .then((user) => {
        if (user) {
          res.json(Template.success(user, "Posts saved succesfully"));
        }
      })
      .catch((err) => {
        if (err.ErrorID == 2110) {
          next(new APIError(err.message, err.ErrorID));
        }
        next(new ServerException("error occured"));
      });
  };

  public static edit = (req: Request, res: Response, next: any) => {
    const { userId } = req.payload;
    const { id } = req.params;

    service
      .edit(req.body, userId, id)
      .then((user) => {
        if (user) {
          res.json(Template.success(user, "Posts saved succesfully"));
        }
      })
      .catch((err) => {
        if (err.ErrorID == 2110) {
          next(new APIError(err.message, err.ErrorID));
        }
        next(new ServerException("error occured"));
      });
  };

  //delete
  public static delete = (req: Request, res: Response, next: any) => {
    const { id } = req.params;

    service
      .delete(Number(id))
      .then((user) => {
        if (user) {
          res.json(Template.success(user, "Users saved succesfully"));
        }
      })
      .catch((err) => {
        if (err.ErrorID == 2110) {
          next(new APIError(err.message, err.ErrorID));
        }
        next(new ServerException("error occured"));
      });
  };
}
export default PostController;
