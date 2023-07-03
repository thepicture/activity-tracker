export default {
  development: {
    port: 3000,
    database: {
      client: "pg",
      connection:
        "postgresql://paranoid:development@pgsql:5432/db_paranoid?application_name=db_paranoid",
    },
  },
  production: {
    port: process.env.PORT,
    database: {
      client: "pg",
      connection: process.env.DATABASE_URL,
    },
  },
};
