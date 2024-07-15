import { useState, useCallback } from 'react';
import { AppContextState, CurrentModal, OpenModal } from './AppContext';
import { isConfirmDeleteModal } from './type-guards';

const useAppContextHooks = (): AppContextState => {
	const [currentModal, setCurrentModal] = useState<CurrentModal>();

	const closeModal = useCallback(() => {
		console.log('closemodal');

		setCurrentModal(undefined);
	}, []);

	const openModal: OpenModal = useCallback(params => {
		const { type } = params;

		switch (type) {
			case 'confirmDelete':
				if (isConfirmDeleteModal(params)) {
					const { id } = params;
					setCurrentModal({ type, id });
				}
				break;
			case 'settings':
			case 'createEmployee':
				setCurrentModal({ type });
				break;
			default:
				break;
		}
	}, []);

	return {
		currentModal,
		closeModal,
		openModal,
	};
};

export default useAppContextHooks;
