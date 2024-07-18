import { EmployeeSaveRequest } from '@server/zodValidators';
import { EmployeesSaveResponse } from './apiTypes';
import apiEndpoints from './endpoins';
import fetchApi from './fetchApi';
import { Employee } from '@server/sharedTypes';

export const mutationFnCreateEmployee = (data: EmployeeSaveRequest) => {
	return fetchApi.post<EmployeesSaveResponse>(
		apiEndpoints.employeeCreate,
		data
	);
};

export const mutationFnUpdateEmployee = (data: Employee) => {
	return fetchApi.put<EmployeesSaveResponse>(
		apiEndpoints.employeeUpdate(data),
		data
	);
};
