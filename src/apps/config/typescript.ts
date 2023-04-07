export interface IDatabase {
  portApp?: string;
  database: string;
  host: string;
  password: string;
  port: number | string;
  username: string;
}
