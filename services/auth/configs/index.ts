import { PERMISSIONS } from "../enums";

export default {
  development: {
    port: 3000,
    database: {
      client: "pg",
      connection:
        "postgresql://paranoid:paranoid@authdb:5432/auth?application_name=db_paranoid",
    },
    token: {
      refresh: {
        key: "paranoid",
        expiresIn: "30d",
      },
      access: {
        key: "dionarap",
        expiresIn: "16m",
      },
    },
    permissions: {
      default: PERMISSIONS.READ_MONITORS,
    },
    limit: {
      json: "8mb",
      uri: "1mb",
    },
  },
  production: {
    port: Number(process.env.PORT),
    database: {
      client: "pg",
      connection: process.env.DATABASE_URL,
    },
    token: {
      refresh: {
        key: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_KEY_EXPIRES_IN,
      },
      access: {
        key: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_KEY_EXPIRES_IN,
      },
    },
    permissions: {
      default: PERMISSIONS.READ_MONITORS,
    },
    limit: {
      json: process.env.JSON_LENGTH_LIMIT,
      uri: process.env.URI_LENGTH_LIMIT,
    },
  },
};
