import { verifyJwt } from "./../ultis/jwt";
import { NextFunction, Request, Response } from "express";
import errorHandler from "../ultis/error";

export const authUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    let access_token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      access_token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.access_token) {
      const { access_token: token } = req.cookies;
      access_token = token;
    }

    if (!access_token) return false;

    const decoded = verifyJwt(access_token, "JWT_ACCESS_PUBLIC_KEY");

    if (!decoded) return false;

    return next();
    //check user exits
  } catch (error) {
    errorHandler(error);
  }
};
