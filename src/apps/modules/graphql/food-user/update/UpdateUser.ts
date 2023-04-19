import { UserFoodRepository } from "./../../../../repositories/food-app/UserFoodRepositories";
import { omit, set } from "lodash";
import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { getCustomRepository } from "typeorm";
import { UpdateUserInput } from "./UpdateUserInput";
import UserFood from "../../../entities/food_user";

@Resolver((_any) => UserFood)
export class UpdateUser {
  @Mutation((_type) => UserFood)
  public async updateUser(@Arg("data") inputData: UpdateUserInput): Promise<Omit<UserFood, "password">> {
    const { id, email, password } = inputData;

    const userRepository = getCustomRepository(UserFoodRepository);
    await userRepository.update({ id }, { email: email, password: password });
    return { ...omit(await userRepository.findOneOrFail(id, { relations: ["department"] }), "password") };
  }
}
