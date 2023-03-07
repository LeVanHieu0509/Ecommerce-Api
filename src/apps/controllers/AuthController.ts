import { Response, Request, NextFunction } from "express";
import User from "../modules/entities/user.entity";
import * as jwt from "jsonwebtoken";
import { validate } from "class-validator";
import { getRepository } from "typeorm";

class AuthController {
  // public static login = async (
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) => {
  //   const { username, password } = req.body;
  //   const userRepo = getRepository(User);
  //   let user: User;
  //   try {
  //     user = await userRepo
  //       .createQueryBuilder("user")
  //       .addSelect("user.password")
  //       .where("user.username = :username", { username })
  //       .getOne();
  //   } catch (err) {
  //     res.status(401).json({});
  //   }
  //   // if (!user.checkIfUnencryptedPasswordIsValid(password)) {
  //   //   res.status(401).json({ messager: "Invalid username password" });
  //   // }
  //   const accessToken = jwt.sign({ username, password }, process.env.SECRET, {
  //     expiresIn: "30s",
  //   });
  //   res.status(200).json({ user, accessToken });
  // };
  // public static register = async (
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) => {
  //   const { username, password } = req.body;
  //   try {
  //     const user = new User();
  //     user.username = username;
  //     user.password = password;
  //     const errors = await validate(user);
  //     user.hashPassword();
  //     if (errors.length > 0) {
  //       res.send(errors);
  //       return;
  //     }
  //     const userRepository = getRepository(User);
  //     const newUser = await userRepository.save(user);
  //     res.send(newUser);
  //   } catch (err) {
  //     next(err);
  //   }
  // };
}

export default AuthController;
