import { EntityRepository, Repository } from "typeorm";
import FavoriteFood from "../../modules/entities/food_favorite";

@EntityRepository(FavoriteFood)
export class FavoriteFoodRepository extends Repository<FavoriteFood> {}
