import type { AppRouter } from './app';
import type {
	EmployeeCreateRequest,
	EmployeeDeleteRequest,
} from './zodValidators';

export type { AppRouter, EmployeeCreateRequest, EmployeeDeleteRequest };

export type Employee = {
	id: number;
} & EmployeeCreateRequest;
