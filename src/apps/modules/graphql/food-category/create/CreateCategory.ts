import { Arg, Mutation, Resolver } from "type-graphql";
import { getCustomRepository } from "typeorm";
import { CategoriesFoodRepository } from "../../../../repositories/food-app/CategoriesFoodRepositories";
import { CategoryFood } from "../../../entities/food_category";

import { CreateCategoryInput } from "./CreateCategoryInput";

@Resolver((_type) => CategoryFood) //sẽ biến class CreateGroup thành một rest API
export class CreateCategory {
  @Mutation((_type) => CategoryFood) //Định nghĩa method create Post thành một graphql mutation
  public async CreateCategory(
    @Arg("data") inputData: CreateCategoryInput // @Arg: Sẽ đưa giá trị phía clent-side gửi lên params vào input data
  ): Promise<CategoryFood> {
    const { title, image } = inputData;
    const categoryRepository = getCustomRepository(CategoriesFoodRepository); //getCustomRepository: Sử dụng hàm này để tạo một thực thể và sử dụng các method của typeORM
    // và sử dụng các method của TypeOrm.
    const category = categoryRepository.create({
      title,
      image,
    });

    await categoryRepository.save(category);
    return {
      ...category,
    };
  }
}
