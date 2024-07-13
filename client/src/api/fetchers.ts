import apiEndpoints from './endpoins';
import type {
	Responses,
	EmployeeCreateRequest,
} from '../../../server/sharedTypes';
import fetchApi from './fetchApi';

export const getEmployees = async () => {
	const data = await fetchApi.get<Responses['employees']>(
		apiEndpoints.employees
	);

	return data;
};

export const createEmployee = async (data: EmployeeCreateRequest) => {
	const response = await fetchApi.post<Responses['employee']>(
		apiEndpoints.employeeCreate,
		data
	);

	return response;
};
