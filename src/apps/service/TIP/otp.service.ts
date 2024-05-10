import crypto from "crypto";
import { getCustomRepository } from "typeorm";
import { TipOtpRepository } from "../../repositories/tip-js/TipOtpRepositories";
import { ErrorResponseCustom } from "../../../core/error.response";

const newOtp = async ({ email }) => {
  const tipOtpRepository = getCustomRepository(TipOtpRepository);
  const token = generatorTokenRandom();

  const newToken = await tipOtpRepository.create({
    otp_token: String(token),
    otp_email: email,
  });

  const result = await tipOtpRepository.save(newToken);
  return result;
};

// Module nào sẽ đảm nhiệm trách nhiệm riêng cho từng function
const generatorTokenRandom = () => {
  const token = crypto.randomInt(0, Math.pow(2, 32));

  return token;
};

const checkTokenEmail = async ({ token }) => {
  //1. check token Email
  const tipOtpRepository = getCustomRepository(TipOtpRepository);
  const foundToken = await tipOtpRepository.findOne({
    otp_token: token,
  });

  if (!foundToken) throw new ErrorResponseCustom("Token Not Found ");

  //delete token

  await tipOtpRepository.delete({
    otp_token: token,
  });

  return foundToken;
};
export { newOtp, checkTokenEmail };
