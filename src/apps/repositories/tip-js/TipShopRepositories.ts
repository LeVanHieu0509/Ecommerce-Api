import { TipShop } from "../../modules/entities/tip-shop.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(TipShop)
export class TipShopRepository extends Repository<TipShop> {}
