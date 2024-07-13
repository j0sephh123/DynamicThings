import apiEndpoints from './endpoins';
import { Responses } from '../../../shared/types';

const genericFetcher = async <T>(endpoint: string) => {
	const response = await fetch(endpoint);
	const data = await response.json();

	return data as T;
};

export const fetchEmployees = async () => {
	const data = await genericFetcher<Responses['employees']>(
		apiEndpoints.employees
	);

	return data;
};
