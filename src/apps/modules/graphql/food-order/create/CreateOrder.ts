import { OrderFoodRepository } from "./../../../../repositories/food-app/OrderFoodRepositories";
import { ProductsFoodRepository } from "../../../../repositories/food-app/ProductsFoodRepositories";
import { OrderFood } from "../../../entities/food_order";
import { UserFoodRepository } from "./../../../../repositories/food-app/UserFoodRepositories";

import { Arg, Mutation, Resolver } from "type-graphql";
import { getCustomRepository } from "typeorm";
import { CreateOrderInput } from "./CreateOrderInput";
@Resolver((_type) => OrderFood) //sẽ biến class CreateGroup thành một rest API
export class CreateOrder {
  @Mutation((_type) => OrderFood) //Định nghĩa method create Post thành một graphql mutation
  public async createOrder(
    @Arg("data") inputData: CreateOrderInput // @Arg: Sẽ đưa giá trị phía clent-side gửi lên params vào input data
  ): Promise<OrderFood> {
    const { product_id, user_id } = inputData;
    let product_food;
    let user_food;

    if (product_id) {
      const productRepository = getCustomRepository(ProductsFoodRepository);
      let product = await productRepository.findOne({
        where: { id: product_id },
      });
      if (product) {
        product_food = product;
      }
    }

    if (user_id) {
      const userRepository = getCustomRepository(UserFoodRepository);
      let user = await userRepository.findOne({
        where: { id: user_id },
      });
      if (user) {
        user_food = user;
      }
    }

    const orderRepository = getCustomRepository(OrderFoodRepository); //getCustomRepository: Sử dụng hàm này để tạo một thực thể và sử dụng các method của typeORM
    // và sử dụng các method của TypeOrm.
    const order = orderRepository.create({
      product_food,
      user_food,
    });

    await orderRepository.save(order);

    return {
      ...order,
    };
  }
}
