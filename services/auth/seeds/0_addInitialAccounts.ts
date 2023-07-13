import { Knex } from "knex";
import { faker } from "@faker-js/faker";

const config = {
  phone: {
    number: {
      length: 11,
    },
    format: `79${"#".repeat(9)}`, // Phone in format of 79#########
  },
  password: {
    hash: {
      length: 32,
    },
  },
  refresh: {
    token: {
      length: 16,
    },
  },
  user: {
    count: 1024,
  },
};

type User = {
  id?: number;
  firstName: string;
  secondName: string;
  middleName: string;
  profilePicture?: number[];
};

type Account = {
  id?: number;
  phone: string;
  passwordHash: string;
  refreshToken: string;
  userId: Pick<User, "id">;
  registrationDate: EpochTimeStamp;
  permissions: number;
};

type Sex = "male" | "female";

const createRandomUser: () => User = () => {
  const sex: Sex = faker.person.sex() as Sex;

  return {
    firstName: faker.person.firstName(sex),
    secondName: faker.person.lastName(sex),
    middleName: faker.person.middleName(sex),
    profilePicture: null,
  };
};

const createRandomAccount: (userId: Pick<User, "id">) => Account = (
  userId
) => ({
  phone: faker.phone.number(config.phone.format),
  passwordHash: faker.string.alphanumeric(config.password.hash.length),
  refreshToken: faker.string.alphanumeric({
    length: config.refresh.token.length,
  }),
  userId,
  registrationDate: faker.date.past().getTime(),
  permissions: faker.number.int(),
});

const USERS: User[] = faker.helpers.multiple(createRandomUser, {
  count: config.user.count,
});

export const seed = async (knex: Knex): Promise<void> => {
  await Promise.all([knex("users").delete(), knex("accounts").delete()]);

  const userIds = await knex("users").insert(USERS).returning("id");

  const accounts = userIds.map((userId: Pick<User, "id">) =>
    createRandomAccount(userId)
  );

  await knex("accounts").insert(accounts);
};
