import configs from "../configs";
import jwt from "jsonwebtoken";
import { AccessRefreshTokenPair } from "types";

type TokenType = "refresh" | "access";

/**
 * Updates refresh token in account and returns pair
 * of access and refresh tokens.
 */
export const getGeneratedAccessRefreshTokenPair =
  (): AccessRefreshTokenPair => {
    const payload = {
      permissions: configs.development.permissions.default,
    };

    const { key: accessTokenKey, expiresIn: accessTokenExpiresIn } =
      configs.development.token.access;

    const accessToken = jwt.sign(payload, accessTokenKey, {
      expiresIn: accessTokenExpiresIn,
    });

    const { key: refreshTokenKey, expiresIn: refreshTokenExpiresIn } =
      configs.development.token.refresh;

    const refreshToken = jwt.sign(payload, refreshTokenKey, {
      expiresIn: refreshTokenExpiresIn,
    });

    return { accessToken, refreshToken };
  };

/**
 * Returns boolean representing if token is valid
 * @param token refresh or access token
 * @param type
 * @returns boolean representing if token is valid
 */
export const isTokenValid = (token: string, type: TokenType) => {
  try {
    jwt.verify(token, configs.development.token[type].key);
  } catch {
    return false;
  }

  return true;
};
