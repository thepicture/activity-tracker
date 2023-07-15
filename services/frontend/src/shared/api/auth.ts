import { instance } from './lib';
import { Routes } from './routes';

type AccessRefreshTokenPair = {
	accessToken: string;
	refreshToken: string;
};

type SignInBody = {
	phone: string;
	password: string;
};

type RefreshAccessTokenBody = {
	refreshToken: string;
};

/**
 * Tries to sign in
 * @param phone user's phone
 * @param password user's password
 * @returns {AccessRefreshTokenPair} access and refresh token pair
 * @throws invalid authentication attempt
 */
export const signIn = async (
	body: SignInBody
): Promise<AccessRefreshTokenPair> => {
	const { data: pair } = await instance.post<AccessRefreshTokenPair>(
		Routes.Auth,
		body
	);

	return pair;
};

/**
 * Tries to refresh access token by refresh token
 * @param body object with refresh token
 * @returns promise representing refresh of access token
 * @throws refresh token is invalid
 */
export const refreshAccessTokenByRefreshToken = async (
	body: RefreshAccessTokenBody
): Promise<string> => {
	const { data: accessToken } = await instance.post<string>(
		Routes.Session,
		body
	);

	return accessToken;
};
