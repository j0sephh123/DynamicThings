export type { EmployeeCreateRequest } from './zodValidators';

export type Employee = {
	id: number;
	name: string;
	position: string;
	department: string;
	experience: number;
};

export type Responses = {
	employees: Employee[];
	employee: Employee;
};
