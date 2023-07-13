import { Knex } from "knex";

export const up: (knex: Knex) => Promise<void> = async (knex) => {
  await knex.schema.table("users", (table) => {
    table.increments();

    table.string("firstName").notNullable().comment("First name");

    table.string("secondName").notNullable().comment("Second name");

    table.string("middleName").notNullable().comment("Middle name");

    table.binary("profilePicture").comment("Profile picture");

    table.index(["secondName", "firstName", "middleName"]);
  });
};

export const down: (knex: Knex) => Promise<void> = async (knex) => {
  await knex.schema.dropTable("users");
};
