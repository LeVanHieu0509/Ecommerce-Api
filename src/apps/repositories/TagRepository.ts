import { Tag } from "../modules/entities/tag.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Tag)
export class TagRepository extends Repository<Tag> {}
