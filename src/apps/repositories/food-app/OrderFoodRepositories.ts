import { EntityRepository, Repository } from "typeorm";
import { OrderFood } from "../../modules/entities/food_order";

@EntityRepository(OrderFood)
export class OrderFoodRepository extends Repository<OrderFood> {}
