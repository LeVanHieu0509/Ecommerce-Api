import { EntityRepository, Repository } from "typeorm";
import { ApiKey } from "./../../modules/entities/apiKey.entity";

@EntityRepository(ApiKey)
export class ApiKeysRepository extends Repository<ApiKey> {}
