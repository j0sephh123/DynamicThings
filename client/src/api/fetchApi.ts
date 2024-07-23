import { AppRouter } from '@server/app';
import { hc } from 'hono/client';

const fetchApi = {
	get: async <T>(endpoint: string): Promise<T> => {
		const response = await fetch(endpoint);

		if (!response.ok) {
			const errorData = await response.json();

			throw errorData;
		}
		const data = await response.json();
		return data as T;
	},
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	post: async <T>(endpoint: string, body: any): Promise<T> => {
		const response = await fetch(endpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});
		if (!response.ok) {
			const errorData = await response.json();

			throw errorData;
		}
		const data = await response.json();
		return data as T;
	},
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	put: async <T>(endpoint: string, body: any): Promise<T> => {
		const response = await fetch(endpoint, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});
		if (!response.ok) {
			const errorData = await response.json();

			throw errorData;
		}
		const data = await response.json();
		return data as T;
	},
	delete: async <T>(endpoint: string): Promise<T> => {
		const response = await fetch(endpoint, {
			method: 'DELETE',
		});
		if (!response.ok) {
			const errorData = await response.json();

			throw errorData;
		}
		const data = await response.json();
		return data as T;
	},
};

export const apiClient = hc<AppRouter>('/api');

export default fetchApi;
