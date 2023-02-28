import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export const checkIsUser = (req: Request, res: any, next: any) => {
  const currentUserId = req.payload.userId;
  if (currentUserId == Number(req.params.id)) {
    next();
  } else {
    res
      .status(401)
      .json({ message: "You are not adllowed for this operations" });
  }
};
