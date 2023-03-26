import { CategoriesFoodRepository } from "../../../../repositories/food-app/CategoriesFoodRepositories";
import { ProductsFoodRepository } from "./../../../../repositories/food-app/ProductsFoodRepositories";
import { ProductFood } from "./../../../entities/food_product";
import { Arg, Mutation, Resolver } from "type-graphql";
import { getCustomRepository } from "typeorm";
import { CreateProductInput } from "./CreateProductInput";

@Resolver((_type) => ProductFood) //sẽ biến class CreateGroup thành một rest API
export class CreateProduct {
  @Mutation((_type) => ProductFood) //Định nghĩa method create Post thành một graphql mutation
  public async createProduct(
    @Arg("data") inputData: CreateProductInput // @Arg: Sẽ đưa giá trị phía clent-side gửi lên params vào input data
  ): Promise<ProductFood> {
    const { title, image, description, price, category_id } = inputData;
    let category_food;

    if (category_id) {
      const userRepository = getCustomRepository(CategoriesFoodRepository);
      const category = await userRepository.findOne({
        where: { id: category_id },
      });
      if (category) {
        category_food = category;
      }
    }

    const productRepository = getCustomRepository(ProductsFoodRepository); //getCustomRepository: Sử dụng hàm này để tạo một thực thể và sử dụng các method của typeORM
    // và sử dụng các method của TypeOrm.
    const category = productRepository.create({
      description,
      image,
      title,
      price,
      category_food,
    });

    await productRepository.save(category);
    return {
      ...category,
    };
  }
}
