import { EntityRepository, Repository } from "typeorm";
import { TipProducts } from "../../modules/entities/tip-product.entity";

@EntityRepository(TipProducts)
export class TipProductsRepository extends Repository<TipProducts> {}
