import { useQueryClient } from '@tanstack/react-query';
import { getEmployeeProfileQueryKey, getEmployeesQueryKey } from './queryKeys';
import type { Employee } from '../../../server/sharedTypes';

export default function useQueryClientActions() {
	const queryClient = useQueryClient();

	const refetchEmployeeProfile = (id: Employee['id']) => {
		queryClient.refetchQueries({
			queryKey: getEmployeeProfileQueryKey(id),
		});
	};

	const invalidateEmployees = () => {
		queryClient.invalidateQueries({
			queryKey: getEmployeesQueryKey(),
		});
	};

	return {
		refetchEmployeeProfile,
		invalidateEmployees,
	};
}
