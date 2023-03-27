import { Query } from "type-graphql";
import { ProductsFoodRepository } from "./../../../../repositories/food-app/ProductsFoodRepositories";
import { InjectRepository } from "typeorm-typedi-extensions";
import { ProductFood } from "./../../../entities/food_product";
import { Resolver } from "type-graphql";

@Resolver((_type) => ProductFood)
export class GetProduct {
  constructor(
    @InjectRepository() // Sẽ tự động tạo thực thể categoryRepository qua hàm xây dựng. Tuỳ vào mục đích chúng ta sẽ chọn cách phù hợp
    private readonly productsFoodRepository: ProductsFoodRepository
  ) {}

  @Query((_type) => [ProductFood]) // Định nghĩa như là method GetPosts như là một graphql
  public async getProducts(): Promise<ProductFood[]> {
    const products = await this.productsFoodRepository.find();
    return products;
  }
}
