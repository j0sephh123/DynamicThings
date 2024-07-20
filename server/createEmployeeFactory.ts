import type { Employee } from './sharedTypes';
import type { EmployeeSaveRequest } from './zodValidators';

export default function createEmployeeFactory(
	fields: EmployeeSaveRequest
): Employee {
	const id = [...Array(10)]
		.map(() => Math.floor(Math.random() * 16).toString(16))
		.join('');

	return { ...fields, id };
}
