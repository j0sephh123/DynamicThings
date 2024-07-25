import {
	ConfirmDeleteModalType,
	CreateEmployeeModalType,
	SettingsModalType,
} from './ModalContext';

export function isConfirmDeleteModal(
	value: any
): value is ConfirmDeleteModalType {
	return value.type === 'confirmDelete';
}

export function isSettingsModalType(value: any): value is SettingsModalType {
	return value.type === 'settings';
}

export function isCreateEmployeeModalType(
	value: any
): value is CreateEmployeeModalType {
	return value.type === 'createEmployee';
}
