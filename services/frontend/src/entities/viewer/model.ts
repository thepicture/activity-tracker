import { makeAutoObservable, runInAction } from 'mobx';
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

	/** Error during api call */
	error = '';

	constructor() {
		makeAutoObservable(this, {
			isRefreshTokenValid: false,
		});

		makePersistable(this, {
			name: 'ViewerStore',
			properties: [Tokens.Access, Tokens.Refresh],
		});
	}

	get isSignedIn(): boolean {
		if (!this.isRefreshTokenValid) {
			return false;
		}
	}

	get shouldAccessTokenRefetch() {
		return !this.isAccessTokenValid && this.isRefreshTokenValid;
	}

	get isAccessTokenValid(): boolean {
		return this.#isTokenValid(Tokens.Access);
	}

	get isRefreshTokenValid(): boolean {
		return this.#isTokenValid(Tokens.Refresh);
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
			this.error = 'Cannot sign in';

			return;
		}

		const { refreshToken, accessToken } = refreshAccessTokenPair;

		runInAction(() => {
			this.refreshToken = refreshToken;
			this.accessToken = accessToken;
		});
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
			this.error = 'Cannot refresh access token';

			return;
		}

		runInAction(() => {
			this.accessToken = accessToken;
		});
	};

	setPhone = (phone: string) => {
		this.phone = phone;
	};

	setPassword = (password: string) => {
		this.password = password;
	};

	#isTokenValid = (which: Tokens): boolean => {
		const token = this[which];

		if (!token) {
			return false;
		}

		return !isTokenExpired(token);
	};
}

export const store = new ViewerStore();
