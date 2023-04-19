import { ProductsFoodRepository } from "../../../../repositories/food-app/ProductsFoodRepositories";
import { UserFoodRepository } from "../../../../repositories/food-app/UserFoodRepositories";
import { FavoriteFoodRepository } from "./../../../../repositories/food-app/FavoriteFoodRepositories";

import { Arg, Mutation, Resolver } from "type-graphql";
import { getCustomRepository } from "typeorm";
import FavoriteFood from "../../../entities/food_favorite";
import { CreateFavoriteInput } from "./CreateFavoriteInput";
@Resolver((_type) => FavoriteFood) //sẽ biến class CreateGroup thành một rest API
export class CreateFavorite {
  @Mutation((_type) => FavoriteFood) //Định nghĩa method create Post thành một graphql mutation
  public async createFavorite(
    @Arg("data") inputData: CreateFavoriteInput // @Arg: Sẽ đưa giá trị phía clent-side gửi lên params vào input data
  ): Promise<FavoriteFood> {
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

    const orderRepository = getCustomRepository(FavoriteFoodRepository); //getCustomRepository: Sử dụng hàm này để tạo một thực thể và sử dụng các method của typeORM
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
