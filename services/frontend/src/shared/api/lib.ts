import axios from 'axios';

import { config } from './config';

export const instance = axios.create({
	baseURL: config.base.url,
	timeout: config.response.timeout.in.milliseconds,
});
