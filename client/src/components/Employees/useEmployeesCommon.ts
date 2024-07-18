import { Employee } from '@server/sharedTypes';
import { useCallback } from 'react';
import { useAppContext } from '../../context/AppContext/AppContext';

export default function useEmployeesCommon() {
	const { openModal } = useAppContext();

	const handleRequestDelete = useCallback((id: Employee['id']) => {
		openModal({
			type: 'confirmDelete',
			id,
		});
	}, []);

	const handleRequestEdit = useCallback((employee: Employee) => {
		openModal({
			type: 'editEmployee',
			employee,
		});
	}, []);

	return {
		handleRequestDelete,
		handleRequestEdit,
	};
}
