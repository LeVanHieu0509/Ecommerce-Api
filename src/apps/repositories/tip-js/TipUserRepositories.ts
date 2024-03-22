import { EntityRepository, Repository } from "typeorm";
import TipUser from "../../modules/entities/tip-user.entity";

@EntityRepository(TipUser)
export class TipUserRepository extends Repository<TipUser> {}
