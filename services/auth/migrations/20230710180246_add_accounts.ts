import { Knex } from "knex";

const PHONE_NUMBER_LENGTH = 11;
const PASSWORD_HASH_LENGTH = 32;

export const up: (knex: Knex) => Promise<void> = async (knex) => {
  await knex.schema.table("accounts", (table) => {
    table.increments();

    table
      .string("phone", PHONE_NUMBER_LENGTH)
      .notNullable()
      .comment("Phone number");

    table
      .string("passwordHash", PASSWORD_HASH_LENGTH)
      .notNullable()
      .comment("Password hash");

    table.string("refreshToken").comment("Refresh token to prolong access");

    table
      .integer("userId")
      .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE")
      .comment("To whom account belongs to");

    table
      .datetime("registrationDate", { useTz: false })
      .notNullable()
      .defaultTo(Date.now())
      .comment("Date of account creation");

    table.integer("permissions").notNullable().comment("What user can do");

    table.index("phone");
  });
};

export const down: (knex: Knex) => Promise<void> = async (knex) => {
  await knex.schema.dropTable("accounts");
};
