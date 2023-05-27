import { TipClothing } from "../../modules/entities/tip-product.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(TipClothing)
export class TipClothingRepository extends Repository<TipClothing> {}
