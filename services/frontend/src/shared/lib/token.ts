import { decodeToken, isExpired } from 'react-jwt';

/**
 * Checks if token expired, thus `exp < Date.now()`
 * @param token json web token
 * @returns `true` if token expired, else `false`
 */
export const isTokenExpired = (token: string): boolean => {
	if (!token) {
		return true;
	}

	return isExpired(decodeToken(token));
};
