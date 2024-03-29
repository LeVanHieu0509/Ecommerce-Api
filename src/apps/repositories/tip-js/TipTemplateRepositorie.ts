import { EntityRepository, Repository } from "typeorm";
import { TipTemplate } from "../../modules/entities/template.entity";

@EntityRepository(TipTemplate)
export class TipTemplateRepository extends Repository<TipTemplate> {}
