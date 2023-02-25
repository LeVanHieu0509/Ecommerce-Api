import "reflect-metadata";
import { DataSource } from "typeorm";
import { Photo } from "./apps/models/entities/photo.entity";
import { User } from "./apps/models/entities/user.entity";

export const AppDataSource = new DataSource({
  type: "mssql",
  host: "localhost",
  port: 1433,
  username: "sa",
  password: "Levanhieu1",
  database: "test",
  synchronize: true,
  logging: true,
  entities: [User, Photo],
  subscribers: [],
  migrations: [],
  options: {
    encrypt: false,
    useUTC: true,
  },

  pool: {
    max: 100,
    min: 0,
    idleTimeoutMillis: 3600000,
  },
});
