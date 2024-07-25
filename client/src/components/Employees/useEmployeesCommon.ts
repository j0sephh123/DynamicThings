import { Employee } from '@server/sharedTypes';
import { useCallback } from 'react';
import { useModalContext } from '../../context/ModalContext/ModalContext';

export default function useEmployeesCommon() {
	const { openModal } = useModalContext();

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
