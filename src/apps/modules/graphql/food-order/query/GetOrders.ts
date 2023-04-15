import { Arg, Query, Resolver } from "type-graphql";
import { InjectRepository } from "typeorm-typedi-extensions";
import { OrderFoodRepository } from "../../../../repositories/food-app/OrderFoodRepositories";
import { OrderFood } from "../../../entities/food_order";
import { GetOrderInput } from "./GetOrderInput";

@Resolver((_type) => OrderFood)
export class GetOrdersFood {
  constructor(
    @InjectRepository() // Sẽ tự động tạo thực thể categoryRepository qua hàm xây dựng. Tuỳ vào mục đích chúng ta sẽ chọn cách phù hợp
    private readonly ordersFoodFoodRepository: OrderFoodRepository
  ) {}

  @Query((_type) => [OrderFood]) // Định nghĩa như là method GetPosts như là một graphql
  public async getOrders(@Arg("data") inputData: GetOrderInput): Promise<OrderFood[]> {
    const orders = await this.ordersFoodFoodRepository.find({
      where: { user_food: inputData.user_id },
      relations: ["user_food", "product_food"],
    });

    return orders;
  }
}
