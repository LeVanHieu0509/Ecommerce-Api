import { SigninInput } from "./SigninInput";
import { bcrypt } from "bcryptjs";
import { UserRepository } from "./../../../../repositories/UserRepositories";
import { getCustomRepository } from "typeorm";
import { User } from "./../../../entities/user.entity";
import { Arg, Args, Ctx, Info, Mutation, Query, Resolver, Root } from "type-graphql";
import { GraphQLResolveInfo } from "graphql";
import { signJwt } from "../../../../../ultis/jwt";
import LoginInput from "./Logininput";
import AuthResponse from "./AuthResponse";
import { omit } from "lodash";
import errorHandler from "../../../../../ultis/error";

const accessTokenExpireIn = 15;
const refreshTokenExpireIn = 60;

const cookieOptions = {
  httpOnly: true,
  // domain: 'localhost',
  sameSite: "none",
  secure: true,
};

const accessTokenCookieOptions = {
  ...cookieOptions,
  maxAge: accessTokenExpireIn * 60 * 1000,
  expires: new Date(Date.now() + accessTokenExpireIn * 60 * 1000),
};

const refreshTokenCookieOptions = {
  ...cookieOptions,
  maxAge: refreshTokenExpireIn * 60 * 1000,
  expires: new Date(Date.now() + refreshTokenExpireIn * 60 * 1000),
};

const validatePassword = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

const signTokens = (user: any) => {
  const access_token = signJwt({ user: user.id }, "JWT_ACCESS_PRIVATE_KEY", {
    expiresIn: "15m",
  });

  const refresh_token = signJwt({ user: user.id }, "JWT_REFRESH_PRIVATE_KEY", {
    expiresIn: "60m",
  });

  return { access_token, refresh_token };
};

function isHashed(password?: string) {
  if (typeof password !== "string" || !password) {
    return false;
  }
  return password.split("$").length === 4;
}

function hashPassword(password: string) {
  return new Promise<string | null>((resolve, reject) => {
    if (!password || isHashed(password)) {
      resolve(null);
    } else {
      bcrypt.hash(`${password}`, 10, (err, hash) => {
        if (err) {
          return reject(err);
        }
        resolve(hash);
      });
    }
  });
}

@Resolver((_type: any) => User)
export class Auth {
  @Mutation((_type) => User)
  public async signup(
    @Arg("data") inputData: SigninInput,
    @Ctx() { conn }: any,
    @Info() info: GraphQLResolveInfo
  ) {
    const { email, password, role, username } = inputData;

    const userRepository = getCustomRepository(UserRepository);
    const isUser = await userRepository.findOne({ username: username });
    if (!isUser) {
      throw new Error("user invalid");
    }

    const user = userRepository.create({
      email,
      password,
      role,
      username,
    });
    await userRepository.save(user);

    return {
      status: 200,
      user,
    };
  }

  @Query((_type) => AuthResponse)
  public async login(
    @Arg("data") inputData: LoginInput,
    @Ctx() { res, req }: any,
    @Info() info: GraphQLResolveInfo
  ) {
    try {
      const { username } = inputData;
      const userRepository = getCustomRepository(UserRepository);
      const user = await userRepository.findOne({ username });

      user.password = undefined;
      // Create a session and tokens
      const { access_token, refresh_token } = await signTokens(user);

      // Add refreshToken to cookie
      res.cookie("refresh_token", refresh_token, refreshTokenCookieOptions);
      res.cookie("access_token", access_token, accessTokenCookieOptions);
      res.cookie("logged_in", true, {
        ...accessTokenCookieOptions,
        httpOnly: false,
      });

      return {
        user: omit(user, ["password"]),
        access_token,
      };
    } catch (error) {
      errorHandler(error);
    }
  }

}
