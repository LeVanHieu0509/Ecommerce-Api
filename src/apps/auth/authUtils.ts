import { NextFunction, Request } from "express";
import * as jwt from "jsonwebtoken";
import { defaults, clone } from "lodash";
import { AuthFailureError, NotFoundError } from "../../core/error.response";
import { asyncHandler } from "../../helpers/asyncHandler";
import errorHandler from "../../ultis/error";
import { signJwt } from "../../ultis/jwt";
import KeyTokenService from "../service/keyToken.service";

const HEADER = {
  API_KEY: "x-api-key",
  CLIENT_ID: "x-client-id",
  AUTHORIZATION: "authorization",
};

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

const createTokenPair = async (user, privateKey, publicKey) => {
  try {
    const accessToken = signJwt({ user: user.userId }, "JWT_ACCESS_PRIVATE_KEY", {
      expiresIn: "15m",
    });

    const refreshToken = signJwt({ user: user.userId }, "JWT_REFRESH_PRIVATE_KEY", {
      expiresIn: "60m",
    });

    return { accessToken, refreshToken };
  } catch (e) {
    console.log("createTokenPair", e);
  }
};

const authentication = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  //1. Check user id missing???
  //2. get accessToken
  //3. verify token
  //4. check user in dbs
  //5. check keyStore with this user id
  //6. ok all => return next()

  //----1----//
  const userId = req.headers[HEADER.CLIENT_ID];
  if (!userId) throw new AuthFailureError("Invalid Request");

  //----2----//
  const keyStore = await KeyTokenService.findByUserId(userId);
  if (!keyStore) throw new NotFoundError("Not found keystore");

  //----3----//
  const accessToken = req.headers[HEADER.AUTHORIZATION];
  if (!accessToken) throw new AuthFailureError("Invalid Request");

  try {
  } catch (error) {}
});

export default createTokenPair;
