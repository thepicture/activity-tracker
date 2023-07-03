import { Knex } from "knex";

type Extensions = {
  database: Knex;
};

export default async (
  login: string,
  password: string,
  { database }: Extensions
) => {
  await database("accounts").insert({
    login,
    password,
  });
};
