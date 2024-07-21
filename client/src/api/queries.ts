import { useMutation, useQuery } from '@tanstack/react-query';
import { getEmployeesQueryKey, getEmployeeProfileQueryKey } from './queryKeys';
import fetchApi from './fetchApi';
import type { Employee } from '../../../server/sharedTypes';
import apiEndpoints from './endpoins';
import { EmployeesGetResponse, EmployeeGetResponse } from './apiTypes';
import {
	mutationFnCreateEmployee,
	mutationFnUpdateEmployee,
} from './mutationFn';
import { EmployeePostError, EmployeePutError } from '@server/zodValidators';
import { queryClient } from './ReactQueryProvider';

export const getEmployeeProfile = (id: string) => {
	return queryClient.fetchQuery({
		queryKey: getEmployeeProfileQueryKey(id),
		queryFn: async () =>
			fetchApi.get<EmployeeGetResponse>(apiEndpoints.employee(id)),
	});
};

export const useGetEmployees = () => {
	const { data: employees } = useQuery({
		queryKey: getEmployeesQueryKey(),
		queryFn: async () =>
			fetchApi.get<EmployeesGetResponse>(apiEndpoints.employees),
	});

	return employees;
};

export type UseSaveEmployee<T> = {
	onSuccess: () => void;
	onError: (error: T) => void;
};

const handleError =
	<T>(onError: UseSaveEmployee<T>['onError']) =>
	({ error }: any) => {
		if (error.name === 'ZodError') {
			onError(error as T);
		} else {
			console.error('Unhandled error:', error);
		}
	};

export const useCreateEmployee = ({
	onSuccess,
	onError,
}: UseSaveEmployee<EmployeePostError>) => {
	const { mutate } = useMutation({
		mutationFn: mutationFnCreateEmployee,
		onSuccess,
		onError: handleError(onError),
	});

	return mutate;
};

export const useUpdateEmployee = ({
	onSuccess,
	onError,
}: UseSaveEmployee<EmployeePutError>) => {
	const { mutate } = useMutation({
		mutationFn: mutationFnUpdateEmployee,
		onSuccess,
		onError: handleError(onError),
	});

	return mutate;
};

export const useDeleteEmployee = (id: Employee['id']) => {
	const { mutateAsync } = useMutation({
		mutationFn: () => fetchApi.delete(apiEndpoints.employeeDelete(id)),
	});

	return mutateAsync;
};
