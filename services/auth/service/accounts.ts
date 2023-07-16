import { getGeneratedAccessRefreshTokenPair } from "../utils";
import { verify } from "argon2";
import { RuntimeError } from "../errors";
import knex from "knex";
import * as knexConfig from "../knexfile";
import { AccessRefreshTokenPair } from "../types";

const database = knex((knexConfig as { development: unknown }).development);

/**
 * Saves refresh token in account and returns new refresh token
 * @param accountId account identifier
 * @param refreshToken refresh token to save
 * @returns new refresh token
 */
export const saveRefreshTokenInAccount = async (
  accountId: number,
  refreshToken: string
) => {
  return await database("accounts")
    .where("id", accountId)
    .update({ refreshToken })
    .returning("refreshToken");
};

/**
 * Tries to sign in user
 * @param phone phone number
 * @param password user password
 * @throws {RuntimeError} validation failed
 * @returns token pair with access and refresh tokens
 */
export const trySignIn = async (
  phone: string,
  password: string
): Promise<AccessRefreshTokenPair> => {
  if (!phone || !password) {
    throw new RuntimeError("Phone and password required");
  }

  const [account] = await database("accounts")
    .select(["id", "passwordHash"])
    .where("phone", phone)
    .limit(1);

  if (!account) {
    throw new RuntimeError("Account not found");
  }

  const { id: accountId, passwordHash } = account;

  try {
    await verify(passwordHash, password);
  } catch {
    throw new RuntimeError("Invalid credentials");
  }

  const tokenPair = getGeneratedAccessRefreshTokenPair();

  await saveRefreshTokenInAccount(accountId, tokenPair.refreshToken);

  return tokenPair;
};
