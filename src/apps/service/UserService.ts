import APIError from "../global/response/apierror";
import Err from "../global/response/errorcode";
import { User } from "../modules/entities/user.entity";
import { IUser } from "../models/User";
import { IUserRepository } from "./UserRepository";

export class UserService {
  // async get(): Promise<User[] | null> {
  //   // Get users from database
  //   try {
  //     const userRepository = AppDataSource.getRepository(User);
  //     const users = await userRepository.find({});
  //     return users;
  //   } catch (error) {
  //     return null;
  //   }
  // }
  // async getById(id: any): Promise<User | null> {
  //   const userRepository = AppDataSource.getRepository(User);
  //   try {
  //     const user = await userRepository.findOneBy(id);
  //     return user;
  //   } catch (error) {
  //     return null;
  //   }
  // }
  // async add(model: IUser): Promise<User | null> {
  //   const { username, role, password, email } = model;
  //   const user = new User();
  //   user.username = username;
  //   user.role = role;
  //   user.password = password;
  //   user.email = email;
  //   const userRepository = AppDataSource.getRepository(User);
  //   try {
  //     const savedUser = await userRepository.save(user);
  //     return savedUser;
  //   } catch (e) {
  //     console.log(e);
  //     return Promise.reject(
  //       new APIError("User Already exists", Err.EmailAlreadyExists)
  //     );
  //   }
  // }
  // async delete(id: any): Promise<User | null> {
  //   const userRepository = AppDataSource.getRepository(User);
  //   let user: User;
  //   try {
  //     user = await userRepository.findOneBy(id);
  //     if (user) {
  //       userRepository.delete(id);
  //     }
  //     return null;
  //   } catch (error) {
  //     return null;
  //   }
  // }
  // async findBy(value: any): Promise<User[] | null> {
  //   const userRepository = AppDataSource.getRepository(User);
  //   try {
  //     const user = await userRepository.findBy(value);
  //     return user;
  //   } catch (error) {
  //     return null;
  //   }
  // }
}
