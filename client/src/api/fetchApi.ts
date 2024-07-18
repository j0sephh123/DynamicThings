import { AppRouter } from '@server/app';
import { hc } from 'hono/client';

const fetchApi = {
	get: async <T>(endpoint: string) => {
		const response = await fetch(endpoint);
		const data = await response.json();

		return data as T;
	},
	post: async <T>(endpoint: string, body: any) => {
		const response = await fetch(endpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});
		const data = await response.json();

		return data as T;
	},
	put: async <T>(endpoint: string, body: any) => {
		const response = await fetch(endpoint, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});
		const data = await response.json();

		return data as T;
	},
	delete: async <T>(endpoint: string) => {
		const response = await fetch(endpoint, {
			method: 'DELETE',
		});
		const data = await response.json();

		return data as T;
	},
};

export const apiClient = hc<AppRouter>('/api');

export default fetchApi;
