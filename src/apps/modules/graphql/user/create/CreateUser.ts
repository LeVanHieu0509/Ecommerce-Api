import { Arg, Mutation, Resolver } from "type-graphql";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../../../../repositories/UserRepositories";
import User from "../../../entities/User.entity";
import { CreateUserInput } from "./CreateUserInput";
import bcrypt from "bcryptjs";
import { omit } from "lodash";

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

@Resolver((_type) => User) //sẽ biến class CreateGroup thành một rest API
export class CreateUser {
  @Mutation((_type) => User) //Định nghĩa method create User thành một graphql mutation
  public async CreateUser(
    @Arg("data") inputData: CreateUserInput // @Arg: Sẽ đưa giá trị phía clent-side gửi lên params vào input data
  ): Promise<Omit<User, "password">> {
    const userRepository = getCustomRepository(UserRepository); //getCustomRepository: Sử dụng hàm này để tạo một thực thể và sử dụng các method của typeORM
    // và sử dụng các method của TypeOrm
    const password = hashPassword(inputData.password);
    if (!password) {
      throw new Error("hash password error");
    }
    const user = userRepository.create({
      password: inputData.password,
      email: inputData.email,
      username: inputData.username,
      role: inputData.role,
    });

    await userRepository.save(user);
    return { ...omit(user, "password") };
  }
}
