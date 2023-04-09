import { omit } from "lodash";
import { bcrypt } from "bcryptjs";
import crypto from "crypto";

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
      const user = userRepository.findOneOrFail(username);

      if (user) {
        return new APIError("User Already exists", Err.EmailAlreadyExists);
      }

      const passwordHash = await bcrypt.hash(password, 10);

      const newUser = await userRepository.create({
        username: username,
        password: passwordHash,
        email: email,
        roles: [RoleUser.USER],
      });

      if (newUser) {
        //create token == private key, public key
        const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
          modulusLength: 4096,
        });

        const publicKeyString = await KeyTokenService.createKeyToken({
          userId: newUser.id,
          publicKey: publicKey,
        });

        if (!publicKeyString) {
          ResponseTemplate.error("Invalid PublickeyString", "failed", 200);
        }

        //create tokened pair
        const tokens = await createTokenPair({ userId: newUser.id, email }, publicKey, privateKey);

        console.log("Create token success", tokens);

        return ResponseTemplate.success({ data: { status: 200, user: omit(user, "password"), tokens } }, "success");
      } else {
        ResponseTemplate.success({ data: { status: 200, data: null } }, "failed");
      }
    } catch (e) {
      ResponseTemplate.userAlreadyExist();
    }
  };
}

export default AccessService;
