import { EntityRepository, Repository } from "typeorm";
import TipInventory from "../../modules/entities/tip-inventory.entity";

@EntityRepository(TipInventory)
export class TipInventoryRepository extends Repository<TipInventory> {}
