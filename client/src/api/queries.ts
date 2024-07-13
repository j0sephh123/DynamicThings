import { useQuery } from '@tanstack/react-query';
import { fetchEmployees } from './fetchers';

export const useFetchEmployees = () => {
	const { data: employees } = useQuery({
		queryKey: ['employees'],
		queryFn: fetchEmployees,
	});

  return employees;
};
