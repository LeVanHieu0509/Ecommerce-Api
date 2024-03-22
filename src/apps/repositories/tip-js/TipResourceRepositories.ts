import { EntityRepository, Repository } from "typeorm";
import { TipResource } from "../../modules/entities/tip-resource.entity";

@EntityRepository(TipResource)
export class TipResourceRepository extends Repository<TipResource> {}
