import { Knex } from "knex";

export const up: (knex: Knex) => Promise<void> = async (knex) => {
  await knex.schema.createTable("accounts", (table) => {
    table.increments();

    table.string("phone").notNullable().comment("Phone number");

    table.string("passwordHash").notNullable().comment("Password hash");

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
      .defaultTo(new Date().toISOString())
      .comment("Date of account creation");

    table.integer("permissions").notNullable().comment("What user can do");

    table.index("phone");
  });
};

export const down: (knex: Knex) => Promise<void> = async (knex) => {
  await knex.schema.dropTable("accounts");
};
