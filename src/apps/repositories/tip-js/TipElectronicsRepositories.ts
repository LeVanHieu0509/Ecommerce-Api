import { TipElectronics } from "../../modules/entities/tip-product.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(TipElectronics)
export class TipElectronicsRepository extends Repository<TipElectronics> {}
