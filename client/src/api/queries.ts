import { useMutation, useQuery } from '@tanstack/react-query';
import { getEmployeesQueryKey } from './queryKeys';
import fetchApi from './fetchApi';
import type {
	Employee,
	EmployeeCreateRequest,
	EmployeeDeleteRequest,
} from '../../../server/sharedTypes';
import apiEndpoints from './endpoins';
import { EmployeesCreateResponse, EmployeesGetResponse } from './apiTypes';

export const useGetEmployees = () => {
	const { data: employees } = useQuery({
		queryKey: getEmployeesQueryKey(),
		queryFn: async () =>
			fetchApi.get<EmployeesGetResponse>(apiEndpoints.employees),
	});

	return employees;
};

export const useCreateEmployee = () => {
	const { mutateAsync } = useMutation({
		mutationFn: (data: EmployeeCreateRequest) =>
			fetchApi.post<EmployeesCreateResponse>(apiEndpoints.employeeCreate, data),
	});

	return mutateAsync;
};

export const useDeleteEmployee = (id: Employee['id']) => {
	const { mutateAsync } = useMutation({
		mutationFn: () =>
			fetchApi.delete(
				apiEndpoints.employeeDelete(id)
			),
	});

	return mutateAsync;
};
