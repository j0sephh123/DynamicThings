import { useMutation, useQuery } from '@tanstack/react-query';
import { getEmployees, createEmployee } from './fetchers';
import { queryKeys } from './queryKeys';

export const useFetchEmployees = () => {
	const { data: employees } = useQuery({
		queryKey: queryKeys.employees,
		queryFn: getEmployees,
	});

	return employees;
};

export const useCreateEmployee = () => {
	const { mutate } = useMutation({
		mutationFn: createEmployee,
		onSuccess: data => {
			console.log('Employee created', data);
		},
		onError: error => {
			console.error('Failed to create employee', error);
		},
	});

	return mutate;
};
