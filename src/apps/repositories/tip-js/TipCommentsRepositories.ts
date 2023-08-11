import { EntityRepository, Repository } from "typeorm";
import TipComments from "../../modules/entities/tip-comment.entity";

@EntityRepository(TipComments)
export class TipCommentsRepository extends Repository<TipComments> { }
