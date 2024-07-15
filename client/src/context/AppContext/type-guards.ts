import {
	ConfirmDeleteModalType,
	CreateEmployeeModalType,
	SettingsModalType,
} from './AppContext';

export function isConfirmDeleteModal(
	value: any
): value is ConfirmDeleteModalType {
	return (
		typeof value === 'object' &&
		value !== null &&
		value.type === 'confirmDelete' &&
		typeof value.id === 'string'
	);
}

export function isSettingsModalType(value: any): value is SettingsModalType {
	return (
		typeof value === 'object' && value !== null && value.type === 'settings'
	);
}

export function isCreateEmployeeModalType(
	value: any
): value is CreateEmployeeModalType {
	return (
		typeof value === 'object' &&
		value !== null &&
		value.type === 'createEmployee'
	);
}
