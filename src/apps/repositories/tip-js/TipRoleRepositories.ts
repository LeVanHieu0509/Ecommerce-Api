import { EntityRepository, Repository } from "typeorm";
import { TipRole } from "../../modules/entities/tip-role.entity";

@EntityRepository(TipRole)
export class TipRoleRepository extends Repository<TipRole> {}
