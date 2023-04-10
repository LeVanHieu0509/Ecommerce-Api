import * as jwt from "jsonwebtoken";
import { defaults, clone } from "lodash";
import errorHandler from "../../ultis/error";
import { signJwt } from "../../ultis/jwt";

export function issue(payload: { id: number }, jwtOptions: any = {}) {
  defaults(jwtOptions, { expiresIn: process.env.EXPIRES_IN || "100y", algorithm: "HS256" });
  return jwt.sign(clone(payload), process.env.JWT_SECRET || "e1ab3176-c260-4856-8e47-96a4b8e816a5", jwtOptions);
}

export function verify(token: string) {
  return new Promise(function (resolve, reject) {
    jwt.verify(
      token,
      process.env.JWT_ACCESS_TOKEN_PRIVATE_KEY || "e1ab3176-c260-4856-8e47-96a4b8e816a5",
      {},
      function (err, tokenPayload = {}) {
        if (err) {
          return reject(new Error("Invalid token."));
        }
        resolve(tokenPayload);
      }
    );
  });
}

const createTokenPair = async (user: any) => {
  try {
    const accessToken = signJwt({ user: user.id }, "JWT_ACCESS_PRIVATE_KEY", {
      expiresIn: "15m",
    });

    const refreshToken = signJwt({ user: user.id }, "JWT_REFRESH_PRIVATE_KEY", {
      expiresIn: "60m",
    });

    return { accessToken, refreshToken };
  } catch (e) {
    console.log("createTokenPair", e);
  }
};

export default createTokenPair;
