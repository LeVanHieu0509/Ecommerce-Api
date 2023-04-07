import { IDatabase } from "./typescript";

function env(key: string, defaulValue?: any) {
  return process.env[key] ?? defaulValue;
}

const config: { [key: string]: IDatabase } = {
  development: {
    portApp: env("DEV_APP_PORT"),
    host: env("DB_HOST"),
    port: parseInt(env("DB_PORT", 1433)),
    username: env("DB_USER"),
    password: env("DB_PASS"),
    database: env("DB_NAME"),
  },
  production: {
    host: env("DB_HOST"),
    port: parseInt(env("DB_PORT", 1433)),
    username: env("DB_USER"),
    password: env("DB_PASS"),
    database: env("DB_NAME"),
  },
  stage: {
    host: env("DB_HOST"),
    port: parseInt(env("DB_PORT", 1433)),
    username: env("DB_USER"),
    password: env("DB_PASS"),
    database: env("DB_NAME"),
  },
  test: {
    host: env("DB_HOST"),
    port: parseInt(env("DB_PORT", 1433)),
    username: env("DB_USER"),
    password: env("DB_PASS"),
    database: env("DB_NAME"),
  },
  uat: {
    host: env("DB_HOST"),
    port: parseInt(env("DB_PORT", 1433)),
    username: env("DB_USER"),
    password: env("DB_PASS"),
    database: env("DB_NAME"),
  },
};
export default config;
