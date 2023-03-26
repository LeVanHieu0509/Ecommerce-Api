import { EntityRepository, Repository } from "typeorm";
import ProductFood from "../../modules/entities/food_product";

@EntityRepository(ProductFood)
export class ProductsFoodRepository extends Repository<ProductFood> {}
