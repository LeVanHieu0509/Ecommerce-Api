import { EntityRepository, Repository } from "typeorm";
import { TipOrder } from "./../../modules/entities/tip-order";

@EntityRepository(TipOrder)
export class TipOrderRepository extends Repository<TipOrder> {}
