import {
	ConfirmDeleteModalType,
	CreateEmployeeModalType,
	SettingsModalType,
	EditEmployeeModalType,
} from './AppContext';

export function isConfirmDeleteModal(
	value: any
): value is ConfirmDeleteModalType {
	return value.type === 'confirmDelete';
}

export function isEditEmployeeModal(
	value: any
): value is EditEmployeeModalType {
	return value.type === 'editEmployee';
}

export function isSettingsModalType(value: any): value is SettingsModalType {
	return value.type === 'settings';
}

export function isCreateEmployeeModalType(
	value: any
): value is CreateEmployeeModalType {
	return value.type === 'createEmployee';
}
