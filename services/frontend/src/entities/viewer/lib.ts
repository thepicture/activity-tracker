import { isTokenExpired } from 'shared';

/**
 * Checks whenever token is valid or not
 * @param token token to check
 * @returns `true` is token is valid, else `false`
 */
export const isTokenValid = (token: string) => {
	if (!token) {
		return false;
	}

	return !isTokenExpired(token);
};
