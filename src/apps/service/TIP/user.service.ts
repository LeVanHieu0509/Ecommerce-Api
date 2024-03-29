import { ErrorResponseCustom } from "../../../core/error.response";
import { SuccessResponse } from "../../../core/success.response";
import { findByEmail } from "../user.service";
import { sendEmailToken } from "./email.service";

const newUser = async ({ email = null, capcha = null }) => {
  //capcha để hạn chế spam server

  //1. check email exitst in dbs
  const foundUser = await findByEmail({ email });

  //2. if exists
  if (foundUser) {
    return new ErrorResponseCustom("Email already esists");
  }

  //3. send token via email user
  const token = await sendEmailToken(email);

  return {
    message: "verify ",
    metadata: {
      token,
    },
  };
};

export { newUser };
