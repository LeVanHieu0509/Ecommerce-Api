import { Arg, Query, Resolver } from "type-graphql";
import { InjectRepository } from "typeorm-typedi-extensions";
import { FavoriteFoodRepository } from "../../../../repositories/food-app/FavoriteFoodRepositories";
import { FavoriteFood } from "../../../entities/food_favorite";
import { GetFavoriteInput } from "./GetFavoriteInput";

@Resolver((_type) => FavoriteFood)
export class GetFavoriteFood {
  constructor(
    @InjectRepository() // Sẽ tự động tạo thực thể categoryRepository qua hàm xây dựng. Tuỳ vào mục đích chúng ta sẽ chọn cách phù hợp
    private readonly favoriteFoodFoodRepository: FavoriteFoodRepository
  ) {}

  @Query((_type) => [FavoriteFood]) // Định nghĩa như là method GetPosts như là một graphql
  public async getFavorite(@Arg("data") inputData: GetFavoriteInput): Promise<FavoriteFood[]> {
    const favorites = await this.favoriteFoodFoodRepository.find({
      where: { user_food: inputData.user_id },
      relations: ["user_food", "product_food"],
    });

    return favorites;
  }
}
