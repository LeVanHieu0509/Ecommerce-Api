import { EntityRepository, Repository } from "typeorm";
import { TipCart } from "../../modules/entities/tip-cart.entity";

@EntityRepository(TipCart)
export class TipCartRepository extends Repository<TipCart> {}
