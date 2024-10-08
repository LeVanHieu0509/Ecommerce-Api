import { Article } from "./../modules/entities/article.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {}
