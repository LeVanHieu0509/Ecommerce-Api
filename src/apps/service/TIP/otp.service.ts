import crypto from "crypto";
import { getCustomRepository } from "typeorm";
import { TipOtpRepository } from "../../repositories/tip-js/TipOtpRepositories";

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

export { newOtp };
