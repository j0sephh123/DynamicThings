import type { Employee } from './sharedTypes';
import type { EmployeeCreateRequest } from './zodValidators';

export default function createEmployeeFactory({
	department,
	experience,
	name,
	position,
}: EmployeeCreateRequest): Employee {
	const id = Math.floor(Math.random() * 1000);

	return { id, name, position, department, experience };
}
