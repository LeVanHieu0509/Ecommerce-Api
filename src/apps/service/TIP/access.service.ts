import bcrypt from "bcrypt";
import crypto from "node:crypto";
import { getCustomRepository } from "typeorm";
import { Forbidden } from "../../../core/error.response";
import { createTokenPair } from "../../auth/authUtils";
import { findByEmail } from "../user.service";
import { verifyJwt } from "./../../../ultis/jwt";
import { IUser } from "./../../models/User";
import { UserFoodRepository } from "./../../repositories/food-app/UserFoodRepositories";
import KeyTokenService from "./keyToken.service";

export const RoleUser = {
  USER: "USER",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMINIE: "ADMINIE",
};

class AccessService {
  //AccessToken hết hạn thì dùng refreshToken để tạo ra cặp mới
  public static handleRefreshToken = async (refreshToken) => {
    const foundToken = await KeyTokenService.findByRefreshTokenUsed(refreshToken);

    //neu ma co thi phai check xem va xoa di khong cho no quyen truy cap
    if (foundToken) {
      //decode xem user nay la thang nao?
      const { userId, email } = await verifyJwt(refreshToken, "JWT_ACCESS_PUBLIC_KEY");
      console.log(userId, email);

      //XXoa di boi vi refreshToken da het han
      //Check va xoa tat ca cac token trong keyStore
      await KeyTokenService.deleteKeyById(userId);
      throw new Forbidden("Some thing wrong --- Please login");
    }

    //Nếu chưa sài
    const holderToken = await KeyTokenService.findByRefreshToken({ refreshToken });

    //Nếu tìm được cái token mà chưa bị expried thì có thể sử dụng lại

    //neu chua co thi se tim trong database
  };

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

  public static changePassword = async ({ email, password }, userId) => {
    const userRepository = getCustomRepository(UserFoodRepository);
    const user = await userRepository.findOne({ id: userId });
    if (!user) return { status: "-1", message: "user in valid" };

    if (user) {
      const passwordHash = await bcrypt.hash(password, 10);

      await userRepository.update(
        {
          id: userId,
        },
        { username: email, password: passwordHash, email: email }
      );

      return {
        status: "1",
        message: "Change success",
      };
    }
  };
}

export default AccessService;
