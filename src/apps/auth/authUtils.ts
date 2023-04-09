import * as jwt from "jsonwebtoken";

const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    const accessToken = await jwt.sign(payload, publicKey, {
      algorithm: "RS256",
      expiresIn: "2 days",
    });

    const refreshToken = await jwt.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "7 days",
    });

    jwt.verify(accessToken, publicKey, (err, decode) => {
      err ? console.log("error verify::", err) : console.log("decode verify::", decode);
    });

    return { accessToken, refreshToken };
  } catch (e) {}
};

export default createTokenPair;
