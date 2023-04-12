import { UserFoodRepository } from "./../repositories/food-app/UserFoodRepositories";
import { getCustomRepository } from "typeorm";

const findByEmail = async ({
  email,
  select = { email: 1, password: 2, name: 1, status: 1, role: 1 },
}: {
  email: string;
  select?: any;
}) => {
  const userRepository = getCustomRepository(UserFoodRepository);
  return await userRepository.findOne({ email });
};

export { findByEmail };
