import { bcrypt } from "bcryptjs";
import crypto from "crypto";
import { getCustomRepository } from "typeorm";
import { ErrorResponseCustom } from "../../../core/error.response";
import { createTokenPair } from "../../auth/authUtils";
import { UserFoodRepository } from "../../repositories/food-app/UserFoodRepositories";
import { findByEmail } from "../user.service";
import { RoleUser } from "./access.service";
import { sendEmailToken } from "./email.service";
import { checkTokenEmail } from "./otp.service";

const newUser = async ({ email = null, capcha = null }) => {
  //capcha để hạn chế spam server

  //1. check email exitst in dbs
  const foundUser = await findByEmail({ email });

  //2. if exists
  if (foundUser) {
    return new ErrorResponseCustom("Email already exists");
  }

  //3. send token via email user
  await sendEmailToken({ email });

  return {
    message: "verify ",
    metadata: {
      token: 1,
    },
  };
};

const checkTokenEmailTokenService = async ({ token }) => {
  try {
    const userRepository = getCustomRepository(UserFoodRepository);

    // 1. Check token in db
    const { otp_email: email, otp_token } = await checkTokenEmail({ token });

    //check email
    if (!email) throw new ErrorResponseCustom("Token Not Found");
    // 2. check email exists in user modal
    const foundUser = await findByEmail({ email });

    //3. if exists
    if (foundUser) return new ErrorResponseCustom("Email already exists");

    //4. New user

    const passwordHash = await bcrypt.hash(email, 10);

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
  } catch (error) {}
};

export { checkTokenEmailTokenService, newUser };
