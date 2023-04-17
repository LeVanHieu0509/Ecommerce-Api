import { EntityRepository, Repository } from "typeorm";
import { CheckoutFood } from "./../../modules/entities/food_checkout";

@EntityRepository(CheckoutFood)
export class CheckoutFoodRepository extends Repository<CheckoutFood> {}
