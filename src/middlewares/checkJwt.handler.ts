import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export const checkJwt = (req: Request, res: any, next: any) => {
  // if (!res.header.authorization) {
  //   res.status(401).json({
  //     message: "auth token not provide",
  //   });
  // }

  const token = req.headers["authorization"].split(" ")[1];

  if (!token) res.sendStatus(401);

  jwt.verify(token, "uashduha213", (err, data) => {
    if (!token) res.sendStatus(401);
    next();
  });

  // try {
  //   //let payload = jwt.verify(token, "secretKey") as any;

  //   // let payload = jwt.verify(token, "dsadasdas");
  //   // console.log(payload);

  //   //req["payload"] = payload;
  //   res.status(200).json({ message: " token" });
  // } catch (error) {
  //   res.status(401).json({ message: "invalid token" });
  //   next(error);
  // }
};
