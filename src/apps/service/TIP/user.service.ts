import bcrypt from "bcrypt";
import crypto from "node:crypto";
import { ErrorResponseCustom } from "../../../core/error.response";
import { createTokenPair } from "../../auth/authUtils";
import { createUser } from "../../modules/repos/user.repo";
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
    console.log({ token });
    // 1. Check token in db
    const { otp_email: email, otp_token } = await checkTokenEmail({ token });

    //check email
    if (!email) throw new ErrorResponseCustom("Token Not Found");
    // 2. check email exists in user modal
    const foundUser = await findByEmail({ email });
    //3. if exists
    if (foundUser) return new Error("Email already exists");

    //4. New user

    const passwordHash = await bcrypt.hash(email, 10);

    const newUser = await createUser({
      username: email,
      password: passwordHash,
      email: email,
      roles: [RoleUser.USER],
    });

    if (newUser) {
      //create tokened pair
      // const privateKey = crypto.randomBytes(64).toString("hex");
      // const publicKey = crypto.randomBytes(64).toString("hex");
      // console.log({
      //   privateKey,
      //   publicKey,
      // });
      // const tokens = await createTokenPair(
      //   {
      //     userId: newUser.id,
      //     email: newUser.email,
      //   },
      //   "",
      //   ""
      // );

      return {
        metadata: {
          user: { id: foundUser.id, email: foundUser.email, username: foundUser.username },
        },
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
