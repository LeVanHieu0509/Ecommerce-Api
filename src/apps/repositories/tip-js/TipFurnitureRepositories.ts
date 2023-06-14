import { EntityRepository, Repository } from "typeorm";
import { TipFurniture } from "../../modules/entities/tip-product.entity";

@EntityRepository(TipFurniture)
export class TipFurnitureRepository extends Repository<TipFurniture> {}
