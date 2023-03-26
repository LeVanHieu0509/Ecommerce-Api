import { EntityRepository, Repository } from "typeorm";
import UserFood from "../../modules/entities/food_user";

@EntityRepository(UserFood)
export class UserFoodRepository extends Repository<UserFood> {}
