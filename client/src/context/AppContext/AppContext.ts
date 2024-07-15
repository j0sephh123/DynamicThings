import { createContext, useContext } from 'react';

export type ModalTypes = 'settings' | 'createEmployee' | 'confirmDelete';

type OpenModalParams = {
	type: ModalTypes;
};
export type OpenModal = (params: OpenModalParams) => void;

export type ConfirmDeleteModalType = { type: 'confirmDelete'; id: string };
export type SettingsModalType = { type: 'settings' };
export type CreateEmployeeModalType = { type: 'createEmployee' };

export type CurrentModal =
	| ConfirmDeleteModalType
	| SettingsModalType
	| CreateEmployeeModalType;

export type AppContextState = {
	currentModal?: CurrentModal;
	closeModal: () => void;
	openModal: OpenModal;
};

export const AppStateContext = createContext<AppContextState>({
	currentModal: undefined,
	closeModal: () => {},
	openModal: () => {},
});

export const useAppContext = () => useContext(AppStateContext);
