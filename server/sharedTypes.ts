import type { EmployeeCreateRequest } from './zodValidators';

export type { EmployeeCreateRequest };

export type Employee = {
	id: number;
} & EmployeeCreateRequest;

export type Responses = {
	employees: Employee[];
	employee: Employee;
};
