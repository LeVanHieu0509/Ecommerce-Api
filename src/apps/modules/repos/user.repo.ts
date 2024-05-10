import { getCustomRepository } from "typeorm";
import { UserFoodRepository } from "../../repositories/food-app/UserFoodRepositories";

const createUser = async ({ username, email, roles, password }) => {
  const userRepository = getCustomRepository(UserFoodRepository);

  const newUser = userRepository.create({
    username: username,
    password: password,
    email: email,
    roles: roles,
  });

  await userRepository.save(newUser);

  return newUser;
};

export { createUser };
