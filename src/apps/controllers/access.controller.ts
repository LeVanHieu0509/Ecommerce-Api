import { NextFunction, Request, Response } from "express";
import AccessService from "../service/access.service";

class AccessController {
  public static signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(`[P]::signUp`, req.body);
      return res.status(201).json(await AccessService.signUp(req.body));
    } catch (error) {
      next(error);
    }
  };
}

export default AccessController;
