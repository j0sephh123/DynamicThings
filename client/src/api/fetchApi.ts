const fetchApi = {
	get: async <T>(endpoint: string): Promise<T> => {
		const response = await fetch(endpoint);
		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(
				errorData.message || `HTTP error! status: ${response.status}`
			);
		}
		const data = await response.json();
		return data as T;
	},
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
			throw new Error(
				errorData.message || `HTTP error! status: ${response.status}`
			);
		}
		const data = await response.json();
		return data as T;
	},
};

export default fetchApi;
