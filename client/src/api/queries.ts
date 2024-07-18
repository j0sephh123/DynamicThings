import { useMutation, useQuery } from '@tanstack/react-query';
import { getEmployeesQueryKey } from './queryKeys';
import fetchApi from './fetchApi';
import type { Employee } from '../../../server/sharedTypes';
import apiEndpoints from './endpoins';
import { EmployeesGetResponse } from './apiTypes';
import {
	mutationFnCreateEmployee,
	mutationFnUpdateEmployee,
} from './mutationFn';

export const useGetEmployees = () => {
	const { data: employees } = useQuery({
		queryKey: getEmployeesQueryKey(),
		queryFn: async () =>
			fetchApi.get<EmployeesGetResponse>(apiEndpoints.employees),
	});

	return employees;
};

type UseSaveEmployee = {
	onSuccess: () => void;
};

export const useCreateEmployee = ({ onSuccess }: UseSaveEmployee) => {
	const { mutate } = useMutation({
		mutationFn: mutationFnCreateEmployee,
		onSuccess,
	});

	return mutate;
};

export const useUpdateEmployee = ({ onSuccess }: UseSaveEmployee) => {
	const { mutate } = useMutation({
		mutationFn: mutationFnUpdateEmployee,
		onSuccess,
	});

	return mutate;
};

export const useDeleteEmployee = (id: Employee['id']) => {
	const { mutateAsync } = useMutation({
		mutationFn: () => fetchApi.delete(apiEndpoints.employeeDelete(id)),
	});

	return mutateAsync;
};
