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
  public static logout = async ({ keystore }) => {
    const delKey = await KeyTokenService.removeKeyById(keystore.id);
    return delKey;
  };

  public static login = async ({ email, password, refreshToken }: any) => {
    const foundUser = await findByEmail({ email });
    if (!foundUser) throw new BadRequestError("User not registered");

    const match = await bcrypt.compare(password, foundUser.password);

    if (!match) throw new AuthFailureError("Authentication Error");

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
      user: { email: foundUser.email, username: foundUser.username },
      tokens,
    };
  };

  public static signUp = async ({ username, email, password, roles }: IUser) => {
    try {
      //check email exist?
      const userRepository = getCustomRepository(UserFoodRepository);
      const user = await userRepository.findOne({ username });

      if (user) {
        return new APIError("User Already exists", Err.EmailAlreadyExists);
      }

      const passwordHash = await bcrypt.hash(password, 10);

      const newUser = userRepository.create({
        username: username,
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

        return ResponseTemplate.success(
          { status: 200, user: omit(newUser, "password"), tokens: { accessToken, refreshToken } },
          "1"
        );
      } else {
        ResponseTemplate.success({ status: 200, data: null }, "-1");
      }
    } catch (e) {
      return ResponseTemplate.error("try catch error", e, 404);
    }
  };
}

export default AccessService;
