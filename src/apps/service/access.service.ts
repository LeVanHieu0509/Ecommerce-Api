import { omit } from "lodash";
import bcrypt from "bcrypt";
import crypto from "node:crypto";

import { IUser } from "./../models/User";
import { getCustomRepository } from "typeorm";
import APIError from "../global/response/apierror";
import Err from "../global/response/errorcode";
import { UserFoodRepository } from "../repositories/food-app/UserFoodRepositories";
import KeyTokenService from "./keyToken.service";
import createTokenPair from "../auth/authUtils";
import ResponseTemplate from "../global/response";

const RoleUser = {
  USER: "USER",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
};

class AccessService {
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
        const { accessToken, refreshToken } = await createTokenPair({ userId: newUser.id, email: newUser.email });

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
