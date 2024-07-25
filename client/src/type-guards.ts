import { Employee } from '@server/sharedTypes';
import { EmployeeSaveRequest } from '@server/zodValidators';
import {
	EditEmployeeModalType,
	ModalTypes,
} from './context/ModalContext/ModalContext';

type CreateEmployeeProps = {
	type: Extract<ModalTypes, 'createEmployee'>;
	data: EmployeeSaveRequest;
};
type EditEmployeeProps = {
	type: Extract<ModalTypes, 'editEmployee'>;
	data: Employee;
};

export type SaveEmployeeFnProps = CreateEmployeeProps | EditEmployeeProps;

export function isCreateEmployeeProps(
	props: SaveEmployeeFnProps
): props is CreateEmployeeProps {
	return props.type === 'createEmployee';
}

export function isEditEmployeeProps(
	props: SaveEmployeeFnProps
): props is { type: Extract<ModalTypes, 'editEmployee'>; data: Employee } {
	return props.type === 'editEmployee';
}
export function isEditEmployeeModal(
	value: any
): value is EditEmployeeModalType {
	return value.type === 'editEmployee';
}
