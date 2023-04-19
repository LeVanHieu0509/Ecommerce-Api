import bcrypt from "bcrypt";
import { omit } from "lodash";
import crypto from "node:crypto";
import { getCustomRepository } from "typeorm";
import { AuthFailureError, BadRequestError } from "../../core/error.response";
import { createTokenPair } from "../auth/authUtils";
import ResponseTemplate from "../global/response";
import APIError from "../global/response/apierror";
import Err from "../global/response/errorcode";
import { UserFoodRepository } from "../repositories/food-app/UserFoodRepositories";
import { IUser } from "./../models/User";
import KeyTokenService from "./keyToken.service";
import { findByEmail } from "./user.service";

const RoleUser = {
  USER: "USER",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
};

class AccessService {
  public static logout = async (keystore) => {
    const delKey = await KeyTokenService.removeKeyById(keystore.id);

    return delKey;
  };

  public static login = async ({ email, password, refreshToken }: any) => {
    const foundUser = await findByEmail({ email });
    if (!foundUser) return { status: "-1", message: "login failed" };

    const match = await bcrypt.compare(password, foundUser.password);

    if (!match) return { status: "-1", message: "login failed" };

    const privateKey = crypto.randomBytes(64).toString("hex");
    const publicKey = crypto.randomBytes(64).toString("hex");

    const tokens = await createTokenPair({ userId: foundUser.id, email }, publicKey, privateKey);

    await KeyTokenService.createKeyToken({
      userId: foundUser.id,
      refreshToken: tokens.refreshToken,
      privateKey,
      publicKey,
    });

    return {
      status: "1",
      user: { id: foundUser.id, email: foundUser.email, username: foundUser.username },
      tokens,
    };
  };

  public static signUp = async ({ email, password, roles }: IUser) => {
    try {
      //check email exist?
      const userRepository = getCustomRepository(UserFoodRepository);
      const user = await userRepository.findOne({ email });

      if (user) {
        return {
          message: "User Already exists",
          status: "2",
        };
      }

      const passwordHash = await bcrypt.hash(password, 10);

      const newUser = userRepository.create({
        username: email,
        password: passwordHash,
        email: email,
        roles: [RoleUser.USER],
      });

      await userRepository.save(newUser);

      if (newUser) {
        //create tokened pair
        const privateKey = crypto.randomBytes(64).toString("hex");
        const publicKey = crypto.randomBytes(64).toString("hex");

        const { accessToken, refreshToken } = await createTokenPair(
          {
            userId: newUser.id,
            email: newUser.email,
          },
          privateKey,
          publicKey
        );

        return {
          message: "Register success",
          status: "1",
        };
      } else {
        return {
          message: "Register failed",
          status: "-2",
        };
      }
    } catch (e) {
      return {
        message: e,
        status: 404,
      };
    }
  };
}

export default AccessService;
