import { CategoryFood } from "../../modules/entities/food_category";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(CategoryFood)
export class CategoriesFoodRepository extends Repository<CategoryFood> {}
