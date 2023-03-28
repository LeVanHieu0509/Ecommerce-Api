import { Query, Resolver } from "type-graphql";
import { InjectRepository } from "typeorm-typedi-extensions";
import { CategoriesFoodRepository } from "./../../../../repositories/food-app/CategoriesFoodRepositories";
import { CategoryFood } from "./../../../entities/food_category";

@Resolver((_type) => CategoryFood)
export class GetCategory {
  constructor(
    @InjectRepository() // Sẽ tự động tạo thực thể categoryRepository qua hàm xây dựng. Tuỳ vào mục đích chúng ta sẽ chọn cách phù hợp
    private readonly categoriesFoodRepository: CategoriesFoodRepository
  ) {}

  @Query((_type) => [CategoryFood]) // Định nghĩa như là method GetPosts như là một graphql
  public async getCategories(): Promise<CategoryFood[]> {
    const categories = await this.categoriesFoodRepository.find();
    return categories;
  }
}
