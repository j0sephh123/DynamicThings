import type { AppRouter } from './app';
import type { EmployeeCreateRequest } from './zodValidators';

export type { AppRouter, EmployeeCreateRequest };

export type Employee = {
	id: number;
} & EmployeeCreateRequest;
