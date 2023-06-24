import { EntityRepository, Repository } from "typeorm";
import { TipDiscount } from "./../../modules/entities/tip-discount.entity";

@EntityRepository(TipDiscount)
export class TipDiscountRepository extends Repository<TipDiscount> {}
