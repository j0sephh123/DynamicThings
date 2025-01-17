import { Employee } from '@server/sharedTypes';
import { createContext, useContext } from 'react';

export type ModalTypes =
	| 'settings'
	| 'createEmployee'
	| 'confirmDelete'
	| 'editEmployee';

type OpenModalParams = {
	type: ModalTypes;
	id?: string;
	employee?: Employee;
};
export type OpenModal = (params: OpenModalParams) => void;

export type ConfirmDeleteModalType = {
	type: 'confirmDelete';
	id: Employee['id'];
};
export type SettingsModalType = { type: 'settings' };
export type CreateEmployeeModalType = { type: 'createEmployee' };
export type EditEmployeeModalType = {
	type: 'editEmployee';
	employee: Employee;
};

export type CurrentModal =
	| ConfirmDeleteModalType
	| SettingsModalType
	| CreateEmployeeModalType
	| EditEmployeeModalType;

export type ModalContextState = {
	currentModal?: CurrentModal;
	closeModal: () => void;
	openModal: OpenModal;
};

export const ModalStateContext = createContext<ModalContextState>({
	currentModal: undefined,
	closeModal: () => {},
	openModal: () => {},
});

export const useModalContext = () => useContext(ModalStateContext);
