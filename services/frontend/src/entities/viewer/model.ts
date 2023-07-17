import { makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import {
	isTokenExpired,
	refreshAccessTokenByRefreshToken,
	signIn,
} from 'shared';

enum Tokens {
	Access = 'accessToken',
	Refresh = 'refreshToken',
}

/**
 * Represents state of authenticated user
 */
class ViewerStore {
	refreshToken: string;
	accessToken: string;

	phone = '';
	password = '';

	errorMessage = '';

	constructor() {
		makeAutoObservable(this);

		makePersistable(this, {
			name: 'ViewerStore',
			properties: [Tokens.Access, Tokens.Refresh],
		});
	}

	get shouldAccessTokenRefetch() {
		return !this.isAccessTokenValid && this.isRefreshTokenValid;
	}

	get isAccessTokenValid(): boolean {
		return !isTokenExpired(this[Tokens.Access]);
	}

	get isRefreshTokenValid(): boolean {
		return !isTokenExpired(this[Tokens.Refresh]);
	}

	get canSignIn() {
		return this.phone && this.password;
	}

	/**
	 * Signs in guest with store's phone and password
	 * @returns promise representing refresh and access tokens
	 * @throws authentication failed
	 */
	signIn = async () => {
		const { phone, password } = this;

		let refreshAccessTokenPair;

		try {
			refreshAccessTokenPair = await signIn({
				phone,
				password,
			});
		} catch (_) {
			this.errorMessage = 'Cannot sign in';

			return;
		}

		const { refreshToken, accessToken } = refreshAccessTokenPair;

		this.refreshToken = refreshToken;
		this.accessToken = accessToken;
	};

	/**
	 * Refetches access token by refresh token if refresh token exists
	 * @returns promise representing refresh of access token
	 */
	refetchAccessToken = async () => {
		if (!this.refreshToken) {
			return;
		}

		let accessToken: string;

		try {
			accessToken = await refreshAccessTokenByRefreshToken({
				refreshToken: this.refreshToken,
			});
		} catch (_) {
			this.errorMessage = 'Cannot refresh access token';

			return;
		}

		this.accessToken = accessToken;
	};

	setPhone = (phone: string) => {
		this.phone = phone;
	};

	setPassword = (password: string) => {
		this.password = password;
	};
}

export const store = new ViewerStore();
