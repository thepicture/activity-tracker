import type { Knex } from "knex";
import appConfig from "./configs";

const knexConfig: { [key: string]: Knex.Config } = {
  development: appConfig.development.database,
  production: {
    ...appConfig.production.database,
    pool: {
      min: 0,
      max: 16,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};

module.exports = knexConfig;
