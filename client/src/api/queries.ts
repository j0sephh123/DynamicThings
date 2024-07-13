import { useMutation, useQuery } from '@tanstack/react-query';
import { queryKeys } from './queryKeys';
import fetchApi from './fetchApi';
import type {
	EmployeeCreateRequest,
} from '../../../server/sharedTypes';
import apiEndpoints from './endpoins';
import { EmployeesCreateResponse, EmployeesGetResponse } from './apiTypes';

export const useGetEmployees = () => {
	const { data: employees } = useQuery({
		queryKey: queryKeys.employees,
		queryFn: async () =>
			fetchApi.get<EmployeesGetResponse>(apiEndpoints.employees),
	});

	return employees;
};

export const useCreateEmployee = () => {
	const { mutate } = useMutation({
		mutationFn: (data: EmployeeCreateRequest) =>
			fetchApi.post<EmployeesCreateResponse>(apiEndpoints.employeeCreate, data),
		onSuccess: data => {
			console.log('Employee created', data);
		},
		onError: error => {
			console.error('Failed to create employee', error);
		},
	});

	return mutate;
};
