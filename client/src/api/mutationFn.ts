import { EmployeeCreateRequest } from '@server/zodValidators';
import { EmployeesCreateResponse } from './apiTypes';
import apiEndpoints from './endpoins';
import fetchApi from './fetchApi';

export const mutationFnCreateEmployee = (data: EmployeeCreateRequest) => {
	return fetchApi.post<EmployeesCreateResponse>(
		apiEndpoints.employeeCreate,
		data
	);
};
