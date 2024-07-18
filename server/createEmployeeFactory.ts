import type { Employee } from './sharedTypes';
import type { EmployeeSaveRequest } from './zodValidators';

export default function createEmployeeFactory({
	department,
	experience,
	name,
	position,
}: EmployeeSaveRequest): Employee {
	const id = [...Array(10)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

	return { id, name, position, department, experience };
}
